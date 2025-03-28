# hugobs

Simple Hugo Site with Bootstrap and GitLab Pages Deployment

## 1. Create the Hugo Site

First, create Hugo site and add a new theme**without a theme** (keeping things simple):

```bash
hugo new site . --force
hugo new theme my-theme
```

Move theme relevant files to respective directories at the root of the project.


## 2. Set Up Bootstrap & SCSS

Install Bootstrap and Sass via **npm** instead of using a CDN, to allow scss customization.

```bash
npm init -y
npm install bootstrap sass
```

Remove node_modules from the git repository:

```bash
echo "node_modules/" >> .gitignore
```

## 3. Modify `package.json` for SCSS Handling

Edit `package.json` to include scripts for development and build:

```json
"scripts": {
  "dev": "hugo server -D",
  "build": "sass assets/scss/main.scss static/css/main.css --no-source-map --style=compressed"
}
```

- `npm run dev` → Starts Hugo’s live server with dynamic SCSS
- `npm run build` → Compiles SCSS to CSS before pushing

## 4. Set Up SCSS Handling in Hugo

1. Create `assets/scss/main.scss` and import Bootstrap with customizations:
2. Modify `layouts/partials/head/css.html`

```html
  {{ if hugo.IsServer }}
    {{ $style := resources.Get "scss/main.scss" | toCSS }}
    <style>{{ $style.Content | safeCSS }}</style>
  {{ else }}
    <link rel="stylesheet" href="{{ "css/main.css" | relURL }}">
  {{ end }}
```

For local devlopment, run `npm run dev` and `npm run build` to compile CSS before pushing to GitLab.

## 5. JS Handling

- Copy Bootstrap Bundle JS to `static/js/`: `cp node_modules/bootstrap/dist/js/bootstrap.bundle.min.js static/js/`
- Create `static/js/main.js` for custom scripts
- Include JS in the footer layout, edit `layouts/partials/footer.html`:

```html
<script src="{{ "js/bootstrap.bundle.min.js" | relURL }}"></script>
<script src="{{ "js/main.js" | relURL }}"></script>
```

## 6. Copyright

```html
<footer>
    <p>
        &copy; Copyright holder
        <span id="js-year" aria-hidden="true"></span>
        <noscript>{{ now.Format "2006" }}</noscript>
    </p>
</footer>
<script src="{{ "js/bootstrap.bundle.min.js" | relURL }}"></script>
<script src="{{ "js/main.js" | relURL }}"></script>
```

## 7. GitLab Pages Deployment

Create `.gitlab-ci.yml` in the root of the project:

```yaml
image: registry.gitlab.com/pages/hugo:latest

pages:
  script:
    - hugo --minify --baseURL "${CI_PAGES_URL}" # Only build Hugo, no SCSS compilation needed and use CI_PAGES_URL
  artifacts:
    paths:
      - public/
  only:
    - main
```
