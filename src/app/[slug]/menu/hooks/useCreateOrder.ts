import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { createOrder } from "../actions/create-order";

export const useCreateOrder = () => {
  const router = useRouter();
  const { slug } = useParams<{ slug: string }>();
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Pedido realizado com sucesso");
      router.push(`/${slug}/orders`);
    },
    onError: () => {
      toast.error("Erro ao realizar pedido");
    },
  });

  return { mutate, isPending, isSuccess };
};
