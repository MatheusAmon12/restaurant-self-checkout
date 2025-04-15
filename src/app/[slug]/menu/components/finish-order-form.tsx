"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ConsumptionMethod } from "@prisma/client";
import { LoaderIcon } from "lucide-react";
import { useParams, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { DrawerClose, DrawerFooter } from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { CartContext } from "../contexts/cart";
import { cpfMask } from "../helpers/cpf-mask";
import { useCreateOrder } from "../hooks/useCreateOrder";
import { FinishOrderFormSchema, finishOrderFormSchema } from "../types/schemas";

const FinishOrderForm = () => {
  const { slug } = useParams<{ slug: string }>();
  const searchParams = useSearchParams();
  const { products } = useContext(CartContext);
  const { mutate, isPending } = useCreateOrder();

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

  return (
    <Form {...form}>
      <form
        id="finish-order-form"
        onSubmit={form.handleSubmit(handleFinishOrderFormSubmit)}
      >
        <div className="space-y-5 p-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  Seu nome
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Digite seu nome..."
                    {...field}
                    className="text-xs placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-muted-foreground">
                  CPF
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    inputMode="numeric"
                    maxLength={14}
                    placeholder="Digite seu CPF..."
                    onChange={(e) => field.onChange(cpfMask(e.target.value))}
                    className="text-xs placeholder:text-xs"
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>
      </form>
      <DrawerFooter>
        <Button
          form="finish-order-form"
          type="submit"
          variant="destructive"
          className="w-full rounded-full"
          disabled={isPending}
        >
          {isPending && <LoaderIcon className="animate-spin" />}
          Finalizar
        </Button>
        <DrawerClose asChild>
          <Button
            variant="outline"
            className="w-full rounded-full"
            disabled={isPending}
          >
            Cancelar
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </Form>
  );
};

export default FinishOrderForm;
