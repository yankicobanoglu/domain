# My Game Arcade - Namecheap Setup Guide

This guide helps you set up a professional Game Portal using **Namecheap** and **Vercel**.

## The Architecture
We are setting up 3 separate sites on your domain:
1. `www.yourdomain.com` -> **The Main Menu** (This code)
2. `game1.yourdomain.com` -> **Your First Game**
3. `game2.yourdomain.com` -> **Your Second Game**

---

## Step 1: Prepare the Menu
1. Create a GitHub account if you don't have one.
2. Create a new Repository named `my-arcade`.
3. Upload **ALL** the files from this folder to that repository.
4. Go to Vercel, "Add New Project", and import `my-arcade`. Deploy it.

## Step 2: Configure Game Subdomains (Vercel)
Do this for **each** of your existing game projects on Vercel:
1. Go to the Game Project > **Settings** > **Domains**.
2. Enter your desired subdomain (e.g., `space.yourdomain.com`).
3. Vercel will give you a **CNAME Value** (usually `cname.vercel-dns.com`).
4. **Copy this value.**

## Step 3: Configure Main Domain (Vercel)
1. Go to your new **Menu Project** (from Step 1) > **Settings** > **Domains**.
2. Enter your main domain (e.g., `yourdomain.com`).
3. Vercel will give you an **A Record Value** (usually `76.76.21.21`).
4. **Copy this value.**

## Step 4: Configure Namecheap DNS
1. Log in to Namecheap > **Domain List** > **Manage** > **Advanced DNS**.
2. **Delete** any pre-existing records (like "Parking" or "Redirect").
3. Add the following records:

| Type | Host | Value |
| :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` |
| **CNAME Record** | `www` | `cname.vercel-dns.com` |
| **CNAME Record** | `space` | `cname.vercel-dns.com` |
| **CNAME Record** | `puzzle` | `cname.vercel-dns.com` |

*(Replace `space` and `puzzle` with whatever names you chose in Step 2)*.

## Step 5: Final Code Update
1. Wait 30 minutes for DNS to propagate.
2. Open `constants.ts` in your code.
3. Update the `url` fields to point to your new subdomains:
   ```typescript
   url: 'https://space.yourdomain.com'
   ```
4. Commit and Push to GitHub. Vercel updates automatically.

## Troubleshooting
*   **Site not loading?** DNS can take up to 24 hours globally, but usually takes 30 mins.
*   **"Vercel says Invalid Configuration"?** Ensure the values in Namecheap match exactly what Vercel showed you.
