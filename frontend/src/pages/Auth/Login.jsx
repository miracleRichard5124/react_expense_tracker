import React, { useState } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import { validateEmail } from "../../utils/helper";

const Login = () => {

  const handleLogin = async (e) => {
    e.preventDefault();

    if(!validateEmail(email)){
      setError("Please enter a valid e-mail Address.");
      return;
    }

    if(!password){
      setError("Please enter your password.");
      return;
    }

    setError("")
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <div >
          <h3 className="text-xl font-semibold text-black">Welcome Back!</h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Please enter your details to log in
          </p>

          <form onSubmit={handleLogin}>
            <Inputs 
              type="text" 
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label="Email Address"
              placeholder="name@example.com"
            />

            <Inputs 
              type="password" 
              value={password}
              onChange={({target}) => setPassword(target.value)}
              label="password"
              placeholder="At least 8 Characters"
            />

            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">LOGIN</button>
            <p className="text-[13px] text-slate-800 mt-3">Don't have an Account?{" "}
              <Link className="font-medium text-primary underline" to="/signup">SignUp</Link>
            </p>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
