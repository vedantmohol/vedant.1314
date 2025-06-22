import { useEffect, useState } from 'react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { signOutSuccess } from '../redux/user/userSlice';

function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl);
  }, [location.search]);

  const handleSignout = async(e) =>{
    try{
      const res = await fetch('/api/auth/signout', {
        method : 'POST',
      });

      const data = await res.json();

      if(!res.ok){
        console.log(data.message);
      }else{
        dispatch(signOutSuccess());
      }
    }catch(error){
      console.log(error.message);
    }
  }

  return (
    <div className="w-full md:w-56 h-full bg-gray-100 p-4 shadow-md">
      <div className="space-y-4">
        <Link to="/dashboard?tab=profile">
          <div
            className={`flex items-center space-x-3 p-2 rounded-md cursor-pointer ${
              tab === 'profile' ? 'bg-blue-200 text-blue-800 font-semibold' : 'hover:bg-gray-200'
            }`}
          >
            <HiUser className="text-lg" />
            <span>Profile</span>
          </div>
        </Link>
        <div onClick={handleSignout} className="flex items-center space-x-3 p-2 rounded-md cursor-pointer hover:bg-red-100 text-red-600">
          <HiArrowSmRight className="text-lg" />
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
}

export default DashSidebar;