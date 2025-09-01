import Giscus, { type Theme } from "@giscus/react";
import { useEffect, useState } from "react";
import type { SITE } from "@/config";
import { GISCUS } from "@/constants";

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
  const [theme, setTheme] = useState(
    // Initial read for the current theme
    typeof document !== "undefined"
      ? document.documentElement.getAttribute("data-theme") || "light"
      : "light"
  );

  useEffect(() => {
    // Ensure this runs only in the browser
    if (typeof document === "undefined") {
      return;
    }

    const htmlElement = document.documentElement;

    // Create a MutationObserver to watch for attribute changes
    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "data-theme"
        ) {
          const currentTheme = htmlElement.getAttribute("data-theme");
          setTheme(currentTheme || "light");
        }
      }
    });

    // Start observing the <html> tag for attribute changes
    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ["data-theme"], // Only watch the data-theme attribute
    });

    // Cleanup function to disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, []); // Empty dependency array means this effect runs once on mount

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
