import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );

  const data = await response.json();

  // Send data inside the props
  return {
    props: {
      product: data,
    },
  };
}

export default function Product({ product }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>
        {product.id} - {product.title} - {product.price}
      </h2>
      <p>{product.description}</p>
      <hr />
    </>
  );
}
