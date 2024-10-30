ts = `date +%Y-%m-%d_%H%M`
zipfile = slideshow-iframe-webapp_${ts}.zip

dev:
	npm run dev

build:
	npm run build && cd dist && zip -rg ${zipfile} . && mv ${zipfile} ~/SMC/Products/V2/WebApps/