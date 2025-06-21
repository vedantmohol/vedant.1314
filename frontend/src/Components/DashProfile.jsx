import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStart, updateSuccess, updateFailure, deleteStart, deleteFailure } from "../redux/user/userSlice.js";
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function DashProfile() {
  const { currentUser, error } = useSelector((state) => state.user);
  const [formData,setFormData] = useState({});
  const dispatch = useDispatch();
  const [updateUserSuccess,setUpdateUserSuccess] = useState(null);
  const [updateUserError,setUpdateUserError] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleDelete = async(e) =>{
    setShowModal(false);

    try{
      dispatch(deleteStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method: 'DELETE'
      })

      const data = await res.json();
      if(!res.ok){
        dispatch(deleteFailure(data.message));
      }else{
        dispatch(deleteSuccess(data));
      }
    }catch(error){
      dispatch(deleteFailure(error.message));
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
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account?
        </span>
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
      {error && (
        <div className="mt-5 p-4 text-red-800 bg-red-100 border border-red-400 rounded-md">
          {error}
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
                Are you sure you want to delete your account?
              </h3>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Yes, I'm sure
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  No, cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashProfile;
