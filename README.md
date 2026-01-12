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
2. **IMPORTANT**: You must add **TWO** domains here:
   - `yourdomain.com` (no www)
   - `www.yourdomain.com`
3. Vercel will likely configure a redirect automatically (e.g., Root redirects to WWW). This is good.
4. Note the **A Record** (usually `76.76.21.21`) and **CNAME** (`cname.vercel-dns.com`) values Vercel shows you.

## Step 4: Configure Namecheap DNS (CRITICAL STEP)
This is where "Server Not Found" errors usually happen. Follow exactly:

1. Log in to Namecheap > **Domain List** > **Manage** > **Advanced DNS**.
2. **DELETE ALL PRE-EXISTING RECORDS**.
   - Look specifically for "URL Redirect Record" or "Parking". Delete them.
   - Look for any "AAAA" records. Delete them (unless you explicitly set them up for Vercel).
3. Add only these records:

| Type | Host | Value | TTL |
| :--- | :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` | Automatic |
| **CNAME Record** | `www` | `cname.vercel-dns.com` | Automatic |
| **CNAME Record** | `space` | `cname.vercel-dns.com` | Automatic |
| **CNAME Record** | `puzzle` | `cname.vercel-dns.com` | Automatic |

*(Replace `space` and `puzzle` with your game subdomains)*.

## Step 5: Final Code Update
1. Wait 30 minutes for DNS to propagate.
2. Open `constants.ts` in your code.
3. Update the `url` fields to point to your new subdomains:
   ```typescript
   url: 'https://space.yourdomain.com'
   ```
4. Commit and Push to GitHub.

---

## Troubleshooting "Server Not Found" on Mobile
If desktop works but mobile Safari fails:

1. **IPv6 Conflict**: Ensure you deleted any **AAAA Records** in Namecheap. Mobile networks prefer IPv6, and if an old parking record exists, it will break the connection.
2. **Propagation**: Mobile networks cache DNS longer. Toggle **Airplane Mode** on/off to flush the cache.
3. **Redirect Loop**: Ensure you added BOTH `yourdomain.com` and `www.yourdomain.com` in Vercel. If you only added one, the redirect chain might break on some devices.
4. **Typo**: Check that `constants.ts` URLs start with `https://` and have no typos.