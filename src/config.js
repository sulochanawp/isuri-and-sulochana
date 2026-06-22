// ============================================================
//  WEDDING CONFIGURATION — edit everything in this file
// ============================================================

export const WEDDING = {
  bride: "Isuri",
  groom: "Sulochana",
  // Used in hero headline: "Sarah & James"
  coupleInitials: "I & S",

  // Date shown to guests
  date: "Wednesday, 2nd December 2026",
  // JavaScript Date for the live countdown timer
  weddingDate: new Date("2026-12-02T16:00:00"),

  // Thank You section reveals at this moment (noon on the wedding day)
  thankYouRevealTime: new Date("2025-12-20T12:00:00"),

  // RSVP deadline shown to guests
  rsvpDeadline: "1st November 2025",

  venue: {
    name: "The Grand Walawwa",
    address: "Colombo 03, Sri Lanka",
    ceremonyTime: "4:00 PM",
    receptionTime: "6:30 PM",
    mapsUrl: "https://maps.google.com/?q=The+Grand+Walawwa",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.90570863385!2d80.34763939999999!3d7.2515717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae317381f4d3c17%3A0xcc3334b5c40daa6e!2sThe%20Grand%20Walawwa!5e0!3m2!1sen!2slk!4v1782069139673!5m2!1sen!2slk",
  },

  // WhatsApp contact number for guests to reach you (include country code, no + or spaces)
  whatsappNumber: "94771234567",   // ← replace with your real number

  // Thank you card photo — paste your direct image URL here
  // Google Drive: share the file publicly, then use:
  //   https://drive.google.com/uc?id=YOUR_FILE_ID&export=view
  thankYouPhotoUrl: "https://drive.google.com/file/d/193LzRASB-3pS_o_g5fyCapj0Oh1g9jSg/view?usp=sharing",

  // Paste your deployed Google Apps Script URL here
  // Format: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
  appsScriptUrl: "https://script.google.com/macros/s/AKfycbxXqQTa-M3sGzurc0Gny27JxhGFTrarEHvO3Qf0dphc1OkRjdOd1RZp-uddB__sRF_C/exec",

  // Optional: a short message shown on the hero
  heroMessage: "Together with their families, invite you to celebrate their marriage",
};

// ============================================================
//  AGENDA / ITINERARY
// ============================================================
export const AGENDA = [
  {
    time: "3:30 PM",
    title: "Guest Arrival",
    description: "Please be seated before the ceremony begins. Ushers will guide you to your seats.",
    icon: "🌸",
  },
  {
    time: "4:00 PM",
    title: "Wedding Ceremony",
    description: "The ceremony will begin promptly. We kindly ask guests to silence their phones.",
    icon: "💍",
  },
  {
    time: "4:45 PM",
    title: "Ceremony Concludes",
    description: "Congratulations to the newlyweds! Confetti will be provided for the send-off.",
    icon: "🎊",
  },
  {
    time: "5:00 PM",
    title: "Cocktail Hour",
    description: "Enjoy welcome drinks and canapés while the couple takes photographs.",
    icon: "🥂",
  },
  {
    time: "6:30 PM",
    title: "Reception Doors Open",
    description: "Please make your way to the ballroom and find your assigned seats.",
    icon: "✨",
  },
  {
    time: "7:00 PM",
    title: "Dinner is Served",
    description: "A three-course dinner will be served at your table.",
    icon: "🍽️",
  },
  {
    time: "8:30 PM",
    title: "First Dance & Speeches",
    description: "The couple's first dance, followed by heartfelt speeches from the wedding party.",
    icon: "💃",
  },
  {
    time: "9:00 PM",
    title: "Dancing & Celebrations",
    description: "The dance floor opens! Join us for a night of music and celebration.",
    icon: "🎶",
  },
  {
    time: "11:30 PM",
    title: "Last Dance",
    description: "One final dance before we bid the evening farewell.",
    icon: "🌙",
  },
  {
    time: "12:00 AM",
    title: "Send-Off",
    description: "Help us send the newlyweds off with sparklers as they begin their journey together.",
    icon: "🎇",
  },
];

// ============================================================
//  MENU
// ============================================================
export const MENU = {
  note: "Please indicate any dietary requirements when you RSVP. All dishes are prepared fresh on the day.",

  starters: [
    {
      name: "Garden Salad",
      description: "Mixed greens, cherry tomatoes, cucumber ribbons, house lemon vinaigrette",
      badges: ["V", "GF"],
    },
    {
      name: "Roasted Pumpkin Soup",
      description: "Velvety pumpkin bisque, toasted pepitas, swirl of cream",
      badges: ["V", "GF"],
    },
    {
      name: "Charcuterie & Cheese Board",
      description: "Cured meats, artisan cheeses, grapes, honey, sourdough crackers",
      badges: [],
    },
  ],

  mains: [
    {
      name: "Pan-Roasted Chicken Supreme",
      description: "Free-range chicken, herb jus, roasted seasonal vegetables, truffle mash",
      badges: ["GF"],
    },
    {
      name: "Atlantic Salmon Fillet",
      description: "Grilled salmon, lemon butter sauce, asparagus, wild rice pilaf",
      badges: ["GF"],
    },
    {
      name: "Beef Tenderloin",
      description: "6 oz filet mignon, red wine reduction, pomme purée, haricot verts",
      badges: ["GF"],
    },
    {
      name: "Wild Mushroom Risotto",
      description: "Arborio rice, porcini & shiitake mushrooms, parmesan, fresh thyme",
      badges: ["V", "GF"],
    },
  ],

  desserts: [
    {
      name: "Wedding Cake",
      description: "Layers of vanilla sponge, champagne buttercream, fresh floral decoration",
      badges: ["V"],
    },
    {
      name: "Warm Chocolate Fondant",
      description: "Valrhona chocolate, vanilla bean ice cream, raspberry coulis",
      badges: ["V"],
    },
    {
      name: "Pavlova",
      description: "Crisp meringue, Chantilly cream, fresh seasonal berries",
      badges: ["V", "GF"],
    },
  ],

  dietaryKey: [
    { code: "V",  label: "Vegetarian",  color: "bg-olive-50 text-olive-600 border border-olive-200" },
    { code: "GF", label: "Gluten Free", color: "bg-pearl-200 text-muted border border-pearl-300" },
  ],
};
