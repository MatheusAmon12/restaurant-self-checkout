import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createOrder } from "../actions/create-order";

export const useCreateOrder = () => {
  const router = useRouter();
  const { mutate, isPending } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Pedido realizado com sucesso");
      router.back();
    },
    onError: () => {
      toast.error("Erro ao realizar pedido");
    },
  });

  return { mutate, isPending };
};
