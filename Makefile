.PHONY: github

github:
	rm -rf src/.vuepress/dist
	npm run docs:build
	cd src/.vuepress/dist && \
	git init && \
	git add -A && \
	git commit -m 'deploy at $(shell date)' && \
	git branch -m local-build && \
	git push -f git@github.com:TeddyHuang-00/teddyhuang-00.github.io.git local-build:gh-pages