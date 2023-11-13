import Navbar from "./components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-[min(100%,1600px)] px-5 mx-auto ">
      <Navbar />
      {children}
    </div>
  );
}
