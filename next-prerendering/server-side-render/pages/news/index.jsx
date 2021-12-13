/* getServerSideProps
    1 - getServerSideProps runs only on the server side.
    2 - The function will never run client-side
    3 - The code you write inside getServerSideProps won't even be included 
      in the JS bundle that is sent to the browser.
    
    4 - You can write server-side code directly in getServerSideProps.
    5 - Accessing the file system using the fs module or querying a database.
      can be done inside getServerSideProps.
    6 - You also don't have to worry about including API keys in getServerSideProps as that
      won't make it to the browser.
    
    Warnings:
      1 - getServerSideProps is allowed only in a page and cannot be run from a regular 
        component file.
      2 - It is used only for pre-rendering and not client-side data fetching.
      3 - getServerSideProps should return an object and object should contain a props key
        which is an object.
      4 - getServerSideProps will run at request time.
*/

export async function getServerSideProps() {
  const response = await fetch(
    "http://localhost:4000/news"
  );

  const data = await response.json();

  return {
    props: {
      articles: data,
    },
  };
}

export default function NewsArticleList({ articles }) {
  return (
    <>
      <h1>List of News Articles</h1>
      {articles.map((a) => (
        <div key={a.id}>
          <h2>
            {a.id} {a.title} - {a.category}
          </h2>
        </div>
      ))}
    </>
  );
}
