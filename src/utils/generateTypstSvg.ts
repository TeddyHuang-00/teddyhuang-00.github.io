import fs from "node:fs";
import path from "node:path";
import { NodeCompiler } from "@myriaddreamin/typst-ts-node-compiler";
import { optimize } from "svgo";

// Configuration for output paths
const BUILD_DIR = "dist";
const DEV_PUBLIC_DIR = "public";
const ASSET_SUBDIR = "assets/generated";

/**
 * Determines the output directory based on the Astro environment mode.
 * In PROD, we write to 'dist'. In DEV, we write to 'public' (gitignored).
 * Detecting DEV vs PROD via import.meta.env
 */
function getOutputDirectory(): string {
  const isProd = import.meta.env.PROD;
  const root = process.cwd();

  if (isProd) {
    return path.join(root, BUILD_DIR, ASSET_SUBDIR);
  } else {
    return path.join(root, DEV_PUBLIC_DIR, ASSET_SUBDIR);
  }
}

/**
 * Ensures the target directory exists recursively.
 */
function ensureDirectory(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * Generates SVGs for a given Typst file.
 * Returns the URL paths to the generated files.
 */
export function processTypstFile({
  filePath,
  slug,
  workspace,
  fontPaths,
}: {
  filePath: string;
  slug: string;
  workspace?: string;
  fontPaths?: string[];
}): { light: string; dark: string } {
  const outDir = getOutputDirectory();
  ensureDirectory(outDir);

  // The web-accessible URL depends on the mode, but logically maps to the same path
  // In PROD: dist/assets/... -> /assets/...
  // In DEV: public/assets/... -> /assets/...
  const urlBase = `/${ASSET_SUBDIR}`;

  const [svgLight, svgDark] = compileTypst(filePath, workspace, fontPaths);

  if (svgLight === svgDark) {
    // Write single SVG file
    const fileName = `${slug}.svg`;
    const filePathFull = path.join(outDir, fileName);

    fs.writeFileSync(filePathFull, svgLight);

    return {
      light: `${urlBase}/${fileName}`,
      dark: `${urlBase}/${fileName}`,
    };
  } else {
    // Define proper output filenames
    const fileLight = `${slug}.light.svg`;
    const fileDark = `${slug}.dark.svg`;

    const pathLight = path.join(outDir, fileLight);
    const pathDark = path.join(outDir, fileDark);

    // Write themed SVG files
    fs.writeFileSync(pathLight, svgLight);
    fs.writeFileSync(pathDark, svgDark);

    return {
      light: `${urlBase}/${fileLight}`,
      dark: `${urlBase}/${fileDark}`,
    };
  }
}

/**
 * Compiles a Typst file to SVG strings for light and dark themes.
 */
function compileTypst(
  filePath: string,
  workspace?: string,
  fontPaths?: string[]
): [string, string] {
  const compiler = NodeCompiler.create({
    workspace,
    fontArgs: fontPaths ? [{ fontPaths }] : undefined,
  });
  return ["light", "dark"]
    .map((theme) => compiler.svg({ mainFilePath: filePath, inputs: { theme } }))
    .map(optimizeSvg) as [string, string];
}

/**
 * Optimize SVG using SVGO with predefined plugins
 */
function optimizeSvg(svgContent: string): string {
  return import.meta.env.PROD
    ? optimize(svgContent, {
        plugins: [
          {
            name: "preset-default",
            params: {
              floatPrecision: 4,
              // Disable plugins that will crash on certain SVGs
              overrides: {
                collapseGroups: false,
                convertPathData: false,
                mergePaths: false,
                removeEmptyContainers: false,
                removeHiddenElems: false,
                removeUnknownsAndDefaults: false,
              },
            },
          },
        ],
      }).data
    : svgContent;
}
