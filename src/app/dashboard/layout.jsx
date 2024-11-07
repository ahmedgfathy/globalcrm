"use client";
import Footer from "../components/Footer/Footer";
import SideBar from "../components/side-bar/SideBar";
import { useTranslation } from "../context/TranslationContext";
export default function RootLayout({ children }) {
  const { locale } = useTranslation();
  return (
    <main
      className={`flex gap-2 w-full  ${
        locale === "en" ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <div className="nav">
        <SideBar />
      </div>
      <div className="dashboard w-full pt-20">
        <div className="main min-h-screen">{children}</div>

        <div className="footer relative">
          <Footer />
        </div>
      </div>
    </main>
  );
}
