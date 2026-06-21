import Giscus, { type Theme } from "@giscus/react";
import { useEffect, useState } from "react";

import { GISCUS, type SITE } from "@/config";

interface CommentsProps {
  lightTheme?: Theme;
  darkTheme?: Theme;
  lang?: keyof typeof SITE.locales;
}

export default function Comments({
  lightTheme = "light",
  darkTheme = "dark",
  lang = "en",
}: CommentsProps) {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme ?? "light");

  useEffect(
    () => {
      // Ensure this runs only in the browser
      if (typeof document === "undefined") {
        return;
      }

      const htmlElement = document.documentElement;

      // Create a MutationObserver to watch for attribute changes
      const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          if (mutation.type === "attributes" && mutation.attributeName === "data-theme") {
            const currentTheme = htmlElement.dataset.theme;
            setTheme(currentTheme ?? "light");
          }
        }
      });

      // Start observing the <html> tag for attribute changes
      observer.observe(htmlElement, {
        attributes: true,
        // Only watch the data-theme attribute
        attributeFilter: ["data-theme"],
      });

      // Cleanup function to disconnect the observer when the component unmounts
      // oxlint-disable-next-line consistent-return
      return () => {
        observer.disconnect();
      };
    },
    // Empty dependency array means this effect runs once on mount
    []
  );

  return (
    <div className="mt-8">
      <Giscus
        theme={theme === "light" ? lightTheme : darkTheme}
        // We need to map zh to zh-CN, otherwise Giscus will not recognize the language
        lang={lang === "zh" ? "zh-CN" : lang}
        {...GISCUS}
      />
    </div>
  );
}
