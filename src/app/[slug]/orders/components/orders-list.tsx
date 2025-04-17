"use client";

import { Prisma } from "@prisma/client";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import OrderItem from "./order-item";

interface OrdersListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: {
            name: true;
            avatarImageUrl: true;
          };
        };
        orderProducts: {
          include: {
            product: true;
          };
        };
      };
    }>
  >;
}

const OrdersList: React.FC<OrdersListProps> = ({ orders }) => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>()

  const handleBackClick = () => router.replace(`/${slug}`);

  return (
    <div className="space-y-6 p-6">
      <Button
        size="icon"
        variant="secondary"
        className="rounded-full"
        onClick={handleBackClick}
      >
        <ChevronLeftIcon />
      </Button>
      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>
      {orders.map((order) => (
        <OrderItem
          key={order.id}
          order={order}
          restaurant={order.restaurant}
          orderProducts={order.orderProducts}
        />
      ))}
    </div>
  );
};

export default OrdersList;
