import { Order, OrderStatus, Prisma, Restaurant } from "@prisma/client";
import Image from "next/image";

import { currencyFormat } from "@/app/helpers/currency-format";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface OrderItemProps {
  order: Order;
  restaurant: Pick<Restaurant, "name" | "avatarImageUrl">;
  orderProducts: Array<
    Prisma.OrderProductGetPayload<{ include: { product: true } }>
  >;
}

const OrderItem: React.FC<OrderItemProps> = ({
  order,
  restaurant,
  orderProducts,
}) => {
  const getStatusLabel = (status: OrderStatus) => {
    if (status === "FINISHED") return "Finalizado";
    if (status === "IN_PREPARATION") return "Em preparação";
    if (status === "PENDING") return "Pendente";
    return status;
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div
          className={cn(
            "w-fit rounded-full px-2 py-1 text-xs text-white",
            order.status === "PENDING" && "bg-gray-200 text-gray-500",
            order.status === "IN_PREPARATION" &&
              "bg-yellow-500",
            order.status === "FINISHED" && "bg-green-500",
          )}
        >
          {getStatusLabel(order.status)}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image
              src={restaurant.avatarImageUrl}
              alt={restaurant.name}
              fill
              className="rounded-sm object-cover"
            />
          </div>
          <p className="text-sm font-semibold">{restaurant.name}</p>
        </div>
        <Separator />
        <div className="space-y-2">
          {orderProducts.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 text-xs text-white">
                {orderProduct.quantity}
              </div>
              <p className="line-clamp-1 max-w-full text-sm">
                {orderProduct.product.name}
              </p>
            </div>
          ))}
        </div>
        <Separator />
        <p className="text-sm font-medium">{currencyFormat(order.total)}</p>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
