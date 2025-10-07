"use client";

// NOTE: Keep comments; user prefers not to delete them

import React from "react";

/**
 * State-aware Google Translate wrapper
 *
 * - First use saved preference (localStorage: "nrsLang")
 * - Else try geolocation -> reverse geocode (BigDataCloud, no key) to detect Indian state
 * - Else fall back to browser locale / country map
 * - Loads Google Website Translator and applies the decided default automatically
 */

// ---- India: State/UT -> language code (tune as needed) ----
const IN_STATE_TO_LANG = {
  "West Bengal": "bn",
  Assam: "as",
  Bihar: "hi",
  Jharkhand: "hi",
  Odisha: "or",
  Sikkim: "ne",
  "Arunachal Pradesh": "as", // widely used: Assamese (no separate AP code in Google Translate)
  Meghalaya: "as",
  Manipur: "bn", // fallback (Manipuri not directly available)
  Mizoram: "bn", // fallback (Mizo not available)
  Nagaland: "as",
  Tripura: "bn",
  "Uttar Pradesh": "hi",
  Uttarakhand: "hi",
  "Madhya Pradesh": "hi",
  Chhattisgarh: "hi",
  Rajasthan: "hi",
  Gujarat: "gu",
  Maharashtra: "mr",
  Goa: "mr",
  "Andhra Pradesh": "te",
  Telangana: "te",
  Karnataka: "kn",
  Kerala: "ml",
  "Tamil Nadu": "ta",
  Punjab: "pa",
  Haryana: "hi",
  Delhi: "hi",
  Chandigarh: "hi",
  "Himachal Pradesh": "hi",
  "Jammu and Kashmir": "ur",
  Ladakh: "ur",
  Puducherry: "ta",
  "Andaman and Nicobar Islands": "hi",
  "Dadra and Nagar Haveli and Daman and Diu": "gu",
};

// Country -> default language (fallback)
const COUNTRY_DEFAULT_LANG = {
  IN: "hi",
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
};

function getLikelyCountryCode() {
  try {
    const lang =
      navigator.language ||
      (navigator.languages && navigator.languages[0]) ||
      "";
    const parts = lang.split(/[-_]/);
    if (parts[1] && parts[1].length === 2) return parts[1].toUpperCase();
  } catch {}
  return "US";
}

function resolveDefaultLanguageFallback() {
  const country = getLikelyCountryCode();
  const navLang = (navigator.language || "").toLowerCase();
  if (navLang && !navLang.startsWith("en")) {
    const short = navLang.split(/[-_]/)[0];
    if (short) return short;
  }
  return COUNTRY_DEFAULT_LANG[country] || "en";
}

// Google Translate helpers
function applyGoogleTranslate(langCode) {
  const combo = document.querySelector("select.goog-te-combo");
  if (!combo) return;
  combo.value = langCode;
  combo.dispatchEvent(new Event("change"));
}

function setGoogTransCookie(langCode) {
  const value = `/auto/${langCode}`;
  const exp = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `googtrans=${value}; expires=${exp}; path=/`;
  document.cookie = `googtrans=${value}; domain=.${location.hostname}; expires=${exp}; path=/`;
}

