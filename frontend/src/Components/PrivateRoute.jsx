import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const { currentUser } = useSelector((state) => state.user);
  return currentUser ? <Outlet/> : <Navigate to='/sign-in'/>
}

export default PrivateRoute