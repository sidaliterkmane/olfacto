import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import Library from "../components/FragranceLibrary/Library";

const Dashboard = () => {
  const { user }: any = useContext(UserContext)

  return (
    <div className="w-full h-full bg-neutral-50 dark:bg-neutral-900 flex justify-center">
      <div className="dashboard-container w-full mt-[60px] pt-[50px] p-5 flex justify-between gap-3">
        <div className="menu w-[450px] h-full">
          {!!user && (<h1 className="text-5xl font-extralight dark:text-neutral-50">Hi {user.name} ✌️</h1>)}
          <p className="font-extralight text-neutral-500 mt-2">Welcome to your olfacto dashboard.</p>

          <div className="submenu mt-20">
            <h3 className="font-semibold dark:text-neutral-50">M E N U</h3>
          </div>
        </div>

        <div className="content w-full h-full bg-neutral-200 rounded-3xl dark:bg-neutral-800 p-[2rem]">
          <Library />
        </div>
        
      </div>

    </div>
  )
}

export default Dashboard