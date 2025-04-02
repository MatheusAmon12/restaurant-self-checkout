import Image from "next/image";
import { notFound } from "next/navigation";

import { getRestaurantsBySlug } from "@/data/get-restaurants-by-slug";

import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantsBySlug(slug);

  if (!restaurant) {
    return notFound();
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-y-24 px-6 py-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          src={restaurant.avatarImageUrl}
          alt={restaurant.name}
          width={82}
          height={82}
        />
        <h1 className="text-lg font-semibold">{restaurant.name}</h1>
      </div>
      <div className="flex flex-col items-center gap-3 text-center">
        <h3 className="text-[26px] font-semibold">Seja bem-vindo!</h3>
        <p className="text-sm text-muted-foreground">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>
      <div className="mt-[60px] grid grid-cols-2 gap-6">
        <ConsumptionMethodOption
          buttonText="Para comer aqui"
          imageAlt="Para comer aqui"
          imageSrc="/dine_in.png"
          option="DINE_IN"
          slug={slug}
        />
        <ConsumptionMethodOption
          buttonText="Para levar"
          imageAlt="Para levar"
          imageSrc="/take.png"
          option="TAKEAWAY"
          slug={slug}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
