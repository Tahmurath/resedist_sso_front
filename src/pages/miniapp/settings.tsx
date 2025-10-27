import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "@/components/theme-provider";
import { useTranslation } from "react-i18next";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { FieldSet, FieldLegend, FieldGroup, Field } from "@/components/ui/field";


interface SettingsFormValues {
  language: string;
  theme: "light" | "dark" | "system";
}

function Index() {
  const { theme, setTheme } = useTheme();
  const { i18n, t } = useTranslation();
  const currentLanguage = (i18n.language || localStorage.getItem("language") || "en").split("-")[0];

  const form = useForm<SettingsFormValues>({
    defaultValues: {
      language: currentLanguage,
      theme: theme,
    },
  });

  const language = form.watch("language");
  const themeValue = form.watch("theme");

  useEffect(() => {
    if (language && language !== i18n.language) {
      i18n.changeLanguage(language);
      localStorage.setItem("language", language);
    }
  }, [language, i18n]);

  useEffect(() => {
    if (themeValue && themeValue !== theme) {
      setTheme(themeValue);
    }
  }, [themeValue, theme, setTheme]);

  return (
    <FieldSet>
      <FieldLegend>{t("site.settings")}</FieldLegend>
      <Form {...form}>
        <FieldGroup>
          <Field orientation="horizontal">
            <FormField
              control={form.control}
              name="theme"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4 w-full">
                  <FormLabel className="min-w-28">{t("site.mode")}</FormLabel>
                  <FormControl>
                    <select
                      className="border rounded-md px-3 py-2 bg-background text-sm"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="light">{t("site.light")}</option>
                      <option value="dark">{t("site.dark")}</option>
                      <option value="system">{t("site.system")}</option>
                    </select>
                  </FormControl>
                  <FormDescription className="hidden md:block">{t("site.mode")}</FormDescription>
                </FormItem>
              )}
            />
          </Field>
          <Field orientation="horizontal">
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-4 w-full">
                  <FormLabel className="min-w-28">{t("site.language")}</FormLabel>
                  <FormControl>
                    <select
                      className="border rounded-md px-3 py-2 bg-background text-sm"
                      value={field.value}
                      onChange={field.onChange}
                    >
                      <option value="en">English</option>
                      <option value="fa">فارسی</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </FormControl>
                  <FormDescription className="hidden md:block">{t("site.language")}</FormDescription>
                </FormItem>
              )}
            />
          </Field>
        </FieldGroup>
      </Form>
    </FieldSet>
  );
}

export default Index;
