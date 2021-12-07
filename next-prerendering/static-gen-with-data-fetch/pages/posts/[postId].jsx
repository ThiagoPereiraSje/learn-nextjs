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

import { useRouter } from "next/dist/client/router";

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
    fallback: true,
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

/* getStaticPaths fallback: true
  1 - The paths returned from getStaticPaths will be rendered to HTML at build 
    time by getStaticProps.
  2 - The paths that have not been generated at build time will not result in a 404 page. Instead,
    NextJS will serve a "fallback" version of the page on the first request to such a path.
  3 - In the background, NextJS will statically generate the requested path HTML and JSON. This
    includes running getStaticProps.
  4 - When that's done, the browser receives the JSON for the generated path.This will be used to
    automatically render the page with the required props. From the user's perspective, the page will
    be swapped from the fallback page to the full page.
  5 - At the same time, NextJS keeps track of the new list of pre-rendered pages. Subsequent requests
    to the same path will serve the generated page, just like other pages pre-rendered at build time.

  When to use ?
    The true value is most suitable if your app has a very large number of static pages that depend on data.
    
    A large e-commerce site.
    
    You want  all the product pages to be pre-rendered bu if you have a few thousand products, builds can take
    a really long time.
    
    You may statically generate a small subset of products that are popular and use fallback: true for the rest.
    
    When someone requests a page that's not generated yet, the user will see the page with a loading indicator.
    
    Shorty after, getStaticProps finishes and the page will be rendered with the requested data. From the onwards,
    everyone who requests the same page will get the statically pre-rendered page.
    
    This ensures that users always have a fast experience while preserving fast builds and the benefits of 
    Static Generation.
*/

export async function getStaticProps(context) {
  const { params } = context;

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.postId}`
  );

  const data = await response.json();

  if (!data.id) {
    return {
      notFound: true,
    };
  }

  // Track fallback behavior
  console.log("Generate page for post/" + params.postId);

  // Send data inside the props
  return {
    props: {
      post: data,
    },
  };
}

export default function Post({ post }) {
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h2>
        {post.id} - {post.title}
      </h2>
      <p>{post.body}</p>
    </>
  );
}
