import StackIcon from "tech-stack-icons";
import { useTranslation } from "react-i18next";
import fastapiIcon from "@assets/fastapi_icon_1755627989650.png";
import viteIcon from "@assets/vite_icon_1755627981796.png";
import pineconeIcon from "@assets/pinecone_icon_1755627987215.png";
import qdrantIcon from "@assets/qdrant_icon_1755627984818.png";

const techStack = [
  { type: "stack" as const, name: "n8n", label: "n8n" },
  { type: "stack" as const, name: "cohere", label: "Cohere" },
  { type: "stack" as const, name: "langchain", label: "LangChain" },
  { type: "stack" as const, name: "langgraph", label: "LangGraph" },
  { type: "stack" as const, name: "react", label: "React" },
  { type: "stack" as const, name: "python", label: "Python" },
  { type: "stack" as const, name: "nodejs", label: "Node.js" },
  { type: "stack" as const, name: "typescript", label: "TypeScript" },
  { type: "png" as const, src: fastapiIcon, alt: "FastAPI", label: "FastAPI" },
  { type: "png" as const, src: viteIcon, alt: "Vite", label: "Vite" },
  { type: "stack" as const, name: "docker", label: "Docker" },
  { type: "stack" as const, name: "postgresql", label: "PostgreSQL" },
  { type: "stack" as const, name: "redis", label: "Redis" },
  { type: "png" as const, src: pineconeIcon, alt: "Pinecone", label: "Pinecone" },
  { type: "png" as const, src: qdrantIcon, alt: "Qdrant", label: "Qdrant" },
  { type: "stack" as const, name: "vercel", label: "Vercel" },
  { type: "stack" as const, name: "tailwindcss", label: "Tailwind" },
  { type: "stack" as const, name: "nextjs", label: "Next.js" },
  { type: "stack" as const, name: "aws", label: "AWS" },
  { type: "stack" as const, name: "openai", label: "OpenAI" },
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
                <div key={`${repeatIndex}-${index}`} className="tech-item">
                  {tech.type === "stack" ? (
                    <StackIcon name={tech.name} className="w-8 h-8" />
                  ) : (
                    <img src={tech.src} alt={tech.alt} className="w-8 h-8" />
                  )}
                  <span>{tech.label}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
