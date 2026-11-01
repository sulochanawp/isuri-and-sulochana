// ============================================================
//  WEDDING CONFIGURATION — edit everything in this file
// ============================================================

export const WEDDING = {
  bride: "Isuri",
  groom: "Sulochana",

  // Date shown to guests
  date: "Wednesday, 2nd December 2026",
  // JavaScript Date for the live countdown timer
  weddingDate: new Date("2026-12-02T09:00:00"),

  // Until this moment the whole site shows only the Save the Date page.
  // After it passes, the full site (seating, agenda, menu) opens automatically.
  // Add ?view=site to preview the full site before then, or ?view=savethedate
  // to preview the Save the Date page at any time.
  siteOpenTime: new Date("2026-11-01T09:00:00"),   // ← set your date

  // Thank You section reveals at this moment (noon on the wedding day)
  thankYouRevealTime: new Date("2025-12-20T12:00:00"),

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


  // Photo upload page reveals at this time (morning of the wedding day)
  photoRevealTime: new Date("2025-12-02T07:00:00"),

  // Google Drive folder ID where guest photos are saved.
  // Create a folder in Drive, share it with the Apps Script service account (or keep it private),
  // and paste the folder ID here (last segment of the folder URL).
  photoUploadFolderId: "1rw3Y8MFdm5ZxSOp8C44d175BPOt_fecy",

};

// ============================================================
//  AGENDA / ITINERARY
// ============================================================
export const AGENDA = [
  {
    time: "9:00 AM",
    title: "Guest Arrival",
    description: "Welcome! Please be seated before the ceremony begins. Ushers will guide you to your seats.",
  },
  {
    time: "9:30 AM",
    title: "Poruwa Ceremony",
    description: "The traditional Sri Lankan Poruwa ceremony. Join us as we exchange vows and blessings on the Poruwa.",
  },
  {
    time: "11:00 AM",
    title: "Open Bar",
    description: "Raise a glass with the newlyweds! A selection of cocktails and mocktails will be available while the couple takes photographs. See the Menu section for the full drinks list.",
  },
  {
    time: "1:00 PM",
    title: "Lunch Buffet",
    description: "The buffet opens. Please help yourself to a selection of Sri Lankan and international dishes. See the Menu section for the full list of dishes.",
  },
  {
    time: "3:00 PM",
    title: "Dancing & Celebrations",
    description: "The dance floor opens! Join us for music, dancing, and celebration.",
  },
  {
    time: "4:00 PM",
    title: "Going Away",
    description: "Help us send off the newlyweds as they leave the hotel and begin their journey together.",
  },
];

