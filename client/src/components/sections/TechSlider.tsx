import { useTranslation } from "react-i18next";

type Tech = { name: string; slug: string };

const techStack: Tech[] = [
  { name: "Claude", slug: "anthropic" },
  { name: "OpenAI", slug: "openai" },
  { name: "LangChain", slug: "langchain" },
  { name: "LangGraph", slug: "langchain" },
  { name: "Python", slug: "python" },
  { name: "FastAPI", slug: "fastapi" },
  { name: "Node.js", slug: "nodedotjs" },
  { name: "TypeScript", slug: "typescript" },
  { name: "React", slug: "react" },
  { name: "Next.js", slug: "nextdotjs" },
  { name: "PostgreSQL", slug: "postgresql" },
  { name: "Redis", slug: "redis" },
  { name: "Pinecone", slug: "pinecone" },
  { name: "Qdrant", slug: "qdrant" },
  { name: "Docker", slug: "docker" },
  { name: "AWS", slug: "amazonwebservices" },
  { name: "Vercel", slug: "vercel" },
  { name: "Tailwind", slug: "tailwindcss" },
  { name: "Vite", slug: "vite" },
  { name: "n8n", slug: "n8n" },
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
                <div key={`${repeatIndex}-${index}`} className="tech-pill">
                  <img
                    src={`https://cdn.simpleicons.org/${tech.slug}/0f2844`}
                    alt=""
                    width={16}
                    height={16}
                    loading="lazy"
                    decoding="async"
                    className="w-4 h-4 opacity-65 flex-shrink-0"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span>{tech.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
