import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import { api } from "../../api/api";

function HomePage() {
  const { loggedInUser } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setIsLoading(true);
      try {
        const response = await api.get("/users/all");
        setUsers([...response.data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers();
  }, []);

  function handleSearch(e) {
    setSearch(e.target.value);
  }

  return (
    <div>
      {!loggedInUser && (
        <>
          <h1>Home Page</h1>
          <Link to="/sign-up">Sign up</Link>
          <Link to="/login">Login</Link>
          <h2>Você não está logado</h2>
          <h2>CADESTRE-SE. TURMA 85 WD FT</h2>
        </>
      )}

      {loggedInUser && (
        <>
          <h1>Você está logado</h1>
          <p>todos os usuários da plataforma MENOS EU</p>
          <input
            placeholder="procure por um parça seu"
            value={search}
            onChange={handleSearch}
          />
          {!isLoading &&
            users
              .filter((user) =>
                user.username.toLowerCase().includes(search.toLowerCase())
              )
              .map((user) => {
                if (user._id !== loggedInUser.user._id) {
                  return (
                    <div key={user._id}>
                      <h1>{user.username}</h1>
                      <img src={user.profilePic} alt="" />
                      <Link to={`/users/${user._id}`}>Ver Perfil</Link>
                    </div>
                  );
                }
                return;
              })}
        </>
      )}
    </div>
  );
}


export default HomePage;
