// Tell nextjs the possible postId values that should be pre-rendered.
// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: { postId: "1" },
//       },
//       {
//         params: { postId: "2" },
//       },
//       {
//         params: { postId: "3" },
//       },
//     ],
//     fallback: false,
//   };
// }

// Inform nextjs that 100 static pages need to be generated
export async function getStaticPaths() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  const data = await response.json();

  const paths = data.map((post) => {
    return {
      params: {
        postId: `${post.id}`,
      },
    };
  });

  return {
    paths: paths.slice(0, 3),
    fallback: false,
  };
}

/* getStaticPaths fallback: false 
  1 - The paths returned from getStaticPaths will be rendered to HTML at build 
    time by getStaticProps.
  2 - If fallback is set to false, then any paths not returned by 
    getStaticProps will result in a 404 page.
  
  When to use ?
    The false value is most suitable if you have an application with a small number of paths to prerender.
    When new pages are not added often. Ex.: Blog.
*/

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await response.json();

  // Send data inside the props
  return {
    props: {
      post: data,
    },
  };
}

export default function Post({ post }) {
  return (
    <>
      <h2>
        {post.id} - {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
}
