import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";

import { currencyFormat } from "@/app/helpers/currency-format";
import { Button } from "@/components/ui/button";

import { CartProduct } from "../contexts/cart";

interface CartProductItemProps {
  product: CartProduct;
}

const CartProductItem: React.FC<CartProductItemProps> = ({ product }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative size-20 rounded-xl bg-gray-100">
          <Image
            src={product.imageUrl}
            fill
            className="object-cover"
            alt={product.name}
          />
        </div>
        <div className="space-y-1">
          <p className="text-xs w-[90%] truncate text-ellipsis">{product.name}</p>
          <p className="text-sm font-semibold">
            {currencyFormat(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button variant="outline" className="size-7 rounded-lg">
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button variant="destructive" className="size-7 rounded-lg">
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button variant="outline" className="size-7 rounded-lg">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
