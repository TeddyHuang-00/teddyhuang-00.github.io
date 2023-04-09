.PHONY: post-process

post-process:
	@echo "running temp fix for redirect"
	@echo "fixing home page"
	cp src/.vuepress/dist/posts/index.html src/.vuepress/dist/index.html
	for dirname in article category star tag timeline ; do \
		echo "fixing $$dirname" ; \
		cp src/.vuepress/dist/posts/index.html src/.vuepress/dist/$$dirname/index.html ; \
	done
