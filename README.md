# My Game Arcade

## ✅ Status: Configuration Correct
Your DNS settings are currently configured correctly.

- **A Record** is pointing to `76.76.21.21` (Vercel).
- **CNAME Records** are pointing to Vercel's DNS servers.

### ⏳ Troubleshooting "Server Not Found"
If you just updated your DNS settings, you might still see errors on mobile. **This is normal.**

1.  **Propagation:** It takes time for the new IP (`76.76.21.21`) to spread across the internet.
2.  **SSL Generation:** Vercel needs about 1 hour to generate the HTTPS certificate after you fix the A Record.
3.  **Fix:**
    *   Wait 60 minutes.
    *   Toggle **Airplane Mode** on/off on your phone.
    *   Clear Safari Cache: *Settings > Safari > Clear History and Website Data*.

---

## The Architecture
We are hosting 3 separate sites on your domain:
1. `www.yourdomain.com` -> **The Main Menu** (This code)
2. `dualnback.yourdomain.com` -> **Your Dual N-Back Game**
3. `imposter.yourdomain.com` -> **Your Imposter Game**

## DNS Reference
If you ever need to reset your DNS, use these standard settings:

| Type | Host | Value |
| :--- | :--- | :--- |
| **A Record** | `@` | `76.76.21.21` |
| **CNAME Record** | `www` | `cname.vercel-dns.com` |
| **CNAME Record** | `[subdomain]` | `cname.vercel-dns.com` |

*(Note: If Vercel gives you a specific value like `...vercel-dns-017.com`, you can use that instead of the generic cname above. Both work.)*

## Adding New Games
1. Deploy your new game to Vercel.
2. In Vercel, go to **Settings > Domains** and add a subdomain (e.g., `snake.yourdomain.com`).
3. In Namecheap, add a new **CNAME Record** for `snake` pointing to `cname.vercel-dns.com`.
4. Update `constants.ts` in this repo with the new URL.
