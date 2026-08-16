/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  EVERY WORD AND IMAGE ON THE SITE LIVES IN THIS FILE.
 *
 *  Edit here and the page updates. You never need to touch the components.
 *  Anything marked  ▲  is waiting on you.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: "The Ideal Stoic",
  domain: "theidealstoic.com",
  url: "https://theidealstoic.com",
};

export const book = {
  title: "Christ the Ideal Stoic",

  /** How the title breaks across lines in the hero. One string per line. */
  titleLines: ["Christ", "the Ideal", "Stoic"],

  /** The line from the cover. */
  subtitle: "Stoicism gives us a vision. Christ gives us a face.",

  status: "Forthcoming · September 15, 2026",

  /**
   * The hero blurb, taken from the opening of your short summary. Kept to two
   * short paragraphs so it sits alongside the cover without crowding it. The
   * first letter is set as a red initial capital.
   */
  summary: [
    "The Stoics taught that wisdom, courage, temperance, and justice could anchor the soul through any storm — yet they were describing an ideal they could never fully embody.",
    "What Marcus Aurelius, Seneca, and Epictetus perceived in fragments, Christ embodied completely.",
  ],

  /** Your long summary, verbatim, for readers who scroll. */
  description: [
    "For centuries, the Stoics taught that a well-ordered mind could steady us through chaos. Wisdom, courage, temperance, and justice could anchor the soul no matter what life demanded. Marcus Aurelius reflected on these virtues in his journal. Seneca explored them in his letters. Epictetus embodied them in hardship. Yet for all their brilliance, the Stoics were describing an ideal they could point to but never fully embody.",
    "Christ the Ideal Stoic is Jay Saenz’s compelling answer to that unfinished vision.",
    "Drawing on decades as an orthopedic surgeon, husband, father, and entrepreneur, Saenz argues that the Stoics did more than invent a philosophy of virtue. They glimpsed enduring truths about human flourishing. What they perceived in fragments, Christ embodied completely. The sage they sought is found not in abstract principles, but in the life of Christ.",
    "Moving through wisdom, courage, temperance, humility, peace, joy, and sacrificial love, the book shows how the life of Christ gives flesh and blood to the virtues the Stoics so deeply admired. Rather than diminishing Stoicism, Saenz reveals how its highest aspirations find their fullest expression in Christ.",
    "Written for readers seeking greater resilience, clarity, and purpose, this is more than philosophical insight. It offers a practical vision for cultivating enduring character amid the pressures and uncertainties of modern life.",
  ],

  /** ▲ Retailer links once you have them. An empty array hides the row. */
  retailers: [] as { label: string; href: string }[],
};

export const author = {
  name: "Jay Saenz, MD",

  /** Sits under the name by the portrait. Set to null to show nothing. */
  role: null as string | null,

  bio: [
    "Jay Saenz is a practicing orthopedic surgeon in Memphis, Tennessee, and an entrepreneur. He is fifty-three, has been married for thirty years, and is the father of three.",
    "Alongside his practice he has spent years reading in philosophy and theology, with a long attachment to the Stoics. Christ the Ideal Stoic grew out of that reading — and out of the places where its questions get settled rather than argued: an operating room, a marriage, three children.",
  ],
};

/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  IMAGES
 *
 *  `local` is the file in /public, used right now.
 *  `path` is the file's path in your ImageKit media library, used instead as
 *  soon as NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT is set in .env.local. Upload both
 *  files to the root of the library and these paths already match.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const images = {
  cover: {
    path: "/book-cover.jpg",
    local: "/book-cover.jpg",
    width: 1206,
    height: 1753,
    alt: `Front cover of ${book.title} by ${author.name}: a Chi-Rho mosaic in gold and red on a deep navy field`,
  },
  /**
   * ▲ Placeholder, cropped from a snapshot, pending the scheduled headshot.
   * When the new file arrives: drop it in /public, update these dimensions to
   * match it, and re-upload to ImageKit if that is connected.
   */
  portrait: {
    path: "/author-portrait.jpg",
    local: "/author-portrait.jpg",
    width: 900,
    height: 1114,
    alt: `${author.name}, author of ${book.title}`,
  },
};

export const signup = {
  eyebrow: "Before September 15",
  heading: "Hear when it’s out",
  blurb:
    "Leave your address to hear when the book is published on September 15, and now and then afterwards. It is never sold or passed to anyone else.",
  buttonIdle: "Add me to the list",
  buttonBusy: "Sending",
  success: "You are on the list. Watch for a note on September 15.",
  fineprint: "Unsubscribe in a click.",
};

export const meta = {
  description:
    `${book.title} by ${author.name}. The Stoics described a virtue they could ` +
    `never fully embody; this book argues Christ embodied it completely. ` +
    `Publishing September 15, 2026.`,
};
