import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../api/api";

function SignUpPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [img, setImg] = useState("");

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleImage(e) {
    setImg(e.target.files[0]);
  }

  async function handleUpdate() {
    try {
      const uploadData = new FormData();
      console.log(uploadData);
      uploadData.append("picture", img);

      const response = await api.post("/upload-image", uploadData);

      return response.data.url;
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      //primeiro o upload da imagem
      const imgUrl = await handleUpdate();

      await api.post("/users/sign-up", {
        ...form,
        imgUrl: imgUrl,
      });

      navigate("/login");
      toast.success("Usuário criado! Por favor ative sua conta!");
    } catch (error) {
      console.log(error);
      toast.error(`Ocorreu um erro`);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Username:</label>
      <input
        name="username"
        type="text"
        value={form.username}
        onChange={handleChange}
      />

      <label>E-mail:</label>
      <input
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
      />
      <label>Senha:</label>
      <input
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
      />

      <label>Profile Pic</label>
      <input type="file" id="formImg" onChange={handleImage} />

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default SignUpPage;
