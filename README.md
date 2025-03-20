# hugobs

Simple Hugo Site with Bootstrap and GitLab Pages Deployment

## 1. Create the Hugo Site

First, create Hugo site **without a theme** (keeping things simple):

```bash
hugo new site . --force
```
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
