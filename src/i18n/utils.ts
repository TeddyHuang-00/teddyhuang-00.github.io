import { SITE } from "@/config";

import { ui } from "./ui";

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) return lang as keyof typeof ui;
  return SITE.defaultLocale;
};

export const useTranslations = (lang: keyof typeof ui) => {
  return (
    key: keyof (typeof ui)[typeof SITE.defaultLocale],
    replacements?: Record<string, string>
  ) => {
    const string = ui[lang][key] || ui[SITE.defaultLocale][key];
    if (!replacements) return string;

    return Object.entries(replacements).reduce(
      ([str, _], [key, value]) => [str.replace(`{${key}}`, value), _],
      [string, ""]
    )[0];
  };
};
