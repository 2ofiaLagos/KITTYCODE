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
      <div className="relative py-16 sm:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8bbd0] via-[#fdecef] to-[#fce4ec]" />

        {[...Array(8)].map((_, i) => (
          <motion.span
            key={i}
            variants={floatingPaws}
            animate="animate"
            className="absolute text-pink-400 opacity-40 pointer-events-none hidden sm:block"
            style={{
              fontSize: i % 2 === 0 ? "26px" : "42px",
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
          <p className="uppercase tracking-[0.35em] text-[#ad1457] mb-4 sm:mb-6 text-xs sm:text-sm">
            Lanzamiento Oficial
          </p>

          <h2
            className="text-2xl sm:text-4xl md:text-5xl font-semibold text-[#880e4f] mb-4 sm:mb-6"
            style={{ fontFamily: "Playfair Display" }}
          >
            Kitty Code llega para transformar ideas en experiencias digitales
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-pink-800 leading-relaxed">
            Creatividad, innovación y diseño pensados para marcas con
            personalidad.
          </p>
        </motion.div>
      </div>

      {/* 🌸 BANNER */}
      <div
        className="relative min-h-[70vh] md:min-h-[80vh] flex items-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bannerImg})`,
          backgroundSize: "cover",
          backgroundPosition: "top center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(
                to bottom,
                rgba(253,236,239,0.95) 0%,
                rgba(253,236,239,0.85) 50%,
                rgba(253,236,239,0.4) 75%,
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
              className="text-4xl sm:text-5xl md:text-7xl xl:text-9xl font-extrabold mb-4 sm:mb-6 text-[#d81b60]"
              style={{ fontFamily: "Playfair Display" }}
            >
              Kitty Code
            </h1>

            <p className="text-lg sm:text-xl md:text-3xl text-pink-900 mb-6 sm:mb-10">
              Diseño, tecnología y creatividad <br className="hidden sm:block" />
              convertidos en experiencias web memorables.
            </p>

            <motion.a
              href="#propuesta"
              whileHover={{ scale: 1.06 }}
              className="inline-block bg-[#f8bbd0] text-[#880e4f]
              px-6 sm:px-8 py-3 sm:py-4
              rounded-full text-sm sm:text-lg font-semibold
              shadow-lg hover:bg-[#ec407a] hover:text-white transition"
            >
              Conoce al equipo que hará realidad tu idea
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* 💖 PROPUESTA */}
      <div id="propuesta" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-4 gap-8 items-center">
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                title: "¿Quiénes somos?",
                text: "Somos KittyCode, un equipo creativo apasionado por el diseño, innovación y tecnología.",
              },
              {
                title: "¿Qué ofrecemos?",
                text: "Soluciones digitales personalizadas basadas en tus ideas y objetivos.",
              },
              {
                title: "¿Por qué elegirnos?",
                text: "Creamos presencia digital con impacto y personalidad.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -6, scale: 1.03 }}
                className="bg-gradient-to-br from-pink-50 to-pink-100 p-6 sm:p-8 rounded-2xl shadow-md"
              >
                <h3 className="text-lg sm:text-xl font-bold text-[#d81b60] mb-3">
                  {item.title}
                </h3>
                <p className="text-pink-700 text-sm sm:text-base">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.img
            src={widgetImg}
            alt="KittyCode Team"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
            className="rounded-2xl shadow-lg max-w-[220px] sm:max-w-xs mx-auto"
          />
        </div>
      </div>

      {/* 💗 SERVICIOS */}
      <div id="servicios" className="py-20 sm:py-28 bg-[#fdecef]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                icon: "😺",
                title: "Desarrollo Web",
                text: "Sitios modernos, rápidos y optimizados.",
              },
              {
                icon: "🐾",
                title: "Diseño UI/UX",
                text: "Diseños estéticos centrados en el usuario.",
              },
              {
                icon: "✨",
                title: "Proyectos a Medida",
                text: "Soluciones hechas especialmente para ti.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -8 }}
                className="bg-white p-6 sm:p-10 rounded-3xl shadow-md"
              >
                <div className="text-3xl sm:text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-[#d81b60] mb-3">
                  {item.title}
                </h3>
                <p className="text-pink-700 text-sm sm:text-base">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center mt-20">
            <Link
              to="/contacto"
              className="bg-gradient-to-r from-pink-400 to-rose-400 text-white
              px-8 sm:px-14 py-4 sm:py-6 rounded-full
              text-base sm:text-xl font-semibold shadow-lg transition"
            >
              ✨ Hagamos realidad tu idea ✨
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KittyCodeSection;
