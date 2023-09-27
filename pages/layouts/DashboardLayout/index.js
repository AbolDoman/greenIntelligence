import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function DashboardLayout({children}) {
  const { push } = useRouter();
  const [address, setAddress] = useState("");
  const [ticket, setTicket] = useState("");
  useEffect(() => {
    setAddress(window?.location?.href.slice(21));
    setTicket(localStorage.getItem("Ticket"));
  }, []);
  return (
    <>
    <div className="h-[50px] px-8 flex items-center bg-green-500 text-white font-bold">
        <Link href="/" className={`${address === "" ? "font-bold" : ""}`}>Green Intelligence</Link>
        <Link href={`/q2/${ticket ? ticket.split("YOUR_TICKET_IS_...")[1] : ""}`} className={`ml-[200px] underline ${(address[0] === "/" && address[1] === "q" && address[2] === "2") ? "text-white" : "text-gray-500"}`}>Question2</Link>
        <Link href="/q3" className={`ml-[20px] underline ${address === "/q3" ? "text-white" : "text-gray-500"}`}>Question3</Link>
        <div className='ml-auto flex'>
          <div className='flex flex-col items-center justify-center mr-[20px] bg-green-400 px-2'>
            <div className='text-[12px]'>user profile:</div>
            <div>{localStorage.getItem("name")} {localStorage.getItem("Lname")}</div>
          </div>
          <div
            onClick={() => {
              localStorage.clear();
              push("/login");
            }}
            className="cursor-pointer bg-white text-[#0E5001] px-4 py-1 rounded flex items-center justify-center">Logout
          </div>
        </div>
    </div>
    {children}
    </>
  )
}