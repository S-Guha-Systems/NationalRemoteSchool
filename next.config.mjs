import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  //   disable: process.env.NODE_ENV === "development",
  extendDefaultRuntimeCaching: true,
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  register: true,
  reloadOnOnline: true,
  fallbacks: {
    // Failed page requests fallback to this.
    document: "/~offline",
    // // This is for /_next/.../.json files.
    // data: "/fallback.json",
    // This is for images.
    image: "/fallback.webp",
    // // This is for audio files.
    // audio: "/fallback.mp3",
    // // This is for video files.
    // video: "/fallback.mp4",
    // // This is for fonts.
    // font: "/fallback-font.woff2",
  },
  runtimeCaching: [
    {
      // Match Firebase Storage links (with or without ?alt=media&token=…)
      urlPattern: ({ url }) =>
        (url.hostname === "firebasestorage.googleapis.com" ||
          url.hostname.endsWith("firebasestorage.app")) && // covers your case
        url.pathname.toLowerCase().endsWith(".pdf"),
      handler: "CacheFirst",
      options: {
        cacheName: "pdf-cache-firebase",
        cacheableResponse: { statuses: [0, 200] }, // allow opaque responses
        expiration: {
          maxEntries: 500,
          maxAgeSeconds: 60 * 60 * 24 * 60, // 60 days
          purgeOnQuotaError: true,
        },
      },
    },
  ],
});

export default withPWA({
  // Your Next.js config
});
