.PHONY: github clean build temp-fix

github: clean build temp-fix
	@echo "======================================================"
	@echo "deploying to github"
	cd src/.vuepress/dist && \
	git init && \
	git add -A && \
	git commit -m 'deploy at $(shell date)' && \
	git branch -m local-build && \
	git push -f git@github.com:TeddyHuang-00/teddyhuang-00.github.io.git local-build:gh-pages

clean:
	@echo "======================================================"
	@echo "cleaning up output directory"
	- rm -rf src/.vuepress/dist

build:
	@echo "======================================================"
	@echo "building site"
	npm run docs:build

# this is meant for a temporary fix for redirect
temp-fix:
	@echo "======================================================"
	@echo "running temp fix for redirect"
	@echo "fixing home page"
	cp src/.vuepress/dist/posts/index.html src/.vuepress/dist/index.html
	for dirname in article category star tag timeline ; do \
		echo "fixing $$dirname" ; \
		cp src/.vuepress/dist/posts/index.html src/.vuepress/dist/$$dirname/index.html ; \
	done
