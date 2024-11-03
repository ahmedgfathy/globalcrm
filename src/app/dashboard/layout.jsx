import SideBar from "../components/side-bar/SideBar";

export default function RootLayout({ children }) {
  return (
    <main className="flex gap-2 w-full flex-row-reverse">
      <div className="nav">
        <SideBar />
      </div>
      <div className="dashboard w-full">{children}</div>
    </main>
  );
}
