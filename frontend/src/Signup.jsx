import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import mnnitimage from "./assets/mnnit.jpg";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [passShow, setPassShow] = useState(false);
  const [cpassShow, setCPassShow] = useState(false);
  const [inpval, setInpval] = useState({
    fname: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const setVal = (e) => {
    const { name, value } = e.target;
    setInpval((prev) => ({ ...prev, [name]: value }));
  };

  const addUserdata = async (e) => {
    e.preventDefault();
    const { fname, email, password, cpassword } = inpval;

    if (fname === "") {
      toast.warning("Full name is required!", { position: "top-center" });
    } else if (email === "") {
      toast.error("Email is required!", { position: "top-center" });
    } else if (!email.includes("@")) {
      toast.warning("Include @ in your email!", { position: "top-center" });
    } else if (password === "") {
      toast.error("Password is required!", { position: "top-center" });
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters!", {
        position: "top-center",
      });
    } else if (cpassword === "") {
      toast.error("Confirm password is required!", { position: "top-center" });
    } else if (cpassword.length < 6) {
      toast.error("Confirm password must be at least 6 characters!", {
        position: "top-center",
      });
    } else if (password !== cpassword) {
      toast.error("Passwords do not match!", { position: "top-center" });
    } else {
      try {
        const res = await axios.post("/api/register", inpval, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.status === 201) {
          toast.success("Check your email to verify your account.", {
            position: "top-center",
          });
        } else {
          toast.error(res.data.message || "Signup failed. Please try again.", {
            position: "top-center",
          });
        }
      } catch (error) {
        toast.error(
          error.response?.data.message || "Server error. Please try again.",
          { position: "top-center" }
        );
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-gray-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-md shadow-lg bg-gray-800 p-8 rounded-lg hover:shadow-xl transition-shadow duration-200">
          <img
            alt="MNNIT Logo"
            src={mnnitimage}
            className="mx-auto h-36 w-auto drop-shadow-lg"
          />
          <h2 className="mt-6 text-center text-2xl font-extrabold tracking-wide text-yellow-500">
            Sign Up to your account
          </h2>
          <form onSubmit={addUserdata} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-yellow-500"
              >
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                onChange={setVal}
                value={inpval.fname}
                name="fname"
                required
                className="mt-2 block w-full rounded-md bg-gray-900 py-2 px-3 text-white border border-gray-600 shadow focus:border-yellow-500 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-yellow-500"
              >
                Email Address
              </label>
              <input
                type="email"
                onChange={setVal}
                value={inpval.email}
                name="email"
                placeholder="Email Address"
                required
                className="mt-2 block w-full rounded-md bg-gray-900 py-2 px-3 text-white border border-gray-600 shadow focus:border-yellow-500 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-yellow-500"
              >
                Password
              </label>
              <div className="relative mt-2">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  placeholder="Password"
                  required
                  className="block w-full rounded-md bg-gray-900 py-2 px-3 text-white border border-gray-600 shadow focus:border-yellow-500 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="button"
                  onClick={() => setPassShow(!passShow)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-yellow-400 hover:text-yellow-300"
                >
                  {passShow ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium text-yellow-500"
              >
                Confirm Password
              </label>
              <div className="relative mt-2">
                <input
                  type={!cpassShow ? "password" : "text"}
                  value={inpval.cpassword}
                  onChange={setVal}
                  name="cpassword"
                  placeholder="Confirm Password"
                  required
                  className="block w-full rounded-md bg-gray-900 py-2 px-3 text-white border border-gray-600 shadow focus:border-yellow-500 placeholder-gray-500 focus:ring-2 focus:ring-yellow-500"
                />
                <button
                  type="button"
                  onClick={() => setCPassShow(!cpassShow)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-yellow-400 hover:text-yellow-300"
                >
                  {cpassShow ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-yellow-500 px-4 py-2 text-lg font-bold text-gray-900 shadow-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition duration-200"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-yellow-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-yellow-500 hover:text-yellow-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Signup;
