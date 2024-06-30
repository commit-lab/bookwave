import { type Metadata } from "next";
import TopBar from "@/components/topbar";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Bookwave Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <TopBar />
      {children}
    </section>
  );
}
