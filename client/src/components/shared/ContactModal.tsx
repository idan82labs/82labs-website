import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, QueryClientProvider } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  brief: z.string().min(10, "Please provide more details").max(140, "Brief must be 140 characters or less"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal(props: ContactModalProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactModalInner {...props} />
    </QueryClientProvider>
  );
}

function ContactModalInner({ isOpen, onClose }: ContactModalProps) {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", brief: "" },
  });

  const briefValue = form.watch("brief") ?? "";

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: t("contact.successTitle"),
        description: t("contact.successMessage"),
      });
      form.reset();
      onClose();
    },
    onError: () => {
      toast({
        title: t("contact.errorTitle"),
        description: t("contact.errorMessage"),
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-lg max-h-[90vh] p-5 sm:p-6">
      <div className="mb-4 pr-8">
        <h2 className="text-lg font-semibold text-gray-900 leading-tight">{t("contact.title")}</h2>
        <p className="text-sm text-gray-500 mt-0.5">{t("contact.subtitle")}</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-gray-700">{t("contact.name")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      autoComplete="name"
                      className="h-9 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-xs font-medium text-gray-700">{t("contact.email")}</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      className="h-9 border-gray-300 focus:border-gray-900 focus:ring-gray-900"
                      placeholder={t("contact.emailPlaceholder")}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="brief"
            render={({ field }) => (
              <FormItem className="space-y-1">
                <div className="flex items-baseline justify-between">
                  <FormLabel className="text-xs font-medium text-gray-700">{t("contact.brief")}</FormLabel>
                  <span className="text-[10px] tabular-nums text-gray-400">{briefValue.length}/140</span>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    className="border-gray-300 focus:border-gray-900 focus:ring-gray-900 resize-none"
                    placeholder={t("contact.briefPlaceholder")}
                    rows={3}
                    maxLength={140}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={contactMutation.isPending}
            className="minimal-button minimal-button-primary w-full"
          >
            {contactMutation.isPending ? t("contact.sending") : t("contact.submit")}
          </Button>
        </form>
      </Form>
    </Modal>
  );
}
