import { useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Library from "../components/FragranceLibrary/Library";
import DashNav from "../components/ui/DashNav";

const Dashboard = () => {
  const { user, setUser }: any = useContext(UserContext)
  const navigate = useNavigate(); // For redirecting after logout
  

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      setUser(null)
      toast.success("You have successfully logged out.")
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  if (!user) {
    navigate("/login");
    return null
  }

  return (
    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-900 flex justify-center">
      <div className="dashboard-container w-[1250px] mt-[20px] pt-[50px] p-5 flex flex-col gap-[2rem]">
        <DashNav userName={user.email} handleLogout={handleLogout}/>
        <Library />
      </div>

    </div>
  )
}

export default Dashboard