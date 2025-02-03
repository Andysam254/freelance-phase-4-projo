// UserContext.jsx
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("token"));
  const [currentUser, setCurrentUser] = useState(null);

  console.log("Current user:", currentUser);

  // ========================= LOGIN =========================
  const login = (email, password) => {
    toast.loading("Logging you in ... ");
    fetch("https://freelance-phase-4-projo.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((resp) => resp.json())
      .then((response) => {
        if (response.access_token) {
          toast.dismiss();

          sessionStorage.setItem("token", response.access_token);

          localStorage.setItem("token", response.access_token);
          setAuthToken(response.access_token);

          // Fetch current user data
          fetch("https://freelance-phase-4-projo.onrender.com/current_user", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${response.access_token}`,
            },
            //credentials: "include",
          })
          .then((response) => response.json())
          .then((response) => {
            if(response.email){
                    setCurrentUser(response)
                  }
          });

          toast.success("Successfully Logged in");
          navigate("/")

        } 
        else if (response.error) {
          toast.dismiss();
          toast.error(response.error)

        } 
        else {
          toast.dismiss();
          toast.error("Failed to login");
        }
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("Login error: " + error.message);
      });
  };

  // ========================= LOGOUT =========================
  const logout = () =>
{

    toast.loading("Logging out...");
    fetch("https://freelance-phase-4-projo.onrender.com/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`
      },

    })
    .then((resp)=>resp.json())
    .then((response)=>{
       console.log(response);
       
        if(response.success)
        {
            sessionStorage.removeItem("token");
            setAuthToken(null)
            setCurrentUser(null)

            toast.dismiss()
            toast.success("Successfully Logged out")

            navigate("/login")
        }
    })
      .catch(() => {
        toast.dismiss();
        toast.error("Logout failed. Try again.");
      });
  };

  // ========================= FETCH CURRENT USER =========================
    useEffect(()=>{
        fetchCurrentUser()
    }, [])
    const fetchCurrentUser = () => 
    {
        console.log("Current user fcn ",authToken);
        
        fetch('https://freelance-phase-4-projo.onrender.com/current_user',{
            method:"GET",
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => response.json())
        .then((response) => {
          if(response.email){
          setCurrentUser(response)
          }
        });
    };


  // ========================= REGISTER USER =========================
  const addUser = (username, email, password) => 
  {
    toast.loading("Registering ... ");
    fetch("https://freelance-phase-4-projo.onrender.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Network response was not ok");
        }
        return resp.json();
      })
      .then((response) => {
        console.log(response);
        toast.dismiss();
        if (response.success) {
          toast.success("Registration successful!");
          navigate("/login");
        } else {
          toast.error(response.error || "Registration failed.");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        toast.dismiss();
        toast.error("Server error. Try again.");
      });
  };

  // ========================= DELETE ACCOUNT =========================
  const deleteUser = (userId) => {
    if (!authToken) {
      toast.error("Unauthorized action.");
      return;
    }

    toast.loading("Deleting account...");
    fetch(`https://freelance-phase-4-projo.onrender.com/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      credentials: "include",
    })
      .then((resp) => resp.json())
      .then((response) => {
        toast.dismiss();
        if (response.success) {
          toast.success("Account deleted successfully.");
          logout();
        } else {
          toast.error(response.error || "Failed to delete account.");
        }
      })
      .catch(() => {
        toast.dismiss();
        toast.error("Something went wrong.");
      });
  };

  // ========================= PROVIDER DATA =========================
  const data = {
    authToken,
    login,
    logout,
    addUser,
    currentUser,
    deleteUser,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
