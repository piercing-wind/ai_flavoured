"use client";
import { useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { uploadToS3 } from "@/actions/file/uploadsToS3";

import { documentToText } from "@/aiflavoured/documentsToText";
import { imgToText } from "@/aiflavoured/imgs/imgToText";
import { set } from "zod";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

import { containsImages } from "@/aiflavoured/imgs/containsImages";
import { createChatSession } from "@/actions/chat/chatSession";
import { Session } from "@/actions/userSession";
import { FileSelectorWarning } from "@/components/fileSelectorWarning";
// import { json } from "stream/consumers";

export const DragAndDrop = () => {
  const [fileLength, setFileLength] = useState(null); 
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loader, setloader] = useState(false);
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    setDragging(false);
  };
  const resetFileLength = () => {
    console.log("reset file length");
    setFileLength(null);
  };
  const handleFile = async (e, fromDrop = false) => {
    if (fromDrop) {
      e.preventDefault();
      e.stopPropagation();
      setDragging(false);
    }
    setError("");
    setSuccess("");
    const files = (fromDrop ? e.dataTransfer : e.target).files 
    const uploadedFiles = [];
    const fileName = files.length > 1 ? "new folder 1" : files[0].name;
    console.log(files);
    
    const data = await Session();
    const user = data.session;
    const chatId = await createChatSession(user.id, fileName);
    
    if(user.subscription === "free" && files.length > 2){
      setFileLength(files.length);
      return;
    }
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }
      try {
        setloader(true);
        const data = await uploadToS3(file.name, file.type, file.size, user.id, chatId);
        const uploadUrl = data.awsS3.url;
        if (!data) {
          throw new Error("Upload failed");
        }
        try {
          //this section is for uploading in the aws s3 bucket
          const res = await fetch(uploadUrl, {
            //uploading file to s3
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          });
          if (!res.ok) {
            throw new Error("Network error");
          }

          if (res.headers.get("content-type")?.includes("application/json")) {
            let responseData = await res.json();
            console.log(responseData);
          }
          uploadedFiles.push({ data: data.awsS3.data, fileType: file.type});
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    }
    console.log(uploadedFiles);
    //aws s3 bucket upload ends here

    try {
      const responseFromApi = await fetch("api/chat", {
        method: "PUT",
        body: JSON.stringify(uploadedFiles),
      });
      if (!responseFromApi.ok) {
        setError("Failed to Upload in database");
      } else {
        router.push(`/chat/${chatId}`);
      }
    } catch (e) {
      console.log(e);
    }
    setloader(false);
    setSuccess("File received successfully");
    if (!fromDrop) {
      e.target.value = null;
    }
  };
  const fileInput = useRef(null);
  const handleClick = () => {
    fileInput.current.click();
  };

  return (
    <div className="text-center flex justify-center">
      {fileLength && <FileSelectorWarning file={fileLength} resetFileLength={resetFileLength} />}
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
              multiple
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
          {loader && (
            <div className="loader">
              <BarLoader color="#36d7b7" loading />
            </div>
          )}
          <FormSuccess message={success} />
          <FormError message={error} />
        </form>
      </div>
   
    </div>
  );
};
