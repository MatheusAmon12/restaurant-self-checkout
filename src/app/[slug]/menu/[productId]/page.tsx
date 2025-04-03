import { notFound } from "next/navigation";
import React from "react";

import { db } from "@/lib/prisma";

import ProductPageHeader from "./components/product-page-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { slug, productId } = await params;
  const product = await db.product.findUniqueOrThrow({
    where: { id: productId },
  });

  if (!product) return notFound();

  return (
    <div>
      <ProductPageHeader product={product} />
    </div>
  );
};

export default ProductPage;
