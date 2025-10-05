import { Roboto } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import "@/components/globals.css";
import { Box, Container } from "@mui/material";
import AppThemeProvider from "@/context/AppThemeProvider";
import DashboardNavbar from "@/components/DashboardNavbar";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://nationalremoteschool.org"),
  title: {
    default: "Dashboard",
    template: "%s | National Remote School",
  },
  description:
    "National Remote School is an NGO initiative that provides completely free online education up to 12th class. Our mission is to support children in need by ensuring equal access to quality learning resources — anytime, anywhere.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "National Remote School",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    title: "National Remote School – Free Online Education for Every Child",
    description:
      "National Remote School is an NGO initiative providing free online education up to 12th class. We believe in empowering children with knowledge by making learning accessible, inclusive, and cost-free.",
    url: "https://nationalremoteschool.org",
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
            {/* Drawer + AppBar lives full-width above */}
            <DashboardNavbar />
            {/* Page content area */}
            <main>
              <Container maxWidth="xl">
                {/* Extra guard space so content never hides under AppBar on first paint */}
                <Box sx={{ pt: 2 }}>{children}</Box>
              </Container>
            </main>
          </AppThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
