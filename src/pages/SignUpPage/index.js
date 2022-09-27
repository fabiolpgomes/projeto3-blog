import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { api } from "../../api/api";
import { AuthContext } from "../../contexts/authContext";

function SignUpPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { ironhack } = useContext(AuthContext);
  console.log(ironhack);

  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await api.post("/users/sign-up", form);

      navigate("/login");
      toast.success("Usuário criado!");
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

      <h1>DENTRO DESSE H1: IRONHACK:</h1>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default SignUpPage;
