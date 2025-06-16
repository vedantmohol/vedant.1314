import { useSelector } from "react-redux";

function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  
  return (
    <div className="max-w-lg w-full mx-auto p-4">
      <h2 className="my-7 text-3xl font-semibold text-center">Profile</h2>
      <form action="" className="flex flex-col">
        <div>
          <input
            type="text"
            id="username"
            placeholder="Username"
            defaultValue={currentUser.username}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="email"
            id="email"
            placeholder="Email"
            defaultValue={currentUser.email}
            className="w-full px-4 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <input
            type="password"
            id="password"
            placeholder="password"
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
    </div>
  );
}

export default DashProfile;
