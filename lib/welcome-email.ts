/**
 * The welcome note a reader gets the moment they leave their address.
 * Typography only — no remote images, so it renders the same everywhere.
 * Colors and restraint match the site and the book cover.
 */

const NAVY = "#0e1826";
const IVORY = "#f7f4ec";
const IVORY_SOFT = "#f1ede3";
const GOLD = "#c3a45e";
const GOLD_DEEP = "#8a6f38";
const STONE = "#6b6558";
const INK = "#19202a";

const SERIF = "Georgia, 'Times New Roman', Times, serif";
const SANS = "'Helvetica Neue', Helvetica, Arial, sans-serif";

export const WELCOME_SUBJECT = "You're on the list — Christ the Ideal Stoic";

export function welcomeText() {
  return [
    "CHRIST THE IDEAL STOIC",
    "",
    "Thank you for asking to hear when the book is out.",
    "",
    "Christ the Ideal Stoic is published on September 15, 2026. You will hear",
    "from me then, and now and then afterwards — not often, and never with",
    "anything I would not want to read myself.",
    "",
    "Stoicism gives us a vision. Christ gives us a face.",
    "",
    "The Stoics taught that wisdom, courage, temperance, and justice could",
    "anchor the soul through any storm. What Marcus Aurelius, Seneca, and",
    "Epictetus described in fragments, Christ embodied completely. That is the",
    "argument of the book, and I am glad you want to follow it.",
    "",
    "Jay Saenz, MD",
    "Memphis, Tennessee",
    "",
    "theidealstoic.com",
    "",
    "Your address is never sold or passed to anyone else. Reply to this message",
    "at any time to be taken off the list.",
  ].join("\n");
}

export function welcomeHtml() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>${WELCOME_SUBJECT}</title>
</head>
<body style="margin:0;padding:0;background:${IVORY_SOFT};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;">Published September 15, 2026. Stoicism gives us a vision. Christ gives us a face.</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${IVORY_SOFT};">
<tr>
<td align="center" style="padding:40px 16px;">

<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;background:${IVORY};">

  <tr>
    <td style="background:${NAVY};padding:38px 40px;text-align:center;">
      <div style="font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:${GOLD};">Christ the Ideal Stoic</div>
      <div style="height:1px;width:44px;background:${GOLD};margin:20px auto;"></div>
      <div style="font-family:${SERIF};font-style:italic;font-size:17px;line-height:1.5;color:${IVORY};">Stoicism gives us a vision.<br>Christ gives us a face.</div>
    </td>
  </tr>

  <tr>
    <td style="padding:44px 40px 8px;">
      <div style="font-family:${SANS};font-size:11px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:${STONE};">Before September 15</div>
      <h1 style="margin:16px 0 0;font-family:${SERIF};font-weight:normal;font-size:32px;line-height:1.15;color:${NAVY};">You&rsquo;re on the list.</h1>
    </td>
  </tr>

  <tr>
    <td style="padding:24px 40px 0;">
      <p style="margin:0 0 20px;font-family:${SERIF};font-size:17px;line-height:1.7;color:${INK};">Thank you for asking to hear when the book is out.</p>
      <p style="margin:0 0 20px;font-family:${SERIF};font-size:17px;line-height:1.7;color:${INK};"><em>Christ the Ideal Stoic</em> is published on <strong style="font-weight:normal;color:${NAVY};">September 15, 2026</strong>. You will hear from me then, and now and then afterwards &mdash; not often, and never with anything I would not want to read myself.</p>
      <p style="margin:0 0 20px;font-family:${SERIF};font-size:17px;line-height:1.7;color:${INK};">The Stoics taught that wisdom, courage, temperance, and justice could anchor the soul through any storm. What Marcus Aurelius, Seneca, and Epictetus described in fragments, Christ embodied completely. That is the argument of the book, and I am glad you want to follow it.</p>
    </td>
  </tr>

  <tr>
    <td style="padding:16px 40px 0;">
      <div style="height:1px;background:${GOLD};width:36px;"></div>
      <p style="margin:18px 0 0;font-family:${SERIF};font-size:17px;line-height:1.6;color:${NAVY};">Jay Saenz, MD</p>
      <p style="margin:4px 0 0;font-family:${SANS};font-size:11px;letter-spacing:2px;text-transform:uppercase;color:${STONE};">Memphis, Tennessee</p>
    </td>
  </tr>

  <tr>
    <td style="padding:40px 40px 44px;">
      <a href="https://theidealstoic.com" style="display:inline-block;font-family:${SANS};font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:${NAVY};background:${GOLD};padding:14px 26px;text-decoration:none;border-radius:3px;">Visit theidealstoic.com</a>
    </td>
  </tr>

  <tr>
    <td style="background:${NAVY};padding:28px 40px;text-align:center;">
      <p style="margin:0;font-family:${SANS};font-size:11px;line-height:1.7;color:#a9a293;">Your address is never sold or passed to anyone else.<br>Reply to this message at any time to be taken off the list.</p>
      <p style="margin:14px 0 0;font-family:${SANS};font-size:11px;color:${GOLD_DEEP};">&copy; 2026 Jay Saenz, MD</p>
    </td>
  </tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;
}
