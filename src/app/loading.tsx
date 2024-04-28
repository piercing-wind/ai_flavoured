'use client'
import { HashLoader } from "react-spinners";

export default function Loading() {
  return (
    <>
      <div className="flex items-center justify-center h-screen backdrop-blur-sm">
        <div className="flex items-center justify-center space-x-4">
          <HashLoader color="#de5692" cssOverride={{}} loading />
          <h1>Loading...</h1>
        </div>
      </div>
    </>
  );
}