import FoodSection from "../_components/food-section";
import ScrollToTopButton from "../_components/scroll-button";
import UserSection from "../_components/user-section";
import WasteSection from "../_components/waste-section";

export default function Page() {
  
  return (
    <div className="lg:px-24">
      <UserSection />
      <FoodSection />
      <div id="waste">
        <WasteSection />
      </div>
      <ScrollToTopButton />
    </div>
  );
}
