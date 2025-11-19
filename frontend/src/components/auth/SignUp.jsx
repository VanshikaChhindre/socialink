import React, {useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import { useSignupMutation } from '../../features/auth/authApiSlice'
import { useDispatch } from 'react-redux'
import { handleError, handleSuccess } from '../../utils/toast'
import { setCredentials } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'
import { selectCurrentUser } from '../../features/auth/authSlice'

const SignUp = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [signup, { isLoading, isSuccess, isError, error }] = useSignupMutation(); 

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector(selectCurrentUser);
      useEffect(() => {
      if (user) {
        navigate('/socials');
      }
    }, [user, navigate]);
  
  const signupUser = async(data)=>{
     console.log(data);
      const userData = {
        name: data.username,
        email: data.email,
        password: data.password
      }

      try {
          const response = await signup(userData).unwrap();
          handleSuccess("Signup successful!");
          console.log("Signup successful:", response);

          dispatch(setCredentials(response)); // store user + tokens
          navigate("/on-boarding");
      } catch (err) {
          console.error("Signup failed:", err);
          handleError(err?.data?.message || "Signup failed");
      }  
  }

  return (
    
    <div className='flex items-center justify-center mt-24 p-2'>

      {/*Sign up form*/}
      <form onSubmit={handleSubmit(signupUser)} >
        <container className='w-sm md:max-w-xl rounded-2xl bg-white drop-shadow-2xl border border-gray-100  flex items-center flex-col py-5 px-8'>
            <h1 className='font-semibold text-2xl mb-6'>Create a new account</h1>
            
            {/*Input fields*/}
            <div className='grid grid-cols-1 w-full'>

                 <Input
                    label = "Enter username"
                    type = "text"
                    {...register('username', {
                        required: true
                    })}
                  />
                  {errors.username && <p className="text-red-400">{errors.username.message}</p>}

                <Input
                    label = "Enter your email"
                    type = "email"
                    {...register('email', {
                            required: 'Email is required',
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: 'Email is invalid'
                          }
                    })}
                />
                {errors.email && <p className="text-red-400">{errors.email.message}</p> }
                
                 <Input
                    label = "Enter your password"
                    type = "password"
                    {...register('password', {
                      required: true
                    })}
                  />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <div className='flex flex-col justify-center items-center mb-4 gap-2'>

            <button 
            className='w-44 font-semibold bg-linear-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white py-2 px-4 hover:bg-black'
            type='submit'>
              Sign up
            </button>

            <div className='text-gray-500'>or</div>
            <div 
            onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
            className='border border-gray-500 px-4 py-2 rounded-full flex gap-3 justify-between items-center hover:bg-gray-100'>
              <img  src="/google.png"
                    alt="Hero section"
                    className='w-5 h-5'/>
              <div className='font-semibold'>Sign up with Google</div>
            </div>
            </div>
            <h3 className='mb-3'>Already have an account? 
              <span className='hover:text-red-400'><Link to='/login'>&nbsp;Login</Link></span>
            </h3>
        </container>
      </form>
        
    </div>
  )
}

export default SignUp