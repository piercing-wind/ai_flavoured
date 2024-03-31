"use client";
import { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { uploadToS3 } from "@/actions/uploads";

export const DragAndDrop = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
    ``;
  };

  const handleDragLeave = (e) => {
    setDragging(false);
  };

  const handleFile = async (e, fromDrop = false) => {
    setError("");
    setSuccess("");
    if (fromDrop) {
      e.preventDefault();
      setDragging(false);
    }
    const file = (fromDrop ? e.dataTransfer : e.target).files[0];
    if (file.size > 10 * 1024 * 1024) {
      setError("File size must be less than 10MB");
      return;
    }
    try{
      console.log(file.type, file.size, file.name);
      const data = await uploadToS3(file.name, file.type, file.size);

      const uploadUrl = data.success.url;
      if(!data){
        throw new Error("Upload failed");
      }
      try{
        const res = await fetch(uploadUrl,{
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });
        if(!res.ok){
          throw new Error("Network error");
        }
        let responseData;
        if (res.headers.get('content-type')?.includes('application/json')) {
          responseData = await res.json();
        }
        setSuccess("File uploaded successfully");
      }catch(e){
        console.log(e); 
      }
    }catch(e){
      console.log(e);
    }
  };

  const fileInput = useRef(null);
  const handleClick = () => {
    fileInput.current.click();
  };

  return (
    <div className="text-center flex justify-center">
      <div className="text-center">
        <h1 className=" mt-8 text-2xl">Upload your file here</h1>

        <form>
          <div
            className=" border border-dashed m-4 h-20 block items-center justify-center hover:mouse p-3 rounded-md"
            onDragOver={handleDragOver}
            onDrop={(e) => handleFile(e, true)}
            onDragLeave={handleDragLeave}
            style={{
              backgroundColor: dragging ? "#012" : "",
              cursor: "pointer",
            }}
            onClick={handleClick}
          >
            <input
              ref={fileInput}
              type="file"
              name="file"
              accept=".pdf,.doc,.docx,image/*"
              style={{ display: "none" }}
              onChange={handleFile}
            />
            <FaFileUpload className="h-9 w-9 p-1 inline " />
            <p className=" text-sm">Drag your file here</p>
          </div>
          <button type="submit" className="border p-1 rounded-lg">
            Upload
          </button>
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </div>
    </div>
  );
};
