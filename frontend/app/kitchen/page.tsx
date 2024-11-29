import FoodSection from "../_components/food-section";
import ScrollToTopButton from "../_components/scroll-button";
import WasteSection from "../_components/waste-section";

function Page() {
  return (
    <div className="lg:px-24">
      <FoodSection />
      <div id="waste">
        <WasteSection />
      </div>
      <ScrollToTopButton />
    </div>
  );
}

export default Page;
