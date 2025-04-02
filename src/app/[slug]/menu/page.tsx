import { notFound } from "next/navigation";

import { getRestaurantsBySlug } from "@/data/get-restaurants-by-slug";

import RestaurantCategories from "./components/categories";
import RestaurantMenuHeader from "./components/restaurant-menu-header";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return ["DINE_IN", "TAKEAWAY"].includes(consumptionMethod.toUpperCase());
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;
  const restaurant = await getRestaurantsBySlug(slug);

  if (!isConsumptionMethodValid(consumptionMethod)) {
    return notFound();
  }

  if (!restaurant) return notFound();

  return (
    <div>
      <RestaurantMenuHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
