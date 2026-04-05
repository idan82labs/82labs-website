import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import fintechImg from "@assets/Finance_1755018204858.png";
import manufacturingImg from "@assets/Manufacturing_1755018201891.png";
import saasImg from "@assets/SaaS_1755018201889.png";
import digitalHealthImg from "@assets/Digital Health_1755018201890.png";

const industries = [
  { id: "fintech", image: fintechImg },
  { id: "manufacturing", image: manufacturingImg },
  { id: "saas", image: saasImg },
  { id: "digitalHealth", image: digitalHealthImg },
];

export default function Industries() {
  const { t } = useTranslation();

  return (
    <section id="industries" className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-5 font-display tracking-tight">
            {t("industries.sectionTitle")}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
            {t("industries.sectionSubtitle")}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {industries.map((industry, index) => (
            <motion.div
              key={industry.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <div className="group relative h-80 rounded-2xl overflow-hidden cursor-default shadow-sm hover:shadow-xl transition-shadow duration-500">
                <img
                  src={industry.image}
                  alt={t(`industries.${industry.id}.title`)}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5 transition-all duration-500 group-hover:from-black/90" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: "linear-gradient(135deg, rgba(15,40,68,0.2), transparent)" }} />

                <div className="absolute bottom-0 start-0 end-0 p-7 md:p-9">
                  <h3 className="text-2xl font-bold text-white mb-2 font-display">
                    {t(`industries.${industry.id}.title`)}
                  </h3>
                  <p className="text-sm text-white/75 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 leading-relaxed">
                    {t(`industries.${industry.id}.description`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
