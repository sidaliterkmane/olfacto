import { CgProfile } from "react-icons/cg";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Popup from "../components/ui/Popup";

interface UserProfileProps {
  user: any;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const navigate = useNavigate();

  const [popup, setPopup] = useState(false);

  const [data, setData] = useState({
    newUsername: "",
  });

  const changeUsername = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const { newUsername } = data;

    const endpoint = "/user/changeUsername";
    const response = await axios.post(endpoint, {
      newUsername,
      userEmail: user.email,
    });
    try {
      if (newUsername != "" && newUsername.length > 3) {
        await axios.get("/logout");
        toast.success(response.data.message);
        navigate("/login");
      } else {
        toast.error(
          "Your new username cannot be empty and must be at least 3 characters long."
        );
      }
    } catch (error) {
      toast.error("Failed to change username.");
      console.error("Error updating favorites: ", error);
    }
  };

  const togglePopup = () => {
    setPopup(!popup);
  };

  const handleConfirm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const endpoint = "/user/deleteAccount";

    const response = await axios.post(endpoint, { userEmail: user.email });

    try {
      await axios.get("/logout");
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error("Error deleting your account.")
    }
  };

  return (
    <div className="w-[103%] overflow-hidden overflow-y-scroll custom-scrollbar flex flex-col gap-[1.5rem]">
      <div className="w-[97.5%] flex flex-col gap-2 pr-6 border-b border-neutral-300 dark:border-neutral-700 pb-5">
        <h1 className="text-3xl font-semibold dark:text-white flex items-center gap-2">
          <CgProfile /> Profile
        </h1>
        <p className="text-neutral-500">
          Access and update your personal details here
        </p>
      </div>
      <div className="w-[97.5%] flex flex-col gap-10 pr-6 border-b border-neutral-300 dark:border-neutral-700 pb-5">
        <div className="w-[60%] flex justify-between">
          <h2 className="text-md font-normal dark:text-white">Username</h2>
          <form
            action="submit"
            className="flex gap-0 items-center"
            onSubmit={changeUsername}
          >
            <input
              type="text"
              placeholder={user.name}
              onChange={(e) =>
                setData({ ...data, newUsername: e.target.value })
              }
              className="h-[40px] bg-zinc-100 dark:bg-neutral-700 text-zinc-600 ring-1 ring-zinc-300 outline-none placeholder:text-zinc-600 placeholder:opacity-50 placeholder:font-light rounded-tl-md rounded-bl-md px-2 py-1 dark:ring-zinc-500 dark:placeholder:text-neutral-300 dark:text-neutral-200 dark:focus:bg-neutral-600"
            />
            <button className="h-[42px] py-1 px-2 rounded-tr-md rounded-br-md border border-neutral-300 dark:border-neutral-500 text-white text-sm bg-blue-800 hover:brightness-90 transition active:brightness-75">
              Save changes
            </button>
          </form>
        </div>
        <div className="w-[60%] flex justify-between">
          <h2 className="text-md font-normal dark:text-white">Email</h2>
          <input
            disabled
            type="text"
            placeholder={user.email}
            className="h-[40px] w-[290px] bg-zinc-100 dark:bg-neutral-700 text-zinc-600 ring-1 ring-zinc-300 outline-none placeholder:text-zinc-600 placeholder:opacity-50 placeholder:font-light rounded-md px-2 py-1 dark:ring-zinc-500 dark:placeholder:text-neutral-300 dark:text-neutral-200 dark:focus:bg-neutral-600 disabled:brightness-90 dark:disabled:brightness-50"
          />
        </div>
      </div>
      <div className="w-[97.5%] flex flex-col gap-2 pr-6 border-b border-neutral-300 dark:border-neutral-700 pb-5">
        <div className="w-[60%] flex justify-between">
          <h2 className="text-md font-normal dark:text-white">Password</h2>
          <input
            disabled
            type="text"
            placeholder="************"
            className="h-[40px] w-[290px] bg-zinc-100 dark:bg-neutral-700 text-zinc-600 ring-1 ring-zinc-300 outline-none placeholder:text-zinc-600 placeholder:opacity-50 placeholder:font-light rounded-md px-2 py-1 dark:ring-zinc-500 dark:placeholder:text-neutral-300 dark:text-neutral-200 dark:focus:bg-neutral-600 disabled:brightness-90 dark:disabled:brightness-50"
          />
        </div>
      </div>
      <div className="w-[97.5%] flex flex-col gap-2 pr-6 border-b border-neutral-300 dark:border-neutral-700 pb-5">
        <div className="w-[60%] flex justify-between">
          <h2 className="text-md font-normal dark:text-white">
            Delete your account
          </h2>
          <button
            onClick={togglePopup}
            className="h-[42px] py-1 px-2 border-2 border-red-400 rounded-md text-red-400 bg-red-200 bg-opacity-20 transition active:brightness-75 hover:brightness-90"
          >
            Delete account
          </button>
        </div>
      </div>
      <Popup
        header="Delete account ?"
        description="This action is irreversible and all data will be lost."
        confirmContent="Yes, delete my account."
        handleClose={togglePopup}
        handleConfirm={handleConfirm}
        popup={popup}
      />
    </div>
  );
};

export default UserProfile;
