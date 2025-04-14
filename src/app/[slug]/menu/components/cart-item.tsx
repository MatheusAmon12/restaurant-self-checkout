import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { currencyFormat } from "@/app/helpers/currency-format";
import { Button } from "@/components/ui/button";

import { CartContext, CartProduct } from "../contexts/cart";

interface CartProductItemProps {
  product: CartProduct;
}

//TODO: inserir handles

const CartProductItem: React.FC<CartProductItemProps> = ({ product }) => {
  const { increaseProductQuantity, decreaseProductQuantity, deleteProduct } =
    useContext(CartContext);
  const handleIncreaseProductClick = () => {
    increaseProductQuantity(product.id);
  };
  const handleDecreaseProductClick = () => {
    decreaseProductQuantity(product.id);
  };
  const handleDeleteProductClick = () => {
    deleteProduct(product.id);
  };
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
          <p className="w-[90%] truncate text-ellipsis text-xs">
            {product.name}
          </p>
          <p className="text-sm font-semibold">
            {currencyFormat(product.price)}
          </p>
          <div className="flex items-center gap-1 text-center">
            <Button
              variant="outline"
              className="size-7 rounded-lg"
              onClick={handleDecreaseProductClick}
            >
              <ChevronLeftIcon />
            </Button>
            <p className="w-7 text-xs">{product.quantity}</p>
            <Button
              variant="destructive"
              className="size-7 rounded-lg"
              onClick={handleIncreaseProductClick}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>
      </div>
      <Button
        variant="outline"
        className="size-7 rounded-lg"
        onClick={handleDeleteProductClick}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CartProductItem;
