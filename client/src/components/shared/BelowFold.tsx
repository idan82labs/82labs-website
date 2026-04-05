import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Footer from "@/components/layout/Footer";
import TrustedBy from "@/components/sections/TrustedBy";
import Scale from "@/components/sections/Scale";
import Testimonial from "@/components/sections/Testimonial";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import CaseStudies from "@/components/sections/CaseStudies";
import ClosingCTA from "@/components/sections/ClosingCTA";

const TechSlider = lazy(() => import("@/components/sections/TechSlider"));

interface BelowFoldProps {
  onContactClick: () => void;
  onServiceClick: (id: string) => void;
  onPrivacyClick: () => void;
}

export default function BelowFold({ onContactClick, onServiceClick, onPrivacyClick }: BelowFoldProps) {
  return (
    <MotionConfig reducedMotion="user">
      <TrustedBy />
      <Scale />
      <Testimonial />
      <Services onServiceClick={onServiceClick} />
      <Suspense fallback={<div className="h-40 bg-white" />}>
        <TechSlider />
      </Suspense>
      <Process />
      <CaseStudies />
      <WhyUs />
      <Industries />
      <ClosingCTA onContactClick={onContactClick} />
      <Footer onPrivacyClick={onPrivacyClick} onContactClick={onContactClick} />
      <SpeedInsights />
    </MotionConfig>
  );
}
