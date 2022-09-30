import { useEffect, useState } from "react";
import { api } from "../../api/api";
import CreateComment from "../CreateComment";

function MyPosts({ reload, setReload }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchMyPosts() {
      setIsLoading(true);
      try {
        const response = await api.get("/posts/my-posts");
        setPosts([...response.data]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMyPosts();
  }, [reload]);

  async function handleDeleteComment(idComment) {
    try {
      await api.delete(`/comments/delete/${idComment}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDeletePost(idPost) {
    try {
      await api.delete(`/posts/delete/${idPost}`);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h1>Meus posts</h1>
      {!isLoading &&
        posts.map((post) => {
          const date = new Date(post.createdAt);
          const dd = date.getDate();
          const mm = date.getMonth() + 1;
          const aa = date.getFullYear();
          const hh = date.getHours();
          const min = date.getMinutes();
          return (
            <div>
              <p>
                {post.content} - postado: {dd}/{mm}/{aa} - {hh}:{min}
              </p>
              <button onClick={() => handleDeletePost(post._id)}>
                deletar post
              </button>

              <CreateComment
                idPost={post._id}
                reload={reload}
                setReload={setReload}
              />

              {post.comments.length !== 0 && <h2>Comentários:</h2>}
              {post.comments.map((comment) => {
                return (
                  <div key={comment._id}>
                    <p>
                      {comment.content} - criado por: {comment.author.username}
                    </p>
                    <button onClick={() => handleDeleteComment(comment._id)}>
                      delete
                    </button>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
}

export default MyPosts;
