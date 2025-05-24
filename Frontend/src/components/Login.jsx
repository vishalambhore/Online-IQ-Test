import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form";
import axios from 'axios';
import toast from 'react-hot-toast';

function Login() {
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        // console.log(data);
        let userinfo = {
         
            email: data.email,
            password: data.password
        }
        await axios.post("http://localhost:7001/user/login", userinfo)
            .then((res) => {
                console.log(res.data)

                if (res.data) {
                    toast.success('Login Successfully');
                    document.getElementById("my_modal_3").close()
                    setTimeout(()=>{
                    window.location.reload()
                    localStorage.setItem("Users", JSON.stringify(res.data.user))
                },1000)
                    
                }
                
                
            }).catch((err) => {
                if (err.response) {
                    console.log(err)
                    toast.error("Error : " + err.response.data.message);
                    setTimeout(() => {}, 2000);
                    

                }
            })

    }

    return (
        <>
            <div>
                {/* Modal */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Close button */}
                            <Link to="/" type="button" onClick={() => document.getElementById("my_modal_3").close()} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

                            <h3 className="font-bold text-lg">Login</h3>

                            {/* Email */}
                            <div className='mt-4 space-y-2'>
                                <span>Email</span>
                                <br />
                                <input
                                    type='email'
                                    placeholder='Enter Your Email'
                                    className='w-80 px-3 py-1 border rounded-md outline-none'
                                    {...register("email", { required: true })}
                                />
                                <br />
                                {errors.email && <span className=' text-sm text-red-500'>This field is required</span>}
                            </div>

                            {/* Password */}
                            <div className='mt-4 space-y-2'>
                                <span>Password</span>
                                <br />
                                <input
                                    type='password'
                                    placeholder='Enter Your Password'
                                    className='w-80 px-3 py-1 border rounded-md outline-none'
                                    {...register("password", { required: true })}
                                />
                                <br />
                                {errors.password && <span className='text-sm text-red-500'>This field is required</span>}
                            </div>

                            {/* Button */}
                            <div className='flex justify-around mt-4'>
                                <input type='submit' value="Login" className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200 cursor-pointer' />
                                <p>
                                    Not registered?
                                    <Link to="/Signup" className='underline text-blue-500 cursor-pointer'>Signup</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </dialog>
            </div>
        </>
    )
}

export default Login;
