import { SITE } from "@/config";

import { ui } from "./ui";

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split("/");
  // oxlint-disable-next-line no-unsafe-type-assertion
  if (lang in ui) return lang as keyof typeof ui;
  return SITE.defaultLocale;
};

export const getTranslations = (lang: string) => {
  // oxlint-disable-next-line no-unsafe-type-assertion
  const t = lang in ui ? ui[lang as keyof typeof ui] : ui[SITE.defaultLocale];
  return (
    key: keyof (typeof ui)[typeof SITE.defaultLocale],
    replacements?: Record<string, string>
  ) => {
    const string = t[key];
    if (!replacements) return string;

    return Object.entries(replacements).reduce(
      ([str, _], [key, value]) => [str.replace(`{${key}}`, value), _],
      [string, ""]
    )[0];
  };
};
