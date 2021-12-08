export async function getStaticProps() {
  console.log("Generating / Regenerating ProductList");

  const response = await fetch(
    "http://localhost:4000/products"
  );

  const data = await response.json();

  // Send data inside the props
  return {
    props: {
      products: data,
    },
    revalidate: 30, // ISR
  };
}

export default function ProductList({ products }) {
  return (
    <>
      <h1>List of products</h1>

      {products.map((p) => (
        <div key={p.id}>
          <h2>
            {p.id} {p.title} {p.price}
          </h2>
          <hr />
        </div>
      ))}
    </>
  );
}
