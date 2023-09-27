import { useEffect, useState } from "react"
import { postLoginData } from '../api/api_admin';
import axios from "axios"
import DashboardLayout from "../layouts/DashboardLayout";
import { useRouter } from "next/router";

export default function Home() {
  const { push } = useRouter();
  useEffect(() => {
    if (!localStorage.getItem("Ticket")){
      push("/login")
    }
  }, [])
  const [string, setString] = useState("");
  const [lastChunk, setLastChunk] = useState("");
  const [chunkkkList, setChunkkkList] = useState([]);

  const f = async () => {
    let divNumber = 0;
    const tempChunk = [""];
    const response = await axios.post('http://shserver.top:8080/test/users/getCode', {
        message: "Write me a chrome extension code"
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("Ticket")}`, 
          responseType: 'stream',
        },
        onDownloadProgress: progressEvent => {
          const chunkList = progressEvent.event.target.responseText.split("\n\n");
          let lChunk = JSON.parse(chunkList[chunkList.length-2].substring(5)).content;
          if (lChunk === "```"){
            divNumber += 1;
            tempChunk.push("");
          } else if (lChunk === "`" && tempChunk[tempChunk.length - 1][tempChunk[tempChunk.length - 1].length - 1] === "`" && tempChunk[tempChunk.length - 1][tempChunk[tempChunk.length - 1].length - 2] === "`") {
            tempChunk[tempChunk.length - 1] = tempChunk[tempChunk.length - 1].substring(0, tempChunk[tempChunk.length - 1].length - 2)
            divNumber += 1;
            tempChunk.push("");
          } 
          else {
            tempChunk[tempChunk.length - 1] += lChunk;
          }
          setLastChunk(lChunk);
          setString(prev => prev + lChunk);
          setChunkkkList(tempChunk);
       }
    })
  }
  const jsonParsing = (str) => {
    let temp = "";
    let tabs = 0;
    for (let i=0;i<str.length;i+=1){
      if (str[i] === ',') {
        temp += str[i];
        temp += '<br />';
        for(let j=0;j<tabs*2;j+=1) temp += '&nbsp;';
      }
      else if (str[i] === '{') {
        temp += str[i];
        tabs += 1;
        temp += '<br />';
        for(let j=0;j<tabs*2;j+=1) temp += '&nbsp;';
      }
      else if (str[i] === '}') {
        temp += '<br />';
        tabs -= 1;
        for(let j=0;j<tabs*2;j+=1) temp += '&nbsp;';
        temp += str[i];
      } else {
        temp += str[i];
      }
    }
    return temp;
  }
  const htmlParsing = (str) => {
    let temp = "";
    let htmlTab = -1;
    for(let i=0;i<str.length;i+=1){
      if(str.length>=8 && str[i] === ">" && str[i-1] === "e" && str[i-2] === "l" && str[i-3] === "y" && str[i-4] === "t" && str[i-5] === "s" && str[i-6] === "<") {
        temp += '>';
        temp += '\n';
        for(let h=0;h<htmlTab*2;h+=1) temp+= " ";
      }
      else if(str[i] === "{") {
        temp += '{';
        temp += '\n';
        for(let h=0;h<htmlTab*2;h+=1) temp+= " ";
      }
      else if(str[i] === "}") {
        temp += '\n';
        for(let h=0;h<(htmlTab+2)*2;h+=1) temp+= " ";
        temp += '}';
      }
      else if(str[i] === ";") {
        temp += ';';
        temp += '\n';
        for(let h=0;h<htmlTab*2;h+=1) temp+= " ";
      }
      else if(str[i] === "<") {
        if(str[i+1] !== "/")
          htmlTab += 1;
        temp += '\n';
        for(let h=0;h<htmlTab*2;h+=1) temp+= " ";
        temp += '<';
      }
      else if(str[i] === "/") {
        htmlTab -= 1;
        temp += `${str[i]}`;
      }
      else temp += `${str[i]}`
    }
    return temp;
  }
  const getBgColor = (type) => {
    if (type.substring(0, 4) === "json" || type.substring(0, 4) === "html" || type.substring(0, 10) === "javascript") return "gainsBoro";

    return "white";
  }
  const coloringHtml = (str) => {
    return str;
  }
  return (
    <DashboardLayout>
      <div className="px-8 py-4">
      <div>
        <div className="flex justify-center text-center text-green-500 font-bold text-[20px] py-4">
          This page to get and display some stream text data and parse it to correct format
        </div>
        <div className="flex justify-center">
          <span onClick={() => f()} className="bg-green-400 px-4 py-2 text-white rounded-md cursor-pointer font-bold">Click To Start</span>
        </div>
      {
        chunkkkList.map((value) => {
          return(
            <div style={{ backgroundColor: getBgColor(value), padding: "10px 20px", margin: "10px 0", borderRadius: "10px", width: "100%" }}>
              {value.substring(0, 4) === "json" 
                ?<code dangerouslySetInnerHTML={{__html: `JSON:<br />${jsonParsing(value.substring(4, value.length))}`}} /> 
                : (value.substring(0, 4) === "html" 
                ?<pre>{`HTML:${coloringHtml(htmlParsing(value.substring(4, value.length)))}`}</pre> 
                : (value.substring(0, 10) === "javascript" 
                ? <code dangerouslySetInnerHTML={{__html: `JavaScript:<br />${jsonParsing(value.substring(10, value.length))}`}} /> 
                : value))
                }
            </div>
          )
        })
      }
      </div>
      </div>
    </DashboardLayout>
  )
}