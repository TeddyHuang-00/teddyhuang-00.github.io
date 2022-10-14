AUTHOR = "Nan Huang"
SITENAME = "Nan Huang's Secret Base"
SITENAME = "WWW::CyberBase(NanHuang);"
SITEURL = ""

PATH = "content"
ARTICLE_EXCLUDES = [
    "images",
    "theme",
]
STATIC_PATHS = [
    "images",
    "extra",
]
EXTRA_PATH_METADATA = {
    "extra/favicon-16x16.png": {"path": "favicon-16x16.png"},
    "extra/favicon-32x32.png": {"path": "favicon-32x32.png"},
    "extra/favicon.ico": {"path": "favicon.ico"},
    "extra/giscus.json": {"path": "giscus.json"},
}

TIMEZONE = "Asia/Shanghai"

DEFAULT_LANG = "en"

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

# Blogroll
LINKS = (
    (
        "<i class='fa fa-github fa-xl'></i> GitHub",
        "https://github.com/TeddyHuang-00",
    ),
    (
        "<i class='fa fa-file'></i> Pages",
        "https://TeddyHuang-00.github.io",
    ),
)

# Social widget
SOCIAL = (
    (
        "<i class='fa fa-envelope'></i> E-mail",
        "mailto:teddyhuangnan@gmail.com",
    ),
    (
        "<i class='fa fa-film'></i> Bilibili",
        "https://space.bilibili.com/13229205",
    ),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

PLUGINS = [
    "pelican.plugins.simple_footnotes",
    "pelican.plugins.render_math",
    "pelican.plugins.jinja2content",
    "pelican.plugins.webassets",
    "minify",
]
MATH_JAX = {
    "responsive": True,
}
# Assets bundles that gets merged and minified
WEBASSETS_BUNDLES = (
    (
        "css_bundle",
        (
            "../src/css/simple.css",
            "../src/css/code.css",
            "../src/css/columns.css",
            "../src/css/iframe-player.css",
            "../src/css/typed.css",
            "../src/css/logo.css",
            "../src/css/hover.css",
        ),
        {
            "output": "css/main.min.css",
            "filters": ["cssmin"],
        },
    ),
    (
        "css_404",
        ("../src/css/404.css",),
        {
            "output": "css/404.min.css",
            "filters": ["cssmin"],
        },
    ),
    (
        "js_bundle",
        ("../src/js/localizer.js",),
        {
            "output": "js/packed.js",
            "filters": ["jsmin"],
        },
    ),
)
