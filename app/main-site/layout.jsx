import Header from "./components/Header";
import { Outfit } from "next/font/google"; // استيراد الخط
import Footer from "./components/Footer";
// تعريف الخط
const outfitFont = Outfit({
  subsets: ['latin'], 
  weight: ['400', '700'], // تحديد الأوزان المطلوبة
});

export const metadata = {
  title: "Prescripto - Book Appointments",
  description: "Book appointments with trusted doctors easily.",
};

export default function MainLayout({ children }) {
  return (
    <html>
      <body className={outfitFont.className}> 
        <div className="md:px-20">
          <Header />
          {children}
          
        </div>
        <Footer/>
      </body>
    </html>
  );
}
