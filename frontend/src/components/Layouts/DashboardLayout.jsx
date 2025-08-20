import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import SideMenu from './SideMenu';
import Navbar from './Navbar';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const DashboardLayout = ({children, activeMenu}) => {

  const {user, setUser, clearUser} = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async() => {
    try{
      const response = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO)
      if(response.data){
        setUser(response.data)
      }
    }catch(error){
      console.log("Error fetching User Details, " + error)
      clearUser();
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUserDetails()

    return () => {}
  }, [])

  return (
    <div className=''>
      <Navbar activeMenu={activeMenu}/>

      {user && (
        <div className="flex">
          <div className='max-[1100px]:hidden'>
            <SideMenu activeMenu={activeMenu}/>
          </div>

          <div className='grow mx-5'>{children}</div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;

