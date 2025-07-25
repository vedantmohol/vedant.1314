import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../Components/DashSidebar";
import DashProfile from "../Components/DashProfile";

function Dashboard() {
  const [tab,setTab] = useState('');
  const location = useLocation();

  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    setTab(tabFromUrl);
  },[location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row pt-20">
      <div className="md:w-56">
        <DashSidebar/>
      </div>
      {tab === 'profile' && <DashProfile/>}
    </div>
  )
}

export default Dashboard