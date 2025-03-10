import React, { useState, useEffect } from 'react'
import './App.css'
import axios from "axios";
//import { Card, Button, Spinner } from "react-bootstrap";
//import "bootstrap/dist/css/bootstrap.min.css";
import "tailwindcss/tailwind.css";
//import tailwindcss from '@tailwindcss/vite'
import Button from "react-bootstrap/Button";

function App() {
  //      getter         setter             init
  const [dogData, setData] = useState(null);
  const [breed, setBreed] = useState(""); // store breed in a state for new pic button 

  const getDogInfo = async (selectedBreed = breed) => {
    try {
        //let breed = document.getElementById('user-breed').value.trim();
        if (!selectedBreed) return;
        
        console.log(selectedBreed)
        let { data } = await axios.get(
          `https://dog.ceo/api/breed/${selectedBreed}/images`
        );
        setData(data);
    } catch (error) {
        console.error("Error fetching images:", error);
      }
      };

  useEffect(() => {
    console.log(dogData);
  }, [dogData]);

  return (
    <>
       <h1 className="text-3xl bg-[#ADD8E6]">Random Dog Picture Generator</h1>
       <br></br>
      {dogData && dogData.message.length > 0 ? (<div className="flex justify-center items-center w-full h-full">
        <img src={dogData.message[Math.floor(Math.random() * dogData.message.length)]} 
            alt="Dog Pic"
            className="w-64 h-64 object-cover rounded-lg"
        /></div>) : 
          (<p>No images available.</p>)}
          <br></br>
      <h3 className="text-2xl">Enter a Breed</h3>
      <br></br>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          const inputBreed = document.getElementById("user-breed").value.trim();
          if (inputBreed) {
            setBreed(inputBreed); // store for reuse
            getDogInfo(inputBreed);
          }
        }}
      >
        <input type="text" id="user-breed" placeholder="breed" />
        <input className="border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-3 py-1 rounded" type="submit" />
      </form>
      
      <br></br>
      {/* new image of the same breed if dogData exists*/}
      {dogData && (<Button variant="primary" onClick={() => getDogInfo()}>Get New Image</Button>)}
      
    </>
  )
}


export default App
