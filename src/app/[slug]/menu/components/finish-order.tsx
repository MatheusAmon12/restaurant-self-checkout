"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { DialogProps, DialogTitle } from "@radix-ui/react-dialog";
import { useParams, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
} from "@/components/ui/drawer";

import { CartContext } from "../contexts/cart";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { FinishOrderFormSchema, finishOrderFormSchema } from "../types/schemas";
import FinishOrderForm from "./finish-order-form";

const FinishOrder: React.FC<DialogProps> = ({ ...props }) => {
  const [isFinishOrderDialogOpen, setIsFinishOrderDialogOpen] = useState(false);
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { products } = useContext(CartContext);
  const { mutate, isPending, isSuccess } = useCreateOrder();

  const form = useForm<FinishOrderFormSchema>({
    resolver: zodResolver(finishOrderFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      cpf: "",
    },
    shouldUnregister: true,
  });

  const handleFinishOrderFormSubmit = (data: FinishOrderFormSchema) => {
    const consumptionMethod = searchParams.get(
      "consumptionMethod",
    ) as ConsumptionMethod;

    mutate({
      customerCpf: data.cpf,
      customerName: data.name,
      consumptionMethod,
      products,
      slug,
    });
  };

  useEffect(() => {
    if (isSuccess) setIsFinishOrderDialogOpen(false);
  }, [isSuccess, setIsFinishOrderDialogOpen]);

  return (
    <Drawer
      open={isFinishOrderDialogOpen}
      onOpenChange={setIsFinishOrderDialogOpen}
      {...props}
    >
      <DrawerContent>
        <DrawerHeader>
          <DialogTitle>Finalizar pedido</DialogTitle>
          <DrawerDescription>
            Insira suas informações para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <FinishOrderForm
          form={form}
          isPending={isPending}
          handleFinishOrderFormSubmit={handleFinishOrderFormSubmit}
        />
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrder;
