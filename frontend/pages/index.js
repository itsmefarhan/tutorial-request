import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "../firebase";

export default function Home() {
  const [requests, setRequests] = useState([]);

  const upvote = async (id) => {
    try {
      const ref = firebase.functions().httpsCallable("upvote");
      await ref({ id });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    let ref = firebase
      .firestore()
      .collection("requests")
      .orderBy("upvotes", "desc");
    ref.onSnapshot((snapshot) => {
      let requests = [];
      snapshot.forEach((doc) => {
        requests.push({ ...doc.data(), id: doc.id });
      });
      setRequests(requests);
    });
    return () => ref;
  }, []);

  return (
    <div>
      <ToastContainer position="top-center" />
      {requests.map((request) => (
        <div
          className="flex justify-between mt-4 shadow-lg py-4 px-10 items-center max-w-3xl mx-auto rounded-md"
          key={request.id}
        >
          <div>
            <h3 className="font-medium text-2xl">{request.title}</h3>
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xl mr-2">{request.upvotes}</p>
            <svg
              onClick={() => upvote(request.id)}
              className="w-6 h-6 cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              ></path>
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}

// export const getServerSideProps = async () => {
//   const docs = await firebase.firestore().collection("requests").get();
//   let requests = [];
//   docs.forEach((doc) => {
//     requests.push({ ...doc.data(), id: doc.id });
//   });
//   return {
//     props: { requests },
//   };
// };
