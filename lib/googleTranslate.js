// lib/googleTranslate.ts (or .js)
export function setGoogTransCookie(from = "en", to = "hi") {
  const v = `/${from}/${to}`;
  try {
    // current host cookie
    document.cookie = `googtrans=${v}; path=/; max-age=31536000`;
    // domain cookie (covers subdomains)
    const host = window.location.hostname;
    const parts = host.split(".");
    if (parts.length > 1) {
      const baseDomain = "." + parts.slice(-2).join(".");
      document.cookie = `googtrans=${v}; domain=${baseDomain}; path=/; max-age=31536000`;
    }
  } catch {}
}

export function applyGoogTrans(to, from = "en") {
  // 1) set cookies
  setGoogTransCookie(from, to);

  // 2) if hidden select exists, change it (helps without full reload)
  const combo = document.querySelector(".goog-te-combo");
  if (combo) {
    combo.value = to;
    combo.dispatchEvent(new Event("change"));
  }
}
