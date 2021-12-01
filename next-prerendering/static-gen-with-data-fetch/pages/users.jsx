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
            <p>{user.name}</p>
            <p>{user.email}</p>
          </div>
        );
      })}
    </>
  );
}
