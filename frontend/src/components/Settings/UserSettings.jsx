import React, { useState, useContext } from "react";
import ProfilePhotoSelector from "../inputs/ProfilePhotoSelector";
import { UserContext } from "../../context/UserContext";
import EditableInput from "./EditableInput";

const UserSettings = ({ image, setImage }) => {
  const { user, updateUser } = useContext(UserContext);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [country, setCountry] = useState(user?.country || 'US');

  const handleSave = () => {
    const updatedUser = {fullName, email, country, image};
    console.log("Saving user data:", updatedUser);
    updateUser(updatedUser)
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">User Information</h2>

      <div className="flex items-center gap-6">
        <ProfilePhotoSelector
          image={image}
          setImage={setImage}
          size={"w-50 h-50"}
          buttonSize={"w-15 h-15"}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
          <EditableInput
            label="Full Name"
            value={fullName}
            onSave={(val) => setFullName(val)}
          />
          <EditableInput
            label="Email"
            value={email}
            type="email"
            onSave={(val) => setEmail(val)}
          />

          <div className="">
            <div>
              <label className="text-[13px] text-slate-800">Country</label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="input-box w-full bg-transparent outline-none"
              >
                <option value="US">🇺🇸 United States</option>
                <option value="NG">🇳🇬 Nigeria</option>
                <option value="GB">🇬🇧 United Kingdom</option>
                <option value="IN">🇮🇳 India</option>
                <option value="DE">🇩🇪 Germany</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <button
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        onClick={handleSave}
      >
        Save Changes
      </button>
    </div>
  );
};

export default UserSettings;
