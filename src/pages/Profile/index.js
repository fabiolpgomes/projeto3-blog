import { api } from "../../api/api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";

function ProfilePage() {
  const { loggedInUser } = useContext(AuthContext); //COMO CONSUMIR O SEU CONTEXT
  console.log(loggedInUser);

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    async function fetchUser() {
      try {
        const response = await api.get("/users/profile");
        console.log(response);
        setUser({ ...response.data });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUser();
  }, []);

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Meu nome: {loggedInUser.user.username}</h2>
      <p>Email {loggedInUser.user.email}</p>

      {!isLoading &&
        user.posts.map((post) => {
          return <p>{post.content}</p>;
        })}
    </div>
  );
}

export default ProfilePage;
