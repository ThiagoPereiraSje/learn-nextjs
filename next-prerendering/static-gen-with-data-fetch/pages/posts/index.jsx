import Link from "next/link";

export async function getStaticProps() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const data = await response.json();

  // Send data inside the props
  return {
    props: {
      posts: data.slice(0, 3),
    },
  };
}

export default function PostList({ posts }) {
  return (
    <>
      <h1>List of Posts</h1>
      {posts.map((p) => (
        <div key={p.id}>
          <Link href={`/posts/${p.id}`} passHref>
            <h2>
              {p.id} - {p.title}
            </h2>
          </Link>
          <hr />
        </div>
      ))}
    </>
  );
}
