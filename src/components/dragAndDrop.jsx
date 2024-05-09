"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Error } from "@/components/error";
import { Success } from "@/components/success";
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
import Link from "next/link";
import { Button } from "./ui/button";
import { Button as Button2 } from "@/components/button";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsChatRightText } from "react-icons/bs";
import { FormError } from "@/components/auth/form-error";
import { Redirecting } from "@/components/redirecting";
import {AiModelSelector} from "@/components/aiModelSelector";

export const DragAndDrop = () => {
  const [fileLengthError, setFileLengthError] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loader, setloader] = useState(false);
  const [openFileManager, setOpenFileManager] = useState(false);
  const [inputFiles, setInputFiles] = useState([]);
  const [session, setSession] = useState(null);
  const [isSubscribed, setSubscribed] = useState("free");
  const fileInput = useRef(null);
  const [validating, setValidating] = useState(false);
  const [chatDisable, setChatDisable] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [model, setModel] = useState("gpt-3.5-turbo-0125");

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e) => {
    setDragging(false);
  };
  const checkUserSubscription = async () => {
    if (isSubscribed === "free" || session.subscription === "free") {
      router.push(`/pricing`);
      return;
    }
    setModel("gpt-4-turbo");
  };
  const updateModel = () => {
    setModel("gpt-3.5-turbo-0125");
  }
  function removeExtraFiles() {
    setInputFiles((prevFiles) => prevFiles.slice(0, 2));
  }
  function emptyFiles() {
    setOpenFileManager(false);
    setInputFiles([]);
  }
  function emptyErrorMessage() {
    setError("");
  }

  
  const filesPageLengthCheck = async (files) => {
    setValidating(true);
    setDisabled(true);
    //we can not send file directly from client to server thats why we are using form data api!
    const formData = new FormData();
    let resultList = [];
    for (const file of files) {
      formData.append("files[]", file);
      formData.append("fileTypes[]", file.type);
    }
    
    const res = await fetch("api/getnumberofpages", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const responseData = await res.json();
      resultList = responseData.result;
    } else {
      return { error: "Failed to get number of pages" };
    }
    setValidating(false);
    setDisabled(false);
    return resultList;
  };
  
  useEffect(() => {
    const fetchSession = async () => {
      const data = await Session();
      const user = data.session;
      setSession(user);
      setSubscribed(user.subscription);
      // const model = await getUserModel(user.id);
    };

    fetchSession();
  }, []);

  useEffect(() => {
    const updateFileLength = () => {
      if (session.subscription === "free" && inputFiles.length >= 2) {
        setDisabled(true);
      } else {
        setDisabled(false);
        setFileLengthError(false);
      }

      if (session.subscription === "free" && inputFiles.length > 2) {
        setFileLengthError(true);
      }
    };
    if (session && session.subscription !== null) {
      updateFileLength();
    }
  }, [inputFiles]);

  const handleFile = async (e, fromDrop = false) => {
    e.preventDefault();

    if (fromDrop) {
      e.stopPropagation();
      setDragging(false);
    }

    if (session === null) {
      console.log("No user found");
      return;
    }

    const files = Array.from((fromDrop ? e.dataTransfer : e.target).files);
    const newInputFiles = [...inputFiles, ...files];
    console.log("from handle file", newInputFiles);
    setInputFiles(newInputFiles);

    //checking for valid files
    if (fileLengthError) {
      setError(`You can only upload two files  at once`);
      return;
    }

    if (files.length >= 2) {
      setOpenFileManager(true);
    }

    const fileValidation = await filesPageLengthCheck(newInputFiles);

    for (const result of fileValidation) {
      if (result.pages > 30 && isSubscribed === "free") {
        setError(
          `The ${result.fileName} have ${result.pages} pages, You can only upload files with less than 50 pages. Please buy a plan for more!`
        );
        setloader(false);
        setDisabled(true);
        setChatDisable(true);
        return;
      }
    }
    setChatDisable(false);

    if ((files.length === 0 || files.length === 1) && inputFiles.length === 0) {
      setloader(true);
      processFiles(files);

      if (!fromDrop) {
        e.target.value = null;
      }
      setloader(false);
      return;
    }

    if (!fromDrop) {
      e.target.value = null;
    }
  };

  const handleDeleteFile = (index) => {
    const newUploadedFiles = [...inputFiles];
    newUploadedFiles.splice(index, 1);
    setInputFiles(newUploadedFiles);

    emptyErrorMessage();
    // If there are no more files, close the file manager
    if (newUploadedFiles.length === 0) {
      setOpenFileManager(false);
    }
  };

  const processFiles = async (singleFiles) => {
    setError("");
    setSuccess("");
    setloader(true);
    const files = inputFiles.length > 0 ? inputFiles : singleFiles;
    const uploadedFiles = [];
    const fileName = files.length > 1 ? "new folder 1" : files[0].name;
    const user = session;
    const chatId = await createChatSession(user.id, fileName);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const data = await uploadToS3(
          file.name,
          file.type,
          file.size,
          user.id,
          chatId
        );
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
          }
          uploadedFiles.push({ data: data.awsS3.data, fileType: file.type });
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
      }
    }
    //aws s3 bucket upload ends here

    try {
      const responseFromApi = await fetch("api/chat", {
        method: "PUT",
        body: JSON.stringify(uploadedFiles),
      });
      if (!responseFromApi.ok) {
        setError("Failed to Upload in database, Try Again!");
      } else {
        setRedirect(true);
        setloader(false);
        setSuccess("File upload successfull");
        router.push(`/chat/${chatId}`);
        setRedirect(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClickFromDropArea = () => {
    fileInput.current.click();
  };
  const handleClickFromButton = () => {
    fileInput.current.click();
  };

  return (
    <div className="relative text-center w-full flex justify-center">
      {fileLengthError && (
        <FileSelectorWarning
          file={inputFiles.length}
          selectAgain={emptyFiles}
          uploadFirstTwo={removeExtraFiles}
        />
      )}
      {redirect && <Redirecting />}
      <div className="p-2 w-2/3 h-auto">
        <div className=" w-full h-auto flex justify-center border border-gray-400 rounded-md">
          <input
            multiple
            ref={fileInput}
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              handleFile(e);
            }}
          />
          {openFileManager ? (
            <div className="p-2 w-2/3 h-auto">
              <div className="my-4 space-x-4 flex items-center">
                <Button
                  size="sm"
                  variant={"default"}
                  className="border bg-slate-950 text-white border-black shadow-xl hover:bg-slate-800 font-semibold w-32"
                  onClick={handleClickFromButton}
                  disabled={isDisabled}
                >
                  <AiOutlineFileAdd /> &nbsp; Add More
                </Button>
                <Button2
                  onClick={processFiles}
                  className="border h-9 rounded-lg "
                  disabled={isDisabled || chatDisable}
                  title={chatDisable ? "Please select valid files" : ""}
                >
                  <BsChatRightText /> &nbsp; Start Chat
                </Button2>
                <div>{inputFiles.length}</div>
              </div>
              {loader && (
                <div>
                  <p>Uploading Files...</p>
                  <div className="loader m-4 flex justify-center">
                    <BarLoader
                      className="w-full"
                      color="#ff0783"
                      size={3000}
                      loading
                    />
                  </div>
                </div>
              )}
              {validating && (
                <div>
                  <p>Validating Files...</p>
                  <div className="loader m-4 flex justify-center">
                    <BarLoader
                      className="w-full"
                      color="#ff0783"
                      size={3000}
                      loading
                    />
                  </div>
                </div>
              )}
              {inputFiles.map((file, index) => (
                <div
                  key={index}
                  className=" flex items-center justify-between border border-pink-200 p-2 my-2 rounded-md "
                >
                  <HiOutlineDocumentText className=" text-4xl mx-2" />
                  <div className="flex w-full items-center">
                    <p
                      className=" "
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {file.name}
                    </p>
                  </div>
                  <button
                    className=" float-right"
                    onClick={() => handleDeleteFile(index)}
                  >
                    <IoMdClose className=" text-2xl" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="relative w-full justify-center p-2">
              <div className="absolute border border-gray-400 left-5 top-7 rounded-md">
              <AiModelSelector  model={model} checkUserSubscription={checkUserSubscription} updateModel={updateModel}/>
              </div>
                <div
                  className="w-full border border-dashed border-gray-500 pb-16 block items-center justify-center hover:mouse p-3 rounded-md"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleFile(e, true)}
                  onDragLeave={handleDragLeave}
                  style={{
                    backgroundColor: dragging ? "#012" : "",
                    cursor: "pointer",
                  }}
                  onClick={handleClickFromDropArea}
                >
                  <h1 className=" mt-12 text-2xl">
                    Upload/Drag your Pdf/Doc here
                  </h1>
                  {/* <form onSubmit={handleFile}> */}
                  <FaFileUpload className="h-12 w-12 p-1 inline m-4" />
                  <div className=" opacity-75 z-20">
                    {isSubscribed === "free" ? (
                      <p className=" text-sm">
                        You can upload two files at once.
                        <Link href="/pricing">Upgrade for More</Link>
                      </p>
                    ) : (
                      <p className=" text-sm">Drag your file here</p>
                    )}
                  </div>
                  {loader && (
                    <div className="loader m-4 flex justify-center">
                      <BarLoader
                        className="w-full"
                        color="#ff0783"
                        size={3000}
                        loading
                      />
                    </div>
                  )}
                  {/* </form> */}
                </div>
                <div className="relative group flex items-center justify-center bottom-12">
                  <Button2
                    onClick={handleClickFromButton}
                    className=" absolute border p-1 rounded-lg mt-4"
                    disabled={loader}
                  >
                    Upload
                  </Button2>
                  <div className="absolute transform mt-2 px-2 py-1 bottom-4 rounded text-sm backdrop-blur-lg border border-gray-300 hidden group-hover:block">
                    Hold Control &#40; Ctrl &#41; or Command key &#40; ⌘ &#41;
                    to select multiple files
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {success !== "" && <Success message={success} />}
        {/* {error !== "" && <Error message={error} />} */}
        {error !== "" && error !== " " && (
          // console.log(error),
          <FormError message={error} clearMessage={emptyErrorMessage} />
        )}
      </div>
    </div>
  );
};
