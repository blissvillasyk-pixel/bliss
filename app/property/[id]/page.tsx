import ProductDetailsClient from "./client";

interface Params {
  params: { id: string };
}
const ProductDetailsPage = async ({ params }: Params) => {
  const { id } = await params;
  return (
    <div className="w-full overflow-x-hidden">
      <ProductDetailsClient id={id} />
    </div>
  );
};

export default ProductDetailsPage;
