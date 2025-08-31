---
title: Expressive Code 语法
pubDatetime: 2025-08-02T15:52:00Z
tags:
  - Example
  - Test
featured: false
draft: true
description: 这是一个使用 Expressive Code 进行代码高亮的示例文章
---

```ts title="src/i18n/utils.ts" collapse={6-8,12-23}
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
```

```sh title="fish shell"
just build
```

```fish frame="terminal"
function just build
  echo "Building the project..."
  # Add your build commands here
end
```
