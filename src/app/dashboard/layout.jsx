"use client";
import SideBar from "../components/side-bar/SideBar";
import { useTranslation } from "../context/TranslationContext";
export default function RootLayout({ children }) {
  const { locale } = useTranslation();
  return (
    <main className={`flex gap-2 w-full flex-row-reverse`}>
      <div className="nav">
        <SideBar />
      </div>
      <div
        className="dashboard w-full pt-20"
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {children}
      </div>
    </main>
  );
}
