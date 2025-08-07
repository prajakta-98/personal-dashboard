import { useEffect, useState } from "react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [msg, setMsg] = useState(null);

  useEffect(() =>{
const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if(!token){
        setMsg("Please login to view your dashboard.");
        return
    }

    try {
        const response = await fetch("http://localhost:5000/api/auth/me",{
            method: "GET",
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });
        const data = await response.json();
        if(response.ok){
            setUser(data.user);
            setMsg(null);
        }else{
            setMsg(`Error: ${data.message}`);
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        setMsg("Failed to fetch user data. Please try again later.");
    }
};

fetchUser();
  },[]);
  return (
    <div style={{ padding: "20px" }}>
      <h2>Dashboard</h2>
      {user ? (
        <div>
          <p>
           👋🏻Welcome, <strong> {user.name} </strong>!
          </p>
          <p> ✉️Email: {user.email} </p>
        </div>
      ) : (
        <p>{msg}</p>
      )}
    </div>
  );
};
export default Dashboard;
