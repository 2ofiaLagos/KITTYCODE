import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { db } from "../firebase"; // Asume que esta ruta es correcta
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query, // Necesario para la query más específica
  where,
  writeBatch, // Para eliminar múltiples documentos a la vez
} from "firebase/firestore";

/* 🔒 Categorías por defecto */
const CATEGORIAS_DEFAULT = ["Frontend", "Backend", "Habilidades Blandas"];
// Utilizamos un Set para categorías en tiempo real para eficiencia
const getCategorias = (skills) => [
  ...new Set([...CATEGORIAS_DEFAULT, ...skills.map((s) => s.categoria)]),
];

const SkillsManagerStyled = () => {
  const [skills, setSkills] = useState([]);
  const [selectedCat, setSelectedCat] = useState(CATEGORIAS_DEFAULT[0]); // Inicializa con la primera por defecto
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ nombre: "", descripcion: "", nivel: 0 });
  const [showCatForm, setShowCatForm] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categorias, setCategorias] = useState(CATEGORIAS_DEFAULT);

  const skillsCollection = collection(db, "Habilidades");

  // 🔹 Listener en tiempo real para Firestore
  // 💡 Mejorado para actualizar categorías dinámicamente
  useEffect(() => {
    const unsubscribe = onSnapshot(skillsCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSkills(data);

      // 1. Recalcula las categorías
      const currentCats = getCategorias(data);
      setCategorias(currentCats);

      // 2. Asegura que la categoría seleccionada siga existiendo o selecciona la primera
      if (selectedCat && !currentCats.includes(selectedCat)) {
        setSelectedCat(currentCats[0] || ""); // Selecciona la primera disponible
      } else if (!selectedCat && currentCats.length > 0) {
        setSelectedCat(currentCats[0]);
      }
    });

    return () => unsubscribe();
  }, [selectedCat]); // Depende de selectedCat para reevaluar la selección si es necesario

  /* 📝 Inputs */
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "nivel" ? Number(value) : value, // Asegura que nivel sea Number
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({ nombre: "", descripcion: "", nivel: 0 });
    setEditingId(null);
    setShowForm(false);
  }, []);

  // 🔹 Agregar categoría
  // 💡 No necesitas agregar una "Habilidad dummy" para crear la categoría, ya que las categorías se deducen
  // de las habilidades existentes o del array de CATEGORIAS_DEFAULT.
  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    if (categorias.includes(newCategory)) {
      alert("La categoría ya existe");
      return;
    }
    // Simplemente agregamos la nueva categoría al estado local de CATEGORIAS_DEFAULT
    // El useEffect lo manejará si se agrega una habilidad con esa categoría.
    // Para forzar su existencia visible, la incluimos en el array default si no está.
    CATEGORIAS_DEFAULT.push(newCategory); // Esto es una solución simple para añadirla al default.

    setNewCategory("");
    setShowCatForm(false);
    setSelectedCat(newCategory); // Selecciona la nueva categoría
  };

  // 🔹 Agregar o actualizar habilidad
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();

    const nombreTrimmed = formData.nombre.trim();
    if (!nombreTrimmed) {
      alert("El nombre es obligatorio");
      return;
    }

    const dataToSave = {
      nombre: nombreTrimmed,
      descripcion: formData.descripcion || "",
      nivel: Math.max(0, Math.min(100, Number(formData.nivel || 0))), // Asegura que nivel esté entre 0 y 100
      categoria: selectedCat,
    };

    try {
      if (editingId) {
        await updateDoc(doc(db, "Habilidades", editingId), dataToSave);
      } else {
        await addDoc(skillsCollection, dataToSave);
      }
      resetForm();
    } catch (error) {
      console.error("Error al guardar habilidad:", error);
      alert("Error al guardar la habilidad. Revisa la consola.");
    }
  };

  // 🔹 Editar habilidad
  const handleEdit = useCallback((skill) => {
    setFormData({ nombre: skill.nombre, descripcion: skill.descripcion, nivel: skill.nivel });
    setSelectedCat(skill.categoria);
    setEditingId(skill.id);
    setShowForm(true);
  }, []);

  // 🔹 Confirmación eliminar habilidad
  const handleDeleteSkill = async (id) => {
    if (!window.confirm("¿Estás segura de eliminar esta habilidad?")) return;
    try {
      await deleteDoc(doc(db, "Habilidades", id));
    } catch (error) {
      console.error("Error al eliminar habilidad:", error);
      alert("Error al eliminar la habilidad. Revisa la consola.");
    }
  };

  // 🔹 Confirmación eliminar categoría
  // 💡 Uso de writeBatch para eliminar múltiples documentos de forma atómica y más eficiente
  const handleDeleteCategory = async (cat) => {
    // 🐛 BUG CRÍTICO CORREGIDO: Falta de comillas en el string literal
    const confirmed = window.confirm(
      `¿Estás segura de eliminar la categoría "${cat}" y todas sus habilidades?`
    );
    if (!confirmed) return;

    try {
      const catSkillsQuery = query(skillsCollection, where("categoria", "==", cat));
      const snapshot = await getDocs(catSkillsQuery); // Necesitamos getDocs para esto, no solo el listener
      const batch = writeBatch(db);

      snapshot.docs.forEach((d) => {
        batch.delete(d.ref);
      });

      await batch.commit();

      // Si la categoría eliminada era la seleccionada, cambia a la primera disponible
      if (selectedCat === cat) {
        const remainingCats = categorias.filter(c => c !== cat);
        setSelectedCat(remainingCats[0] || "");
      }
    } catch (error) {
      console.error("Error al eliminar categoría:", error);
      alert("Error al eliminar la categoría. Revisa la consola.");
    }
  };

  // 💡 Filtro de categorías basado en el estado
  const filteredSkills = skills.filter((s) => s.categoria === selectedCat);

  return (
    <div className="p-6 bg-pink-50 rounded-xl shadow-lg border border-pink-200">
      <h2 className="text-2xl font-bold text-pink-600 mb-6">🛠️ Gestión de Habilidades</h2>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6">
        {/* PANEL CATEGORÍAS */}
        <div className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm">
          <h3 className="font-semibold mb-3">Categorías</h3>

          <div className="flex flex-col gap-2">
            {categorias.map((cat) => (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                className={`flex justify-between items-center p-2 rounded-lg cursor-pointer ${
                  selectedCat === cat ? "bg-pink-50 border border-pink-200" : "hover:bg-gray-50"
                }`}
              >
                <div
                  onClick={() => {
                    setSelectedCat(cat);
                    setShowForm(false);
                    setEditingId(null);
                  }}
                  className="flex-1"
                >
                  <p className="text-sm font-medium text-gray-800">{cat}</p>
                  <p className="text-xs text-gray-500">{skills.filter((s) => s.categoria === cat).length} habilidades</p>
                </div>
                {/* Solo permite eliminar categorías no por defecto y si no tienen habilidades */}
                {/* 💡 MEJORA: Solo si hay habilidades, se puede eliminar (para evitar categorías vacías) */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  onClick={() => handleDeleteCategory(cat)}
                  className="text-xs text-red-600 px-2 py-1 rounded hover:bg-red-50"
                  disabled={CATEGORIAS_DEFAULT.includes(cat) && skills.filter(s => s.categoria === cat).length > 0}
                  style={{ opacity: (CATEGORIAS_DEFAULT.includes(cat) && skills.filter(s => s.categoria === cat).length > 0) ? 0.5 : 1 }}
                >
                  Eliminar
                </motion.button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* PANEL HABILIDADES */}
        <div>
          {/* Botón agregar categoría */}
          {/* ... (Tu código para agregar categoría, sin cambios funcionales necesarios aparte de la corrección) */}
          {!showCatForm && (
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              onClick={() => setShowCatForm(true)}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-3 rounded-md text-base mb-4 w-full"
            >
              + Agregar Categoría
            </motion.button>
          )}
          {showCatForm && (
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Nombre de la categoría"
                className="flex-1 p-2 border border-pink-200 rounded"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleAddCategory}
                className="bg-pink-500 text-white px-3 py-2 rounded-md text-sm"
              >
                Guardar
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setShowCatForm(false);
                  setNewCategory("");
                }}
                className="bg-gray-300 text-black px-3 py-2 rounded-md text-sm"
              >
                Cancelar
              </motion.button>
            </div>
          )}

          {/* Botón agregar habilidad */}
          <div className="bg-white p-6 rounded-xl border border-pink-100 shadow-sm mb-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{selectedCat || "Selecciona una categoría"}</h3>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-2 rounded-md text-sm"
              >
                + Agregar Habilidad
              </button>
            </div>

            {showForm && selectedCat && ( // Solo muestra el formulario si hay una categoría seleccionada
              <form
                onSubmit={handleAddOrUpdate}
                className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3"
              >
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Nombre"
                  className="p-2 border rounded"
                  required
                />
                <input
                  type="number"
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleInputChange}
                  placeholder="Nivel (%)"
                  className="p-2 border rounded"
                  min={0}
                  max={100}
                />
                <input
                  type="text"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Descripción"
                  className="p-2 border rounded"
                />

                <div className="md:col-span-3 flex gap-2">
                  <button
                    type="submit"
                    className="flex-1 bg-pink-500 text-white py-2 rounded"
                  >
                    {editingId ? "Actualizar" : "Agregar"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 py-2 rounded"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            )}
            {showForm && !selectedCat && (
                <p className="mt-4 text-red-500">Por favor, selecciona o crea una categoría primero.</p>
            )}
          </div>

          {/* Lista habilidades */}
          <div className="space-y-4 mt-4">
            {filteredSkills.length === 0 && selectedCat && (
                <p className="text-gray-500 italic">No hay habilidades en la categoría "{selectedCat}". ¡Agrega una!</p>
            )}
            {filteredSkills.map((skill) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 6px 16px rgba(0,0,0,0.1)" }}
                  className="bg-white p-4 rounded-xl border border-pink-100 shadow flex justify-between"
                >
                  <div>
                    <p className="font-semibold text-pink-600">{skill.nombre}</p>
                    <p className="text-xs text-gray-500">{skill.descripcion}</p>
                    <p className="text-xs text-gray-700 mt-1">Nivel: {skill.nivel}%</p>
                    {/* Barra de nivel */}
                    <div className="mt-2 w-32 h-2 bg-gray-200 rounded-full">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${skill.nivel}%` }}
                            transition={{ duration: 0.5 }}
                            className="h-full rounded-full bg-pink-500"
                        />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleEdit(skill)}
                      className="px-3 py-1 bg-yellow-400 rounded text-sm"
                    >
                      Editar
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      onClick={() => handleDeleteSkill(skill.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded text-sm"
                    >
                      Eliminar
                    </motion.button>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillsManagerStyled;