import { notFound } from "next/navigation";
import React from "react";

import { db } from "@/lib/prisma";

import ProductDetails from "./components/product-details";
import ProductPageHeader from "./components/product-page-header";

interface ProductPageProps {
  params: Promise<{ productId: string, slug: string }>;
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const { productId, slug } = await params;
  const product = await db.product.findUnique({
    where: { id: productId },
    include: {
      restaurant: {
        select: {
          name: true,
          avatarImageUrl: true,
          slug: true,
        },
      },
    },
  });

  if (!product) return notFound();

  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) return notFound();

  return (
    <div className="flex h-full flex-col">
      <ProductPageHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
