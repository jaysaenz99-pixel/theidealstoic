# theidealstoic.com — setup

The site runs right now with `npm run dev`. Everything below is about connecting
the two services and putting it online.

---

## 1. Run it locally

```bash
npm run dev
```

Then open http://localhost:3000.

---

## 2. Collect email addresses (Supabase)

**a. Create the table.** In the Supabase dashboard open **SQL Editor → New
query**, paste the whole of [`supabase/schema.sql`](supabase/schema.sql), and
press Run. It creates a `subscribers` table and the security policy that lets
the public add an address but not read the list.

**b. Copy your keys.** `.env.local` already exists — the Vercel CLI created it,
and the empty `SUPABASE_` lines are waiting at the bottom. Open it and fill them
in; don't replace the file, or you'll delete the Vercel token at the top.

The two values come from **Project Settings** in the Supabase dashboard:

| Variable | Where it is |
| --- | --- |
| `SUPABASE_URL` | Project Settings → Data API |
| `SUPABASE_ANON_KEY` | Project Settings → API Keys → the **anon** / publishable key |

Use the **anon** key, not the `service_role` key. The anon key is meant to be
public; the row-level security policy is what protects the table. The
`service_role` key bypasses that protection and this site never needs it.

**c. Test it.** Restart `npm run dev`, submit the form, then look at **Table
Editor → subscribers** in Supabase. Your address should be there.

**d. Reading the list later.** Table Editor → `subscribers` → the export button
gives you a CSV. Sorting by `created_at` tells you when each person signed up.

---

## 3. Serve the images through ImageKit (optional)

The site already works — it serves the two images from `public/` through Next.js's
own image optimiser. ImageKit adds its CDN and on-the-fly resizing.

**a. Upload.** In the ImageKit dashboard, go to **Media Library** and upload both
files from the `public/` folder:

- `public/book-cover.jpg`
- `public/author-portrait.jpg`

Upload them to the **root** of the library, not into a folder — the paths in
`lib/content.ts` already expect that.

**b. Add your URL endpoint.** ImageKit dashboard → **Developer options →
URL-endpoints**. It looks like `https://ik.imagekit.io/abc123xyz`. Put it in
`.env.local`:

```
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
```

Restart the dev server. The site switches to ImageKit automatically. Leave the
variable blank and it goes back to the local files — nothing breaks either way.

Your **private** ImageKit key is not needed anywhere in this project. Don't put
it in a file here and don't paste it into a chat.

---

## 4. It is already online

Live at **https://theidealstoic.vercel.app**, deployed straight from this folder
with the Vercel CLI. The project is `theidealstoic` under the `book18` team.

**To publish a change**, run this from the project folder:

```bash
npx vercel deploy --prod --yes
```

That uploads the current state of the folder and takes about a minute. There is
no GitHub in the loop, so nothing happens automatically — a change is live only
after you run that command.

**Environment variables.** Vercel cannot see `.env.local`; it never leaves this
Mac. Add the same values in the Vercel dashboard under
**Settings → Environment Variables**, then redeploy. Until `SUPABASE_URL` and
`SUPABASE_ANON_KEY` are set there, the live form replies "not connected yet"
even if it works locally.

**Your domain.** Vercel dashboard → the project → **Settings → Domains → Add**,
enter `theidealstoic.com`. It shows the DNS records to create at whichever
registrar holds the domain; add both the apex and `www`. DNS usually takes under
an hour and the HTTPS certificate is automatic.

**Connecting GitHub later** (optional) would give you backup, version history,
and automatic deploys on every change. It stalled on a GitHub account conflict —
the email is attached to more than one sign-in identity. Sorting that out with
GitHub, then linking the repository in Vercel's project settings, is all that's
needed. Nothing about the site has to change.

---

## 5. Editing the site later

Every word and image reference is in [`lib/content.ts`](lib/content.ts). Change
it there and the page updates — you should not need to touch anything in
`app/` or `components/`.

Still open:

- **Retailer links.** `book.retailers` is empty, so no buy-links row appears.
  Add `{ label: "Amazon", href: "https://…" }` entries when you have them.

---

## Two images to swap before launch

**The author photo — headshot session booked.** What's on the page now is
cropped out of a two-person snapshot: rotated upright, tightened onto your face,
waterfall still behind you. It holds the layout at the size it appears, and
that's all it's meant to do. When the headshot comes back, put the file in
`public/`, point `images.portrait` at it in `lib/content.ts`, and set the width
and height to the real pixel dimensions. A portrait-shaped crop suits the layout
better than a square one, but either works.

**The cover image.** What you sent is a screenshot of the cover rather than the
cover file. I trimmed the interface button off the top corner and it looks clean
at the size shown, but it is 1206px wide, which is thin for a large display. If
your designer or publisher can send the original artwork, that's worth doing.
