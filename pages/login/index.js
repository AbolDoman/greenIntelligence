import LoginLayout from "@/pages/layouts/LoginLayout";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { postLoginData } from "../api/api_admin";
import { useRouter } from "next/router";

export default function Login() {
  const { push } = useRouter();
  const [uName, setUName] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const loginClicked = () => {
    if(uName === "") {
        toast.warn("user name field must be filled!");
        return;
    }
    if(pass === "") {
        toast.warn("password field must be filled!");
        return;
    }
    const body = {
        uname: uName,
        pass: pass,
      }
    setLoading(true);
    postLoginData((isOk, data) => {
        if(!isOk) {
            console.log("Error: ", data);
            toast.error(data?.response?.data?.message);
            setLoading(false);
        } else {
            console.log(data)
            localStorage.setItem("Ticket", data.ticket);
            localStorage.setItem("name", data.name);
            localStorage.setItem("Lname", data.Lname);
            push("/")
            setLoading(false);
        }
    } , body);
  }
  return (
    <LoginLayout>
      <div className="px-8 py-4 flex flex-col items-center justify-center w-full h-[80vh]">
        <div className="w-[400px] px-4 py-2 bg-green-500 h-[200px] rounded">
            <div className="text-white">User name:</div>
            <div className="text-white ml-2 mt-1">
                <input value={uName}  autocomplete="off" onChange={(e) => setUName(e.target.value)} className="h-[30px] text-[black] px-2 w-[100%] outline-none" />
            </div>
            <div className="text-white mt-4">Password:</div>
            <div className="text-white ml-2 mt-1">
                <input type="password"  autocomplete="off" value={pass} onChange={(e) => setPass(e.target.value)} className="h-[30px] text-[black] px-2 w-[100%] outline-none" />
            </div>
            <div className="mt-3 flex items-center justify-center w-[100%]">
                <div onClick={() => loginClicked()} className="text-green-500 font-bold bg-white rounded px-8 cursor-pointer py-1">{loading ? "Loading..." : "Login"}</div>
            </div>
        </div>
      </div>
    </LoginLayout>
  )
}