import type { Metadata } from "next";

// Afmeldpagina voor de koude mail. Hoort niet in zoekmachines: wie hier komt,
// komt via de link onderaan een mail.
export const metadata: Metadata = {
  title: { absolute: "Afmelden | nativ" },
  description: "Meld je af voor mail van nativ.",
  robots: { index: false, follow: false },
};

export default function AfmeldenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
