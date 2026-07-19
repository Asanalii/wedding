// Общие (не зависящие от языка) данные
const shared = {
  eventDateTime: "2026-08-27T17:00:00+05:00", // 27.08.2026, UTC+5
  cover: {
    desktop: new URL("@/assets/images/cover-desktop.png", import.meta.url).href,
    mobile: new URL("@/assets/images/cover-mobile.png", import.meta.url).href,
  },
  musicUrl:
    "https://dl.dropboxusercontent.com/s/agxcxm6pef0zkth/Ed%20Sheeran%20-%20Perfect%20%28Piano%29%20%28minus%205%29.mp3?st=6zhvreap&dl=0",
  location: {
    placeName: '"Resident Ballroom"',
    mapLink: "https://2gis.kz/almaty",
  },
  palette: ["#7a6f5b", "#b8944d", "#d9c39a", "#8a9a7b", "#4a4436"],
};

// Список языков для переключателя
export const languages = [
  { code: "kk", label: "ҚАЗ", path: "/kk" },
  { code: "ru", label: "РУС", path: "/ru" },
  { code: "en", label: "ENG", path: "/en" },
];

export const configs = {
  // ===================== KAZAKH =====================
  kk: {
    ...shared,
    lang: "kk",
    coupleNames: "Асанәлі & Назерке",
    subtitle: "Той салтанаты",
    city: "АЛМАТЫ Қ.",
    details: {
      title: "ҚҰРМЕТТІ ҚОНАҚТАР!",
      text: "Сіздерді біздің өміріміздегі ең маңызды сәтті бірге сезінуге, әрі құрметті қонағымыз болуға шын ниетпен шақырамыз!",
      locationTitle: "МЕКЕНЖАЙЫ",
    },
    location: {
      ...shared.location,
      placeName: '"Resident Ballroom" мейрамханасы',
      address: "Желтоқсан көшесі 23, Алматы қ.",
      mapText: "Картадан қарау",
    },
    dress: {
      title: "ДРЕСС-КОД",
      subtitle: "Кешіміздің үйлесімді болуы үшін",
      menTitle: "Ерлерге",
      menText: "Классикалық костюм",
      womenTitle: "Әйелдерге",
      womenText: "Коктейльді, кешкі көйлектер",
    },
    countdown: {
      label: "Тойдың басталуына дейін",
      units: { days: "күн", hours: "сағат", minutes: "минут", seconds: "секунд" },
    },
    rsvp: {
      title: "ҚОНАҚ АНКЕТАСЫ",
      subtitle: "ТОЙҒА ҚАТЫСУЫҢЫЗДЫ РАСТАУЫҢЫЗДЫ СҰРАЙМЫЗ!",
      deadline: "ЖАУАБЫН 20.08 ДЕЙІН КҮТЕМІЗ!",
      nameLabel: "Сіздің аты-жөніңіз",
      partnerLabel: "Жұбайыңыздың есімі (егер келетін болса)",
      partnerHint: "Жұбайыңыздың есімін жазыңыз",
      attendanceLabel: "Тойға келесіз бе?",
      optionYes: "Иә, келемін",
      optionWithPartner: "Жұбайыммен келемін",
      optionNo: "Келмеймін",
      button: "Жіберу",
      sending: "Жіберілуде…",
      sent: "Рақмет! Жауабыңыз қабылданды ✓",
      noteTitle: "Өтініш",
      noteText: "Мобилографтарыңызды үйлеріңізге қалдырып кетіңіздер!",
    },
    final: {
      topText: "ҚҰРМЕТПЕН, ТОЙ ИЕЛЕРІ",
      namesText: "Асанәлі & Назерке",
    },
    months: [
      "қаңтар", "ақпан", "наурыз", "сәуір", "мамыр", "маусым",
      "шілде", "тамыз", "қыркүйек", "қазан", "қараша", "желтоқсан",
    ],
    weekdays: ["ДҮЙ", "СЕЙ", "СӘР", "БЕЙ", "ЖҰМ", "СЕН", "ЖЕК"],
  },

  // ===================== RUSSIAN =====================
  ru: {
    ...shared,
    lang: "ru",
    coupleNames: "Asanäli & Nazerke",
    subtitle: "Свадебная церемония",
    city: "Г. АЛМАТЫ",
    details: {
      title: "ДОРОГИЕ ГОСТИ!",
      text: "Мы от всего сердца приглашаем вас разделить с нами самый важный момент нашей жизни и стать почётными гостями нашего торжества!",
      locationTitle: "АДРЕС",
    },
    location: {
      ...shared.location,
      placeName: 'Ресторан "Resident Ballroom"',
      address: "ул. Желтоксан 23, г. Алматы",
      mapText: "Смотреть на карте",
    },
    dress: {
      title: "ДРЕСС-КОД",
      subtitle: "Чтобы наш вечер был гармоничным",
      menTitle: "Для мужчин",
      menText: "Классический костюм",
      womenTitle: "Для женщин",
      womenText: "Коктейльные и вечерние платья",
    },
    countdown: {
      label: "До начала торжества осталось",
      units: { days: "дней", hours: "часов", minutes: "минут", seconds: "секунд" },
    },
    rsvp: {
      title: "АНКЕТА ГОСТЯ",
      subtitle: "ПРОСИМ ПОДТВЕРДИТЬ ВАШЕ ПРИСУТСТВИЕ!",
      deadline: "ЖДЁМ ОТВЕТА ДО 20.08!",
      nameLabel: "Ваше имя и фамилия",
      partnerLabel: "Имя вашей второй половинки (если придёт)",
      partnerHint: "Укажите имя вашей второй половинки",
      attendanceLabel: "Придёте ли вы на торжество?",
      optionYes: "Да, приду",
      optionWithPartner: "Приду со второй половинкой",
      optionNo: "Не смогу прийти",
      button: "Отправить",
      sending: "Отправка…",
      sent: "Спасибо! Ваш ответ принят ✓",
      noteTitle: "Просьба",
      noteText: "Пожалуйста, оставьте ваших мобилографов дома!",
    },
    final: {
      topText: "С УВАЖЕНИЕМ, ХОЗЯЕВА ТОРЖЕСТВА",
      namesText: "Asanäli & Nazerke",
    },
    months: [
      "января", "февраля", "марта", "апреля", "мая", "июня",
      "июля", "августа", "сентября", "октября", "ноября", "декабря",
    ],
    weekdays: ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"],
  },

  // ===================== ENGLISH =====================
  en: {
    ...shared,
    lang: "en",
    coupleNames: "Asanäli & Nazerke",
    subtitle: "Wedding Ceremony",
    city: "ALMATY",
    details: {
      title: "DEAR GUESTS!",
      text: "We warmly invite you to share the most important moment of our lives with us and to be the honoured guests of our celebration!",
      locationTitle: "VENUE",
    },
    location: {
      ...shared.location,
      placeName: '"Resident Ballroom" Restaurant',
      address: "23 Zheltoksan St., Almaty",
      mapText: "View on map",
    },
    dress: {
      title: "DRESS CODE",
      subtitle: "To keep the evening in harmony",
      menTitle: "For men",
      menText: "Classic suit",
      womenTitle: "For women",
      womenText: "Cocktail & evening dresses",
    },
    countdown: {
      label: "Until the celebration begins",
      units: { days: "days", hours: "hours", minutes: "minutes", seconds: "seconds" },
    },
    rsvp: {
      title: "GUEST FORM",
      subtitle: "PLEASE CONFIRM YOUR ATTENDANCE!",
      deadline: "KINDLY REPLY BY 20.08!",
      nameLabel: "Your full name",
      partnerLabel: "Your partner's name (if attending)",
      partnerHint: "Please enter your partner's name",
      attendanceLabel: "Will you attend the celebration?",
      optionYes: "Yes, I will attend",
      optionWithPartner: "I'll come with my partner",
      optionNo: "I can't make it",
      button: "Submit",
      sending: "Sending…",
      sent: "Thank you! Your reply has been received ✓",
      noteTitle: "A kind request",
      noteText: "Please leave your own photographers at home!",
    },
    final: {
      topText: "WITH LOVE, THE HOSTS",
      namesText: "Asanäli & Nazerke",
    },
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December",
    ],
    weekdays: ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"],
  },
};

// Определяем язык по URL-пути (/ru, /en, /kk). По умолчанию — kk.
export function detectLang() {
  const path = window.location.pathname;
  if (/\/ru(\/|$)/.test(path)) return "ru";
  if (/\/en(\/|$)/.test(path)) return "en";
  if (/\/kk(\/|$)/.test(path)) return "kk";
  return "kk";
}

export function getConfig(lang) {
  return configs[lang] || configs.kk;
}
