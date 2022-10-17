AUTHOR = "Nan Huang"
SITENAME = "Nan Huang's Secret Base"
SITENAME = "WWW::CyberBase(NanHuang);"
SITEURL = ""
COPYRIGHT_YEAR = 2022

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

ARCHIVES_SAVE_AS = "archives.html"
AUTHORS_SAVE_AS = "authors.html"
CATEGORIES_SAVE_AS = "categories.html"
TAGS_SAVE_AS = "tags.html"

# Blogroll
LINKS = (
    (
        "<i class='fa-brands fa-github'></i> GitHub",
        "https://github.com/TeddyHuang-00",
    ),
    (
        "<i class='fa-solid fa-file'></i> Pages",
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
WEBASSETS_SOURCE_PATHS = ["src"]
WEBASSETS_BUNDLES = (
    (
        "css_bundle",
        (
            "css/simple.css",
            "css/code.css",
            "css/columns.css",
            "css/iframe-player.css",
            "css/typed.css",
            "css/logo.css",
            "css/hover.css",
            "css/copy-code.css",
            "css/toggle-theme.css",
        ),
        {
            "output": "css/main.%(version)s.css",
            "filters": ["cssmin"],
        },
    ),
    (
        "css_404",
        ("css/404.css",),
        {
            "output": "css/404.%(version)s.css",
            "filters": ["cssmin"],
        },
    ),
    (
        "js_pre_bundle",
        ("js/localizer.js",),
        {
            "output": "js/pre.%(version)s.js",
            "filters": ["jsmin"],
        },
    ),
    (
        "js_post_bundle",
        (
            "js/copy-code.js",
            "js/toggle-theme.js",
        ),
        {
            "output": "js/post.%(version)s.js",
            "filters": ["jsmin"],
        },
    ),
)
