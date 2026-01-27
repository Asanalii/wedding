export const invitationConfig = {
  coupleNames: "Daniyar & Amanat",
  subtitle: "Wedding Ceremony",

  cover: {
    desktop: new URL("@/assets/images/cover-desktop.png", import.meta.url).href,
    mobile: new URL("@/assets/images/cover-mobile.png", import.meta.url).href,
  },

  eventDateTime: "2026-01-31T17:00:00+05:00", // UTC+5 (Астана)

  musicUrl:
    "https://dl.dropboxusercontent.com/s/agxcxm6pef0zkth/Ed%20Sheeran%20-%20Perfect%20%28Piano%29%20%28minus%205%29.mp3?st=6zhvreap&dl=0",

  location: {
    placeName: "Мейрамхана",
    address: "Тараз қ., Хан Сарайы",
    mapEmbedUrl: "https://www.google.com/maps/embed?pb=...", // вставишь потом
  },

  rsvp: {
    title: "ТОЙҒА ҚАТЫСУЫҢЫЗДЫ РАСТАУЫҢЫЗДЫ СҰРАЙМЫЗ!",
    deadline: "ЖАУАБЫН 31.01 ДЕЙІН КҮТЕМІЗ!",
    success: "Кездескенше!",
  },

  final: {
    topText: "ҚҰРМЕТПЕН, ТОЙ ИЕЛЕРІ",
    namesText: "Асанәлі - Асан",
  },
};
