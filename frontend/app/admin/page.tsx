import FoodSection from "../_components/food-section";
import ScrollToTopButton from "../_components/scroll-button";
import UserSection from "../_components/user-section";

export default function Page() {
  
  return (
    <div className="lg:px-24">
      <UserSection />
      <FoodSection />
      <ScrollToTopButton />
    </div>
  );
}