export default function Translator() {
  const scriptLoadedRef = React.useRef(false);
  const initializedRef = React.useRef(false);
  const [ready, setReady] = React.useState(false);
  const [lang, setLang] = React.useState("en");

  // 1) Decide language (saved -> geolocate -> fallback)
  React.useEffect(() => {
    const saved = localStorage.getItem("nrsLang");
    if (saved) {
      setLang(saved);
      return;
    }

    // Try to get state via geolocation + reverse-geocode
    const fallback = () => setLang(resolveDefaultLanguageFallback());

    if (!("geolocation" in navigator)) {
      fallback();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          // BigDataCloud free reverse geocode (CORS enabled, no key)
          const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
          const res = await fetch(url, { cache: "no-store" });
          if (!res.ok) throw new Error("Reverse geocode failed");
          const data = await res.json();

          const countryCode = (data.countryCode || "").toUpperCase();
          const state =
            data.principalSubdivision || data.locality || data.city || "";
          if (countryCode === "IN" && state) {
            const mapped = IN_STATE_TO_LANG[state] || "hi";
            setLang(mapped);
            localStorage.setItem("nrsLang", mapped); // persist once we detect
          } else {
            const c =
              COUNTRY_DEFAULT_LANG[countryCode] ||
              resolveDefaultLanguageFallback();
            setLang(c);
          }
        } catch {
          fallback();
        }
      },
      () => {
        // Permission denied or error → fallback
        fallback();
      },
      { enableHighAccuracy: false, timeout: 7000, maximumAge: 0 }
    );
  }, []);

  // 2) Load Google Translate and apply decided lang
  React.useEffect(() => {
    if (scriptLoadedRef.current) return;

    window.googleTranslateElementInit = function () {
      try {
        if (initializedRef.current) return;
        initializedRef.current = true;

        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
          },
          "google_translate_container"
        );

        const t0 = Date.now();
        const iv = setInterval(() => {
          const combo = document.querySelector("select.goog-te-combo");
          if (combo) {
            if (lang && lang !== "en") {
              setGoogTransCookie(lang);
              applyGoogleTranslate(lang);
            }
            clearInterval(iv);
            setReady(true);
          } else if (Date.now() - t0 > 8000) {
            clearInterval(iv);
            setReady(true);
          }
        }, 200);
      } catch (e) {
        console.error("Translate init error:", e);
        setReady(true);
      }
    };

    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    script.defer = true;
    script.onload = () => (scriptLoadedRef.current = true);
    document.body.appendChild(script);
  }, [lang]);

  // Manual override (persist + apply)
  const handleChange = (e) => {
    const v = e.target.value;
    setLang(v);
    localStorage.setItem("nrsLang", v);
    setGoogTransCookie(v);
    applyGoogleTranslate(v);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Hidden container for Google's widget */}
      <div
        id="google_translate_container"
        style={{
          position: "absolute",
          left: -9999,
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      />

      <label htmlFor="nrstranslate" style={{ fontSize: 12, opacity: 0.8 }}>
        Translate:
      </label>
      <select
        id="nrstranslate"
        onChange={handleChange}
        value={lang}
        style={{
          fontSize: 12,
          padding: "6px 8px",
          borderRadius: 6,
          border: "1px solid var(--mui-palette-divider, #ccc)",
          background: "transparent",
          color: "inherit",
        }}
      >
        {/* Quick picks (the full list remains in Google's dropdown) */}
        <option value="en">English</option>
        <option value="bn">বাংলা (Bengali)</option>
        <option value="hi">हिन्दी (Hindi)</option>
        <option value="ta">தமிழ் (Tamil)</option>
        <option value="te">తెలుగు (Telugu)</option>
        <option value="mr">मराठी (Marathi)</option>
        <option value="gu">ગુજરાતી (Gujarati)</option>
        <option value="kn">ಕನ್ನಡ (Kannada)</option>
        <option value="ml">മലയാളം (Malayalam)</option>
        <option value="pa">ਪੰਜਾਬੀ (Punjabi)</option>
        <option value="or">ଓଡିଆ (Odia)</option>
        <option value="ur">اردو (Urdu)</option>
        <option value="ne">नेपाली (Nepali)</option>
        {/* Global */}
        <option value="es">Español</option>
        <option value="fr">Français</option>
        <option value="de">Deutsch</option>
        <option value="pt">Português</option>
        <option value="ru">Русский</option>
        <option value="ar">العربية</option>
        <option value="zh-CN">简体中文</option>
        <option value="zh-TW">繁體中文</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
      </select>

      {!ready && (
        <span style={{ fontSize: 11, opacity: 0.6 }}>&nbsp;…loading</span>
      )}
    </div>
  );
}
