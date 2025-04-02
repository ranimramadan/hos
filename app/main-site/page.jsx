import BookingBanner from "./components/BookingBanner";
import Category_Search from "./components/Category_Search";
import DoctorList from "./components/DoctorList";

import Hero_Section from "./components/Hero_Section";

export default function MainPage() {
  return (
    <div>
      <Hero_Section/>
      <Category_Search/>
      <DoctorList/>
      <BookingBanner/>
      
    </div>
  );
}
