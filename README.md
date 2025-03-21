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

## 5. GitLab Pages Deployment

Create `.gitlab-ci.yml` in the root of the project:

```yaml
image: registry.gitlab.com/pages/hugo:latest

pages:
  script:
    - hugo --minify  # Only build Hugo, no SCSS compilation needed
  artifacts:
    paths:
      - public/
  only:
    - main

```
