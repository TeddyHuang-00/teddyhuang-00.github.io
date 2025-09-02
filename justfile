CACHE_DIR := ".cache"
OG_CACHE_DIR := CACHE_DIR / "og-images"
FONT_VERSION := "7.6"
FONT_CACHE_DIR := CACHE_DIR / "fonts"
FONT_CACHE_FILE := FONT_CACHE_DIR / "MapleMono-v" + FONT_VERSION + ".zip"
FONT_CACHE_EXISTS := path_exists(FONT_CACHE_FILE)

@font:
    mkdir -p {{ FONT_CACHE_DIR }}
    {{ FONT_CACHE_EXISTS }} || \
        (wget https://github.com/subframe7536/maple-font/releases/download/v{{ FONT_VERSION }}/MapleMono-NF-CN-unhinted.zip -O {{ FONT_CACHE_FILE }} && \
        unzip -o {{ FONT_CACHE_FILE }} -d {{ FONT_CACHE_DIR }})

@install:
    bun install --frozen-lockfile

format: install
    biome format
    bun rustywind --check-formatted ./content ./src

check: install sync
    bunx astro check
    biome check

lint:
    biome lint

fix-all:
    bun rustywind --write ./content ./src
    biome format --write
    biome check --write
    biome lint --write

dev: install font
    bunx astro dev

build: install check font
    bunx astro build
    cp -r dist/pagefind public/

clean-build: clean && build

preview: install
    bunx astro preview

sync: install
    bunx astro sync

clean:
    rm -rf dist public/pagefind node_modules .astro

cache-clean-og:
    rm -rf {{ OG_CACHE_DIR }}

cache-clean-font:
    rm -rf {{ FONT_CACHE_DIR }}
