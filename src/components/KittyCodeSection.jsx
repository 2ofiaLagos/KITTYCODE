import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import bannerImg from "../assets/kitty-banner.png";
import widgetImg from "../assets/kitylovers.png.jpeg";

const floatingPaws = {
  animate: {
    y: [0, -20, 0],
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const KittyCodeSection = () => {
  return (
    <section
      id="kitty-code"
      className="bg-[#fdecef] overflow-hidden font-[Poppins]"
    >
      {/* ✨ CAMPAÑA / LANZAMIENTO */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8bbd0] via-[#fdecef] to-[#fce4ec]" />

        {/* 🐾 Huellitas flotantes laterales */}
        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            variants={floatingPaws}
            animate="animate"
            className="absolute text-pink-400 opacity-40 pointer-events-none"
            style={{
              fontSize: i % 2 === 0 ? "26px" : "42px",
              // 🐞 CORRECCIÓN: Uso de template literal (comillas inversas) para inyectar variables JS en CSS
              top: `${8 + i * 10}%`, 
              left: i % 2 === 0 ? "5%" : "92%",
            }}
          >
            🐾
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        >
          <p className="uppercase tracking-[0.35em] text-[#ad1457] mb-6">
            Lanzamiento Oficial
          </p>

          <h2
            className="text-4xl md:text-5xl font-semibold text-[#880e4f] mb-6"
            style={{ fontFamily: "Playfair Display" }}
          >
            Kitty Code llega para transformar ideas en experiencias digitales
          </h2>

          <p className="text-lg md:text-xl text-pink-800 leading-relaxed">
            Creatividad, innovación y diseño pensados para marcas con
            personalidad.
          </p>
        </motion.div>
      </div>

      {/* 🌸 BANNER */}
      <div
        className="relative min-h-[80vh] flex items-center bg-no-repeat"
        style={{
          // 🐞 CORRECCIÓN: Uso de template literal (comillas inversas) para inyectar la URL de la imagen
          backgroundImage: `url(${bannerImg})`, 
          backgroundSize: "contain",
          backgroundPosition: "right center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to right,
                rgba(253,236,239,0.95) 0%,
                rgba(253,236,239,0.8) 35%,
                rgba(253,236,239,0.5) 55%,
                rgba(253,236,239,0.15) 70%,
                rgba(253,236,239,0) 100%
              )
            `,
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="max-w-2xl"
          >
            <h1
              className="text-6xl md:text-7xl xl:text-9xl font-extrabold mb-6 text-[#d81b60]"
              style={{ fontFamily: "Playfair Display" }}
            >
              Kitty Code
            </h1>

            <p className="text-2xl md:text-3xl text-pink-900 mb-10">
              Diseño, tecnología y creatividad <br />
              convertidos en experiencias web memorables.
            </p>

            <motion.a
              href="#propuesta"
              whileHover={{ scale: 1.06 }}
              className="inline-block bg-[#f8bbd0] text-[#880e4f]
              px-8 py-4 rounded-full text-lg font-semibold
              shadow-lg hover:bg-[#ec407a] hover:text-white transition"
            >
              Conoce al equipo que hará realidad tu idea
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* ✨ Línea brillante */}
      <div className="w-full h-[3px] bg-gradient-to-r from-transparent via-[#ec407a] to-transparent shadow-[0_0_25px_rgba(236,64,122,0.8)]" />

      {/* 🌸 ESPACIO EN BLANCO ENTRE BANNER Y PROPUESTA */}
      <div className="h-16 bg-white"></div>

      {/* 💖 TEXTO PROPUESTA DE VALOR */}
      <div className="relative py-12 px-6 text-center overflow-hidden mt-20">
        {/* Fondo difuminado tipo nubecita */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
          <div
            className="
              w-[85%] max-w-4xl h-full
              bg-gradient-to-br from-pink-50 via-[#fdecef] to-pink-100
              rounded-[40px]
              blur-[1px]
              shadow-[0_15px_40px_rgba(236,64,122,0.25)]
            "
          />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-3xl md:text-3xl font-bold text-[#d81b60] mb-3"
            style={{ fontFamily: "Playfair Display" }}
          >
            Nuestra propuesta de valor ✨
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="mx-auto text-base md:text-lg text-pink-800 leading-relaxed px-4"
          >
            Diseñamos experiencias digitales que conectan emocionalmente 💕,
            reflejan la esencia de tu marca 🐾 y la elevan con creatividad,
            estrategia e innovación ✨.
          </motion.p>
        </div>

        {/* Degradado inferior para transición hacia tarjetas */}
        <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      </div>

      {/* 💎 TARJETAS + WIDGET */}
      <div id="propuesta" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "¿Quiénes somos?",
                text: "Somos KittyCode, un equipo creativo apasionado por el diseño, creatividad, innovación y la tecnología. Buscando crear páginas con dediacion, esfuerzo y personalidad.",
              },
              {
                title: "¿Qué ofrecemos?",
                text: "Soluciones digitales personalizadas, basadas en tus ideas, y lo que quieres lograr para crear una identidad propia.Conectamos con tus sueños, metas y proyectos a futuro para darte la experiencia completa",
              },
              {
                title: "¿Por qué elegirnos?",
                text: "Nos adaptamos a tu visión y la convertimos en realidad, no solo creamos una página creamos una presencia digital que tenga un impacto y se diferencie de las demás. ",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8, scale: 1.04 }}
                className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl shadow-md hover:shadow-pink-300/50"
              >
                <h3
                  className="text-xl font-bold text-[#d81b60] mb-3"
                  style={{ fontFamily: "Playfair Display" }}
                >
                  {item.title}
                </h3>
                <p className="text-pink-700 text-sm md:text-base">{item.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.img
            src={widgetImg}
            alt="KittyCode Team"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="rounded-2xl shadow-lg max-w-xs mx-auto"
          />
        </div>
      </div>

      {/* 💗 SERVICIOS */}
      <div id="servicios" className="py-28 bg-[#fdecef]">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-[#d81b60] mb-6">
              ¿Qué hacemos?
            </h2>
            <p className="text-lg lg:text-xl text-pink-700 max-w-3xl mx-auto">
              Nos adaptamos a tus ideas, transformamos conceptos en realidades
              digitales y damos identidad a cada marca con creatividad e innovación.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "😺",
                title: "Desarrollo Web",
                text: "Sitios modernos, rápidos y optimizados para destacar en el mercado,creando la identidad y escencia de tu marca.",
              },
              {
                icon: "🐾",
                title: "Diseño UI/UX",
                text: "Diseños intuitivos, estéticos y centrados en el usuario y al publico que quiere captar.",
              },
              {
                icon: "✨",
                title: "Proyectos a Medida",
                text: "Soluciones creadas exclusivamente según tus necesidades, tus gustos y preferencias.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 180 }}
                className="bg-white p-10 rounded-3xl shadow-md hover:shadow-xl"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-[#d81b60] mb-3">
                  {item.title}
                </h3>
                <p className="text-pink-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
          {/* 🌟 BOTÓN CON LLUVIA DE BRILLOS Y HUELLITAS */}
          <div className="relative flex justify-center mt-28">
            {/* Huellitas flotantes a los lados */}
            {[...Array(6)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -15, 0], opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                className="absolute text-pink-400 pointer-events-none"
                style={{
                  fontSize: "28px",
                  // 🐞 CORRECCIÓN: Uso de template literal
                  top: `${10 + i * 3}px`, 
                  left: i % 2 === 0 ? "-40px" : "calc(100% + 10px)",
                }}
              >
                🐾
              </motion.span>
            ))}

            {/* Lluvia de brillos */}
            {[...Array(15)].map((_, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -20, 0], x: [0, Math.random() * 30 - 15, 0], opacity: [0, 1, 0] }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
                className="absolute text-yellow-300 pointer-events-none"
                style={{
                  // 🐞 CORRECCIÓN: Uso de template literal
                  fontSize: `${Math.random() * 8 + 8}px`, 
                  top: `${Math.random() * 60}%`,
                  left: `${Math.random() * 100}%`,
                }}
              >
                ✨
              </motion.span>
            ))}

            {/* Botón con resplandor */}
            <motion.div
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
              className="relative inline-block"
            >
              {/* Aura brillante animada */}
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 15px rgba(236,64,122,0.5)",
                    "0 0 35px rgba(244,143,177,0.7)",
                    "0 0 15px rgba(236,64,122,0.5)",
                  ],
                }}
                transition={{ repeat: Infinity, duration: 2.5 }}
                className="absolute inset-0 rounded-full"
              />

              {/* Botón principal */}
              <Link
                to="/contacto"
                className="relative inline-block bg-gradient-to-r from-pink-400 to-rose-400 text-white
                px-14 py-6 rounded-full text-xl font-semibold
                hover:from-rose-500 hover:to-pink-500 hover:scale-110 transition-all z-10"
              >
                ✨ Hagamos realidad tu idea ✨
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KittyCodeSection;