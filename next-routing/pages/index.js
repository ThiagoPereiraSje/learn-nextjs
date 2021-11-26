import { useRouter } from "next/dist/client/router";
import Link from "next/link";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    console.log("Placing your order");
    router.push("/product");
    // router.replace("/product");
  };

  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/blog">
        <a>Blog</a>
      </Link>
      <Link href="/product">
        <a>Products</a>
      </Link>
      <br />

      <button onClick={handleClick}>Place Order</button>
    </div>
  );
}
