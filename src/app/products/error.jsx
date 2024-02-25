"use client";
import React from "react";
export default function Error(error,reset){
  
  return (
    <>
      <h1>Heheh.. Database connectivity problem</h1>
      <p>Check if your Data Base is On.</p>
      <button onClick={()=> reset()}>Reload</button>
    </>
  );
};
