"use client";
import React, { useState, useEffect } from 'react';
import { doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db, auth } from '@/Components/firebase';
import { PiPhoneCallFill } from 'react-icons/pi';
import { GrInstagram } from 'react-icons/gr';
import { AiOutlineMail } from 'react-icons/ai';
import { BsLinkedin } from 'react-icons/bs';
import { TbWorldWww } from 'react-icons/tb';
import QRCode from 'qrcode.react';
import { collection, addDoc, updateDoc } from 'firebase/firestore';

const Page = ({ searchParams }) => {
  const [lawyer, setLawyer] = useState([]);
  const [lawyerUserID, setLawyerUserID] = useState('');
  const [clientUserID, setClientUserID] = useState('');
  var chatCollectionName = '';
  const [message, setMessage] = useState({
    body: '',
  });
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const [documentsWithSubstring, setDocumentsWithSubstring] = useState([]);
  const [lawyerWantsToTalkTo, setLawyerWantsToTalkTo] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, String(searchParams.category), String(searchParams.docid));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLawyer([docSnap.data()]);
          setLawyerUserID(docSnap.data().userID);
          const user = auth.currentUser;
          setClientUserID(user.uid);
        } else {
          alert('No such document!');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Error');
      }
    };

    if (searchParams.category) {
      fetchData();
    }
  }, [searchParams.category, searchParams.docid]);

  const sendMessage = async () => {
    if (lawyerUserID === clientUserID) {
      if (lawyerWantsToTalkTo === '') {
        alert('Please select the chat to start the conversation');
      } else {
        chatCollectionName = lawyerWantsToTalkTo;
        alert(chatCollectionName);
        alert(message.body);
        fetchChatLawyersMessages();
        try {
          const docRef = await addDoc(collection(db, `${chatCollectionName}`), {
            body: message.body,
          });
          alert('Document written with ID: ' + docRef.id);
        } catch (error) {
          alert('Error adding document: ' + error);
        }
      }

      try {
        const allChatCollectionRef = collection(db, 'allChatCollections');
        const querySnapshot = await getDocs(
          query(allChatCollectionRef, where('name', '>=', lawyerUserID), where('name', '<=', `${lawyerUserID}\uf8ff`))
        );

        const documentsWithMatchingUserID = querySnapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));
        setDocumentsWithSubstring(documentsWithMatchingUserID);
      } catch (error) {
        console.error('Error fetching matching documents:', error);
      }
    } else {
      chatCollectionName = lawyerUserID + clientUserID;
      alert(chatCollectionName);
      alert(message.body);
      fetchChatMessages();
      try {
        const docRef = await addDoc(collection(db, `${chatCollectionName}`), {
          body: message.body,
        });
        alert('Document written with ID: ' + docRef.id);
      } catch (error) {
        alert('Error adding document: ' + error);
      }

      const allChatCollectionRef = collection(db, 'allChatCollections');
      const querySnapshot = await getDocs(query(allChatCollectionRef, where('name', '==', chatCollectionName)));

      if (querySnapshot.empty) {
        try {
          const docRef1 = await addDoc(collection(db, 'allChatCollections'), {
            name: chatCollectionName,
          });
          alert('Document written with ID: ' + docRef1.id);
        } catch (error) {
          alert('Error adding document: ' + error);
        }
      } else {
        alert('Document already exists in the collection');
      }
    }
  };

  const fetchChatMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, chatCollectionName));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFetchedMessages(data);
      alert('Fetching working well');
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Fetching Failed');
    }
  };

  const fetchChatLawyersMessages = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, chatCollectionName));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setFetchedMessages(data);
      alert('Fetching working well');
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Fetching Failed');
    }
  };

  const LawyersChatCollectionName = async (receivedCollectionName) => {
    var rcn = receivedCollectionName;
    alert(rcn);
    setLawyerWantsToTalkTo(rcn);
  };

  const [num, setNum] = useState(0);
  const [fetchedNum, setFetchedNum] = useState(0);
  const rating = async (nums) => {
    const alroy = nums;

    const nameOfCollection = String(searchParams.category);
    const documentId = String(searchParams.docid);
    const fieldNameToAdd = 'ratingNumber';
    const docRef = doc(db, String(searchParams.category), String(searchParams.docid));
    try {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLawyer([docSnap.data()]);
        setFetchedNum(docSnap.data().ratingNumber);

        const user = auth.currentUser;
        setClientUserID(user.uid);
      } else {
        alert('No such document!');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error');
    }
    const valueToAdd = parseInt(alroy) + parseInt(fetchedNum);
    alert(valueToAdd);

    const addFieldToDocument = async (collectionName, documentId, field, value) => {
      try {
        const docRef = doc(db, collectionName, documentId);
        await updateDoc(docRef, {
          [field]: value, // Adding field and value to the document
        });
        console.log(
          `Field '${field}' with value '${value}' added successfully to document '${documentId}' in '${collectionName}' collection`
        );
        alert('Verify kara dunga');
      } catch (error) {
        console.error('Error adding field and value:', error);
      }
    };

    addFieldToDocument(nameOfCollection, documentId, fieldNameToAdd, valueToAdd);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    {lawyer.map((law) => (
      <div key={law.docid} className="flex p-4 rounded bg-white shadow-md my-3 w-full max-w-2xl">
        {/* Lawyer Information (Left Column) */}
        <div className="flex flex-col items-center w-1/2 pr-4">
          <img src={law.imgUrl} alt="" className="rounded-full w-[150px] h-[150px]" />
          <h2 className="font-bold text-2xl my-3">{law.name}</h2>
          <div className="p-2">
            <p className="p-1">{law.description}</p>
            <p className="p-1">
              Designation: {law.designation} ({law.category})
            </p>
            <p className="p-1">Education: {law.education}</p>
          </div>
          <div className="flex justify-center">
            <p className="p-1">Cased Won: {law.won}</p>
            <p className="p-1">Cases Handled: {law.handled}</p>
          </div>
          <div className="flex justify-center">
            <p className="p-1">Location: {law.location}</p>
            <p className="p-1">Availability: {law.availability}</p>
          </div>
          <div className="p-2">
            <p className="p-1">Experience: {law.years}</p>
          </div>
          {/* Social Media Links */}
          <div className="flex justify-center">
            <h6 className="text-3xl p-2">
              <a href={law.linkedin}>
                <BsLinkedin />
              </a>
            </h6>
            <h6 className="text-3xl p-2">
              <a href={`tel:${law.phone}`}>
                <PiPhoneCallFill />
              </a>
            </h6>
            <h6 className="text-3xl p-2">
              <a href={law.instagram}>
                <GrInstagram />
              </a>
            </h6>
            <h6 className="text-3xl p-2">
              <a href={`mailto:${law.email}`}>
                <AiOutlineMail />
              </a>
            </h6>
            <h6 className="text-3xl p-2">
              <a href={`mailto:${law.website}`}>
                <TbWorldWww />
              </a>
            </h6>
          </div>
          {/* QR Code and Rating Section */}
          <div className="flex justify-center items-center my-3">
            <div className="p-5">
              <QRCode value={`upi://pay?pa=${law.upiId}`} />
            </div>
            <div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((index) => (
                  <input key={index} type="checkbox" name={`rating-${index}`} onClick={() => rating(index)} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Chat Feature (Right Column) */}
        <div className="flex flex-col items-center w-1/2 pl-4">
          <input
            type="text"
            className="border p-2 rounded mb-3"
            placeholder="Type your message"
            onChange={(event) => setMessage((prev) => ({ ...prev, body: event.target.value }))}
            value={message.body}
          />
          <button className="bg-blue-500 text-white px-4 py-2 rounded mb-3" onClick={sendMessage}>
            Send
          </button>
          <div className="my-3">
            <h1 className="text-xl font-bold mb-2">Messages from Firebase Collection</h1>
            <ul>
              {fetchedMessages.map((msg) => (
                <li key={msg.id}>{msg.body}</li>
              ))}
            </ul>
          </div>
          <div className="my-3">
            <h1 className="text-xl font-bold mb-2">Documents with substring:</h1>
            <div>
              {documentsWithSubstring.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => LawyersChatCollectionName(doc.data.name)}
                  className="cursor-pointer text-blue-500"
                >
                  {doc.data.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);
};


export default Page;
