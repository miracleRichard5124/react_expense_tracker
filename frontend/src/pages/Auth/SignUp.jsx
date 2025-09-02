import React, { useState, useContext, useEffect } from "react";
import AuthLayout from "../../components/Layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Inputs from "../../components/inputs/Inputs";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage";
import SelectInput from "../../components/SelectInput";

const SignUp = () => {

  const {updateUser} = useContext(UserContext);

  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [currencyCode, setCurrencyCode] = useState("");
  const [currencySymbol, setCurrencySymbol] = useState("");


  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const getFlagEmoji = (countryCode) => {
    if (!countryCode || typeof countryCode !== "string") return "";
    return countryCode
      .toUpperCase()
      .replace(/./g, (char) =>
        String.fromCodePoint(127397 + char.charCodeAt(0))
      );
  };

  const fetchCountries = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.CURRENCY.GET_ALL_CURRENCIES
      );
      console.log("Fetched countries data:", res.data);
      setCountries(res.data);
    } catch (err) {
      console.error("Error fetching countries: ", err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter your name!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address!");
      return;
    }

    if (!password) {
      setError("Please create a password to protect your Account");
      return;
    }

    setError("");

    //Call the SignUp API
    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageUrl || "";
      }

      const selectedCountry = countries.find((c) => c.countryCode === country);

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
        country: selectedCountry.countryCode,
        currencyCode: selectedCountry.currencyCode,
        currencySymbol: selectedCountry.currencySymbol,
      });

      const { user, token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
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

            <div className="">
              <Inputs
                type="password"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="password"
                placeholder="At least 8 Characters"
              />
            </div>

            <div className="flex flex-col gap-3 mb-5">
              <label className="text-[13px] text-slate-800">Country</label>
              <div className="flex">
                <SelectInput
                  options={countries.map((c) => ({
                    value: c.countryCode,
                    label: `${getFlagEmoji(c.countryCode)} ${c.country} (${
                      c.currencyCode
                    })`,
                    currencyCode: c.currencyCode,
                    currencySymbol: c.currencySymbol,
                  }))}
                  value={country}
                  onChange={(selected) => {
                    setCountry(selected.value);
                    setCurrencyCode(selected.currencyCode);
                    setCurrencySymbol(selected.currencySymbol);
                  }}
                  placeholder="Select Country"
                />
              </div>
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
