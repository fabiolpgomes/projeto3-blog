import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/api";
import CreateComment from "../../components/CreateComment";

function UsersPage() {
  const { idUser } = useParams();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setIsLoading(true);
      try {
        const response = await api.get(`/users/user/${idUser}`);
        const response2 = await api.get(`/users/profile`);
        setUser({ ...response.data });
        setLoggedInUser({ ...response2.data });
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUser();
  }, [idUser, reload]);

  async function follow() {
    try {
      await api.put(`/users/follow/${user._id}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }
  async function unfollow() {
    try {
      await api.put(`/users/unfollow/${user._id}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeleteComment(idComment) {
    try {
      await api.delete(`/comments/delete/${idComment}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(user);

  return (
    <div>
      {!isLoading && (
        <div>
          <h1>{user.username}</h1>
          <img src={user.profilePic} alt="" />
          <p>Posts: {user.posts.length}</p>
          <p>Seguindo: {user.following.length}</p>
          <p>Seguidores: {user.followers.length}</p>

          {loggedInUser.following.includes(user._id) ? (
            <button onClick={unfollow}>Deixar de Seguir</button>
          ) : (
            <button onClick={follow}>Seguir</button>
          )}

          {loggedInUser.following.includes(user._id) && (
            <div>
              {user.posts.map((post) => {
                return (
                  <div key={post._id}>
                    <h1>{post.content}</h1>
                    <CreateComment
                      idPost={post._id}
                      setReload={setReload}
                      reload={reload}
                    />

                    {post.comments.length !== 0 && <h2>Comentários:</h2>}
                    {post.comments.map((comment) => {
                      return (
                        <div key={comment._id}>
                          <p>{comment.content} - criado por: </p>
                          <button>delete</button>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UsersPage;
