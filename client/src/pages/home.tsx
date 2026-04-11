import { useState, lazy, Suspense } from "react";
import PageLayout from "@/components/layout/PageLayout";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import BelowFoldSkeleton from "@/components/shared/BelowFoldSkeleton";

// Eager preload: start downloading immediately (don't wait for scroll/Suspense).
// By the time preloader dismisses (~800ms) + user reads hero, chunk is ready.
const belowFoldImport = import("@/components/shared/BelowFold");
const BelowFold = lazy(() => belowFoldImport);
const ContactModal = lazy(() => import("@/components/shared/ContactModal"));
const ServiceDetailModal = lazy(() => import("@/components/shared/ServiceDetailModal"));
const PrivacyModal = lazy(() => import("@/components/shared/PrivacyModal"));
const Toaster = lazy(() => import("@/components/ui/toaster").then((m) => ({ default: m.Toaster })));

interface HomeProps {
  lang?: "en" | "he";
}

export default function Home({ lang = "en" }: HomeProps) {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [serviceDetail, setServiceDetail] = useState<string | null>(null);

  const openContact = () => setIsContactOpen(true);

  return (
    <PageLayout lang={lang}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:start-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-gray-900 focus:rounded-lg focus:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        {lang === "he" ? "דלג לתוכן" : "Skip to content"}
      </a>

      <Navbar onContactClick={openContact} />

      <main id="main">
        <Hero onContactClick={openContact} />

        <Suspense fallback={<BelowFoldSkeleton />}>
          <BelowFold
            onContactClick={openContact}
            onServiceClick={(id) => setServiceDetail(id)}
            onPrivacyClick={() => setIsPrivacyOpen(true)}
          />
        </Suspense>
      </main>

      {/* Modals load on demand */}
      {isContactOpen && (
        <Suspense fallback={null}>
          <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
          <Toaster />
        </Suspense>
      )}
      {serviceDetail && (
        <Suspense fallback={null}>
          <ServiceDetailModal
            serviceId={serviceDetail}
            onClose={() => setServiceDetail(null)}
            onContact={() => {
              setServiceDetail(null);
              setIsContactOpen(true);
            }}
          />
        </Suspense>
      )}
      {isPrivacyOpen && (
        <Suspense fallback={null}>
          <PrivacyModal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)} />
        </Suspense>
      )}
    </PageLayout>
  );
}
