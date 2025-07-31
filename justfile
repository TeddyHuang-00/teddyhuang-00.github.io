FONT_VERSION := "7.4"
FONT_CACHE_DIR := ".cache" / "fonts"
FONT_CACHE_FILE := FONT_CACHE_DIR / "MapleMono-v" + FONT_VERSION + ".zip"
FONT_CACHE_EXISTS := path_exists(FONT_CACHE_FILE)

@font:
    mkdir -p {{FONT_CACHE_DIR}}
    {{FONT_CACHE_EXISTS}} || \
        (wget https://github.com/subframe7536/maple-font/releases/download/v{{FONT_VERSION}}/MapleMono-NF-CN-unhinted.zip -O {{FONT_CACHE_FILE}} && \
        unzip -o {{FONT_CACHE_FILE}} -d {{FONT_CACHE_DIR}})

@install:
    bun install

format:
    biome format

check: install
    bunx astro check
    biome check

lint:
    biome lint

fix-all:
    biome format --write
    biome check --write
    biome lint --write

build: install check font
    bunx astro build
    bunx pagefind --site dist
    cp -r dist/pagefind public/

dev: install font
    bunx astro dev

preview: install
    bunx astro preview

sync: install
    bunx astro sync

clean:
    rm -rf dist public/pagefind node_modules .cache .astro