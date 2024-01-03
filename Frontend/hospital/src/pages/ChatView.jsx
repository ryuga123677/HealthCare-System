import {io} from 'socket.io-client'
import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
// import MessageList from './MessageList';
// import MessageInput from './MessageInput';
const socket=io("http://localhost:4000");


const ChatView = () => {
    const {doctorname}=useParams();
    const patientname=localStorage.getItem('patientname',"****");
    
  const [messages, setMessages] = useState([
  ]);
  const [messagesobject, setMessagesobject] = useState({});
socket.on("connect",()=>{
    console.log("u connected with",socket.id);
});
socket.on("receive-message",data=>{
    setMessages(data.message);
});
  const addMessage = (newMessage) => {
    setMessages([...messages, newMessage]);
    socket.emit("send-message",{
    sendername:patientname,
    receivername:doctorname,
    message:newMessage,

});
    
  };
  const handleChat = async () => {
  
    const response = await axios.get(`http://localhost:3000/message?sendername=${patientname}&receivername=${doctorname}`).then((response) => {
      console.log(response.data);
      let arr=response.data;
      setLoading(false);

    
      setMessagesobject(arr);
    

    }).catch((error) => { 
      setLoading(false);
    });
  }
  useEffect(() => {
    handleChat();
  },[]);

  return (
    <div className="chat-container">
         <ol className='content'>
        {messagesobject.map((item,index) => (
          
          <li key={index }>
              <h2>{item.me.message}</h2> </li>
        ))}
      </ol>
      <div>{messages}</div>
      <input type="text" value={messages} onChange={(e) => setMessages(e.target.value)}/>
      <button className='btn' onClick={()=>addMessage(messages)}>send</button>
    </div>
  );
};

export default ChatView;
