import { useRouter } from "next/router";

export async function getStaticPaths() {
  return {
    paths: [{ params: { productId: "1" } }],
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { params } = context;

  console.log(`Regenerating product ${params.productId}`);

  const response = await fetch(
    `http://localhost:4000/products/${params.productId}`
  );

  const data = await response.json();

  // Send data inside the props
  return {
    props: {
      product: data,
    },
    revalidate: 10,
  };
}

/* Re-generation
  A re-generation is initiated only if a user makes a request after the revalidate time.

  If a user visits our product details page but there is no other user hitting that page the entire
  day, the re-generation does not happen.

  Revalidate does not mean the page automatically re-generates every 10 seconds.

  It simply denotes the time after which, if a user makes a request, a re-generation has to be initiated.

  The re-generation can also fail and the previously cached HTML could be served till the subsequent 
  re-generations succeed.
*/

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
