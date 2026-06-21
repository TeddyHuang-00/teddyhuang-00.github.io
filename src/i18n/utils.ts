import { SITE } from "@/config";

import { ui } from "./ui";

export function isValidLang(_lang: string): asserts _lang is keyof typeof ui {}

export const getLangFromUrl = (url: URL) => {
  const [, lang] = url.pathname.split("/");
  if (lang in ui) {
    isValidLang(lang);
    return lang;
  }
  return SITE.defaultLocale;
};

export const getTranslations = (lang: string) => {
  const t = lang in ui ? (isValidLang(lang), ui[lang]) : ui[SITE.defaultLocale];
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
