"use client";

import { DialogTitle } from "@radix-ui/react-dialog";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";

import FinishOrderForm from "./finish-order-form";

const FinishOrderButton = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-full">Finalizar pedido</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DialogTitle>Finalizar pedido</DialogTitle>
          <DrawerDescription>
            Insira suas informações para finalizar o seu pedido.
          </DrawerDescription>
        </DrawerHeader>
        <FinishOrderForm />
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderButton;
