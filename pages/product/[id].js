import { useRouter } from "next/router";

export default function Product() {
  const router = useRouter();
  const id = router.query.id;
  return <h1>Details about product {id}</h1>;
}
