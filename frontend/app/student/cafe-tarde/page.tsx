import FoodList from "@/app/_components/food-list"

function page() {
  return (
    <div className="lg:px-24">
      <FoodList category="Afternoon Coffee" />
    </div>
  )
}

export default page