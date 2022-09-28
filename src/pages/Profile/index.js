import { api } from "../../api/api";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { loggedInUser } = useContext(AuthContext); //COMO CONSUMIR O SEU CONTEXT
  console.log(loggedInUser);

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

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

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <h2>Meu nome: {loggedInUser.user.username}</h2>
      <p>Email {loggedInUser.user.email}</p>
      <img src={user.imgUrl} alt="profile" />

      {!isLoading &&
        user.posts.map((post) => {
          return <p>{post.content}</p>;
        })}

      <button onClick={handleLogOut}>Logout</button>
    </div>
  );
}

export default ProfilePage;
