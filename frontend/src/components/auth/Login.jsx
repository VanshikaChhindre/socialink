import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Input from '../Input'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setCredentials } from '../../features/auth/authSlice'
import {useLoginMutation} from '../../features/auth/authApiSlice'

const Login = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

    const [login, { isLoading, isSuccess, isError, error }] = useLoginMutation(); 
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginUser = async(data)=>{
      const userData = {
        email: data.credential,
        username: data.credential,
        password: data.password
      }

      try {
        const response = await login(userData).unwrap();
        console.log(response.data)  
         console.log("Login in successful");

        const accessToken = response.data.accessToken
        const user = response.data.user

        dispatch(setCredentials({user:user, token: accessToken}))

        navigate('/on-boarding')
        reset() 
      } catch (error) {
        console.log(error.message)
      } 
    } 

  return (
    <div className='flex items-center justify-center mt-24 p-2'>

      {/*Sign up form*/}
      <form onSubmit={handleSubmit(loginUser)} >
        <container className='w-sm md:max-w-xl rounded-2xl bg-white drop-shadow-2xl border border-gray-100 flex items-center flex-col py-5 px-8'>
            <h1 className='font-semibold text-2xl mb-6'>Log into existing account</h1>

            <div className='grid grid-cols-1 w-full'>
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
            type = "submit"
            >Login</button>

            <div className='text-gray-500'>or</div>
            <div 
            onClick={() => window.location.href = "http://localhost:5000/api/auth/google"}
            className='border border-gray-500 px-4 py-2 rounded-full flex gap-3 justify-between items-center hover:bg-gray-100'>
              <img  src="/google.png"
                    alt="Hero section"
                    className='w-5 h-5'/>
              <div className='font-semibold'>Sign in with Google</div>
            </div>
            </div>

            <h3 className='mb-3'>Don't have an account?
              <span className='hover:text-red-400'><Link to='/sign-up'>&nbsp;Sign up</Link></span>
            </h3>
        </container>
      </form>

    </div>
  )
}

export default Login