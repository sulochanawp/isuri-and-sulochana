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
    address: "No 190/8, Kandy Road, Kegalle, Sri Lanka",
    ceremonyTime: "9:00 AM",
    mapsUrl: "https://maps.google.com/?q=The+Grand+Walawwa",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.90570863385!2d80.34763939999999!3d7.2515717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae317381f4d3c17%3A0xcc3334b5c40daa6e!2sThe%20Grand%20Walawwa!5e0!3m2!1sen!2slk!4v1782069139673!5m2!1sen!2slk",
  },

  // Contact numbers for guests (include country code, no + or spaces)
  contacts: [
    { name: "Isuri",     whatsapp: "94771234567" },   // ← replace
    { name: "Sulochana", whatsapp: "94777654321" },   // ← replace
  ],

  // Google Drive folder ID for the thank you card photo.
  // Create a folder in Drive, share it publicly (Anyone with link → Viewer),
  // put ONE image inside it, and paste the folder ID here.
  // Folder URL: https://drive.google.com/drive/folders/FOLDER_ID  ← this part
  thankYouFolderId: "17djfjIh3qqe3Oe-u9oPH_1-lAJPlNG2o",

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
    name: "Black Currant Welcome Drink",
    description: "Refreshing chilled black currant drink served as a welcome beverage",
    badges: ["V"],
  },
  {
    name: "Thai Chicken on Baked Vegetables",
    description: "Tender Thai-style chicken served over seasoned baked vegetables",
    badges: [],
  },
  {
    name: "Grilled Vegetable Salad",
    description: "Char-grilled seasonal vegetables tossed with light herbs and dressing",
    badges: ["V"],
  },
  {
    name: "Chicken Hawaiian Salad",
    description: "Chicken salad with tropical pineapple, vegetables, and creamy dressing",
    badges: [],
  },
  {
    name: "Tuna Salad with Green Papaya",
    description: "Flaked tuna with crisp green papaya, fresh vegetables, and tangy dressing",
    badges: [],
  },
  {
    name: "Garlic Mayo",
    description: "Creamy garlic mayonnaise served as a dipping sauce",
    badges: [],
  },
  {
    name: "Noodles & Seafood Red Soup",
    description: "Spicy red soup with noodles, seafood, vegetables, and aromatic spices",
    badges: [],
  },
],

mains: [
  {
    name: "Steamed Basmati Rice",
    description: "Fragrant long-grain basmati rice, lightly steamed until fluffy",
    badges: ["V"],
  },
  {
    name: "Vegetable and Tofu Noodles",
    description: "Stir-fried noodles with mixed vegetables, tofu, and savory seasoning",
    badges: ["V"],
  },
  {
    name: "Chicken Fried Noodles",
    description: "Wok-fried noodles with chicken, vegetables, and flavorful Asian seasoning",
    badges: [],
  },
  {
    name: "Chicken Black Curry",
    description: "Sri Lankan-style chicken curry cooked with roasted spices and rich curry gravy",
    badges: [],
  },
  {
    name: "Fish Stew with Vegetables",
    description: "Tender fish simmered with vegetables in a light, mildly spiced stew",
    badges: [],
  },
  {
    name: "Dhal Tempered",
    description: "Sri Lankan lentil curry tempered with onions, curry leaves, and spices",
    badges: ["V"],
  },
  {
    name: "Green Bean Curry",
    description: "Sri Lankan-style green beans cooked in coconut curry with aromatic spices",
    badges: ["V"],
  },
  {
    name: "Cauliflower & Potato White Curry",
    description: "Cauliflower and potatoes simmered in a mild coconut-based white curry",
    badges: ["V"],
  },
  {
    name: "Batu Moju",
    description: "Sri Lankan sweet and sour eggplant pickle with onions, spices, and gentle heat",
    badges: ["V"],
  },
],

desserts: [
  {
    name: "Sri Lankan Cut Fruits",
    description: "Selection of fresh seasonal Sri Lankan fruits, sliced and served chilled",
    badges: ["V"],
  },
  {
    name: "Broken Jelly",
    description: "Colorful jelly pieces served as a light and refreshing dessert",
    badges: [],
  },
  {
    name: "Watalappam",
    description: "Traditional Sri Lankan coconut and jaggery custard flavored with warm spices",
    badges: [],
  },
  {
    name: "Ice Cream",
    description: "Classic chilled ice cream served as a creamy dessert option",
    badges: ["V"],
  },
],

  dietaryKey: [
    { code: "V", label: "Vegetarian", color: "bg-olive-50 text-olive-600 border border-olive-200" },
  ],
};
