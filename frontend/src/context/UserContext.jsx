import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const [authToken, setAuthToken] = useState(() => sessionStorage.getItem("token"));
    const [current_user, setCurrentUser] = useState(null);

    console.log("Current user:", current_user);

    // LOGIN
    const login = (email, password) => {
        toast.loading("Logging you in ... ");
        fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.access_token) {
                toast.dismiss();
                sessionStorage.setItem("token", response.access_token);
                setAuthToken(response.access_token);

                fetch(`http://127.0.0.1:5000/current_user`, {
                    method: "GET",
                    headers: {
                        'Content-type': 'application/json',
                        'Authorization': `Bearer ${response.access_token}`,
                    },
                })
                .then((res) => res.json())
                .then((data) => {
                    if (data.email) {
                        setCurrentUser(data);
                    }
                });

                toast.success("Successfully Logged in");
                navigate("/");
            } else {
                toast.dismiss();
                toast.error(response.error || "Either email/password is incorrect");
            }
        });
    };

    // LOGOUT
    const logout = () => {
        toast.loading("Logging out ... ");
        fetch("http://127.0.0.1:5000/logout", {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        })
        .then((resp) => resp.json())
        .then((response) => {
            if (response.success) {
                sessionStorage.removeItem("token");
                setAuthToken(null);
                setCurrentUser(null);
                toast.dismiss();
                toast.success("Successfully Logged out");
                navigate("/login");
            }
        });
    };

    // Fetch current user
    useEffect(() => {
        if (authToken) {
            fetchCurrentUser();
        }
    }, [authToken]);

    const fetchCurrentUser = () => {
        console.log("Fetching current user with token:", authToken);
        fetch("http://127.0.0.1:5000/current_user", {
            method: "GET",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.email) {
                setCurrentUser(data);
            }
        });
    };

    // Add User
    const addUser = (username, email, password) => 
      {
          toast.loading("Registering ... ")
          fetch("http://127.0.0.1:5000/users",{
              method:"POST",
              headers: {
                  'Content-type': 'application/json',
                },
              body: JSON.stringify({
                  username, email, password
              })
          })
          .then((resp)=>resp.json())
          .then((response)=>{
              console.log(response);
              
              if(response.success){
                  toast.dismiss()
                  toast.success(response.success)
                  navigate("/login")
              }
              else if(response.error){
                  toast.dismiss()
                  toast.error(response.error)
  
              }
              else{
                  toast.dismiss()
                  toast.error("Failed to register")
  
              }
            
              
          })
  
          
      };
    // Update User
    const updateUser = (user_id, updatedData) => {
        toast.loading("Updating user...");

        fetch(`http://127.0.0.1:5000/users/${user_id}`, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: JSON.stringify(updatedData),
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.success) {
                setCurrentUser(response.updatedUser);
                toast.success("User updated successfully!");
            } else {
                toast.error(response.error || "Failed to update user.");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("An error occurred: " + error.message);
        });
    };

    // Delete User
    const deleteUser = async (user_id) => {
        toast.loading("Deleting user...");
        fetch(`http://127.0.0.1:5000/users/${user_id}`, {
            method: "DELETE",
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        })
        .then((resp) => resp.json())
        .then((response) => {
            toast.dismiss();
            if (response.success) {
                setCurrentUser(null);
                toast.success("User deleted successfully!");
                navigate("/login");
            } else {
                toast.error(response.error || "Failed to delete user.");
            }
        })
        .catch((error) => {
            toast.dismiss();
            toast.error("An error occurred: " + error.message);
        });
    };

    return (
        <UserContext.Provider value={{ authToken, login, logout, current_user, addUser, updateUser, deleteUser }}>
            {children}
        </UserContext.Provider>
    );
};
