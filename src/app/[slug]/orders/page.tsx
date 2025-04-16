import { notFound } from "next/navigation";

import { db } from "@/lib/prisma";

import { isValidCPF } from "../menu/helpers/is-valid-cpf";
import { removeCpfPontuations } from "../menu/helpers/remove-cpf-pontuations";
import CpfForm from "./components/cpf-form";
import OrdersList from "./components/orders-list";

interface OrderPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage: React.FC<OrderPageProps> = async ({ searchParams }) => {
  const { cpf } = await searchParams;

  if (!cpf) return <CpfForm />;

  if (!isValidCPF(cpf)) return <CpfForm />;

  const orders = await db.order.findMany({
    where: { customerCpf: removeCpfPontuations(cpf) },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
        },
      },
      orderProducts: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orders) return notFound();

  return <OrdersList orders={orders} />;
};

export default OrdersPage;
