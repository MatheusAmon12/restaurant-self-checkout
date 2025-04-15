"use client";

import { useContext, useState } from "react";

import { currencyFormat } from "@/app/helpers/currency-format";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { CartContext } from "../contexts/cart";
import CartProductItem from "./cart-item";
import FinishOrder from "./finish-order";

const CartSheet = () => {
  const [isFinishOrderOpen, setIsFinishOrderOpen] = useState(false);
  const { isOpen, toggleCart, products, totalPriceCalculate } =
    useContext(CartContext);

  const handleFinishOrder = () => {
    setIsFinishOrderOpen(!isFinishOrderOpen);
  };

  return (
    <Sheet open={isOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full max-w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Sacola</SheetTitle>
        </SheetHeader>
        <div className="flex h-full flex-col space-y-6 py-5">
          <div className="flex-auto">
            <div className="space-y-4 py-5">
              {products.map((product) => (
                <CartProductItem key={product.id} product={product} />
              ))}
            </div>
          </div>
          <Card className="p-5">
            <div className="flex justify-between">
              <p className="font-muted-foreground text-sm">Total</p>
              <p className="text-sm font-semibold">
                {currencyFormat(totalPriceCalculate())}
              </p>
            </div>
          </Card>
          <Button className="w-full rounded-full" onClick={handleFinishOrder}>
            Finalizar pedido
          </Button>
          <FinishOrder
            open={isFinishOrderOpen}
            onOpenChange={handleFinishOrder}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
