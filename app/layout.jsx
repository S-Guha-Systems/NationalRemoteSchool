import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import "./globals.css";
import { Container } from "@mui/material";
import AppThemeProvider from "@/context/AppThemeProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://nationalremoteschool.sguhasystems.com"),
  title: {
    default: "National Remote School",
    template: "%s | National Remote School",
  },
  description:
    "National Remote School is an NGO initiative that provides completely free online education up to 12th class. Our mission is to support children in need by ensuring equal access to quality learning resources — anytime, anywhere.",
  openGraph: {
    title: "National Remote School – Free Online Education for Every Child",
    description:
      "National Remote School is an NGO initiative providing free online education up to 12th class. We believe in empowering children with knowledge by making learning accessible, inclusive, and cost-free.",
    url: "https://nationalremoteschool.sguhasystems.com",
    type: "website",
    locale: "en_US",
    siteName: "National Remote School",
  },
  twitter: {
    card: "summary_large_image",
    title: "National Remote School – Free Online Education for Every Child",
    description:
      "National Remote School is an NGO initiative that provides free online education up to 12th class, supporting children in need with equal access to quality learning resources.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider>
          <AppThemeProvider>
            <InitColorSchemeScript attribute="class" />
            <main>
              <Container maxWidth="xl">
                <Navbar />
                {children}
                <Footer />
              </Container>
            </main>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
