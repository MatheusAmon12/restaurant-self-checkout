"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { DialogTitle } from "@radix-ui/react-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { cpfMask } from "../../menu/helpers/cpf-mask";
import { removeCpfPontuations } from "../../menu/helpers/remove-cpf-pontuations";
import { CpfFormSchema, cpfFormSchema } from "../types/schemas";

const CpfForm = () => {
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<CpfFormSchema>({
    resolver: zodResolver(cpfFormSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      cpf: "",
    },
  });

  const handleCpfFormSubmit = (data: CpfFormSchema) => {
    router.push(`${pathname}?cpf=${removeCpfPontuations(data.cpf)}`);
  };

  const handleCancelClick = () => router.back();

  return (
    <Drawer open>
      <DrawerContent>
        <DrawerHeader>
          <DialogTitle>Visualizar Pedidos</DialogTitle>
          <DrawerDescription>
            Insira seu CPF abaixo para visualizar seus pedidos.
          </DrawerDescription>
        </DrawerHeader>
        <Form {...form}>
          <form id="cpf-form" onSubmit={form.handleSubmit(handleCpfFormSubmit)}>
            <div className="px-5">
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
                        onChange={(e) =>
                          field.onChange(cpfMask(e.target.value))
                        }
                        className="text-xs placeholder:text-xs"
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
        <DrawerFooter>
          <Button
            form="cpf-form"
            type="submit"
            variant="destructive"
            className="w-full rounded-full"
          >
            Confirmar
          </Button>
          <DrawerClose asChild>
            <Button
              form="cpf-form"
              type="submit"
              variant="outline"
              className="w-full rounded-full"
              onClick={handleCancelClick}
            >
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
