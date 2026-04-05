import { useTranslation } from "react-i18next";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface ServiceDetailProps {
  serviceId: string | null;
  onClose: () => void;
  onContact: () => void;
}

const serviceIds = ["fullstack", "automation", "lectures"] as const;

export default function ServiceDetailContent({ serviceId, onClose, onContact }: ServiceDetailProps) {
  const { t } = useTranslation();

  if (!serviceId || !serviceIds.includes(serviceId as any)) return null;

  const key = serviceId as (typeof serviceIds)[number];

  return (
    <Modal isOpen={!!serviceId} onClose={onClose}>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          {t(`serviceDetail.${key}.title`)}
        </h2>
        <div className="space-y-4 text-gray-600">
          <p>{t(`serviceDetail.${key}.intro`)}</p>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {t(`serviceDetail.${key}.includedTitle`)}
            </h3>
            <ul className="list-disc list-inside space-y-1">
              {(t(`serviceDetail.${key}.included`, { returnObjects: true }) as string[]).map(
                (item, i) => (
                  <li key={i}>{item}</li>
                )
              )}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              {t("serviceDetail.perfectForTitle")}
            </h3>
            <p>{t(`serviceDetail.${key}.perfectFor`)}</p>
          </div>
        </div>
      </div>

      <div className="border-t pt-6 text-center">
        <p className="text-gray-600 mb-4">{t("serviceDetail.ctaPrompt")}</p>
        <Button onClick={onContact} className="minimal-button minimal-button-primary">
          {t("serviceDetail.ctaButton")}
        </Button>
      </div>
    </Modal>
  );
}
