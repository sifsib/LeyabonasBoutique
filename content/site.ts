// Single source of truth for every fact, string and image on the site.
// To reuse this project for another business, edit this file and swap public/images.
// Anything set to null is hidden on the page.

export type Img = {
  src: string;
  alt: string;
  /** Shown under the image when the picture is a render or poster, not proof of stock. */
  note?: string;
};

export type Occasion = { name: string; line: string; image?: Img };

export type CollectionItem = {
  name: string;
  /** How the item reads inside a sentence, for the WhatsApp message. */
  askName: string;
  image: Img;
  /** "photo" gets the tall treatment; "campaign" is a poster or render. */
  kind: "photo" | "campaign";
  price: string | null;
};

const img = (path: string) => `/images/${path}`;

const IMAGES = {
  logo: {
    src: img("brand/leyabonas-logo-primary-extracted-from-welcome-post.png"),
    alt: "Leyabona's Boutique logo",
    width: 435,
    height: 475,
  },
  navyBlazer: {
    src: img("product/leyabonas-product-safari-blazer-navy-paisley-tie-01-portrait.png"),
    alt: "Navy safari-style blazer with silver crest buttons and a gold paisley tie, on a mannequin",
  },
  burgundyBlazer: {
    src: img("product/leyabonas-product-safari-blazer-burgundy-01-portrait.png"),
    alt: "Burgundy safari-style blazer with four flap pockets and silver crest buttons",
  },
  blackBlazer: {
    src: img("product/leyabonas-product-safari-blazer-black-cravat-01-portrait.png"),
    alt: "Black safari-style blazer with a red polka-dot cravat",
  },
  blackGoldTrim: {
    src: img("product/leyabonas-product-black-gold-trim-three-piece-01-portrait.png"),
    alt: "Black three-piece suit with gold piping, gold buttons and a gold tie",
    note: "Campaign image",
  },
  burgundyDetails: {
    src: img("campaign/leyabonas-campaign-burgundy-signature-details-01-square.png"),
    alt: "Burgundy shawl-collar three-piece suit with close-ups of embroidered logo, pocket detail and cuff monogram",
    note: "Campaign image",
  },
  groomsmen: {
    src: img("campaign/leyabonas-campaign-groomsman-01-portrait.png"),
    alt: "Six groomsmen in black suits around a groom in a cream tuxedo jacket",
    note: "Campaign poster",
  },
  lifestyle: {
    src: img("lifestyle/leyabonas-lifestyle-beige-three-piece-armchair-01-portrait.png"),
    alt: "Man in a beige three-piece suit and flat cap, seated in a green velvet armchair",
    note: "Mood image",
  },
  runway: {
    src: img("event/leyabonas-event-skemerberg-expo-navy-waistcoat-01-square.png"),
    alt: "Model in a navy sparkle waistcoat and flared trousers with crystal trim, holding the matching jacket",
  },
  directorPoster: {
    src: img("team/leyabonas-team-director-scongwana-poster-01-portrait.png"),
    alt: "Poster of Mr Scongwana, Director and Leader, in a royal blue suit and white hat",
  },
} as const;

