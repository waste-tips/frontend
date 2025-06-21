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
    postalCodeLabel: "📍 Postleitzahl",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Foto hochladen",
    uploadPhoto: "Foto hochladen",
    uploadPhotoDescription: "Klicken Sie hier oder ziehen Sie ein Foto Ihres Mülls hierher",
    analyzeButton: "🔍 Meinen Müll analysieren",
    validPostalCode: "Gültige Postleitzahl",
    invalidPostalCode: "⚠️ Bitte geben Sie eine gültige 5-stellige deutsche Postleitzahl ein",
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
    postalCodeLabel: "📍 Postal Code",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Upload Photo",
    uploadPhoto: "Upload Photo",
    uploadPhotoDescription: "Click here or drag a photo of your waste here",
    analyzeButton: "🔍 Analyze My Waste",
    validPostalCode: "Valid postal code",
    invalidPostalCode: "⚠️ Please enter a valid 5-digit German postal code",
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
    postalCodeLabel: "📍 Posta Kodu",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Fotoğraf Yükle",
    uploadPhoto: "Fotoğraf Yükle",
    uploadPhotoDescription: "Buraya tıklayın veya atığınızın fotoğrafını buraya sürükleyin",
    analyzeButton: "🔍 Atığımı Analiz Et",
    validPostalCode: "Geçerli posta kodu",
    invalidPostalCode: "⚠️ Lütfen geçerli 5 haneli Alman posta kodu girin",
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
    postalCodeLabel: "📍 Почтовый индекс",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Загрузить фото",
    uploadPhoto: "Загрузить фото",
    uploadPhotoDescription: "Нажмите здесь или перетащите фото вашего мусора сюда",
    analyzeButton: "🔍 Анализировать мой мусор",
    validPostalCode: "Действительный почтовый индекс",
    invalidPostalCode: "⚠️ Пожалуйста, введите действительный 5-значный немецкий почтовый индекс",
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
    postalCodeLabel: "📍 Kod pocztowy",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Prześlij zdjęcie",
    uploadPhoto: "Prześlij zdjęcie",
    uploadPhotoDescription: "Kliknij tutaj lub przeciągnij zdjęcie swoich odpadów tutaj",
    analyzeButton: "🔍 Analizuj moje odpady",
    validPostalCode: "Prawidłowy kod pocztowy",
    invalidPostalCode: "⚠️ Proszę wprowadzić prawidłowy 5-cyfrowy niemiecki kod pocztowy",
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
    postalCodeLabel: "📍 الرمز البريدي",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 رفع صورة",
    uploadPhoto: "رفع صورة",
    uploadPhotoDescription: "انقر هنا أو اسحب صورة نفاياتك هنا",
    analyzeButton: "🔍 تحليل نفاياتي",
    validPostalCode: "رمز بريدي صحيح",
    invalidPostalCode: "⚠️ يرجى إدخال رمز بريدي ألماني صحيح مكون من 5 أرقام",
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
    postalCodeLabel: "📍 Koda Postê",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Wêne Bar Bike",
    uploadPhoto: "Wêne Bar Bike",
    uploadPhotoDescription: "Li vir bitikîne an wêneyê zibilê xwe li vir bikişîne",
    analyzeButton: "🔍 Zibilê Min Analîz Bike",
    validPostalCode: "Koda postê ya derbasdar",
    invalidPostalCode: "⚠️ Ji kerema xwe koda postê ya Almanyayê ya 5 hejmarî ya derbasdar binivîse",
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
    postalCodeLabel: "📍 Codice Postale",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Carica Foto",
    uploadPhoto: "Carica Foto",
    uploadPhotoDescription: "Clicca qui o trascina una foto dei tuoi rifiuti qui",
    analyzeButton: "🔍 Analizza i Miei Rifiuti",
    validPostalCode: "Codice postale valido",
    invalidPostalCode: "⚠️ Inserisci un codice postale tedesco valido di 5 cifre",
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
    postalCodeLabel: "📍 Poštanski broj",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Učitaj Fotografiju",
    uploadPhoto: "Učitaj Fotografiju",
    uploadPhotoDescription: "Kliknite ovdje ili povucite fotografiju svog otpada ovdje",
    analyzeButton: "🔍 Analiziraj Moj Otpad",
    validPostalCode: "Važeći poštanski broj",
    invalidPostalCode: "⚠️ Molimo unesite važeći 5-cifreni njemački poštanski broj",
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
    postalCodeLabel: "📍 Poštanski broj",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Učitaj Fotografiju",
    uploadPhoto: "Učitaj Fotografiju",
    uploadPhotoDescription: "Kliknite ovdje ili povucite fotografiju svog otpada ovdje",
    analyzeButton: "🔍 Analiziraj Moj Otpad",
    validPostalCode: "Važeći poštanski broj",
    invalidPostalCode: "⚠️ Molimo unesite važeći 5-znamenkasti njemački poštanski broj",
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
    postalCodeLabel: "📍 Поштански број",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Учитај Фотографију",
    uploadPhoto: "Учитај Фотографију",
    uploadPhotoDescription: "Кликните овде или повуците фотографију свог отпада овде",
    analyzeButton: "🔍 Анализирај Мој Отпад",
    validPostalCode: "Важећи поштански број",
    invalidPostalCode: "⚠️ Молимо унесите важећи 5-цифрени немачки поштански број",
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
    postalCodeLabel: "📍 Cod poștal",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Încărcați Fotografia",
    uploadPhoto: "Încărcați Fotografia",
    uploadPhotoDescription: "Faceți clic aici sau trageți o fotografie a deșeurilor aici",
    analyzeButton: "🔍 Analizați Deșeurile Mele",
    validPostalCode: "Cod poștal valid",
    invalidPostalCode: "⚠️ Vă rugăm să introduceți un cod poștal german valid de 5 cifre",
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
    postalCodeLabel: "📍 Ταχυδρομικός κώδικας",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Ανέβασμα Φωτογραφίας",
    uploadPhoto: "Ανέβασμα Φωτογραφίας",
    uploadPhotoDescription: "Κάντε κλικ εδώ ή σύρετε μια φωτογραφία των απορριμμάτων σας εδώ",
    analyzeButton: "🔍 Αναλύστε τα Απορρίμματά μου",
    validPostalCode: "Έγκυρος ταχυδρομικός κώδικας",
    invalidPostalCode: "⚠️ Παρακαλώ εισάγετε έναν έγκυρο 5ψήφιο γερμανικό ταχυδρομικό κώδικα",
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
    postalCodeLabel: "📍 Código postal",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Subir Foto",
    uploadPhoto: "Subir Foto",
    uploadPhotoDescription: "Haga clic aquí o arrastre una foto de sus residuos aquí",
    analyzeButton: "🔍 Analizar Mis Residuos",
    validPostalCode: "Código postal válido",
    invalidPostalCode: "⚠️ Por favor ingrese un código postal alemán válido de 5 dígitos",
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
    postalCodeLabel: "📍 Code postal",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Télécharger Photo",
    uploadPhoto: "Télécharger Photo",
    uploadPhotoDescription: "Cliquez ici ou faites glisser une photo de vos déchets ici",
    analyzeButton: "🔍 Analyser Mes Déchets",
    validPostalCode: "Code postal valide",
    invalidPostalCode: "⚠️ Veuillez entrer un code postal allemand valide à 5 chiffres",
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
    postalCodeLabel: "📍 पोस्टल कोड",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 फोटो अपलोड करें",
    uploadPhoto: "फोटो अपलोड करें",
    uploadPhotoDescription: "यहाँ क्लिक करें या अपने कचरे की एक तस्वीर यहाँ खींचें",
    analyzeButton: "🔍 मेरे कचरे का विश्लेषण करें",
    validPostalCode: "वैध पोस्टल कोड",
    invalidPostalCode: "⚠️ कृपया एक वैध 5-अंकीय जर्मन पोस्टल कोड दर्ज करें",
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
    postalCodeLabel: "📍 پوسٹل کوڈ",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 تصویر اپ لوڈ کریں",
    uploadPhoto: "تصویر اپ لوڈ کریں",
    uploadPhotoDescription: "یہاں کلک کریں یا اپنے کچرے کی تصویر یہاں کھینچیں",
    analyzeButton: "🔍 میرے کچرے کا تجزیہ کریں",
    validPostalCode: "درست پوسٹل کوڈ",
    invalidPostalCode: "⚠️ براہ کرم ایک درست 5 ہندسوں کا جرمن پوسٹل کوڈ داخل کریں",
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
    postalCodeLabel: "📍 Mã bưu điện",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Tải Lên Ảnh",
    uploadPhoto: "Tải Lên Ảnh",
    uploadPhotoDescription: "Nhấp vào đây hoặc kéo một bức ảnh về rác của bạn vào đây",
    analyzeButton: "🔍 Phân Tích Rác Của Tôi",
    validPostalCode: "Mã bưu điện hợp lệ",
    invalidPostalCode: "⚠️ Vui lòng nhập mã bưu điện Đức hợp lệ gồm 5 chữ số",
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
    postalCodeLabel: "📍 邮政编码",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 上传照片",
    uploadPhoto: "上传照片",
    uploadPhotoDescription: "点击这里或将您垃圾的照片拖到这里",
    analyzeButton: "🔍 分析我的垃圾",
    validPostalCode: "有效邮政编码",
    invalidPostalCode: "⚠️ 请输入有效的5位德国邮政编码",
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
    postalCodeLabel: "📍 کد پستی",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 آپلود عکس",
    uploadPhoto: "آپلود عکس",
    uploadPhotoDescription: "اینجا کلیک کنید یا عکس زباله‌هایتان را اینجا بکشید",
    analyzeButton: "🔍 تجزیه و تحلیل زباله‌های من",
    validPostalCode: "کد پستی معتبر",
    invalidPostalCode: "⚠️ لطفاً یک کد پستی آلمانی معتبر 5 رقمی وارد کنید",
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
    postalCodeLabel: "📍 پوستي کوډ",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 انځور پورته کړئ",
    uploadPhoto: "انځور پورته کړئ",
    uploadPhotoDescription: "دلته کلیک وکړئ یا د خپلو کثافاتو انځور دلته راوکشئ",
    analyzeButton: "🔍 زموږ کثافات تحلیل کړئ",
    validPostalCode: "سمه پوستي کوډ",
    invalidPostalCode: "⚠️ مهرباني وکړئ د آلمان سمه 5 شمیرې پوستي کوډ ولیکئ",
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
    postalCodeLabel: "📍 அஞ்சல் குறியீடு",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 புகைப்படத்தை பதிவேற்றவும்",
    uploadPhoto: "புகைப்படத்தை பதிவேற்றவும்",
    uploadPhotoDescription: "இங்கே கிளிக் செய்யவும் அல்லது உங்கள் குப்பையின் புகைப்படத்தை இங்கே இழுக்கவும்",
    analyzeButton: "🔍 என் குப்பையை பகுப்பாய்வு செய்யவும்",
    validPostalCode: "செல்லுபடியாகும் அஞ்சல் குறியீடு",
    invalidPostalCode: "⚠️ தயவுசெய்து செல்லுபடியாகும் 5 இலக்க ஜெர்மன் அஞ்சல் குறியீட்டை உள்ளிடவும்",
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
    postalCodeLabel: "📍 Kodi postar",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Ngarko Fotografinë",
    uploadPhoto: "Ngarko Fotografinë",
    uploadPhotoDescription: "Kliko këtu ose zvarrit një fotografi të mbeturinave tuaja këtu",
    analyzeButton: "🔍 Analizo Mbeturinat e Mia",
    validPostalCode: "Kod postar i vlefshëm",
    invalidPostalCode: "⚠️ Ju lutemi vendosni një kod postar gjerman të vlefshëm me 5 shifra",
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
    postalCodeLabel: "📍 Postnummer",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Upload Billede",
    uploadPhoto: "Upload Billede",
    uploadPhotoDescription: "Klik her eller træk et billede af dit affald herhen",
    analyzeButton: "🔍 Analyser Mit Affald",
    validPostalCode: "Gyldigt postnummer",
    invalidPostalCode: "⚠️ Indtast venligst et gyldigt 5-cifret tysk postnummer",
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
    postalCodeLabel: "📍 Поштовий індекс",
    postalCodePlaceholder: "10115",
    uploadPhotoLabel: "📸 Завантажити Фото",
    uploadPhoto: "Завантажити Фото",
    uploadPhotoDescription: "Натисніть тут або перетягніть фото вашого сміття сюди",
    analyzeButton: "🔍 Проаналізувати Моє Сміття",
    validPostalCode: "Дійсний поштовий індекс",
    invalidPostalCode: "⚠️ Будь ласка, введіть дійсний 5-значний німецький поштовий індекс",
    whyImportant: "Чому важливе правильне сортування сміття?",
    reason1: "Захист довкілля через переробку та повторне використання",
    reason2: "Зменшення кількості сміттєзвалищ та викидів CO2",
    reason3: "Дотримання німецького екологічного законодавства",
    reason4: "Економія коштів на утилізації відходів",
    languageSelector: "Оберіть Мову"
  }
};