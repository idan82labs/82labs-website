import { forwardRef, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { Webhook, Database, MessageSquare, Brain, Rocket, Bell, FileText } from "lucide-react";

interface HeroProps {
  onContactClick: () => void;
}

export default function Hero({ onContactClick }: HeroProps) {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "he";
  const vizRef = useRef<HTMLDivElement>(null);
  const [vizActive, setVizActive] = useState(true);

  // Pause the infinite decision-loop animations when the hero viz scrolls off-screen.
  useEffect(() => {
    if (!vizRef.current) return;
    const io = new IntersectionObserver(
      ([entry]) => setVizActive(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(vizRef.current);
    return () => io.disconnect();
  }, []);


  const scrollToWork = () => {
    const el = document.getElementById("case-studies");
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: "smooth" });
    }
  };

  return (
    <section
      className="hero-section relative pt-32 pb-24 md:pt-44 md:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0a1628 0%, #0f2844 40%, #132d4f 70%, #0d2240 100%)" }}
    >
      {/* Gradient orbs — CSS-only, contained to avoid paint storms */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true" style={{ contain: "strict" }}>
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />
      </div>

      {/* Grid pattern — low cost */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="hero-fade-in hero-fade-in-1 inline-block mb-6">
          <span className="glow-pill">
            {t("hero.badge", "AI-Powered Solutions for Modern Business")}
          </span>
        </div>

        <h1 className="hero-fade-in hero-fade-in-2 text-4xl md:text-6xl lg:text-[5rem] font-extrabold text-white mb-6 font-display leading-[1.05] tracking-[-0.02em]">
          {t("hero.title1")}
          <br />
          <span className="hero-gradient-text" style={{ color: "#7db8e0" }}>
            {t("hero.title2")}
          </span>
        </h1>

        <p
          className="hero-fade-in hero-fade-in-3 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed"
          style={{ color: "#94a3b8" }}
        >
          {t("hero.subtitle")}
        </p>

        <div className="hero-fade-in hero-fade-in-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onContactClick}
            className="glow-cta text-base px-8 py-4 bg-white text-gray-900 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:-translate-y-0.5"
          >
            {t("hero.cta")}
          </Button>
          <Button
            onClick={scrollToWork}
            variant="outline"
            className="text-base px-8 py-4 bg-transparent text-white rounded-lg transition-all duration-300 hover:-translate-y-0.5"
            style={{ borderColor: "rgba(255,255,255,0.2)" }}
          >
            {t("hero.ctaSecondary")}
          </Button>
        </div>

        <p
          className="hero-fade-in hero-fade-in-5 mt-10 text-[13px] md:text-sm tracking-wide max-w-3xl mx-auto leading-relaxed"
          style={{ color: "#7c99b8" }}
        >
          {t("hero.proof")}
        </p>
      </div>

      {/* Signature workflow visualization — CSS-only */}
      <div
        ref={vizRef}
        className={`hero-fade-in hero-fade-in-6 hero-viz relative z-10 mt-10 md:mt-20 max-w-4xl mx-auto pointer-events-none${vizActive ? "" : " hero-viz-paused"}`}
        aria-hidden="true"
      >
        {/* MOBILE: compact hub-and-spoke */}
        <MobileBeamFlow />

        {/* DESKTOP: full hub-and-spoke */}
        <DesktopFlow />
      </div>
    </section>
  );
}

/* ── Shared flow node ── */

const FlowNode = forwardRef<HTMLDivElement, {
  icon: React.ElementType;
  label: string;
  size?: "sm" | "lg";
  color?: string;
}>(({ icon: Icon, label, size = "sm", color = "#5bc0eb" }, ref) => {
  const s = size === "lg" ? 56 : 40;
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        ref={ref}
        className="rounded-xl flex items-center justify-center"
        style={{
          width: s,
          height: s,
          background: `rgba(91, 192, 235, ${size === "lg" ? 0.08 : 0.05})`,
          border: `1px solid ${color}30`,
          boxShadow: size === "lg"
            ? `0 0 24px ${color}25, 0 0 48px ${color}10`
            : `0 0 16px ${color}15`,
        }}
      >
        <Icon size={size === "lg" ? 26 : 18} strokeWidth={1.5} style={{ color }} />
      </div>
      <span className="text-[10px] tracking-wide font-medium" style={{ color: "#6a93b8" }}>{label}</span>
    </div>
  );
});
FlowNode.displayName = "FlowNode";

/* ── Mobile: orbiting circles around central Brain ── */

const OrbitNode = ({ icon: Icon, color = "#5bc0eb", size = 34 }: { icon: React.ElementType; color?: string; size?: number }) => (
  <div
    className="flex items-center justify-center rounded-xl"
    style={{
      width: size,
      height: size,
      background: `rgba(91, 192, 235, 0.06)`,
      border: `1px solid ${color}25`,
      boxShadow: `0 0 12px ${color}20`,
    }}
  >
    <Icon size={size * 0.45} strokeWidth={1.5} style={{ color }} />
  </div>
);