export const site = {
  name: "Leyabona's Boutique",
  shortName: "Leyabona's",
  tagline: "Royal Family",
  description: "Men's formal wear for weddings, galas and events, in Midrand.",
  url: "https://leyabonas.sibuyane.co.za",
  locale: "en-ZA",
  whatsapp: { display: "064 820 4561", e164: "27648204561" },
  phone: { display: "064 820 4561", tel: "+27648204561" },
  otherPhones: null as string[] | null, // 074 207 6059, 063 803 0383: confirm before showing
  email: "leyabonasboutique@gmail.com",
  address: {
    line: "8 Incubation Hub, Riversand View, Midrand, 2021",
    mapsQuery: "8 Incubation Hub, Riversand View, Midrand, 2021",
    street: "8 Incubation Hub, Riversand View",
    locality: "Midrand",
    region: "Gauteng",
    postalCode: "2021",
    country: "ZA",
  },
  hours: null as string | null, // hidden until supplied
  chooseDay: null as string | null, // hidden until confirmed
  socials: {
    instagram: "https://www.instagram.com/leyabonas_boutique",
    facebook: "https://www.facebook.com/p/Leyabonas-Boutique-61553224335540/",
    tiktok: "https://www.tiktok.com/@leyabonas.boutiqu", // handle looks truncated; verify
  },
  recognition: {
    verified: false, // set true only after the owner shows proof
    lines: [
      "Legacy Awards People's Choice Nominee, 2025",
      "SAACI x ABSA SMME Funded, 2025",
    ],
  },
  images: IMAGES,

  seo: {
    title: "Leyabona's Boutique | Men's formal wear in Midrand",
    description:
      "Suits, tuxedos and groomsmen packages for weddings, galas and events in Midrand. WhatsApp us for sizes, colours and availability.",
    ogImageAlt: "Leyabona's Boutique logo on black",
  },

  demo: {
    ribbon: "Concept preview by Sibuyane",
    href: "https://sibuyane.co.za",
  },

  nav: [
    { label: "Occasions", href: "#occasions" },
    { label: "Groomsmen", href: "#groomsmen" },
    { label: "Collection", href: "#collection" },
    { label: "Details", href: "#details" },
    { label: "Visit", href: "#visit" },
  ],
  headerCta: "WhatsApp",
  menuLabel: "Menu",
  closeLabel: "Close",

  hero: {
    lines: ["Look good.", "Feel good.", "Be you."],
    sub: "Men's formal wear for weddings, galas and events, in Midrand.",
    primary: { label: "WhatsApp us", message: "Hi Leyabona's, I'd like to find out more about your formal wear." },
    secondary: { label: "See the collection", href: "#collection" },
    signature: "Royal Family",
    image: IMAGES.navyBlazer,
  },

  occasions: {
    heading: "Dressed for the day.",
    items: [
      { name: "Weddings", line: "Suits for the groom and the whole wedding party." },
      { name: "Groomsmen", line: "One quote for the full look, from suit to shoes." },
      { name: "Matric dances", line: "Sharp, confident, and right for the night." },
      { name: "Corporate events and galas", line: "Expert styling for awards, dinners and launches." },
      { name: "Red carpet", line: "Make a statement when the cameras are out." },
    ] as Occasion[],
    // Shown beside the list when no row has its own image.
    moodImage: IMAGES.lifestyle as Img | null,
    cta: { label: "Tell us about your occasion", message: "Hi Leyabona's, I'm dressing for an occasion and would like some help." },
  },

  groomsmen: {
    heading: "Let us dress your groomsman.",
    sub: "Look sharp. Feel confident. Make the day memorable.",
    includedLabel: "Included",
    included: ["Tailored suits", "Shirts and bow ties", "Formal shoes", "Vests and accessories", "Premium quality"],
    image: IMAGES.groomsmen,
    form: {
      heading: "Get a quote",
      countLabel: "Number of groomsmen",
      dateLabel: "Event date",
      colourLabel: "Colour preference",
      optional: "optional",
      colourPlaceholder: "e.g. black with gold",
      submit: "Request a groomsmen quote",
      min: 1,
      max: 30,
      countError: "Enter a number from 1 to 30.",
      dateError: "Choose your event date.",
      unspecified: "not decided yet",
      // {n}, {date} and {colour} are replaced when the button is pressed.
      template: "Hi Leyabona's, I'd like a quote for {n} groomsmen. Event date: {date}. Colour: {colour}.",
    },
  },

  collection: {
    heading: "The collection.",
    sub: "Ask us about sizes, colours and availability.",
    askLabel: "Ask about this item",
    // {item} is replaced with the item's askName.
    askTemplate: "Hi Leyabona's, I'm interested in the {item}. Is it available?",
    enlargeLabel: "View larger",
    items: [
      { name: "Safari blazer, burgundy", askName: "burgundy safari blazer", image: IMAGES.burgundyBlazer, kind: "photo", price: null },
      { name: "Safari blazer, black, with red polka-dot cravat", askName: "black safari blazer with the red polka-dot cravat", image: IMAGES.blackBlazer, kind: "photo", price: null },
      { name: "Safari blazer, navy, with gold paisley tie", askName: "navy safari blazer with the gold paisley tie", image: IMAGES.navyBlazer, kind: "photo", price: null },
      { name: "Black three-piece with gold trim", askName: "black three-piece with gold trim", image: IMAGES.blackGoldTrim, kind: "campaign", price: null },
      { name: "Burgundy shawl-collar three-piece", askName: "burgundy shawl-collar three-piece", image: IMAGES.burgundyDetails, kind: "campaign", price: null },
    ] as CollectionItem[],
  },

  details: {
    heading: "Details that carry your name.",
    image: IMAGES.burgundyDetails,
    points: ["Signature embroidered logo inside the jacket", "Signature pocket detail", "Custom monogram on the cuff"],
    cta: { label: "Ask about a monogram", message: "Hi Leyabona's, I'd like to ask about the signature details and a cuff monogram." },
  },

  runway: {
    heading: "Fashion and faith, on the runway.",
    body: "The Leyabona's team took part in the Skemerberg Wedding Expo runway in November 2025.",
    image: IMAGES.runway,
    // Source still shows carousel dots; the frame crops the bottom and right edge until the clean original arrives.
    cropSourceEdges: true,
    caption: "Photo: @kahlees_mafia. Model: @hotkenen. Venue: @skemerbergvenue.",
  },

  about: {
    heading: "About Leyabona's",
    quote: "Leading with vision, inspiring with action, building a royal family.",
    attribution: "Mr Scongwana, Director and Leader",
    portrait: null as Img | null, // plain portrait, when the owner supplies one
    demoPortrait: IMAGES.directorPoster as Img | null, // poster; shown only in demo mode
    recognitionLabel: "Recognition",
  },

  visit: {
    heading: "Come and see us.",
    addressLabel: "Address",
    directionsLabel: "Get directions",
    whatsappLabel: "WhatsApp",
    whatsappMessage: "Hi Leyabona's, I'd like to visit the boutique.",
    phoneLabel: "Call",
    emailLabel: "Email",
    hoursLabel: "Hours",
    chooseDayLabel: "Tuesday is Choose Day",
  },

  footer: {
    line: "Men's formal wear for weddings, galas and events, in Midrand.",
    socialLabels: { instagram: "Instagram", facebook: "Facebook", tiktok: "TikTok" },
  },

  sticky: { label: "WhatsApp us", message: "Hi Leyabona's, I'd like to find out more about your formal wear." },
};

export type Site = typeof site;
