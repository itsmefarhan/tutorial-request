import { useState } from "react";
import firebase from "../firebase";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Heading from "../components/Heading";
import Main from "../components/Main";
import Input from "../components/Input";
import Button from "../components/Button";

const Request = () => {
  const router = useRouter();

  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const addRequest = firebase.functions().httpsCallable("addRequest");
      await addRequest({ title });
      setTitle("");
      router.replace("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Main>
      <ToastContainer position="top-center" />
      <Heading label="Request A Tutorial" />
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          placeholder="Enter tutorial name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button label="Request" />
      </form>
    </Main>
  );
};

export default Request;
