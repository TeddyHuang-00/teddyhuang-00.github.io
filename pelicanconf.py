AUTHOR = "Nan Huang"
SITENAME = "WWW::CyberBase(NanHuang);"
SITEURL = ""
COPYRIGHT_YEAR = 2022

PATH = "content"
ARTICLE_EXCLUDES = [
    "images",
    "pdfs",
    "theme",
]
STATIC_PATHS = [
    "images",
    "extra",
    "pdfs",
]
EXTRA_PATH_METADATA = {
    "extra/favicon-16x16.png": {"path": "favicon-16x16.png"},
    "extra/favicon-32x32.png": {"path": "favicon-32x32.png"},
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/giscus.json": {"path": "giscus.json"},
}

TIMEZONE = "Asia/Shanghai"

DEFAULT_LANG = "zh"

THEME = "./content/theme"

ARTICLE_URL = "posts/{date:%Y}/{date:%m}/{slug}"
ARTICLE_SAVE_AS = "posts/{date:%Y}/{date:%m}/{slug}.html"
ARTICLE_LANG_URL = "posts/{date:%Y}/{date:%m}/{slug}-{lang}"
ARTICLE_LANG_SAVE_AS = "posts/{date:%Y}/{date:%m}/{slug}-{lang}.html"

DRAFT_URL = "drafts/{slug}"
DRAFT_SAVE_AS = "drafts/{slug}.html"
DRAFT_LANG_URL = "drafts/{slug}-{lang}"
DRAFT_LANG_SAVE_AS = "drafts/{slug}-{lang}.html"

PAGE_URL = "pages/{slug}"
PAGE_SAVE_AS = "pages/{slug}.html"
PAGE_LANG_URL = "pages/{slug}-{lang}"
PAGE_LANG_SAVE_AS = "pages/{slug}-{lang}.html"

YEAR_ARCHIVE_SAVE_AS = "posts/{date:%Y}/index.html"
MONTH_ARCHIVE_SAVE_AS = "posts/{date:%Y}/{date:%m}/index.html"

CATEGORY_URL = "category/{slug}"
CATEGORY_SAVE_AS = "category/{slug}.html"

TAG_URL = "tag/{slug}"
TAG_SAVE_AS = "tag/{slug}.html"

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

DIRECT_TEMPLATES = ("index", "tags", "categories", "archives", "series", "authors")

ARCHIVES_SAVE_AS = "archives.html"
AUTHORS_SAVE_AS = "authors.html"
CATEGORIES_SAVE_AS = "categories.html"
TAGS_SAVE_AS = "tags.html"
SERIES_SAVE_AS = "series.html"

# Blogroll
LINKS = (
    (
        "<i class='fa-brands fa-github'></i> GitHub",
        "https://github.com/TeddyHuang-00",
    ),
    (
        "<i class='fa-solid fa-house-user'></i> Pages",
        "https://TeddyHuang-00.github.io",
    ),
)

# Social widget
SOCIAL = (
    (
        "<i class='fa-solid fa-envelope'></i> E-mail",
        "mailto:teddyhuangnan@gmail.com",
    ),
    (
        "<i class='fa-brands fa-youtube'></i> Bilibili",
        "https://space.bilibili.com/13229205",
    ),
)

# Cool friends of mine
FRIENDS = sorted(
    (
        ("BicPotato", "https://v2.blog.bicpotato.net/"),
        ("Yixuan Wang", "https://blog.yixuan-wang.site/"),
    ),
    key=lambda x: x[0],
)

DEFAULT_PAGINATION = 4

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

# # Plugins
PLUGINS = [
    "pelican.plugins.jinja_filters",
    "pelican.plugins.jinja2content",
    "pelican.plugins.simple_footnotes",
    "pelican.plugins.render_math",
    "pelican.plugins.webassets",
    "pelican.plugins.series",
    "minify",
]
# # display math
MATH_JAX = {
    "responsive": True,
}
# Assets bundles that gets merged and minified
WEBASSETS_CONFIG: list[tuple[str, str]] = [
    (
        "TYPESCRIPT_CONFIG",
        "--lib es2015,dom \
        --target es6 \
        --removeComments true \
        --skipLibCheck true \
        --allowSyntheticDefaultImports true \
        --experimentalDecorators",
    ),
    ("cache", "./tmp/webassets-cache"),
]
WEBASSETS_SOURCE_PATHS = ["src"]
WEBASSETS_BUNDLES = (
    (
        "css_bundle",
        (
            "css/simple.css",
            "css/code.css",
            "css/columns.css",
            "css/iframe-player.css",
            "css/typewriter.css",
            "css/logo.css",
            "css/hover.css",
            "css/copy-code.css",
            "css/toggle-theme.css",
        ),
        {
            "output": "css/main.min.css",
            "filters": ["autoprefixer6", "cssmin"],
        },
    ),
    (
        "css_404",
        ("css/404.css",),
        {
            "output": "css/404.min.css",
            "filters": ["autoprefixer6", "cssmin"],
        },
    ),
    (
        "js_pre_bundle",
        ("ts/localizer.ts",),
        {
            "output": "js/pre.min.js",
            "filters": ["typescript", "jsmin", "uglifyjs"],
        },
    ),
    (
        "js_post_bundle",
        (
            "ts/copy-code.ts",
            "ts/toggle-theme.ts",
        ),
        {
            "output": "js/post.min.js",
            "filters": ["typescript", "jsmin", "uglifyjs"],
        },
    ),
)
