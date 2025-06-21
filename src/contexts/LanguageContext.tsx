import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Language {
  name: string;
  code: string;
  flag: string;
}

export const languages: Language[] = [
  { "name": "Deutsch", "code": "de", "flag": "🇩🇪" },
  { "name": "English", "code": "en", "flag": "🇬🇧" },
  { "name": "Türkçe", "code": "tr", "flag": "🇹🇷" },
  { "name": "Русский", "code": "ru", "flag": "🇷🇺" },
  { "name": "Polski", "code": "pl", "flag": "🇵🇱" },
  { "name": "العربية", "code": "ar", "flag": "🇸🇦" },
  { "name": "Kurdî", "code": "ku", "flag": "🏳️" },
  { "name": "Italiano", "code": "it", "flag": "🇮🇹" },
  { "name": "Bosanski", "code": "bs", "flag": "🇧🇦" },
  { "name": "Hrvatski", "code": "hr", "flag": "🇭🇷" },
  { "name": "Srpski", "code": "sr", "flag": "🇷🇸" },
  { "name": "Română", "code": "ro", "flag": "🇷🇴" },
  { "name": "Ελληνικά", "code": "el", "flag": "🇬🇷" },
  { "name": "Español", "code": "es", "flag": "🇪🇸" },
  { "name": "Français", "code": "fr", "flag": "🇫🇷" },
  { "name": "हिन्दी", "code": "hi", "flag": "🇮🇳" },
  { "name": "اردو", "code": "ur", "flag": "🇵🇰" },
  { "name": "Tiếng Việt", "code": "vi", "flag": "🇻🇳" },
  { "name": "中文", "code": "zh", "flag": "🇨🇳" },
  { "name": "فارسی", "code": "fa", "flag": "🇮🇷" },
  { "name": "پښتو", "code": "ps", "flag": "🇦🇫" },
  { "name": "தமிழ்", "code": "ta", "flag": "🇱🇰" },
  { "name": "Shqip", "code": "sq", "flag": "🇦🇱" },
  { "name": "Dansk", "code": "da", "flag": "🇩🇰" },
  { "name": "Українська", "code": "uk", "flag": "🇺🇦" }
];

