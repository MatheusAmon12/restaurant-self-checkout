import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createOrder } from "../actions/create-order";

export const useCreateOrder = () => {
  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      toast.success("Pedido realizado com sucesso");
      router.push(`/${data.slug}/orders?cpf=${data.customerCpf}`);
    },
    onError: () => {
      toast.error("Erro ao realizar pedido");
    },
  });

  return { mutate, isPending, isSuccess };
};
