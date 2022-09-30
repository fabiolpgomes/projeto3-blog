import { useState } from "react";
import { api } from "../../api/api";

function CreatePost({ reload, setReload }) {
  const [post, setPost] = useState({ content: "" });

  console.log(post);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/posts/create", post);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="O que você está pensando?"
        onChange={(e) => setPost({ ...post, content: e.target.value })}
        value={post.content}
      />
      <button type="submit">criar post</button>
    </form>
  );
}

export default CreatePost;
