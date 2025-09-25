# Oxigrow — Packaged Drinking Water

This is a small web project for the IBDP Computer Science SL Internal Assessment.

## What is included
- index.html — main customer-facing site
- styles.css — styling
- app.js — site logic (products, cart, checkout)
- admin.html — simple admin order viewer (reads from localStorage)
- firebase-config.js — placeholder for Firebase configuration

## How to run locally
1. Unzip the project (if zipped).
2. Open `index.html` in a browser. For full functionality in some browsers you may need to host via a simple HTTP server (see below).

### Run a simple local server (optional but recommended)
If you have Python installed, run in the project folder:
```
# Python 3
python -m http.server 8000
```
Then open `http://localhost:8000`.

## How to publish for free (two recommended options)
### Option A — GitHub Pages (static)
1. Create a GitHub repository and push the project files.
2. In repository Settings → Pages, set the branch to `main` and folder to `/` (or `gh-pages` if using that branch).
3. Your site will be published at `https://<your-username>.github.io/<repo>/`.

Notes: This is ideal if you do not need server-side functionality. The admin page will still read from localStorage only.

### Option B — Firebase Hosting (free tier)
1. Create a Firebase account and a new project.
2. Install Firebase CLI: `npm install -g firebase-tools`.
3. Run `firebase login` then `firebase init` in the project folder and choose Hosting.
4. Build/deploy with `firebase deploy`.

Notes: If you enable Firestore and add the Firebase config in `firebase-config.js`, you can persist orders to the cloud and view them across devices.

## Next steps I can help with now
- Insert your Firebase config and update `app.js` to use Firestore transactions for stock and orders.
- Help you push to GitHub and enable GitHub Pages, or set up Firebase Hosting and deploy the site (step-by-step).

