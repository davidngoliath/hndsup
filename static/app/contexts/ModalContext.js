"use client"
import React, { createContext, useState } from "react";
export const ModalContext = createContext();

export default function ModalContextProvider({children}) {

  // const [displayModal, setDisplayModal] = useState(false);
    const [video, setVideo] = useState(false);
    const [contact, setContact] = useState(false);
    const [donate, setDonate] = useState(false);
  // const [message, setMessage] = useState(true);
  
  // const toggleModal = (e) => {
  //   //e.preventDefault();
  //   setDisplayModal(!displayModal);
  // }

  const [state, setState] = useState({
    initial: false,
    clicked: null,
    modalName: 'Modal'
  });


  const handleModal = (() => {

    if(state.initial === false){
      setState({
        initial: null,
        clicked: true,
        modalName: 'Close'
      });
      // setMessage(false);
    } else if ( state.clicked === true ){
      setState({
        clicked: !state.clicked,
        modalName: 'Modal'
      })
        setVideo(false);
        setContact(false);
        setDonate(false);
    } else if (state.clicked === false){
      setState({
        clicked: !state.clicked,
        modalName: 'Close'
      });

    }
  })



  return ( 
    <ModalContext.Provider value={{ state, setState, handleModal, video, setVideo, contact, setContact, donate, setDonate }}>
      {children}
    </ModalContext.Provider>
  )
}
