import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if(!fullName){
      setError("Please enter your name!");
      return;
    }

    if(!validateEmail(email)){
      setError("Please enter a valid email address!");
      return;
    }

    if(!password){
      setError("Please create a password to protect your Account");
      return;
    }

    setError("");

    //SignUp API is called
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">
          Enter your details below and join us today.
        </p>

        <form onSubmit={handleSignUp}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Inputs
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="Name"
              type="text"
            />

            <Inputs
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="name@example.com"
            />

            <div className="col-span-2">
              <Inputs
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="password"
                placeholder="At least 8 Characters"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            SIGN UP
          </button>
          <p className="text-[13px] text-slate-800 mt-3">
            Already have an Account?{" "}
            <Link className="font-medium text-primary underline" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
