import {io} from 'socket.io-client'
import React, { useState ,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { SpinnerDotted } from 'spinners-react';
const socket=io("http://localhost:4000");


const ChatView = () => {
    const {name}=useParams();
    const[fisttime,setfirsttime]=useState();
    const [loading, setLoading] = useState(true);
    
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
    
  });

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
      setLoading(false);
    });
    console.log("1 use");
    return () => {
      socket.off('history');
    };
  
  
   
  
},[]);
useEffect(() =>{
  socket.on('receive-message', (data) => {
      
    setMessages((prevMessages) => [
      
      ...prevMessages,data
    ]);
    console.log("2 use");
});
return () => {
  socket.off('receive-message');
};
},[]);
  return (
    <div>
      <h2 className='head2'>Chat Page</h2>
      {loading?(<SpinnerDotted/>):(
      <div>
      
      
          {messages.map((item, index) => (
             <div id='index' className='container'>
             {item.receivername===tempname? 

              (
            <div className="message-blue">
                <p className="message-content">{item.message}</p>
                <div className="message-timestamp-left">{item.receivername}</div>
            </div>):
            <div className="message-orange">
            <p className="message-content">{item.message}</p>
            <div className="message-timestamp-right">{item.sendername}</div>
        
            </div>
}
             </div>
            
          ))}
        
      </div>
      )
}
    
    
      <div className='input'>
        <input
          className='inbox'
          type="text"
          value={newmessage}
          onChange={(e) => setnewMessage(e.target.value)}
        />
        <button onClick={addMessage} className='btn'>Send</button>
      </div>
    </div>
  );
};

export default ChatView;
