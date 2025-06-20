import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure } from "../redux/user/userSlice.js";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateUserSuccess,setUpdateUserSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);

  const handleChange = (e) =>{
    setFormData({ ...formData, [e.target.id]: e.target.value})
  }

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setUpdateUserError(null);
    setUpdateUserSuccess(null);

    if(Object.keys(formData).length === 0){
      setUpdateUserError("No changes made to update");
      return;
    }

    try{
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`,{
        method: 'PUT',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if(!res.ok){
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
      }else{
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("Profile updated successfully!");
      }
    }catch(error){
      dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  }
  
  return (
    <div className="max-w-lg w-full mx-auto p-4">
      <h2 className="my-7 text-3xl font-semibold text-center">Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            id="password"
            placeholder="password"
            onChange={handleChange}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <button
          type="submit"
          disabled={false}
          className="w-full text-white font-medium py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Update
        </button>
      </form>
      <div className="text-red-500 flex justify-between mt-5">
        <span className="cursor-pointer">Delete Account?</span>
        <span className="cursor-pointer">SignOut</span>
      </div>
      {updateUserSuccess && (
        <div className="mt-5 p-4 text-green-800 bg-green-100 border border-green-400 rounded-md">
          {updateUserSuccess}
        </div>
      )}
      {updateUserError && (
        <div className="mt-5 p-4 text-red-800 bg-red-100 border border-red-400 rounded-md">
          {updateUserError}
        </div>
      )}
    </div>
  );
}

export default DashProfile;
