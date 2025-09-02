import React, { useRef, useState, useContext, useEffect } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import uploadImage from "../../utils/uploadImage";
import { UserContext } from "../../context/UserContext";

const ProfilePhotoSelector = ({ image, setImage, size = "w-20 h-20", buttonSize = "w-8 h-8" }) => {
  const { updateUser } = useContext(UserContext);
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(image || null);
  const [uploading, setUploading] = useState(false);

  // Keep previewUrl in sync if `image` prop changes
  useEffect(() => {
    setPreviewUrl(image || null);
  }, [image]);

  const onChooseFile = () => inputRef.current.click();

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);

    try {
      setUploading(true);
      const data = await uploadImage(file);
      setImage(data.imageUrl); // update parent state
      updateUser({ profileImageUrl: data.imageUrl }); // update context

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user")) || {};
      storedUser.profileImageUrl = data.imageUrl;
      localStorage.setItem("user", JSON.stringify(storedUser));
    } catch (err) {
      console.error("Image upload failed:", err);
      setPreviewUrl(image || null); // fallback to previous
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);

    updateUser({ profileImageUrl: null });
    const storedUser = JSON.parse(localStorage.getItem("user")) || {};
    storedUser.profileImageUrl = null;
    localStorage.setItem("user", JSON.stringify(storedUser));
  };

  return (
    <div className="flex justify-center mb-6 relative">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />

      {!previewUrl ? (
        <div className={`${size} flex items-center justify-center bg-purple-100 rounded-full relative`}>
          <LuUser className="text-4xl text-primary" />
          <button
            className={`${buttonSize} flex items-center justify-center bg-primary text-white rounded-full absolute -bottom-1 -right-2 border-none outline-none cursor-pointer`}
            type="button"
            onClick={onChooseFile}
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img src={previewUrl} alt="profile" className={`${size} rounded-full object-cover`} />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white border-none outline-none rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
          {uploading && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center text-white rounded-full">
              Uploading...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
