import React, { useState, useContext, useEffect } from "react";
import ProfilePhotoSelector from "../inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/UserContext";
import EditableInput from "./EditableInput";
import SelectInput from "../SelectInput";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const UserSettings = () => {
  const { user, updateUser } = useContext(UserContext);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [country, setCountry] = useState(user?.preferences?.country || "");
  const [currencyCode, setCurrencyCode] = useState(user?.preferences?.currencyCode || "");
  const [currencySymbol, setCurrencySymbol] = useState(user?.preferences?.currencySymbol || "");
  const [profileImageUrl, setProfileImageUrl] = useState(user?.profileImageUrl || "");
  const [countries, setCountries] = useState([]);

  // Fetch all countries and currencies
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axiosInstance.get(API_PATHS.CURRENCY.GET_ALL_CURRENCIES);
        setCountries(res.data);
      } catch (err) {
        console.error("Error fetching countries:", err);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if(user?.preferences?.country){
      setCountry(user.preferences.country);
      setCurrencyCode(user.preferences.currencyCode || "");
      setCurrencySymbol(user.preferences.currencySymbol || "");
      setFullName(user.fullName || "");
      setEmail(user.email || "");
      setProfileImageUrl(user.profileImageUrl || "");
    }
  }, [user])

  const getFlagEmoji = (countryCode) => {
    if (!countryCode || typeof countryCode !== "string") return "";
    return countryCode.toUpperCase().replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
  };

  const countryOptions = countries.map(c => ({
    value: c.countryCode,
    label: `${getFlagEmoji(c.countryCode)} ${c.country} (${c.currencyCode})`,
    currencyCode: c.currencyCode,
    currencySymbol: c.currencySymbol,
  }));

  // Upload image and set profileImageUrl
  const handleImageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setProfileImageUrl(res.data.imageUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  // Save all changes to backend
  const handleSaveAll = async () => {
    try {
      const selectedCountry = countryOptions.find(c => c.value === country) || {};
      const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_USER, {
        fullName,
        email,
        preferences: {
          country: selectedCountry.name,
          currencyCode: selectedCountry.currencyCode || "",
          currencySymbol: selectedCountry.currencySymbol || "",
        },
        profileImageUrl,
      });

      updateUser(response.data.user); // update context
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update user:", err);
      alert("Failed to update profile. Try again.");
    }
  };

  return (
    <div className="card space-y-8">
      <h2 className="text-lg font-semibold">User Settings</h2>

      <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
        <div className="flex justify-center w-full md:w-auto">
          <ProfilePhotoSelector
            image={profileImageUrl}
            setImage={handleImageUpload}
            size="w-50 h-50"
            buttonSize="w-15 h-15"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <EditableInput
            label="Full Name"
            value={fullName}
            onSave={setFullName}
          />
          <EditableInput
            label="Email"
            value={email}
            type="email"
            onSave={setEmail}
          />

          <div>
            <label className="text-slate-800 mb-2">Country</label>
            <SelectInput
              options={countryOptions}
              value={country}
              onChange={selected => setCountry(selected.value)}
              placeholder="Select your country"
            />
          </div>
        </div>
      </div>

      <hr className="border-0.1 border-gray-200"/>

      <div className="flex justify-center md:justify-start">
        <button
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition cursor-pointer"
          onClick={handleSaveAll}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserSettings;
