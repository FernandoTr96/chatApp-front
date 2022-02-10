import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFormik } from "formik";
import { registerFormValidation } from '../../helpers/formikValidations';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../slices/authSlice';


const RegisterScreen = () => {

  const [loading, setLoading] = useState(false); 
  const dispatch = useDispatch();

  const submit = (values, form) => {
    setLoading(true);
    dispatch(registerUser({ values, form }));
    setLoading(false);
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validate: registerFormValidation,
    onSubmit: submit
  });

  return (
    <div className="bg-slate-100 h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-5">

        <div>
          <img className="mx-auto h-12 w-auto" src="https://cdn-icons-png.flaticon.com/512/724/724715.png" alt="logo" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
            Create account
          </h2>
        </div>

        <form onSubmit={formik.handleSubmit} autoComplete="off" className="mt-8">
          <div className="rounded-md shadow-sm space-y-4">

            <div>
              <label className="sr-only">Username</label>
              <input onChange={formik.handleChange} value={formik.values.username} name="username" type="text" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-400 text-gray-500 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
              {formik.errors.username && <small className="text-red-500">{formik.errors.username}</small>}
            </div>

            <div>
              <label className="sr-only">Email</label>
              <input onChange={formik.handleChange} value={formik.values.email} name="email" type="email" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-400 text-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email" />
              {formik.errors.email && <small className="text-red-500">{formik.errors.email}</small>}
            </div>

            <div>
              <label className="sr-only">Password</label>
              <input onChange={formik.handleChange}  value={formik.values.password} name="password" type="password" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-400 text-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
              {formik.errors.password && <small className="text-red-500">{formik.errors.password}</small>}
            </div>

            <div>
              <label className="sr-only">Confirm Password</label>
              <input onChange={formik.handleChange} value={formik.values.confirmPassword} name="confirmPassword" type="password" className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-slate-400 text-gray-500 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
              {formik.errors.confirmPassword && <small className="text-red-500">{formik.errors.confirmPassword}</small>}
            </div>

            <div>
              {formik.errors.serverError && <small className="text-red-500">{formik.errors.confirmPassword}</small>}
            </div>

            <div>
              <button type="submit" disabled={loading ? true : false} className="disabled:opacity-75 disabled:cursor-not-allowed mt-5 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                {
                  !loading ?
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </span> :
                  <div className=" flex justify-center items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 mr-3 border-gray-200"></div>
                  </div>
                }
                {!loading ? 'Register' : ' Processing...'}
              </button>
            </div>

          </div>
        </form>

        <div>
          <Link to="/login" className="underline underline-offset-1 text-slate-600 hover:text-blue-700">¿You have an account? Login</Link>
        </div>

      </div>
    </div>
  )
};

export default RegisterScreen;
