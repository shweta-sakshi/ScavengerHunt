import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
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
      <div
        className="flex min-h-screen items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url('/path/to/your/gaming-bg.jpg')` }}
      >
        <div className="bg-gray-900 bg-opacity-80 p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="text-center">
            <img
              alt="GameZone"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-12 w-auto"
            />
            <h2 className="mt-6 text-3xl font-extrabold text-white">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Join the GameZone community!
            </p>
          </div>

          <form onSubmit={addUserdata} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-300"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  onChange={setVal}
                  value={inpval.fname}
                  name="fname"
                  required
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300"
              >
                Email Address
              </label>
              <div className="mt-2">
                <input
                  type="email"
                  onChange={setVal}
                  value={inpval.email}
                  name="email"
                  placeholder="Email Address"
                  required
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={!passShow ? "password" : "text"}
                  value={inpval.password}
                  onChange={setVal}
                  name="password"
                  placeholder="Password"
                  required
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setPassShow(!passShow)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-indigo-500"
                >
                  {passShow ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="cpassword"
                className="block text-sm font-medium text-gray-300"
              >
                Confirm Password
              </label>
              <div className="mt-2 relative">
                <input
                  type={!cpassShow ? "password" : "text"}
                  value={inpval.cpassword}
                  onChange={setVal}
                  name="cpassword"
                  placeholder="Confirm Password"
                  required
                  className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-600 placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setCPassShow(!cpassShow)}
                  className="absolute inset-y-0 right-3 flex items-center text-sm text-indigo-500"
                >
                  {cpassShow ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-4 py-2 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-500 hover:text-indigo-400"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* React Toastify Container */}
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