import axios from "axios";
const https = require('https')
const agent = new https.Agent({
  rejectUnauthorized: false,
})
const API_URL = 'http://shserver.top:8080/test/users';

export async function getText(ticket) {
    try {
        const data = await axios.get(`${API_URL}/getData`, {
            httpsAgent: agent,
            headers: {
                Authorization: `Bearer ${ticket}`, 
              },
        });
        return({text: data.data.result});
    } catch (error) {
        console.log("ERRROR:", error);
    }
}