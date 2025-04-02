
'use client';
import Header from "./components/Header";

export default function MainSiteLayout({ children }) {
  return (
    <div className="min-h-screen" dir="ltr">
      <Header />
      <main className="container mx-auto px-4">
        {children}
      </main>
    </div>
  );
}
  