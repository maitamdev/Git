# Public Git Academy on Vercel

The student course is a static frontend. Learners can open the course without an account or backend. Lesson progress is saved in the current browser on the learner's device; it is not synced.

## Vercel project settings

Import the GitHub repository into Vercel and configure the project as follows:

- **Root Directory:** `apps/playground` (the frontend's `vercel.json` is in this directory).
- **Framework:** Vite, detected automatically.
- **Install Command:** `pnpm install --filter playground...`
- **Build Command:** `pnpm --filter playground... build`
- **Output Directory:** `dist`.
- **Environment variables:** none are required for the anonymous self-study course.

The install/build commands include the frontend's workspace dependencies from the monorepo. The `vercel.json` keeps SPA routes loading `index.html` and sets security/cache headers. If the Vercel project is connected to this GitHub repository and `main` is its Production Branch, a push to `main` triggers a production deployment; otherwise, connect/import the repository and verify the project's settings in Vercel. See [Vercel monorepo deployment guidance](https://vercel.com/docs/monorepos) and [Vercel Git deployment behavior](https://vercel.com/docs/git).

## Smoke test after deployment

1. Open the production URL in a private/incognito window. The course map should appear without a login form.
2. Start Level 1, Lesson 1, answer the five quiz questions, and confirm that the result says the lesson is complete.
3. Confirm Lesson 2 is available and the course map shows the completed lesson.
4. Reload the page and confirm progress remains in that same browser.
5. Open a different browser or device only if you want to verify the documented limitation: progress does not sync.

Do not treat a successful local build or Git push as proof of deployment. Verify the deployment status and public URL in the Vercel dashboard after the push.
