
import Header from "./components/Header";

export const metadata = {
  title: "Prescripto - Book Appointments",
  description: "Book appointments with trusted doctors easily.",
};



export default function MainLayout({ children }) {
    return (
        <html lang="en">
          <body>
            <div>
                <Header/>
                { children }
            </div>
          </body>
        </html>
      );
  }
  