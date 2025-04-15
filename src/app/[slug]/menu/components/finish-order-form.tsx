"use client";

import { LoaderIcon } from "lucide-react";
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
import { FinishOrderFormSchema } from "../types/schemas";

interface FinishOrderFormProps {
  form: ReturnType<typeof useForm<FinishOrderFormSchema>>;
  handleFinishOrderFormSubmit: (data: FinishOrderFormSchema) => void;
  isPending: boolean;
}

const FinishOrderForm: React.FC<FinishOrderFormProps> = ({
  form,
  handleFinishOrderFormSubmit,
  isPending,
}) => {
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
