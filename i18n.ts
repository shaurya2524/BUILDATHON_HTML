import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        dashboard: "Dashboard",
        customers: "Customers",
        policies: "Policies",
        renewals: "Renewals",
        "compare policies": "Compare Policies",
        payments: "Payments",
        claims: "Claims",
        reports: "Reports",
        signout: "Sign Out",
      },
    },
    hi: {
      translation: {
        dashboard: "डैशबोर्ड",
        customers: "ग्राहक",
        policies: "पॉलिसी",
        renewals: "नवीनीकरण",
        "compare policies": "पॉलिसी तुलना",
        payments: "भुगतान",
        claims: "दावे",
        reports: "रिपोर्ट्स",
        signout: "साइन आउट",
      },
    },
    mr: {
      translation: {
        dashboard: "डॅशबोर्ड",
        customers: "ग्राहक",
        policies: "पॉलिसी",
        renewals: "नूतनीकरणे",
        "compare policies": "पॉलिसीची तुलना",
        payments: "पेमेंट्स",
        claims: "दावे",
        reports: "अहवाल",
        signout: "साइन आउट",
      },
    },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: { 
    escapeValue: false 
  },
  react: {
    useSuspense: false,
  },
});

export default i18n;
