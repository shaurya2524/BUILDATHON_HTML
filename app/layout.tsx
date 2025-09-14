import "./globals.css";
import I18nProvider from "@/components/I18nProvider";
import ConditionalNavbar from "@/components/ConditionalNavbar";

export const metadata = {
  title: "InsureAce",
  description: "Professional Insurance Management",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 !bg-white">
        <I18nProvider>
          <ConditionalNavbar />
          <main className="p-6">{children}</main>
        </I18nProvider>
      </body>
    </html>
  );
}
