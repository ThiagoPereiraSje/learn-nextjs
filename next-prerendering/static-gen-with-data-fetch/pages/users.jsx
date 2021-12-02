import User from "../components/user";

/* Fetch external data in build time and
 send inside the props for the page.  */
export async function getStaticProps() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  const data = await response.json();

  // Send data for the page.
  return {
    props: {
      users: data,
    },
  };
}

// users inside the props here!
export default function UserList({ users }) {
  return (
    <>
      <h1>List of users</h1>
      {users.map((user) => {
        return (
          <div key={user.id}>
            {/* Components cannot be created inside pages folder */}
            <User user={user} />
          </div>
        );
      })}
    </>
  );
}

/* More About getStaticProps:
  1.
    - getStaticProps runs only on the server side.
    - The function will never run client-side.
    - The code you write inside getStaticProps won't even be included in the JS bundle 
      that is sent to the browser.
    - 

  2.
    - You can write server-side code directly in getStaticProps.
      Ex.: Accessing the file system using the fs module or querying a database
      can be done inside getStaticProps.

    - You also don't have to worry about including API keys in getStaticProps as 
      that won't make it to the browser.

  3.
    - getStaticProps is allowed only in a page and cannot be run from a regular component file.
    - It is used only for pre-rendering and not client-side data fetching.

  4.
    - getStaticProps should return an object and object should contain a props key which is an object.
      In our example, we returned an object & the object contained a props key which was an object as well.

  5. 
    - getStaticProps will run at build time.
    - During development, getStaticProps runs on every request.
*/
