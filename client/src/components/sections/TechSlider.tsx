import { useTranslation } from "react-i18next";

const techStack = [
  "n8n",
  "Cohere",
  "LangChain",
  "LangGraph",
  "React",
  "Python",
  "Node.js",
  "TypeScript",
  "FastAPI",
  "Vite",
  "Docker",
  "PostgreSQL",
  "Redis",
  "Pinecone",
  "Qdrant",
  "Vercel",
  "Tailwind",
  "Next.js",
  "AWS",
  "OpenAI",
];

export default function TechSlider() {
  const { t } = useTranslation();

  return (
    <section style={{ background: "linear-gradient(180deg, #0c1e36 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <p className="text-center text-xs font-medium uppercase tracking-[0.25em] mb-10 text-gray-400">
          {t("techSlider.label", "Our stack")}
        </p>
        <div className="overflow-hidden">
          <div className="tech-track">
            {[...Array(2)].map((_, repeatIndex) =>
              techStack.map((tech, index) => (
                <div
                  key={`${repeatIndex}-${index}`}
                  className="tech-pill"
                >
                  {tech}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
