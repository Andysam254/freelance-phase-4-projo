import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';


export default function ProfilePage() 
{
  const {current_user} = useContext(UserContext)
  console.log("Current User:", current_user);




  return (
    <>
    { 
    !current_user? "Not authorized"
    :

    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h2 className="text-3xl font-semibold text-gray-700 mb-6">Profile</h2>
      

      <div className="space-y-4">
        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Username</h3>
          <p className="text-gray-800">{current_user && current_user.username}</p>
        </div>
        
        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Email</h3>
          <p className="text-gray-800">{current_user && current_user.email}</p>
        </div>

        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Approval Status</h3>
          <p className={`text-sm font-semibold ${current_user && current_user.is_approved ? "text-green-600 border p-3":"text-red-600"} `}>
             {
              current_user && current_user.is_approved ?
              "Approved"
              :
              "Pending Approval"
             }
             
            
          </p>
        </div>

        <div className="flex justify-between">
          <h3 className="text-xl font-medium text-gray-600">Admin Status</h3>
          <p className={`text-sm font-semibold ${current_user && current_user.is_admin?"text-blue-900":"text-orange-600 border p-3"} `}>
             {
              current_user && current_user.is_admin?
              "Admin":
              "User"
             }
          </p>
        </div>
      </div>


      <div className="mt-6 flex justify-end">
        <button className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
          Update Profile
        </button>
      </div>


    </div>
}
    </>
  );
}
