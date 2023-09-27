import DashboardLayout from "@/pages/layouts/DashboardLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("Ticket")){
      push("/login")
    }
  }, [])
  return (
    <DashboardLayout>
      <div className="px-8 py-4 flex flex-col items-center justify-center">
        <div className="text-[50px] text-blue-500">This is main page</div>
        <div>click on an options of menu</div>
      </div>
    </DashboardLayout>
  )
}