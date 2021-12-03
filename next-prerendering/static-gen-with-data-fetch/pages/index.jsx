import Link from "next/link";

export default function Home() {
  return (
    <>
      <h1>NextJS Pre-rendering</h1>
      <Link href="/users">
        <a>Users</a>
      </Link>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
    </>
  );
}

/* 
  Any <Link /> component in the viewport (initially or through scroll) will be 
prefetched by default (including the corresponding data) for pages
using Static Generation. 
*/

/* 
  When a page with getStaticProps id pre-rendered at build time, in addition
to the page HTML file, Next.js generates a JSON file holding the result
of running getStaticProps.

The JSON file will be used in client-side routing through next/link, or next/router.

When you navigate to a page that's pre-rendered using getStaticProps, NextJS fetches
the JSON file (pre-computed at build time) and uses it as the props to create the
page component client-side.

Client-side page transitions will not call getStaticProps a only the exported JSON
is used.
*/
