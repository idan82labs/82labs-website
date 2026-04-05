import { Modal } from "@/components/ui/modal";

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PrivacyModal({ isOpen, onClose }: PrivacyModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">מדיניות פרטיות | Privacy Policy</h2>
        <p className="text-gray-600">82Labs - הגנת פרטיות</p>
      </div>

      <div className="max-h-96 overflow-y-auto text-sm text-gray-700 leading-relaxed" dir="rtl" lang="he">
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
  );
}
