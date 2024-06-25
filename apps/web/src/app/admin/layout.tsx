import { type Metadata } from "next";
import TopBar from "@/features/dummy/components/topbar";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Bookwave Admin Panel",
};

export default function AdminLayout({
  children, // will be a page or nested layout
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
