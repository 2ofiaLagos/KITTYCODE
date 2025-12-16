import { useState } from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaHeart,
  FaPaperPlane,
  FaUsers,
  FaSyncAlt,
  FaLightbulb,
} from "react-icons/fa"; // Se añaden iconos nuevos

import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase"; // ajusta la ruta si es necesario

// ======================================================================
// 📌 NUEVO COMPONENTE: Carrusel de Metodología
// ======================================================================

const MethodologyCarousel = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: "b2c",
      icon: <FaUsers className="text-4xl text-pink-600 mb-4" />,
      title: "Enfoque B2C (Directo al Corazón)",
      content:
        "Nos centramos en la experiencia del usuario final. Diseñamos con la emoción y la funcionalidad en mente para que tu marca no solo se vea bien, sino que conecte profundamente con tu audiencia. El objetivo es convertir visitantes en clientes fieles.",
      contact: "Comunícate con nuestro equipo de Estrategia y Diseño.",
    },
    {
      id: "iteraciones",
      icon: <FaSyncAlt className="text-4xl text-pink-600 mb-4" />,
      title: "Iteraciones Constantes y Agilidad",
      content:
        "Trabajamos con metodologías ágiles. Esto significa que entregamos funcionalidades en ciclos cortos, permitiendo ajustes rápidos y garantizando que el producto final esté perfectamente alineado con tus expectativas y las necesidades cambiantes del mercado.",
      contact: "Comunícate con el equipo de Desarrollo Frontend y Backend.",
    },
    {
      id: "estrategia",
      icon: <FaLightbulb className="text-4xl text-pink-600 mb-4" />,
      title: "Estrategia e Innovación Digital",
      content:
        "Antes de escribir una línea de código, definimos el 'por qué'. Alineamos tus metas de negocio con soluciones tecnológicas innovadoras. Desde SEO hasta arquitectura de datos, aseguramos una base sólida para el crecimiento futuro.",
      contact: "Comunícate con la Gerencia de Proyectos y el Área de Data.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-12">
          ✨ Nuestra Metodología Kitty Code ✨
        </h2>

        {/* 1. Botones de Navegación del Carrusel */}
        <div className="flex justify-center space-x-4 mb-8">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`
                px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-md
                ${
                  activeStep === index
                    ? "bg-pink-500 text-white shadow-lg transform scale-105"
                    : "bg-pink-100 text-pink-600 hover:bg-pink-200"
                }
              `}
            >
              {step.title}
            </button>
          ))}
        </div>

        {/* 2. Contenido Activo (Tarjeta) */}
        <div className="p-8 bg-pink-50 rounded-3xl border-2 border-pink-300 shadow-xl min-h-[300px] flex flex-col justify-between">
          <div className="text-center">
            {steps[activeStep].icon}
            <h3 className="text-2xl font-bold text-pink-800 mb-4">
              {steps[activeStep].title}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {steps[activeStep].content}
            </p>
          </div>

          {/* Sección de Contacto Específico */}
          <div className="mt-8 pt-4 border-t border-pink-300/50 text-center">
            <p className="font-bold text-pink-600">
              ¿Quieres saber más?
            </p>
            <p className="text-sm text-pink-700 mt-1 italic">
              {steps[activeStep].contact}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ======================================================================
// 📌 COMPONENTE CONTACTO ORIGINAL
// ======================================================================

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // VALIDACIÓN
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio 💕";
    
    // RegEx mejorado y más robusto
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email))
      newErrors.email = "El correo no es válido 💌";

    if (!formData.projectType) newErrors.projectType = "Selecciona un proyecto 🌸";
    if (!formData.message.trim()) newErrors.message = "Escribe un mensaje ✏️";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // CAMBIO DE INPUTS
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // ENVÍO A FIREBASE
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData, // Usamos spread para enviar todos los datos validados
        createdAt: serverTimestamp(),
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error("Error al enviar mensaje:", error);
      alert("Ocurrió un error 😢 Intenta nuevamente");
    }

    setIsSubmitting(false);
  };

  // MENSAJE DE ÉXITO
  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 text-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100">
          <div className="text-6xl mb-4">🎀</div>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            ¡Gracias por tu mensaje!
          </h2>
          <p className="text-gray-600 mb-6">
            Te responderemos pronto con mucho cariño 💖
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
          >
            Enviar otro 💌
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* ENCABEZADO */}
      <section className="bg-pink-300 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">💌 Contáctanos</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Cuéntanos tu idea y hagámosla realidad con un toque de magia ✨
        </p>
      </section>

      {/* CONTENIDO CONTACTO */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 mt-12">
        {/* INFO */}
        <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-100">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center">
            🌷 Información
          </h2>

          <ul className="space-y-3 text-gray-700">
            <li>📧 hola@kittycode.dev</li>
            <li>💖 proyectos@kittycode.dev</li>
            <li>🐾 contacto@kittycode.dev</li>
          </ul>

          <div className="mt-8 border-t border-pink-200 pt-4">
            <p className="font-semibold text-pink-600 mb-3">Síguenos:</p>
            <div className="flex gap-4 text-2xl text-pink-500">
              <FaInstagram />
              <FaTiktok />
              <FaYoutube />
              <FaGithub />
              <FaLinkedin />
              <FaEnvelope />
            </div>
          </div>

          <div className="mt-10 text-center text-pink-500">
            <FaHeart className="inline mr-1" />
            Hecho con amor por <span className="font-semibold">Kitty Code</span>
          </div>
        </div>

        {/* FORMULARIO */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-pink-100">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center">
            💬 Envíanos un mensaje
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* NOMBRE */}
            <input
              type="text"
              name="name"
              placeholder="Nombre completo"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${errors.name ? 'border-red-500' : 'border-gray-300 focus:border-pink-400'}`}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            {/* EMAIL */}
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300 focus:border-pink-400'}`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}

            {/* PROYECTO */}
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg appearance-none ${formData.projectType ? 'text-gray-800' : 'text-gray-400'} ${errors.projectType ? 'border-red-500' : 'border-gray-300 focus:border-pink-400'}`}
            >
              <option value="" disabled className="text-gray-400">Selecciona un proyecto</option>
              <option value="web">🌐 Sitio Web</option>
              <option value="app">📱 Aplicación</option>
              <option value="design">🎨 Diseño</option>
              <option value="other">✨ Otro</option>
            </select>
            {errors.projectType && (
                <p className="text-red-500 text-sm">{errors.projectType}</p>
            )}

            {/* MENSAJE */}
            <textarea
              name="message"
              rows="5"
              placeholder="Escribe tu mensaje..."
              value={formData.message}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg resize-none ${errors.message ? 'border-red-500' : 'border-gray-300 focus:border-pink-400'}`}
            ></textarea>
            {errors.message && (
                <p className="text-red-500 text-sm">{errors.message}</p>
            )}

            {/* BOTÓN */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center gap-2 py-4 rounded-lg font-semibold text-white bg-gradient-to-r from-pink-400 to-rose-400 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaPaperPlane />
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* 🎁 NUEVA SECCIÓN DE METODOLOGÍA */}
      {/* ---------------------------------------------------- */}
      <MethodologyCarousel />
    </div>
  );
};

export default Contact;