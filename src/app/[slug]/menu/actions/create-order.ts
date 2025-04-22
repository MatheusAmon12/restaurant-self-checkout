"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

import { removeCpfPontuations } from "../helpers/remove-cpf-pontuations";

export interface createOrderInput {
  customerName: string;
  customerCpf: string;
  products: Array<{
    id: string;
    quantity: number;
  }>;
  consumptionMethod: "TAKEAWAY" | "DINE_IN";
  slug: string;
}

interface CreateOrderResponse {
  customerCpf: string;
  slug: string;
}

export const createOrder = async (
  input: createOrderInput,
): Promise<CreateOrderResponse> => {
  const restaurant = await db.restaurant.findUnique({
    where: {
      slug: input.slug,
    },
  });

  if (!restaurant) throw new Error("Restaurant not found");

  const productsWithPrices = await db.product.findMany({
    where: {
      id: {
        in: input.products.map((product) => product.id),
      },
    },
  });

  const productsWithPricesAndQuantities = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productsWithPrices.find(
      (productWithPrice) => productWithPrice.id === product.id,
    )!.price,
  }));

  const total = productsWithPricesAndQuantities.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0.0,
  );

  await db.order.create({
    data: {
      status: "PENDING",
      customerName: input.customerName,
      customerCpf: removeCpfPontuations(input.customerCpf),
      consumptionMethod: input.consumptionMethod,
      restaurantId: restaurant.id,
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantities,
        },
      },
      total,
    },
  });

  revalidatePath(`/${input.slug}/orders`);

  return {
    customerCpf: removeCpfPontuations(input.customerCpf),
    slug: input.slug,
  };
};
