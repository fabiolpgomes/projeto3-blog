import { useState } from "react";
import { api } from "../../api/api";

function CreateComment({ idPost, setReload, reload }) {
  const [comment, setComment] = useState({ content: "" });

  function handleChange(e) {
    setComment({ ...comment, content: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(`/comments/create/${idPost}`, comment);
      setReload(!reload);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Comentar"
        onChange={handleChange}
        value={comment.content}
      />
      <button type="submit">Postar Comentário</button>
    </form>
  );
}

export default CreateComment;
