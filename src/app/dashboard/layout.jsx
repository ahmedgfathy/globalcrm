import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "../components/side-bar/SideBar";

export default function RootLayout({ children }) {
  return (
    // <SidebarProvider>
    // <AppSidebar />
    <main>
      {/* <SidebarTrigger className="z-20" /> */}
      {children}
    </main>
    // </SidebarProvider>
  );
}
