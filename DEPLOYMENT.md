# Deployment Guide

This guide explains how to deploy the Startup Benefits Platform to production.

## Prerequisites
- A **GitHub** account (to host the repository).
- A **Vercel** account (for Frontend).
- A **Render** or **Railway** or **Heroku** account (for Backend).
- A **MongoDB Atlas** account (for the database).

---

## 1. Database (MongoDB Atlas)
1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new Cluster (Free Tier).
3. Create a Database User (username/password).
4. Get the Connection String (URI). It looks like:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/startup-benefits?retryWrites=true&w=majority`
5. Save this URI; you will need it for the Backend deployment.

---

## 2. Backend (Render.com)
We will deploy the Node.js/Express server to Render.

1. Push your code to a GitHub repository.
2. Log in to [Render](https://render.com/).
3. Click **New +** -> **Web Service**.
4. Connect your GitHub repository.
5. Settings:
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build` (Ensure your package.json has a build script, or just `npm install` and `npx tsc`)
     * *Note: You typically need to compile TS to JS. Update server/package.json `scripts` to include `"build": "tsc"`.*
   - **Start Command**: `npm start` (Make sure `npm start` runs `node dist/index.js`).
6. **Environment Variables** (Advanced):
   Add the following:
   - `MONGO_URI`: (Your MongoDB Atlas URI from Step 1)
   - `JWT_SECRET`: (A long random string)
   - `PORT`: `10000` (Render sets this automatically, but good to be aware)
7. Deploy.
8. Once deployed, Render will give you a **Service URL** (e.g., `https://startup-benefits-api.onrender.com`). Copy this.

---

## 3. Frontend (Vercel)
We will deploy the Next.js client to Vercel.

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New Project**.
3. Import the same GitHub repository.
4. Settings:
   - **Root Directory**: `client` (Click Edit regarding "Root Directory" and select `client`).
   - **Framework Preset**: Next.js (should detect automatically).
   - **Environment Variables**:
     - `NEXT_PUBLIC_API_URL`: (Paste your Render Backend URL from Step 2, e.g., `https://startup-benefits-api.onrender.com/api`)
       * *Important: Add `/api` at the end if your axios setup expects it.*
5. Click **Deploy**.

---

## 4. Verification
1. Open your Vercel URL.
2. Try to Register/Log in.
3. If it fails, check the Network tab. Ensure requests are going to your Render URL, not localhost.
4. Check Render logs to ensure MongoDB connected successfully.

## Post-Deployment
- Run the seed script on the production database if needed (you might need to run this locally pointing to the remote DB, or add a temporary route to trigger it).
