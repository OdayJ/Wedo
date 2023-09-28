"use client";

import { useEffect, useState } from "react";
import { FaTasks } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace("/feed"); // or wherever you want to redirect to
    }
  }, [session]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    } else if (password.length < 8) {
      setError("Password must be more than 8 characters");
      return;
    }
    try {
      const data = {
        email: email,
        password: password,
      };
      const res = await fetch("http://localhost:3001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result == -1) {
        console.log(result);
        setError("User Already exists");
        return;
      }
      if (res.ok) {
        setEmail("");
        setPassword("");
        router.push("/signin");
      } else {
        console.log("User registration failed");
      }
    } catch (error) {
      console.log("Error during registration: ", error);
    }
  };
  return (
    <div className="flex items-center justify-center py-12 px-7 ">
      <div className="xl:w-[1085px] w-[343px] h-full xl:gap-8 gap-11 flex flex-col ">
        <div className="flex gap-4 ">
          <FaTasks fill="#845EF7" size={45} />
          <p className="  flex items-center text-primary font-bold text-2xl">
            Wedo
          </p>
        </div>
        <div className="grid self-start grid-cols-5 place-items-center">
          <div className="w-full xl:w-2/3 justify-self-start h-full col-span-5 xl:col-span-3  md:p-0  flex flex-col  justify-center items-center gap-4 text-neutral font-poppins">
            <div className="mb-7 self-start flex flex-col gap-11 ">
              <div className="flex flex-col gap-2">
                <p className=" text-3xl font-semibold">Sign Up</p>
                <div className="flex gap-x-1  text-lg ">
                  <p className="opacity-60 ">Already a user? </p>
                  <a href="/signin" className="opacity-100 font-bold">
                    Login.
                  </a>
                </div>
              </div>
            </div>
            {error && (
              <p className="self-start text-xs text-[#d24c42]">{error}</p>
            )}

            <form
              onSubmit={handleSubmit}
              className="w-full grid grid-rows-3 gap-5 "
            >
              <div className="w-full h-16 border border-[#E6E6E6] rounded-lg p-2 text-neutral">
                <p className="mb-2 text-xs font-medium ">Email</p>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  className="w-full placeholder-neutral placeholder-opacity-30 text-sm outline-none"
                  type="text"
                  placeholder="Enter your email..."
                />
              </div>
              <div className="w-full h-16 border border-[#E6E6E6] rounded-lg p-2 text-neutral">
                <p className="mb-2 text-xs  font-medium ">Password</p>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  className="w-full placeholder-neutral placeholder-opacity-30 outline-none text-sm  "
                  type="password"
                  placeholder="Enter your password..."
                />
              </div>
              <button className="w-full h-16 bg-primary rounded-lg  font-semibold text-2xl text-white ">
                Sign Up
              </button>
            </form>

            <div className="w-full h-9 text-xs opacity-60">
              By continuing you agree that you have read, understood and agree
              to Wedo <strong>terms and conditions.</strong>
            </div>
          </div>
          <img
            src="./Signup.png"
            className="w-[456px] h-[442px] col-span-2 xl:block hidden"
          />
        </div>
      </div>
    </div>
  );
}
