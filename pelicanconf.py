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

# Feed generation is usually not desired when developing
FEED_ALL_ATOM = None
CATEGORY_FEED_ATOM = None
TRANSLATION_FEED_ATOM = None
AUTHOR_FEED_ATOM = None
AUTHOR_FEED_RSS = None

# Blogroll
LINKS = (
    ("GitHub", "https://github.com/TeddyHuang-00"),
    ("Pages", "https://TeddyHuang-00.github.io"),
)

# Social widget
SOCIAL = (
    ("E-mail", "mailto:teddyhuangnan@gmail.com"),
    ("Bilibili", "https://space.bilibili.com/13229205"),
)

DEFAULT_PAGINATION = 10

# Uncomment following line if you want document-relative URLs when developing
RELATIVE_URLS = True

PLUGINS = [
    "pelican.plugins.simple_footnotes",
    "pelican.plugins.render_math",
    "pelican.plugins.jinja2content",
]
MATH_JAX = {
    "responsive": True,
}
