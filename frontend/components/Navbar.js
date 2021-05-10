import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import firebase from "../firebase";

const Navbar = () => {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
  }, [user]);

  return (
    <div className="p-4 bg-white shadow flex justify-between items-center">
      <Link href="/">
        <a className="text-lg md:text-3xl font-bold text-gray-600">
          Tutorial Requests
        </a>
      </Link>
      {!loading && (
        <div>
          {!user ? (
            <>
              <Link href="/register">
                <a className="mr-2">Register</a>
              </Link>
              <Link href="/login">
                <a className="">Login</a>
              </Link>
            </>
          ) : (
            <>
              <Link href="/request">
                <a className="mr-2">Add Request</a>
              </Link>
              <button
                className="py-2 px-4 bg-red-500 text-white rounded-md"
                onClick={() => {
                  firebase.auth().signOut();
                  router.replace("/login");
                }}
              >
                Signout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
