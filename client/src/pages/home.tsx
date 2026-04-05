import { useState } from "react";
import { useTranslation } from "react-i18next";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Modal } from "@/components/ui/modal";
import PageLayout from "@/components/layout/PageLayout";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { lazy, Suspense } from "react";
import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import Testimonial from "@/components/sections/Testimonial";
import Services from "@/components/sections/Services";
import WhyUs from "@/components/sections/WhyUs";
import Industries from "@/components/sections/Industries";
import Process from "@/components/sections/Process";
import CaseStudies from "@/components/sections/CaseStudies";
import ClosingCTA from "@/components/sections/ClosingCTA";

// Lazy-load below-fold heavy section
const TechSlider = lazy(() => import("@/components/sections/TechSlider"));
import ContactModal from "@/components/shared/ContactModal";

// Service detail modal content
import ServiceDetailContent from "@/components/shared/ServiceDetailModal";

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
      <Navbar onContactClick={openContact} />

      <Hero onContactClick={openContact} />
      <TrustedBy />
      <Testimonial />
      <Services onServiceClick={(id) => setServiceDetail(id)} />
      <Suspense fallback={<div className="h-40 bg-white" />}>
        <TechSlider />
      </Suspense>
      <CaseStudies />
      <Process />
      <WhyUs />
      <Industries />
      <ClosingCTA onContactClick={openContact} />
      <Footer onPrivacyClick={() => setIsPrivacyOpen(true)} onContactClick={openContact} />

      {/* Contact Modal */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Service Detail Modal */}
      <ServiceDetailContent
        serviceId={serviceDetail}
        onClose={() => setServiceDetail(null)}
        onContact={() => {
          setServiceDetail(null);
          setIsContactOpen(true);
        }}
      />

      {/* Privacy Policy Modal */}
      <Modal isOpen={isPrivacyOpen} onClose={() => setIsPrivacyOpen(false)}>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">מדיניות פרטיות | Privacy Policy</h2>
          <p className="text-gray-600">82Labs - הגנת פרטיות</p>
        </div>

        <div className="max-h-96 overflow-y-auto prose prose-sm text-gray-700" dir="rtl">
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">הגנת פרטיות - 82Labs</h3>
              <p><strong>עודכן לאחרונה:</strong> אוגוסט 2025</p>
              <p><strong>בהתאם לתיקון 13 לחוק הגנת הפרטיות, התשמ"א-1981</strong></p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">מידע כללי</h4>
              <p>אנו ב-82Labs מתחייבים לשמור על פרטיותכם ולהגן על המידע האישי שלכם בהתאם לחוק הגנת הפרטיות, התשמ"א-1981 ותיקון 13 שנכנס לתוקף באוגוסט 2025.</p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">איסוף מידע באתר</h4>
              <p><strong>מידע שאנו אוספים:</strong></p>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li><strong>מידע טכני:</strong> כתובת IP, סוג דפדפן, מערכת הפעלה</li>
                <li><strong>נתוני שימוש:</strong> דפים שנצפו, זמן ביקור, מקור הגישה לאתר</li>
                <li><strong>עוגיות טכניות</strong> להבטחת תפקוד תקין של האתר</li>
                <li><strong>מידע אישי דרך טופס יצירת קשר:</strong> שם מלא, כתובת דוא"ל, פרטי הפרויקט</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">מטרת השימוש במידע</h4>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>הבטחת תפקוד תקין של האתר</li>
                <li>שיפור חוויית המשתמש</li>
                <li>ניתוח סטטיסטי כללי של השימוש באתר</li>
                <li>יצירת קשר עמכם בנוגע לבקשתכם</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">העברת מידע לצדדים שלישיים</h4>
              <p>איננו מעבירים מידע אישי לצדדים שלישיים, למעט כאשר נדרש על פי חוק או צו שיפוטי.</p>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">זכויותיכם</h4>
              <ul className="list-disc list-inside space-y-1 mr-4">
                <li>לעיין במידע הקיים עליכם במאגרי המידע שלנו</li>
                <li>לדרוש תיקון מידע שגוי או לא מדויק</li>
                <li>לדרוש מחיקת מידע במקרים המתאימים על פי חוק</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-semibold text-gray-900 mb-2">פרטי התקשרות</h4>
              <p><strong>דוא"ל:</strong> info@82labs.io</p>
              <p><strong>כתובת:</strong> WeWork Haifa</p>
              <p><strong>תאריך עדכון אחרון:</strong> אוגוסט 2025</p>
            </div>
          </div>
        </div>
      </Modal>

      <SpeedInsights />
    </PageLayout>
  );
}
