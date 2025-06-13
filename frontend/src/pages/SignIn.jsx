import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';

function SignIn() {
    const [formData,setFormData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {loading, error: errorMessage} = useSelector(state => state.user);

    const handleChange = (e) =>{
        setFormData({ ...formData, [e.target.id]: e.target.value.trim()})
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();

        if(!formData.email || !formData.password){
            return dispatch(signInFailure("Please fill all the fields"));
        }

        try{
           dispatch(signInStart());

            const res = await fetch("/api/auth/signin",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(formData),
            })

            const data = await res.json();

            if(data.success === false){
                dispatch(signInFailure(data.message));
            }
            if(res.ok){
              dispatch(signInSuccess(data));
                navigate('/');
            }
        }catch(error){
            dispatch(signInFailure(error.message));
        }
    }
  return (
    <div className='min-h-screen mt-20'>
        <div className='flex flex-col p-3 mx-auto items-center'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email" className='block mb-2 font-medium text-sm text-gray-700'>Enter Email:</label>
                    <input type="email" id='email' placeholder="abc@xyz.com"
                    onChange={handleChange} className='w-full border  border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                </div>
                <div>
                    <label htmlFor="password" className='block mb-2 font-medium text-sm text-gray-700'>Enter Password:</label>
                    <input type="password" id='password' placeholder="*******"
                    onChange={handleChange} className='w-full border  border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500' />
                </div>
                <button type='submit' disabled={loading} className='w-full text-white font-medium py-2 px-4 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed'>
                    { loading ? (
                        <div className="flex items-center justify-center">
                <svg
                  className="animate-spin h-4 w-4 text-white mr-2"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Loading...
              </div>
                    ) :
                     ("Sign In")}
                </button>
            </form>
            <div className='flex gap-2 mt-5 text-sm'>
                <span>Don't have an account?</span>
                <Link to="/sign-up" className="text-blue-500">SignUp</Link>
            </div>
            {errorMessage && (
          <div
            className="mt-5 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{errorMessage}</span>
          </div>
        )}
        </div>
    </div>
  )
}

export default SignIn