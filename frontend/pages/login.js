import { useState } from "react";
import firebase from "../firebase";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Heading from "../components/Heading";
import Main from "../components/Main";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(data.email, data.password);
      router.replace("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Main>
      <ToastContainer position="top-center" />
      <Heading label="Log Into Your Account" />
      <form onSubmit={handleSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={data.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={data.password}
          onChange={handleChange}
        />
        <Button label="Login" />
      </form>
    </Main>
  );
};

export default Login;
