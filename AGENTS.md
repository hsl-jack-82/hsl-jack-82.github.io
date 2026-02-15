# Repository Guidelines

## Project Structure & Module Organization
This repository is a Jekyll-based personal site and blog. Keep content and templates in the standard Jekyll layout:
- `_layouts/`: page templates (`default.html`, `post.html`).
- `_includes/`: reusable partial content blocks.
- `_posts/`: blog posts, named `YYYY-MM-DD-title.md`.
- `_projects/` and `_skills/`: structured markdown collections.
- Root static assets: `index.html`, `index.css`, `index.js`, `highlight.css`, `favicon.svg`.
- `_site/`, `.jekyll-cache/`, and `vendor/` are generated or local dependency folders; do not edit generated output directly.

## Build, Test, and Development Commands
Use Ruby Bundler and Jekyll for local development:
- `bundle install`: install Ruby gems from `Gemfile`.
- `bundle exec jekyll serve`: run the local dev server (default `http://127.0.0.1:4000`).
- `bundle exec jekyll build`: produce a production build in `_site/`.
- `start.bat`: Windows shortcut for `bundle exec jekyll serve`.

Run `bundle exec jekyll build` before opening a PR to catch config, markdown, or template errors.

## Coding Style & Naming Conventions
- Use 4 spaces for indentation in `index.js` and keep semicolons enabled.
- Prefer descriptive camelCase for JavaScript variables/functions (for example, `sectionObserver`, `targetPosition`).
- Keep HTML/CSS class names kebab-case (for example, `skill-card`, `blog-item`).
- Keep markdown filenames explicit and readable; posts must keep the date prefix format.
- Favor small, focused edits over broad formatting-only churn.

## Testing Guidelines
There is currently no automated test suite in this repository. Use build and manual checks as the baseline:
- Run `bundle exec jekyll build` with zero errors.
- Validate key pages locally: home (`/`), blog index (`/blog/`), and at least one post page.
- For UI changes, verify desktop and mobile layouts and scroll/anchor behavior from `index.js`.

## Commit & Pull Request Guidelines
Recent history mixes styles (`feat: ...`, `Update index.html`, short one-word messages). Standardize going forward:
- Use Conventional Commit style when possible: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.
- Keep commit scope small and message specific.
- PRs should include: change summary, affected paths, local verification steps, and screenshots for UI changes.
- Link related issues/tasks when available.