interface LanguageContextType {
  currentLanguage: string;
  setLanguage: (code: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

const detectLanguageFromBrowser = (): string => {
  const browserLang = navigator.language.split('-')[0];
  const supportedCodes = languages.map(lang => lang.code);
  return supportedCodes.includes(browserLang) ? browserLang : 'de';
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<string>('de');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && languages.some(lang => lang.code === savedLanguage)) {
      setCurrentLanguage(savedLanguage);
    } else {
      const detectedLanguage = detectLanguageFromBrowser();
      setCurrentLanguage(detectedLanguage);
    }
  }, []);

  const setLanguage = (code: string) => {
    setCurrentLanguage(code);
    localStorage.setItem('selectedLanguage', code);
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations['de'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: Record<string, Record<string, string>> = {
  de: {
    title: "Müll-Sortierhilfe",
    subtitle: "Richtige Mülltrennung in Deutschland",
    description: "Geben Sie Ihre Postleitzahl ein und laden Sie ein Foto Ihres Mülls hoch. Wir helfen Ihnen dabei, ihn richtig zu sortieren.",
    postalCodePlaceholder: "Postleitzahl eingeben (z.B. 10115)",
    uploadPhoto: "Foto hochladen",
    uploadPhotoDescription: "Klicken Sie hier oder ziehen Sie ein Foto Ihres Mülls hierher",
    whyImportant: "Warum ist richtige Mülltrennung wichtig?",
    reason1: "Umweltschutz durch Recycling und Wiederverwertung",
    reason2: "Reduzierung der Deponiemenge und CO2-Emissionen",
    reason3: "Einhaltung der deutschen Umweltgesetze",
    reason4: "Kosteneinsparungen bei der Müllentsorgung",
    languageSelector: "Sprache wählen"
  },
  en: {
    title: "Waste Sorting Helper",
    subtitle: "Proper Waste Separation in Germany",
    description: "Enter your postal code and upload a photo of your waste. We'll help you sort it correctly.",
    postalCodePlaceholder: "Enter postal code (e.g. 10115)",
    uploadPhoto: "Upload Photo",
    uploadPhotoDescription: "Click here or drag a photo of your waste here",
    whyImportant: "Why is proper waste sorting important?",
    reason1: "Environmental protection through recycling and reuse",
    reason2: "Reduction of landfill waste and CO2 emissions",
    reason3: "Compliance with German environmental laws",
    reason4: "Cost savings in waste disposal",
    languageSelector: "Select Language"
  },
  tr: {
    title: "Atık Ayırma Yardımcısı",
    subtitle: "Almanya'da Doğru Atık Ayrımı",
    description: "Posta kodunuzu girin ve atığınızın fotoğrafını yükleyin. Doğru şekilde ayırmanıza yardımcı olalım.",
    postalCodePlaceholder: "Posta kodu girin (örn. 10115)",
    uploadPhoto: "Fotoğraf Yükle",
    uploadPhotoDescription: "Buraya tıklayın veya atığınızın fotoğrafını buraya sürükleyin",
    whyImportant: "Doğru atık ayırma neden önemli?",
    reason1: "Geri dönüşüm ve yeniden kullanım yoluyla çevre koruma",
    reason2: "Depolama alanı atığının ve CO2 emisyonlarının azaltılması",
    reason3: "Alman çevre yasalarına uyum",
    reason4: "Atık bertarafında maliyet tasarrufu",
    languageSelector: "Dil Seç"
  },
  ru: {
    title: "Помощник по сортировке мусора",
    subtitle: "Правильная сортировка отходов в Германии",
    description: "Введите ваш почтовый индекс и загрузите фото вашего мусора. Мы поможем правильно его отсортировать.",
    postalCodePlaceholder: "Введите почтовый индекс (напр. 10115)",
    uploadPhoto: "Загрузить фото",
    uploadPhotoDescription: "Нажмите здесь или перетащите фото вашего мусора сюда",
    whyImportant: "Почему важна правильная сортировка мусора?",
    reason1: "Защита окружающей среды через переработку и повторное использование",
    reason2: "Сокращение количества свалок и выбросов CO2",
    reason3: "Соблюдение немецкого экологического законодательства",
    reason4: "Экономия средств на утилизации отходов",
    languageSelector: "Выбрать язык"
  },
  pl: {
    title: "Asystent Sortowania Odpadów",
    subtitle: "Prawidłowa segregacja odpadów w Niemczech",
    description: "Wprowadź swój kod pocztowy i prześlij zdjęcie swoich odpadów. Pomożemy Ci je prawidłowo posortować.",
    postalCodePlaceholder: "Wprowadź kod pocztowy (np. 10115)",
    uploadPhoto: "Prześlij zdjęcie",
    uploadPhotoDescription: "Kliknij tutaj lub przeciągnij zdjęcie swoich odpadów tutaj",
    whyImportant: "Dlaczego prawidłowa segregacja odpadów jest ważna?",
    reason1: "Ochrona środowiska poprzez recykling i ponowne wykorzystanie",
    reason2: "Redukcja odpadów składowiskowych i emisji CO2",
    reason3: "Zgodność z niemieckimi prawami środowiskowymi",
    reason4: "Oszczędności kosztów w utylizacji odpadów",
    languageSelector: "Wybierz język"
  },
  ar: {
    title: "مساعد فرز النفايات",
    subtitle: "فصل النفايات الصحيح في ألمانيا",
    description: "أدخل الرمز البريدي وارفع صورة لنفاياتك. سنساعدك في فرزها بشكل صحيح.",
    postalCodePlaceholder: "أدخل الرمز البريدي (مثال 10115)",
    uploadPhoto: "رفع صورة",
    uploadPhotoDescription: "انقر هنا أو اسحب صورة نفاياتك هنا",
    whyImportant: "لماذا فرز النفايات الصحيح مهم؟",
    reason1: "حماية البيئة من خلال إعادة التدوير وإعادة الاستخدام",
    reason2: "تقليل نفايات المكبات وانبعاثات ثاني أكسيد الكربون",
    reason3: "الامتثال لقوانين البيئة الألمانية",
    reason4: "توفير التكاليف في التخلص من النفايات",
    languageSelector: "اختر اللغة"
  },
  ku: {
    title: "Alîkarê Veqetandina Zibilê",
    subtitle: "Veqetandina Rast a Zibilê li Almanyayê",
    description: "Koda xwe ya postê binivîse û wêneyê zibilê xwe bar bike. Em ê alîkariya te bikin ku ew bi rengekî rast veqetînî.",
    postalCodePlaceholder: "Koda postê binivîse (mînak 10115)",
    uploadPhoto: "Wêne Bar Bike",
    uploadPhotoDescription: "Li vir bitikîne an wêneyê zibilê xwe li vir bikişîne",
    whyImportant: "Çima veqetandina rast a zibilê girîng e?",
    reason1: "Parastina jîngehê bi rêya dووbarekar û dووbarebikaranînê",
    reason2: "Kêmkirina zibilên çalê û belavbûna CO2",
    reason3: "Lêpirsîna yasayên jîngehê yên Almanyayê",
    reason4: "Xilasbûna pere di avêtina zibilê de",
    languageSelector: "Ziman Hilbijêre"
  },
  it: {
    title: "Assistente per la Raccolta Differenziata",
    subtitle: "Corretta separazione dei rifiuti in Germania",
    description: "Inserisci il tuo codice postale e carica una foto dei tuoi rifiuti. Ti aiuteremo a smaltirli correttamente.",
    postalCodePlaceholder: "Inserisci codice postale (es. 10115)",
    uploadPhoto: "Carica Foto",
    uploadPhotoDescription: "Clicca qui o trascina una foto dei tuoi rifiuti qui",
    whyImportant: "Perché la corretta raccolta differenziata è importante?",
    reason1: "Protezione ambientale attraverso riciclaggio e riutilizzo",
    reason2: "Riduzione dei rifiuti in discarica e delle emissioni di CO2",
    reason3: "Conformità alle leggi ambientali tedesche",
    reason4: "Risparmio sui costi di smaltimento rifiuti",
    languageSelector: "Seleziona Lingua"
  },
  bs: {
    title: "Asistent za Sortiranje Otpada",
    subtitle: "Pravilno Razvrstavanje Otpada u Njemačkoj",
    description: "Unesite svoj poštanski broj i učitajte fotografiju svog otpada. Pomoći ćemo vam da ga pravilno razvrstite.",
    postalCodePlaceholder: "Unesite poštanski broj (npr. 10115)",
    uploadPhoto: "Učitaj Fotografiju",
    uploadPhotoDescription: "Kliknite ovdje ili povucite fotografiju svog otpada ovdje",
    whyImportant: "Zašto je pravilno sortiranje otpada važno?",
    reason1: "Zaštita okoliša kroz recikliranje i ponovnu upotrebu",
    reason2: "Smanjenje otpada na deponijama i CO2 emisija",
    reason3: "Pridržavanje njemačkih zakona o okolišu",
    reason4: "Uštede troškova u zbrinjavanju otpada",
    languageSelector: "Odaberite Jezik"
  },
  hr: {
    title: "Asistent za Sortiranje Otpada",
    subtitle: "Pravilno Razvrstavanje Otpada u Njemačkoj",
    description: "Unesite svoj poštanski broj i učitajte fotografiju svog otpada. Pomoći ćemo vam da ga pravilno razvrstite.",
    postalCodePlaceholder: "Unesite poštanski broj (npr. 10115)",
    uploadPhoto: "Učitaj Fotografiju",
    uploadPhotoDescription: "Kliknite ovdje ili povucite fotografiju svog otpada ovdje",
    whyImportant: "Zašto je pravilno sortiranje otpada važno?",
    reason1: "Zaštita okoliša kroz recikliranje i ponovnu upotrebu",
    reason2: "Smanjenje otpada na odlagalištima i CO2 emisija",
    reason3: "Pridržavanje njemačkih zakona o okolišu",
    reason4: "Uštede troškova u zbrinjavanju otpada",
    languageSelector: "Odaberite Jezik"
  },
  sr: {
    title: "Асистент за Сортирање Отпада",
    subtitle: "Правилно Разврставање Отпада у Немачкој",
    description: "Унесите свој поштански број и учитајте фотографију свог отпада. Помоћи ћемо вам да га правилно развrstите.",
    postalCodePlaceholder: "Унесите поштански број (нпр. 10115)",
    uploadPhoto: "Учитај Фотографију",
    uploadPhotoDescription: "Кликните овде или повуците фотографију свог отпада овде",
    whyImportant: "Зашто је правилно сортирање отпада важно?",
    reason1: "Заштита животне средине кроз рециклирање и поновну употребу",
    reason2: "Смањење отпада на депонијама и CO2 емисија",
    reason3: "Придржавање немачких закона о животној средини",
    reason4: "Уштеде трошкова у збрињавању отпада",
    languageSelector: "Одаберите Језик"
  },
  ro: {
    title: "Asistent pentru Sortarea Deșeurilor",
    subtitle: "Separarea Corectă a Deșeurilor în Germania",
    description: "Introduceți codul poștal și încărcați o fotografie a deșeurilor. Vă vom ajuta să le sortați corect.",
    postalCodePlaceholder: "Introduceți codul poștal (ex. 10115)",
    uploadPhoto: "Încărcați Fotografia",
    uploadPhotoDescription: "Faceți clic aici sau trageți o fotografie a deșeurilor aici",
    whyImportant: "De ce este importantă sortarea corectă a deșeurilor?",
    reason1: "Protecția mediului prin reciclare și reutilizare",
    reason2: "Reducerea deșeurilor de la groapa de gunoi și emisiilor de CO2",
    reason3: "Respectarea legilor de mediu germane",
    reason4: "Economii de costuri în eliminarea deșeurilor",
    languageSelector: "Selectați Limba"
  },
  el: {
    title: "Βοηθός Διαχωρισμού Απορριμμάτων",
    subtitle: "Σωστός Διαχωρισμός Απορριμμάτων στη Γερμανία",
    description: "Εισάγετε τον ταχυδρομικό σας κώδικα και ανεβάστε μια φωτογραφία των απορριμμάτων σας. Θα σας βοηθήσουμε να τα διαχωρίσετε σωστά.",
    postalCodePlaceholder: "Εισάγετε ταχυδρομικό κώδικα (π.χ. 10115)",
    uploadPhoto: "Ανέβασμα Φωτογραφίας",
    uploadPhotoDescription: "Κάντε κλικ εδώ ή σύρετε μια φωτογραφία των απορριμμάτων σας εδώ",
    whyImportant: "Γιατί είναι σημαντικός ο σωστός διαχωρισμός απορριμμάτων;",
    reason1: "Προστασία περιβάλλοντος μέσω ανακύκλωσης και επαναχρησιμοποίησης",
    reason2: "Μείωση απορριμμάτων ΧΥΤΑ και εκπομπών CO2",
    reason3: "Συμμόρφωση με τους γερμανικούς περιβαλλοντικούς νόμους",
    reason4: "Εξοικονόμηση κόστους στη διάθεση απορριμμάτων",
    languageSelector: "Επιλέξτε Γλώσσα"
  },
  es: {
    title: "Asistente de Clasificación de Residuos",
    subtitle: "Separación Correcta de Residuos en Alemania",
    description: "Ingrese su código postal y suba una foto de sus residuos. Le ayudaremos a clasificarlos correctamente.",
    postalCodePlaceholder: "Ingrese código postal (ej. 10115)",
    uploadPhoto: "Subir Foto",
    uploadPhotoDescription: "Haga clic aquí o arrastre una foto de sus residuos aquí",
    whyImportant: "¿Por qué es importante la clasificación correcta de residuos?",
    reason1: "Protección ambiental a través del reciclaje y reutilización",
    reason2: "Reducción de residuos de vertedero y emisiones de CO2",
    reason3: "Cumplimiento de las leyes ambientales alemanas",
    reason4: "Ahorro de costos en la eliminación de residuos",
    languageSelector: "Seleccionar Idioma"
  },
  fr: {
    title: "Assistant de Tri des Déchets",
    subtitle: "Séparation Correcte des Déchets en Allemagne",
    description: "Entrez votre code postal et téléchargez une photo de vos déchets. Nous vous aiderons à les trier correctement.",
    postalCodePlaceholder: "Entrez le code postal (ex. 10115)",
    uploadPhoto: "Télécharger Photo",
    uploadPhotoDescription: "Cliquez ici ou faites glisser une photo de vos déchets ici",
    whyImportant: "Pourquoi le tri correct des déchets est-il important?",
    reason1: "Protection de l'environnement par le recyclage et la réutilisation",
    reason2: "Réduction des déchets d'enfouissement et des émissions de CO2",
    reason3: "Conformité aux lois environnementales allemandes",
    reason4: "Économies de coûts dans l'élimination des déchets",
    languageSelector: "Sélectionner la Langue"
  },
  hi: {
    title: "कचरा छंटाई सहायक",
    subtitle: "जर्मनी में उचित कचरा पृथक्करण",
    description: "अपना पोस्टल कोड दर्ज करें और अपने कचरे की एक तस्वीर अपलोड करें। हम आपको इसे सही तरीके से छांटने में मदद करेंगे।",
    postalCodePlaceholder: "पोस्टल कोड दर्ज करें (जैसे 10115)",
    uploadPhoto: "फोटो अपलोड करें",
    uploadPhotoDescription: "यहाँ क्लिक करें या अपने कचरे की एक तस्वीर यहाँ खींचें",
    whyImportant: "उचित कचरा छंटाई क्यों महत्वपूर्ण है?",
    reason1: "पुनर्चक्रण और पुन: उपयोग के माध्यम से पर्यावरण संरक्षण",
    reason2: "लैंडफिल कचरे और CO2 उत्सर्जन में कमी",
    reason3: "जर्मन पर्यावरण कानूनों का अनुपालन",
    reason4: "कचरा निपटान में लागत बचत",
    languageSelector: "भाषा का चयन करें"
  },
  ur: {
    title: "کچرا چھانٹنے کا مددگار",
    subtitle: "جرمنی میں صحیح کچرا الگ کرنا",
    description: "اپنا پوسٹل کوڈ داخل کریں اور اپنے کچرے کی تصویر اپ لوڈ کریں۔ ہم آپ کو اسے صحیح طریقے سے چھانٹنے میں مدد کریں گے۔",
    postalCodePlaceholder: "پوسٹل کوڈ داخل کریں (مثال 10115)",
    uploadPhoto: "تصویر اپ لوڈ کریں",
    uploadPhotoDescription: "یہاں کلک کریں یا اپنے کچرے کی تصویر یہاں کھینچیں",
    whyImportant: "صحیح کچرا چھانٹنا کیوں اہم ہے؟",
    reason1: "ری سائیکلنگ اور دوبارہ استعمال کے ذریعے ماحولیات کا تحفظ",
    reason2: "لینڈ فل کچرے اور CO2 اخراج میں کمی",
    reason3: "جرمن ماحولیاتی قوانین کی تعمیل",
    reason4: "کچرا ٹھکانے لگانے میں لاگت کی بچت",
    languageSelector: "زبان منتخب کریں"
  },
  vi: {
    title: "Trợ Lý Phân Loại Rác",
    subtitle: "Phân Loại Rác Đúng Cách tại Đức",
    description: "Nhập mã bưu điện của bạn và tải lên một bức ảnh về rác của bạn. Chúng tôi sẽ giúp bạn phân loại đúng cách.",
    postalCodePlaceholder: "Nhập mã bưu điện (ví dụ: 10115)",
    uploadPhoto: "Tải Lên Ảnh",
    uploadPhotoDescription: "Nhấp vào đây hoặc kéo một bức ảnh về rác của bạn vào đây",
    whyImportant: "Tại sao phân loại rác đúng cách lại quan trọng?",
    reason1: "Bảo vệ môi trường thông qua tái chế và tái sử dụng",
    reason2: "Giảm rác thải bãi rác và phát thải CO2",
    reason3: "Tuân thủ luật môi trường của Đức",
    reason4: "Tiết kiệm chi phí trong việc xử lý rác thải",
    languageSelector: "Chọn Ngôn Ngữ"
  },
  zh: {
    title: "垃圾分类助手",
    subtitle: "德国正确垃圾分类",
    description: "输入您的邮政编码并上传您垃圾的照片。我们将帮助您正确分类。",
    postalCodePlaceholder: "输入邮政编码（例如：10115）",
    uploadPhoto: "上传照片",
    uploadPhotoDescription: "点击这里或将您垃圾的照片拖到这里",
    whyImportant: "为什么正确的垃圾分类很重要？",
    reason1: "通过回收和再利用保护环境",
    reason2: "减少垃圾填埋场废物和二氧化碳排放",
    reason3: "遵守德国环境法律",
    reason4: "节省废物处理成本",
    languageSelector: "选择语言"
  },
  fa: {
    title: "دستیار تفکیک زباله",
    subtitle: "تفکیک صحیح زباله در آلمان",
    description: "کد پستی خود را وارد کنید و عکسی از زباله‌هایتان آپلود کنید. ما به شما کمک می‌کنیم تا آن‌ها را به درستی تفکیک کنید.",
    postalCodePlaceholder: "کد پستی وارد کنید (مثال: 10115)",
    uploadPhoto: "آپلود عکس",
    uploadPhotoDescription: "اینجا کلیک کنید یا عکس زباله‌هایتان را اینجا بکشید",
    whyImportant: "چرا تفکیک صحیح زباله مهم است؟",
    reason1: "حفاظت از محیط زیست از طریق بازیافت و استفاده مجدد",
    reason2: "کاهش زباله‌های دفن و انتشار CO2",
    reason3: "رعایت قوانین زیست‌محیطی آلمان",
    reason4: "صرفه‌جویی در هزینه‌های دفع زباله",
    languageSelector: "انتخاب زبان"
  },
  ps: {
    title: "د کثافاتو د جلا کولو مرستیال",
    subtitle: "په آلمان کې د کثافاتو سمه جلا کول",
    description: "خپل پوستي کوډ ولیکئ او د خپلو کثافاتو انځور پورته کړئ. موږ به ستاسو سره د دوی د سمه جلا کولو کې مرسته وکړو.",
    postalCodePlaceholder: "پوستي کوډ ولیکئ (لکه 10115)",
    uploadPhoto: "انځور پورته کړئ",
    uploadPhotoDescription: "دلته کلیک وکړئ یا د خپلو کثافاتو انځور دلته راوکشئ",
    whyImportant: "ولې د کثافاتو سمه جلا کول مهم دي؟",
    reason1: "د بیا کارولو او بیا کارونې له لارې د چاپیریال ساتنه",
    reason2: "د ځمکې د ډکولو کثافاتو او د CO2 د خپرولو کمول",
    reason3: "د آلمان د چاپیریال د قوانینو تعقیبول",
    reason4: "د کثافاتو د لرې کولو په لګښتونو کې سپمول",
    languageSelector: "ژبه وټاکئ"
  },
  ta: {
    title: "குப்பை வகைப்படுத்தும் உதவியாளர்",
    subtitle: "ஜெர்மனியில் சரியான குப்பை பிரிப்பு",
    description: "உங்கள் அஞ்சல் குறியீட்டை உள்ளிட்டு உங்கள் குப்பையின் புகைப்படத்தை பதிவேற்றவும். அதை சரியாக வகைப்படுத்த நாங்கள் உங்களுக்கு உதவுவோம்.",
    postalCodePlaceholder: "அஞ்சல் குறியீட்டை உள்ளிடவும் (எ.கா. 10115)",
    uploadPhoto: "புகைப்படத்தை பதிவேற்றவும்",
    uploadPhotoDescription: "இங்கே கிளிக் செய்யவும் அல்லது உங்கள் குப்பையின் புகைப்படத்தை இங்கே இழுக்கவும்",
    whyImportant: "சரியான குப்பை வகைப்படுத்துதல் ஏன் முக்கியம்?",
    reason1: "மறுசுழற்சி மற்றும் மறுபயன்பாடு மூலம் சுற்றுச்சூழல் பாதுகாப்பு",
    reason2: "நிலப்பரப்பு குப்பை மற்றும் CO2 உமிழ்வுகளை குறைத்தல்",
    reason3: "ஜெர்மன் சுற்றுச்சூழல் சட்டங்களுக்கு இணக்கம்",
    reason4: "குப்பை அகற்றலில் செலவு சேமிப்பு",
    languageSelector: "மொழியைத் தேர்ந்தெடுக்கவும்"
  },
  sq: {
    title: "Asistenti i Ndarjes së Mbeturinave",
    subtitle: "Ndarja e Duhur e Mbeturinave në Gjermani",
    description: "Vendosni kodin tuaj postar dhe ngarkoni një fotografi të mbeturinave tuaja. Do t'ju ndihmojmë t'i ndani në mënyrë të duhur.",
    postalCodePlaceholder: "Vendosni kodin postar (p.sh. 10115)",
    uploadPhoto: "Ngarko Fotografinë",
    uploadPhotoDescription: "Kliko këtu ose zvarrit një fotografi të mbeturinave tuaja këtu",
    whyImportant: "Pse është e rëndësishme ndarja e duhur e mbeturinave?",
    reason1: "Mbrojtja e mjedisit përmes riciklimit dhe ripërdorimit",
    reason2: "Reduktimi i mbeturinave të groposjes dhe emetimeve të CO2",
    reason3: "Përputhja me ligjet mjedisore gjermane",
    reason4: "Kursimi i kostove në heqjen e mbeturinave",
    languageSelector: "Zgjidh Gjuhën"
  },
  da: {
    title: "Affaldssortering Assistent",
    subtitle: "Korrekt Affaldssortering i Tyskland",
    description: "Indtast dit postnummer og upload et billede af dit affald. Vi hjælper dig med at sortere det korrekt.",
    postalCodePlaceholder: "Indtast postnummer (f.eks. 10115)",
    uploadPhoto: "Upload Billede",
    uploadPhotoDescription: "Klik her eller træk et billede af dit affald herhen",
    whyImportant: "Hvorfor er korrekt affaldssortering vigtig?",
    reason1: "Miljøbeskyttelse gennem genbrug og genanvendelse",
    reason2: "Reduktion af lossepladsaffald og CO2-udledning",
    reason3: "Overholdelse af tyske miljølove",
    reason4: "Omkostningsbesparelser ved affaldsbortskaffelse",
    languageSelector: "Vælg Sprog"
  },
  uk: {
    title: "Помічник з Сортування Сміття",
    subtitle: "Правильне Сортування Відходів у Німеччині",
    description: "Введіть ваш поштовий індекс та завантажте фото вашого сміття. Ми допоможемо правильно його відсортувати.",
    postalCodePlaceholder: "Введіть поштовий індекс (напр. 10115)",
    uploadPhoto: "Завантажити Фото",
    uploadPhotoDescription: "Натисніть тут або перетягніть фото вашого сміття сюди",
    whyImportant: "Чому важливе правильне сортування сміття?",
    reason1: "Захист довкілля через переробку та повторне використання",
    reason2: "Зменшення кількості сміттєзвалищ та викидів CO2",
    reason3: "Дотримання німецького екологічного законодавства",
    reason4: "Економія коштів на утилізації відходів",
    languageSelector: "Оберіть Мову"
  }
};