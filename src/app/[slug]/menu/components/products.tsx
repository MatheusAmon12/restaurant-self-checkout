import { Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductsProps {
  products: Product[];
}

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div className="space-y-3 px-5 py-3">
      {products.map((product) => (
        <Link
          key={product.id}
          href="#"
          className="flex items-center justify-between gap-10 border-b py-3"
        >
          <div>
            <h3 className="text-sm font-medium">{product.name}</h3>
            <p className="line-clamp-2 text-sm text-muted-foreground">
              {product.description}
            </p>
            <p className="pt-3 text-sm font-semibold">
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(product.price)}
            </p>
          </div>
          <div className="relative min-h-[82px] min-w-[120px]">
            <Image
              src={product.imageUrl}
              fill
              className="rounded-lg object-contain"
              alt={product.name}
            />
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Products;
