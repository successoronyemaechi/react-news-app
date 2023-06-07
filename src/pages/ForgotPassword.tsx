/**
 * @author Successor Onyemaechi <successoronyemaechi@gmail.com>
 */

import { useState } from "react";
import axiosClient from "../utils/axiosClient";
import {useStateContext} from "../context/ContextProvider";
import {Link} from "react-router-dom";
import {useAuthContext} from "../context/AuthProvider";

interface Errors {
  email?: string[];
}

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState(null);
  const { setLoading, loading } = useStateContext();
  const { csrf } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    setErrors({});
    await csrf();
    setStatus(null);
    try {
      const response = await axiosClient.post("/forgot-password", { email });
      setLoading(false)
      setStatus(response.data.status);
    } catch (e) {
      setLoading(false)
      if (e.response?.status === 422) {
        setErrors(e.response.data.errors);
      }
      if (e.response?.status === 500) {
        // const errorMessage = e.response.data.message;
        setErrors({ email: ['Connection could not be established with host. Network error!'] });
      }
    }
  };
  return (
    <section className="bg-[#F4F7FF] py-20 lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div
              className="
              relative
              mx-auto
              max-w-[525px]
              overflow-hidden
              rounded-lg
              bg-white
              py-16
              px-10
              text-center
              sm:px-12
              md:px-[60px]
            "
            >
              <div className="pb-10">
                <Link to="/" className="mb-10 text-center underline md:mb-5">News Aggregator</Link>
              </div>
              {status && (
                <div className="bg-green-700 m-2 p-2 rounded text-white">
                  {status}
                </div>
              )}
              <div className="mb-10 text-center md:mb-16">
                Forgot your password? Let us know your email address and we will
                email you a password reset link.
              </div>


              <small className="text-black-300">Note: Mailtrap is used for email sending.</small>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="
                    border-[#E9EDF4]
                    w-full
                    rounded-md
                    border
                    bg-[#FCFDFE]
                    py-3
                    px-5
                    text-base text-body-color
                    placeholder-[#ACB6BE]
                    outline-none
                    focus:border-primary
                    focus-visible:shadow-none
                  "
                  />
                  {errors.email && (
                    <div className="flex">
                      <span className="text-red-400 text-sm m-2 p-2">
                        {errors.email[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="mb-10">
                  <button
                    type="submit"
                    className="
                    w-full
                    px-4
                    py-3
                    bg-indigo-900
                    hover:bg-indigo-950
                    rounded-md
                    text-white
                  "
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Submit'}
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
