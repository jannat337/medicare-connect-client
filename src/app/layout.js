import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata = {
  title: "MediCare Connect",
  description: "Hospital Appointment & Healthcare Management System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={geist.className}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}