// ============================================================
//  MENU
// ============================================================
export const MENU = {
  note: "All dishes are prepared fresh on the day.",
 
  starters: [
    {
      name: "Apple Welcome Drink",
      description: "Refreshing chilled apple juice served as a welcome beverage",
      badges: ["V"],
    },
    {
      name: "Beetroot Orange Salad",
      description: "Roasted beetroot with fresh orange segments and a light citrus dressing",
      badges: ["V"],
    },
    {
      name: "Greek Salad",
      description: "Crisp cucumber, tomatoes, onions, olives, and feta cheese with oregano and olive oil",
      badges: ["V"],
    },
    {
      name: "Tuna Green Beans and Egg Salad",
      description: "Flaked tuna with tender green beans, boiled egg, and fresh vegetables",
      badges: [],
    },
    {
      name: "Cream of Mushroom Soup",
      description: "Smooth, velvety soup of sautéed mushrooms finished with fresh cream",
      badges: ["V"],
    },
    {
      name: "Curry Flavored Mayo",
      description: "Creamy mayonnaise blended with mild curry spices",
      badges: [],
    },
    {
      name: "Garlic Mayo",
      description: "Creamy garlic mayonnaise served as a dipping sauce",
      badges: [],
    },
    {
      name: "French Vinaigrette",
      description: "Classic dressing of olive oil, vinegar, and Dijon mustard",
      badges: ["V"],
    },
    {
      name: "Passion Fruit Dressing",
      description: "Sweet and tangy dressing made with fresh passion fruit",
      badges: ["V"],
    },
    {
      name: "Lemon Ginger Dressing",
      description: "Zesty dressing of fresh lemon and ginger with a light, refreshing kick",
      badges: ["V"],
    },
  ],
 
  mains: [
    {
      name: "Vegetable Fried Rice",
      description: "Wok-fried rice with mixed vegetables and light savory seasoning",
      badges: ["V"],
    },
    {
      name: "Steamed Basmati Rice",
      description: "Fragrant long-grain basmati rice, lightly steamed until fluffy",
      badges: ["V"],
    },
    {
      name: "Yellow Ghee Rice with Fried Cashew",
      description: "Aromatic turmeric rice cooked in ghee with whole spices, topped with golden fried cashews",
      badges: ["V"],
    },
    {
      name: "Baked Macaroni",
      description: "Macaroni baked in a creamy cheese sauce with a golden, crispy top",
      badges: ["V"],
    },
    {
      name: "Chicken Black Curry",
      description: "Sri Lankan-style chicken curry cooked with roasted spices and rich curry gravy",
      badges: [],
    },
    {
      name: "Fried Calamari",
      description: "Tender calamari rings, lightly battered and fried until crisp",
      badges: [],
    },
    {
      name: "Dhal Tempered",
      description: "Sri Lankan lentil curry tempered with onions, curry leaves, and spices",
      badges: ["V"],
    },
    {
      name: "Cashew and Green Pea Curry",
      description: "Creamy Sri Lankan curry of tender cashews and green peas in spiced coconut milk",
      badges: ["V"],
    },
    {
      name: "Oven Roast Rosemary Potato",
      description: "Potatoes roasted with rosemary, garlic, and olive oil until golden and crisp",
      badges: ["V"],
    },
    {
      name: "Batu Moju",
      description: "Sri Lankan sweet and sour eggplant pickle with onions, spices, and gentle heat",
      badges: ["V"],
    },
    {
      name: "Stir Fried Vegetable",
      description: "Seasonal vegetables tossed in a hot wok with garlic and light seasoning",
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
      name: "Crème Brûlée",
      description: "Rich vanilla custard topped with a crisp layer of caramelized sugar",
      badges: [],
    },
    {
      name: "Fruit Trifle",
      description: "Layers of sponge cake, fruit, jelly, custard, and cream",
      badges: [],
    },
    {
      name: "Assorted Mousse",
      description: "A selection of light, airy mousses in a variety of flavors",
      badges: [],
    },
    {
      name: "Vanilla Ice Cream",
      description: "Classic creamy vanilla ice cream served chilled",
      badges: ["V"],
    },
  ],

  // Shown under the drinks list
  drinksNote: "Cocktails are subject to the availability of liquor. Mocktails are unlimited.",

  drinks: [
    {
      name: "Old Fashioned",
      description: "Whisky stirred with sugar and bitters, finished with an orange twist",
      badges: ["C"],
    },
    {
      name: "Whisky Flip",
      description: "Whisky shaken with egg and sugar, topped with a dusting of nutmeg",
      badges: ["C"],
    },
    {
      name: "Vodka Lemonade",
      description: "Vodka topped with fresh lemonade over ice",
      badges: ["C"],
    },
    {
      name: "Moscow Mule",
      description: "Vodka with ginger beer and fresh lime",
      badges: ["C"],
    },
    {
      name: "Gin and Tonic",
      description: "Gin and tonic over ice with a slice of lime",
      badges: ["C"],
    },
    {
      name: "Mojito Collection",
      description: "Alcohol-free mojitos of fresh mint and lime in a selection of flavors",
      badges: ["M"],
    },
    {
      name: "Man-Go Colada",
      description: "Alcohol-free blend of mango, pineapple, and coconut",
      badges: ["M"],
    },
  ],

  // icon: "leaf", "cocktail" or "mocktail"
  dietaryKey: [
    { code: "V", label: "Vegetarian", icon: "leaf",  color: "bg-olive-50 text-olive-600 border border-olive-200" },
    { code: "C", label: "Cocktail",   icon: "cocktail", color: "bg-pearl-200 text-earth border border-pearl-400" },
    { code: "M", label: "Mocktail",   icon: "mocktail", color: "bg-olive-50 text-olive-600 border border-olive-200" },
  ],
};
