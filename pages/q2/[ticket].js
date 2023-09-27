import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getText } from "@/lib/textData";
import { useRouter } from "next/router";

export async function getServerSideProps ({params}) {
  const textData = await getText(`YOUR_TICKET_IS_...${params.ticket}`);
  return {
      props: {
        textData,
      },
  };
}
export default function Question2({textData}) {
  const { push } = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("Ticket")){
      push("/login")
    }
  }, [])
  const { text } = textData
  const [finalText, setFinalText] = useState("");
  useEffect(() => {
    let temp = "";
    for (let i=0;i<text.length;i+=1) {
      if ((text[i] === "<" && text[i+1] === "i" && text[i+2] === ">") || (text[i] === "<" && text[i+1] === "/" && text[i+2] === "i" && text[i+3] === ">")){
        temp += "&lt;"
      } else{
        temp += text[i];
      }
    }
    setFinalText(temp);
  }, []);
  return (
    <DashboardLayout>
      <div className="px-8 py-4">
        <div>
          <div className="flex justify-center text-center text-green-500 font-bold text-[20px] py-4">
            This page to get and display some Text that not italic
          </div>
          <div className="flex justify-center" dangerouslySetInnerHTML={{__html: finalText}} />
        </div>
      </div>
    </DashboardLayout>
  )
}