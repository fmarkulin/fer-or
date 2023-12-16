import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Knjige i njihovi autori",
  description:
    "Web aplikacija za prikaz skupa podataka s laboratorijskih vježbi za kolegij 'Otvoreno računarstvo' na FER-u, koji pokriva knjige i njihove autore. Podaci uključuju detalje poput broja stranica, naslova, datuma izdavanja, izdavača i više.",
  authors: { name: "Fran Markulin" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} relative selection:bg-primary selection:text-primary-foreground`}
    >
      <body className="min-h-screen flex flex-col">
        <Toaster />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="max-w-7xl w-screen grow flex mx-auto p-8 pb-16">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
