import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import { Menu, PencilIcon, PenIcon, UserRound, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../features/auth/authSlice';
import { useLogoutMutation } from '../features/auth/authApiSlice';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/auth/authSlice';

const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuOpenProfile, setMenuOpenProfile] = useState(false);
    const navigate = useNavigate();
   

    //authorizing user
    const user = useSelector(selectCurrentUser);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const username = user?.name || user?.user?.name;
    

    const logoutHandler = async() =>{
    try {
      await logout().unwrap(); 
      dispatch(logoutUser()); 
    } catch (error) {
      console.error('Logout failed:', error);
  }
}


  return (
    <div className='fixed top-0 left-0 w-full z-50 px-8 py-4 bg-white shadow flex items-center justify-between'>
        <Link ection className='flex items-center justify-center space-x-2' to='/'>
           <span className='text-2xl text-black cursor-pointer font-semibold '>Social
            <span className='text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent cursor-pointer '>Link</span>
           </span>
        </Link>
        <p className='hidden md:block ml-20'>Your one stop solution for social media management.</p>

        {user? (
        <div className="relative hidden md:flex">
          <button
            className="flex justify-between items-center gap-3 cursor-pointer"
            onClick={() => setMenuOpenProfile(!menuOpenProfile)}
          >
            <h5>{username}</h5>
            <UserRound className="w-7 h-7 bg-gray-200 rounded-full p-1" />
          </button>

          {menuOpenProfile && (
            <div className="absolute top-16 right-8 bg-white shadow-md flex flex-col space-y-4 w-40 p-2 items-center justify-center">
              <div className='flex flex-col items-center gap-3 py-3'>
                <UserRound className="w-12 h-12 bg-gray-200 rounded-full p-1" />
                <div className='flex items-center justify-center gap-2'>
                  <h4>{username}</h4>
                  <PencilIcon className='w-3 h-3'/>
                </div>
                <button 
                onClick={logoutHandler}
                className='bg-red-500 px-3 py-2 text-white font-semibold rounded-xl'>Logout</button>
              </div>
            </div>
          )}
        </div>
        ):(
          <div className='hidden md:flex justify-between space-x-5'>
            <Link  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 flex items-center justify-center gap-2 text-white px-4 py-1 rounded-xl group" to='/sign-up'>Sign up</Link>
            <Link className='border border-gray-400 rounded-xl py-1 px-5 font-medium hover:bg-gray-100' to='/login'>Login</Link>
        </div>
        )}
        

        {/*mobile devices hamburger */}
        <div className="flex md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={28}/> : <Menu size={28}/>}
            </button>
        </div>

        {/* mobile menu */}
      {menuOpen && (
        user ? (
          <div className="absolute top-16 right-8 bg-white shadow-md flex flex-col space-y-4 w-40 p-2 items-center justify-center">
            <div className="flex flex-col items-center gap-3 py-3">
              <UserRound className="w-12 h-12 bg-gray-200 rounded-full p-1" />
              <div className="flex items-center justify-center gap-2">
                <h4>username</h4>
                <PencilIcon className="w-3 h-3" />
              </div>
              <button className="bg-red-500 px-3 py-2 text-white font-semibold rounded-xl">
                Logout
              </button>
            </div>
          </div>
        ) : (
          <div className="md:hidden absolute top-16 right-8 bg-white shadow-md flex flex-col space-y-4 w-40 p-2 items-center justify-center">
            <button
              className="outline-black text-black font-medium"
              onClick={() => {
                setMenuOpen(false);
                navigate("/sign-up");
              }}
            >
              Sign up
            </button>
            <button
              className="text-red-400 hover:bg-amber-800 hover:text-white font-medium px-4 py-2 rounded-full transition-all"
              onClick={() => {
                setMenuOpen(false);
                navigate("/login");
              }}
            >
              Login
            </button>
          </div>
        )
      )}
    </div>
  )
}

export default Header