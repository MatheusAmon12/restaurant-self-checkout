"use client";

import { Prisma } from "@prisma/client";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { currencyFormat } from "@/app/helpers/currency-format";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: { restaurant: { select: { name: true; avatarImageUrl: true } } };
  }>;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState<number>(1);

  const handleProductQuantityDecrement = () => {
    if (productQuantity === 1) return;
    setProductQuantity((prev) => prev - 1);
  };

  const handleProductQuantityIncrement = () => {
    setProductQuantity((prev) => prev + 1);
  };

  return (
    <div className="relative z-50 mt-[-1.5rem] flex flex-auto flex-col overflow-hidden rounded-t-3xl p-5 py-5">
      <div className="flex-auto overflow-hidden">
        <div className="flex items-center gap-1.5">
          <Image
            src={product.restaurant.avatarImageUrl}
            alt={product.restaurant.name}
            width={16}
            height={16}
            className="rounded-full"
          />
          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>
        <h2 className="mt-1 text-xl font-semibold">{product.name}</h2>
        <div className="flex items-center justify-between mt-3">
          <h3 className="text-xl font-semibold">
            {currencyFormat(product.price)}
          </h3>
          <div className="flex items-center gap-3 text-center">
            <Button
              variant="outline"
              className="size-8 rounded-xl"
              onClick={handleProductQuantityDecrement}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-4">{productQuantity}</p>
            <Button
              variant="destructive"
              className="size-8 rounded-xl"
              onClick={handleProductQuantityIncrement}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
        <ScrollArea className="h-full">
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-1">
              <ChefHatIcon />
              <h4 className="font-semibold">Ingredientes</h4>
            </div>
            <ul className="list-disc px-5 text-sm text-muted-foreground">
              {product.ingredients.map((ingredient) => (
                <li key={ingredient}>{ingredient}</li>
              ))}
            </ul>
          </div>
        </ScrollArea>
      </div>
      <Button className="mt-6 w-full rounded-full">Adicionar à sacola</Button>
    </div>
  );
};

export default ProductDetails;
