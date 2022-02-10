import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faAt, faKey } from '@fortawesome/free-solid-svg-icons';
import { useFormik } from 'formik';
import {ToastContainer,toast} from 'react-toastify';

import Profile from '../ui/Profile';
import { updateProfileFormValidation } from '../../helpers/formikValidations';
import { chatAppToken } from '../../helpers/axiosInstance';
import { refreshToken } from '../../slices/authSlice';


const ProfileScreen = () => {

  const { username, email, image } = useSelector((state) => state.auth.session);
  const [loaderUpload, setloaderUpload] = useState(false);
  const [loaderForm, setloaderForm] = useState(false);
  const inputFile = useRef();
  const dispatch = useDispatch();

  const submit = async ({username, email, password}) => {
    try {
      setloaderForm(true);
      const response = await chatAppToken.post('/user/save/profile',{
        username, 
        email, 
        password
      });

      const json = response.data;

      if(json.ok){
        dispatch(refreshToken());
        toast.success('profile updated successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    } catch (error) {
      console.log(error);
      toast.error('Error profile : ' + error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setloaderForm(false);
  }

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validate: updateProfileFormValidation,
    onSubmit: submit
  });

  const dragOver = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.add('border-green-600');
  }

  const dragLeave = (e)=>{
    e.stopPropagation();
    e.preventDefault();
    e.target.classList.remove('border-green-600');
  }

  const drop = (e)=>{
    e.preventDefault();
    e.target.classList.remove('border-green-600');
    inputFile.current.files = e.dataTransfer.files;
    uploadPhoto();
  }

  const uploadPhoto = async ()=>{
    const formData = new FormData();
    formData.append('file',inputFile.current.files[0]);
    setloaderUpload(true);
    try {

      const response = await chatAppToken.post('/user/upload/profileImage',formData,{
        headers: { "Content-Type": "multipart/form-data" },
      });
      const json = response.data;

      if(json.ok){

        dispatch(refreshToken());
        toast.success('profile image updated successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }
      else{

        toast.info('format not allowed, only png or jpg', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }

    } catch (error) {
      console.log(error);
      toast.error('Error: ' + error.message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setloaderUpload(false);
  } 

  return (
    <div className="w-full">

      <Profile
        bellModalCss='-left-96'
        menuModalCss='-left-44'
      />

      <form onSubmit={formik.handleSubmit} className="px-32 py-5 sm:px-10">
        <div className="bg-white space-y-6">

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-full">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center p-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  name="username"
                  id="username"
                  className="focus:ring-indigo-500 focus:border-indigo-500 outline-none pl-3 border flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  defaultValue={username}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.username && <small className="text-red-500">{formik.errors.username}</small>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-full">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center p-3 rounded-l-md outline-none border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FontAwesomeIcon icon={faAt} />
                </span>
                <input
                  type="text"
                  name="email"
                  id="email"
                  className="focus:ring-indigo-500 focus:border-indigo-500 pl-3 outline-none border flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  defaultValue={email}
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.email && <small className="text-red-500">{formik.errors.email}</small>}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-full">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center p-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FontAwesomeIcon icon={faKey} />
                </span>
                <input
                  type="text"
                  name="password"
                  id="password"
                  className="focus:ring-indigo-500 focus:border-indigo-500 pl-3 outline-none border flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                  placeholder="new password"
                  onChange={formik.handleChange}
                />
              </div>
              {formik.errors.password && <small className="text-red-500">{formik.errors.password}</small>}
            </div>
          </div>

          <div className="text-start">
            <button
              type="submit"
              className={
                loaderForm ? 
                "disabled cursor-not-allowed inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                :
                "inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              }
            >
              Save
            </button>
          </div>

        </div>
      </form>

      <div className="w-full px-32 sm:px-10">
        <div className="bg-white space-y-6">

          <div>
            <label className="block text-sm font-medium text-gray-700">Photo</label>
            <div className="mt-1 flex items-center">
              <img src={image} alt="profile" width="70" height="100" />
            </div>
          </div>
          
          
          {
            loaderUpload ?
            <div>
              <p className="block text-slate-400">uploading...</p>
              <img src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif" className="mx-auto" alt="loader" width="60" height="60" />  
            </div>
            :
            <div>
              <label className="block text-sm font-medium text-gray-700">Cover photo</label>
              <div onDragOver={dragOver} onDragLeave={dragLeave} onDrop={drop} className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input onChange={uploadPhoto} id="file" type="file" ref={inputFile} className="sr-only" />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF</p>
                </div>
              </div>
            </div>
          }

        </div>
      </div>

      <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      />

    </div>
  )
};

export default ProfileScreen;
