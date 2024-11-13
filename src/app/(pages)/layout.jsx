"use client";
import Footer from "@/app/components/Footer/Footer";
import SideBar from "@/app/components/side-bar/SideBar";
import { useTranslation } from "@/app/context/TranslationContext";
import { Toaster } from "@/components/ui/toaster"

export default function RootLayout({ children }) {
  const { locale } = useTranslation();
  return (
    <main
      className={`flex w-full  ${locale === "en" ? "flex-row-reverse" : "flex-row"
        }`}
    >
      <div className="nav">
        <SideBar />
      </div>
      <div className="dashboard w-full pt-20">
        <div className="main min-h-screen">{children}</div>
        <Toaster />
        <div className="footer relative">
          <Footer />
        </div>
      </div>
    </main>
  );
}
