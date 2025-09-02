import React, { createContext, useState, useEffect} from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const updateUser = (userData) => {
    setUser((prev) => ({
      ...(prev || {}), // <-- safely spread prev
      ...userData,
      preferences: {
        ...(prev?.preferences || {}), // <-- safely spread prev.preferences
        ...userData.preferences,
      },
    }));
  };

  const clearUser = () => {
    setUser(null);
  };

  useEffect(() => {
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
    }else{
      localStorage.removeItem('user')
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
