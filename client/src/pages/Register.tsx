import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import React from "react";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { cn } from "../../utils/cn";
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandOnlyfans,
} from "@tabler/icons-react";

const Register = () => {

  const navigate = useNavigate()
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmedPassword: ''
  })

  const registerUser = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const { name, email, password, confirmedPassword } = data;

    try {
      const { data } = await axios.post("/register", { name, email, password, confirmedPassword })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({
          name: '',
          email: '',
          password: '',
          confirmedPassword: '',
        })
        toast.success("Registration Successful. You can now login.")
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black border border-neutral-900">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Olfacto
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Register now to get personalized fragrance recommendations.
        </p>

        <form className="mt-8" onSubmit={registerUser}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="firstname">Username</Label>
              <Input id="firstname" placeholder="Tyler Durden" type="text" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}/>
            </LabelInputContainer>
          </div>
          <LabelInputContainer className="mb-4">
            <Label>Email Address</Label>
            <Input id="email" placeholder="tylerdurden@olfacto.com" type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label>Password</Label>
            <Input id="password" placeholder="••••••••" type="password" value={data.password} onChange={(e) => setData({ ...data, password: e.target.value })}/>
          </LabelInputContainer>
          <LabelInputContainer className="mb-8">
            <Label>Confirm Password</Label>
            <Input
              placeholder="••••••••"
              type="password"
              value={data.confirmedPassword}
              onChange={(e) => setData({...data, confirmedPassword: e.target.value})}
            />
          </LabelInputContainer>

          <button 
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Register &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            Already have an account? Please <span className="font-bold"><Link to={"/login"} >login</Link></span>.
          </p>
        </form>
      </div>
    </div>


  )
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};

export default Register