function MobileBeamFlow() {
  return (
    <div className="md:hidden">
      <div className="relative flex items-center justify-center mx-auto" style={{ height: 280, maxWidth: 340 }}>
        {/* Central brain with breathing glow */}
        <div className="relative z-10">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              boxShadow: "0 0 40px rgba(91, 192, 235, 0.25), 0 0 80px rgba(91, 192, 235, 0.1)",
              animation: "brain-breathe 3s ease-in-out infinite",
            }}
          />
          <div
            className="relative flex items-center justify-center rounded-2xl"
            style={{
              width: 52,
              height: 52,
              background: "rgba(147, 197, 232, 0.1)",
              border: "1.5px solid rgba(147, 197, 232, 0.3)",
            }}
          >
            <Brain size={26} strokeWidth={1.5} style={{ color: "#93c5e8" }} />
          </div>
        </div>

        {/* Inner orbit — inputs (clockwise, faster beam) */}
        <OrbitingCircles radius={75} duration={28} iconSize={34} path beamSpeed={3}>
          <OrbitNode icon={Webhook} />
          <OrbitNode icon={Database} />
          <OrbitNode icon={MessageSquare} />
        </OrbitingCircles>

        {/* Outer orbit — outputs (counter-clockwise, slower beam for depth) */}
        <OrbitingCircles radius={120} duration={22} iconSize={30} reverse path beamSpeed={4.5}>
          <OrbitNode icon={Rocket} color="#7db8e0" size={30} />
          <OrbitNode icon={Bell} color="#7db8e0" size={30} />
          <OrbitNode icon={FileText} color="#7db8e0" size={30} />
        </OrbitingCircles>
      </div>
    </div>
  );
}

/* ── Desktop hub-and-spoke ── */

function DesktopFlow() {
  const containerRef = useRef<HTMLDivElement>(null);
  // Left inputs
  const webhookRef = useRef<HTMLDivElement>(null);
  const dbRef = useRef<HTMLDivElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  // Center
  const brainRef = useRef<HTMLDivElement>(null);
  // Right outputs
  const deployRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const reportRef = useRef<HTMLDivElement>(null);

  return (
    <div className="hidden md:block">
      <div
        ref={containerRef}
        className="relative mx-auto max-w-3xl"
        style={{ height: 200 }}
      >
        {/* Left column — inputs */}
        <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center justify-between py-2" style={{ width: 100 }}>
          <FlowNode ref={webhookRef} icon={Webhook} label="Webhooks" />
          <FlowNode ref={dbRef} icon={Database} label="Data" />
          <FlowNode ref={chatRef} icon={MessageSquare} label="Requests" />
        </div>

        {/* Center — brain */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <FlowNode ref={brainRef} icon={Brain} label="Reason" size="lg" color="#93c5e8" />
        </div>

        {/* Right column — outputs */}
        <div className="absolute right-0 top-0 bottom-0 flex flex-col items-center justify-between py-2" style={{ width: 100 }}>
          <FlowNode ref={deployRef} icon={Rocket} label="Deploy" />
          <FlowNode ref={alertRef} icon={Bell} label="Alerts" />
          <FlowNode ref={reportRef} icon={FileText} label="Reports" />
        </div>

        {/* Beams: inputs → brain (curved inward) */}
        <AnimatedBeam containerRef={containerRef} fromRef={webhookRef} toRef={brainRef} curvature={-60} pathColor="#5bc0eb" pathOpacity={0.12} pathWidth={1.5} gradientStartColor="#5bc0eb" gradientStopColor="#93c5e8" duration={4} delay={0} />
        <AnimatedBeam containerRef={containerRef} fromRef={dbRef} toRef={brainRef} curvature={0} pathColor="#5bc0eb" pathOpacity={0.12} pathWidth={1.5} gradientStartColor="#5bc0eb" gradientStopColor="#93c5e8" duration={4} delay={0.8} />
        <AnimatedBeam containerRef={containerRef} fromRef={chatRef} toRef={brainRef} curvature={60} pathColor="#5bc0eb" pathOpacity={0.12} pathWidth={1.5} gradientStartColor="#5bc0eb" gradientStopColor="#93c5e8" duration={4} delay={1.6} />

        {/* Beams: brain → outputs (curved outward) */}
        <AnimatedBeam containerRef={containerRef} fromRef={brainRef} toRef={deployRef} curvature={-60} pathColor="#93c5e8" pathOpacity={0.12} pathWidth={1.5} gradientStartColor="#93c5e8" gradientStopColor="#5bc0eb" duration={4} delay={2.4} />
        <AnimatedBeam containerRef={containerRef} fromRef={brainRef} toRef={alertRef} curvature={0} pathColor="#93c5e8" pathOpacity={0.12} pathWidth={1.5} gradientStartColor="#93c5e8" gradientStopColor="#5bc0eb" duration={4} delay={3.2} />
        <AnimatedBeam containerRef={containerRef} fromRef={brainRef} toRef={reportRef} curvature={60} pathColor="#93c5e8" pathOpacity={0.12} pathWidth={1.5} gradientStartColor="#93c5e8" gradientStopColor="#5bc0eb" duration={4} delay={4} />
      </div>
    </div>
  );
}
