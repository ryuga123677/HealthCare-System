import {io} from 'socket.io-client'
import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
const socket=io("http://localhost:4000");


const ChatView = () => {
    const {name}=useParams();
    console.log(name);
    const patientname=localStorage.getItem('patientname',"****");
    const doctname=localStorage.getItem('doctorname',"****");
    var tempname;
    if(name==patientname)
    {
      tempname=doctname;
    }
    else{
      tempname=patientname;
    }
    
  const [messages, setMessages] = useState([]);
  const [newmessage, setnewMessage] = useState('');
socket.on("connect",()=>{
    console.log("u connected with",socket.id);
});
// socket.on("receive-message",message=>{
//   setMessages((prevMessages) => ({
//     me: prevMessages.me,
//     you: [...prevMessages.you, message]
//   }));
// });

  const addMessage = () => {
  
    socket.emit("send-message",{
    sendername:tempname,
    receivername:name,
    message:newmessage,

});
    
  };

  useEffect(() => {
    socket.emit('loadHistory', { sendername: tempname, receivername: name });

    socket.on('history', (arr) => {
      setMessages(arr);
    });

    // Listen for new messages
    socket.on('receive-message', (messages) => {
      
      setMessages((prevMessages) => ({
        
        ...prevMessages,message:[...prevMessages.message, messages]
      }));
  })
  
},[]);

  return (
    <div>
      <h2>Chat History</h2>
      <div>
      
        <ul>
          {messages.message?.map((item, index) => (
            <li key={index}>{item.message}</li>
          ))}
        </ul>
      </div>
    
      <div>
        <input
          type="text"
          value={newmessage}
          onChange={(e) => setnewMessage(e.target.value)}
        />
        <button onClick={addMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatView;
