"use client";

import { zodResolver } from "@hookform/resolvers/zod";
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

import { cpfMask } from "../helpers/cpf-mask";
import { FinishOrderFormSchema, finishOrderFormSchema } from "../types/schemas";

const FinishOrderForm = () => {
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
    console.log(data);
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
          className="rounded-full w-full"
        >
          Finalizar
        </Button>
        <DrawerClose asChild>
          <Button variant="outline" className="rounded-full w-full">
            Cancelar
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </Form>
  );
};

export default FinishOrderForm;
