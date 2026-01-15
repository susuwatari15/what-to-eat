export const translations = {
  en: {
    title: "What to Eat?",
    subtitle: "Can't decide? Create your own meal collections or pick from the default list!",
    myCollections: "My Collections",
    newCollection: "New Collection",
    collectionName: "Collection name",
    create: "Create",
    cancel: "Cancel",
    addDish: "Add Dish",
    enterDishName: "Enter a dish name",
    add: "Add",
    dishes: "Dishes",
    bulkAdd: "Bulk Add",
    bulkImport: "Enter meals separated by commas",
    bulkImportPlaceholder: "e.g., Pizza, Sushi, Pasta",
    getRandomMeal: "✨ Get a Random Meal",
    gettingMeal: "🔄 Getting a meal...",
    noDishes: "⚠️ No dishes",
    addDishesfirst: "Add some dishes to this collection first!",
    pickFrom: "Pick from",
    dishesAvailable: "dishes available",
    notFeeling: "Not feeling it? Click again to get another suggestion!",
    loadingCollections: "Loading collections...",
  },
  vi: {
    title: "Ăn Gì Bây Giờ?",
    subtitle: "Không biết ăn gì? Tạo bộ sưu tập riêng của bạn hoặc chọn từ danh sách mặc định!",
    myCollections: "Bộ Sưu Tập Của Tôi",
    newCollection: "Bộ Sưu Tập Mới",
    collectionName: "Tên bộ sưu tập",
    create: "Tạo",
    cancel: "Hủy",
    addDish: "Thêm Món Ăn",
    enterDishName: "Nhập tên món ăn",
    add: "Thêm",
    dishes: "Món ăn",
    bulkAdd: "Thêm Nhiều",
    bulkImport: "Nhập danh sách (cách nhau bằng dấu phẩy)",
    bulkImportPlaceholder: "Ví dụ: Phở, Cơm Tấm, Bánh Mì",
    getRandomMeal: "✨ Chọn Ngẫu Nhiên",
    gettingMeal: "🔄 Đang chọn...",
    noDishes: "⚠️ Không có món",
    addDishesfirst: "Thêm món ăn vào bộ sưu tập này trước!",
    pickFrom: "Chọn từ",
    dishesAvailable: "món ăn có sẵn",
    notFeeling: "Không thích? Bấm lại để chọn món khác!",
    loadingCollections: "Đang tải bộ sưu tập...",
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof (typeof translations)["en"]

export const getDefaultLanguage = (): Language => {
  if (typeof window === "undefined") return "en"
  const browserLang = navigator.language.split("-")[0]
  return browserLang === "vi" ? "vi" : "en"
}

export const translate = (lang: Language, key: TranslationKey): string => {
  return translations[lang][key]
}
