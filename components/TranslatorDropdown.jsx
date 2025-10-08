// components/TranslatorDropdown.jsx
"use client";

import { useEffect, useState } from "react";
import { FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { applyGoogTrans, setGoogTransCookie } from "@/lib/googleTranslate";

const LANGS = [
  { code: "en", name: "English" },
  { code: "hi", name: "Hindi" },
  { code: "bn", name: "Bengali" },
  { code: "ta", name: "Tamil" },
  { code: "te", name: "Telugu" },
  { code: "ml", name: "Malayalam" },
  { code: "gu", name: "Gujarati" },
  { code: "kn", name: "Kannada" },
  { code: "mr", name: "Marathi" },
  { code: "pa", name: "Punjabi" },
  { code: "ur", name: "Urdu" },
  { code: "ne", name: "Nepali" },
  { code: "si", name: "Sinhala" },
  { code: "fr", name: "French" },
  { code: "es", name: "Spanish" },
  { code: "de", name: "German" },
  { code: "it", name: "Italian" },
  { code: "zh-CN", name: "Chinese (Simplified)" },
  { code: "ja", name: "Japanese" },
  { code: "ko", name: "Korean" },
  { code: "ru", name: "Russian" },
  { code: "ar", name: "Arabic" },
];

const LS_KEY = "nrsLang";

export default function TranslatorDropdown() {
  const [lang, setLang] = useState("en");

  // On mount: read cookie/localStorage and apply
  useEffect(() => {
    const stored = localStorage.getItem(LS_KEY) || "en";
    setLang(stored);
    // set cookies so Google applies on first paint after widget loads
    setGoogTransCookie("en", stored);
    // also try to apply immediately if widget is already ready
    applyGoogTrans(stored, "en");
  }, []);

  const handleChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    localStorage.setItem(LS_KEY, newLang);

    // Set cookie + try immediate apply
    applyGoogTrans(newLang, "en");

    // Hard refresh once is the most consistent way to translate everything
    // across dynamic content in SPAs.
    if (typeof window !== "undefined") {
      setTimeout(() => window.location.reload(), 100);
    }
  };

  return (
    <FormControl size="small" sx={{ minWidth: 150 }}>
      <InputLabel id="lang-select-label">Language</InputLabel>
      <Select
        labelId="lang-select-label"
        value={lang}
        label="Language"
        onChange={handleChange}
      >
        {LANGS.map((l) => (
          <MenuItem key={l.code} value={l.code}>
            {l.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
