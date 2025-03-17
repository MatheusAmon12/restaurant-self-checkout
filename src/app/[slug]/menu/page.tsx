import { notFound } from "next/navigation";

import { getRestaurantsBySlug } from "@/data/get-restaurants-by-slug";

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

  return (
    <h1>
      {slug}
      {consumptionMethod}
    </h1>
  );
};

export default RestaurantMenuPage;
