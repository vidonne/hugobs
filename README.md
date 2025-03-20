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
