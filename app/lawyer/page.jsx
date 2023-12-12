"use client";
import React,{useState, useEffect, useId} from 'react'
import { doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db, auth } from '@/Components/firebase';
import { PiPhoneCallFill } from 'react-icons/pi';
import { GrInstagram } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { TbWorldWww } from 'react-icons/tb';
import QRCode from "qrcode.react";
import { collection, addDoc } from 'firebase/firestore';

import PubNub from 'pubnub';
import { PubNubProvider, usePubNub } from 'pubnub-react';

const page = ({ searchParams }) => {


  const [lawyer, setLawyer] = useState([]);
  const [lawyerUserID, setLawyerUserID] = useState('')
  const [channelName, setChannelName] = useState('');
  
  // const LawyersSelectedClient = 'phqjRQCHK5Qfxm8NshgUIKAx4bE2rD2ykW5G0UPQTD3wYjIj1eq6fIw1';
  
  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const docRef = doc(db, String(searchParams.category), String(searchParams.docid));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          console.log("Document data:", docSnap.data());
          setLawyer([docSnap.data()]);
          setLawyerUserID(docSnap.data().userID);    
          const current = auth.currentUser;
          const clientID = current.uid;

          if(clientID==docSnap.data().userID)
          {
              setChannelName(LawyersSelectedClient);
          }
          else
          {
             console.log(clientID+(docSnap.data().userID))    
             setChannelName(clientID+(docSnap.data().userID))      
          }
        } else {
          // docSnap.data() will be undefined in this case

          alert("No such document!");
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert("Error");
      }
    };
   
    if (searchParams.category) {
      fetchData();
    }


  }, [searchParams.category, searchParams.docid]);


  const [documents, setDocuments] = useState([]);

  const fetchDocuments = async () => {
    try {
      const collectionRef = collection(db, 'collections');
      const querySnapshot = await getDocs(collectionRef);

      const fetchedDocuments = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.collectionName && data.collectionName.includes(`${lawyerUserID}`)) {
          fetchedDocuments.push({ id: doc.id, ...data });
        }
      });

      setDocuments(fetchedDocuments);
    } catch (error) {
      console.error('Error fetching documents: ', error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const lawyerWantsToTalkTo = (lwto_channelName) => {
    setChannelName(lwto_channelName);
  }


  const pubnub = new PubNub({
    publishKey: 'pub-c-cf833fc4-d512-499d-bdad-e08767f22c8c',
    subscribeKey: 'sub-c-62631922-a8eb-4a2d-95c3-6405910d78a4',
    uuid: 'sec-c-MWYwM2IyNDItZmZiMC00ZGU5LWIyMTEtM2EwOWNjNjE1YTU2'
  });

  function Chat() {
    const pubnub = usePubNub();

      const [channels] = useState([channelName]);
      const [messages, addMessage] = useState([]);
      const [message, setMessage] = useState('');
  
      const handleMessage = event => {
        const message = event.message;
        if (typeof message === 'string' || message.hasOwnProperty('text')) {
          const text = message.text || message;
          addMessage(messages => [...messages, text]);
        }
      };
      

      const sendMessage =  async message => {
        if (message) {
          pubnub
            .publish({ channel: channels[0], message })
            .then(() => setMessage(''));
            console.log(message);
            try {
      
              const docRef = await addDoc(collection(db, `${channelName}`), {
                message:message
              })
              
              const collectionRef = collection(db, 'collections');
              const querySnapshot = await getDocs(query(collectionRef, where('collectionName', '==', channelName)));
              if (querySnapshot.empty) {
                await addDoc(collectionRef, { collectionName: channelName });
              } else {
                // Handle the case where the channelName already exists
                console.log('Channel name already exists:', channelName);
              }
              
            } catch (error) {
              alert("here Error adding document: " + error);
            }

        }
      };
    
    

    

useEffect(() => {
const listenerParams = { message: handleMessage }
pubnub.addListener(listenerParams);
pubnub.subscribe({ channels });
      return () => {
pubnub.unsubscribe({ channels })
pubnub.removeListener(listenerParams)
}
}, [pubnub, channels]);

    return (
      <div style={pageStyles}>
        <div style={chatStyles}>
          <div style={headerStyles}>React Chat Example</div>
          <div style={listStyles}>
            {messages.map((message, index) => {
              return (
                <div key={`message-${index}`} style={messageStyles}>
                  {message}
                </div>
              );
            })}
          </div>
          <div style={footerStyles}>
            <input
              type="text"
              style={inputStyles}
              placeholder="Type your message"
              value={message}
              onKeyPress={e => {
                if (e.key !== 'Enter') return;
                sendMessage(message);
              }}
              onChange={e => setMessage(e.target.value)}
            />
            <button
              style={buttonStyles}
              onClick={e => {
                e.preventDefault();
                sendMessage(message);
              }}
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    );
  }

  const pageStyles = {
    alignItems: 'center',
    background: '#282c34',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
  };

  const chatStyles = {
    display: 'flex',
    flexDirection: 'column',
    height: '50vh',
    width: '50%',
  };

  const headerStyles = {
    background: '#323742',
    color: 'white',
    fontSize: '1.4rem',
    padding: '10px 15px',
  };

  const listStyles = {
    alignItems: 'flex-start',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    overflow: 'auto',
    padding: '10px',
  };

  const messageStyles = {
    backgroundColor: '#eee',
    borderRadius: '5px',
    color: '#333',
    fontSize: '1.1rem',
    margin: '5px',
    padding: '8px 15px',
  };

  const footerStyles = {
    display: 'flex',
  };

  const inputStyles = {
    flexGrow: 1,
    fontSize: '1.1rem',
    padding: '10px 15px',
  };

  const buttonStyles = {
    fontSize: '1.1rem',
    padding: '10px 15px',
  };

 

  return (
  
    <div>
        {lawyer.map((law)=>{
          return(
            <div className='flex justify-around'>
                 <div className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner my-3  gap-5 h-fit w-96'>
                        <div className='flex justify-center'>
                           <img src={law.imgUrl} alt="" className="rounded-full w-[150px] h-[150px]" />
                        </div>
                        <div className='text-center'>
                            <h2 className='font-bold text-2xl'>{law.name}</h2>
                            <div className='p-5'>
                              <p className='p-3'>{law.description}</p>
                              <p className='p-3'>Designation: {law.designation} ({law.category})</p>
                              <p className='p-3'>Education: {law.education}</p>
                            </div>
                            <div className='flex justify-center'>
                              <p className='p-3'>Cased Won: {law.won}</p>
                              <p className='p-3'>Cases Handled: {law.handled}</p>
                            </div>
                            <div className='flex justify-center'>
                              <p className='p-3'>Location: {law.location}</p>
                              <p className='p-3'>Availability: {law.availability}</p>
                            </div>
                            <div className='p-5'>
                              <p className='p-3'>Experirnce: {law.years}</p>
                            </div>
                            <div className='flex justify-center'>
                            <h6 className='text-3xl p-2'><a href={law.linkedin}><BsLinkedin/></a></h6>
                            <h6 className='text-3xl p-2'><a href={`tel:${law.phone}`}><PiPhoneCallFill/></a></h6>
                            <h6 className='text-3xl p-2'><a href={law.instagram}><GrInstagram/></a></h6>
                            <h6 className='text-3xl p-2'><a href={`mailto:${law.email}`}><AiOutlineMail/></a></h6>
                            <h6 className='text-3xl p-2'><a href={`mailto:${law.website}`}><TbWorldWww/></a></h6>
                            </div>
                            <div className="flex justify-center items-center h-full">
                            <div className='p-5'>
                              <QRCode value={`upi://pay?pa=${law.upiId}`} />
                            </div>
                          </div>
                        </div>
                </div>
             
                <div className='p-4 rounded form text-[#272829] outline outline-1 outline-offset-1 shadow-inner my-3 flex justify-around gap-5 items-start h-96 w-96'>
                <div>

                
                <PubNubProvider client={pubnub}>
                        <Chat />
               </PubNubProvider>
         
          
                  </div>
                </div>

                <div>
                <div>
                        <h1>Fetched Documents:</h1>
                        <ul>
                          {documents.map((doc) => (
                            <li key={doc.id}>
                              {/* <p onClick={() => setChannelName(doc.collectionName)}>{doc.collectionName}</p> */}
                              <p onClick={() => lawyerWantsToTalkTo(doc.collectionName)}>{doc.collectionName}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                     </div>
            </div>
          )
        })}
    </div>

  )
}

export default page;