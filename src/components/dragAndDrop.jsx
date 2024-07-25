"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaFileUpload } from "react-icons/fa";
import { Error } from "@/components/error";
import { Success } from "@/components/success";
import { uploadToS3 } from "@/actions/file/awsS3";

import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

import { createChatSession } from "@/actions/chat/chatSession";
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
import {cn} from "@/lib/utils"
import { Toaster } from "./ui/toaster";
import { useToast } from "./ui/use-toast";
import { Pricing } from "./pricing";
import { updateChatWithDocQuota } from "@/actions/subscriptionQuota/subscriptionQuota";

export const DragAndDrop = ({userSession, quota}) => {

  const isSubscribed = userSession ? userSession.subscription :  "free";
  const router = useRouter();

  const [remainingQuota, setRemainingQuota] = useState(quota);
  const [fileLengthError, setFileLengthError] = useState(false);
  const [pricing, setPricing] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [dragging, setDragging] = useState(false);
  const [loader, setloader] = useState(false);
  const [openFileManager, setOpenFileManager] = useState(false);
  const [inputFiles, setInputFiles] = useState([]);
  const fileInput = useRef(null);
  const [validating, setValidating] = useState(false);
  const [chatDisable, setChatDisable] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [model, setModel] = useState("gpt-3.5-turbo-0125");
  const { toast } = useToast();

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e) =>{
    setDragging(false);
  }

  useEffect(() => {
   if (isSubscribed === "free" && model !== 'gpt-3.5-turbo-0125') {
      setPricing(true);
      setModel('gpt-3.5-turbo-0125');
      toast({
         variant: "destructive",
         title: "You need to upgrade to Premium to use this model",
         description: "Please upgrade to Premium to use this model",
      })
   }
  }, [model, isSubscribed]);

  function removeExtraFiles() {
    setInputFiles((prevFiles) => prevFiles.slice(0, 2));
  }
  function emptyFiles() {
    setOpenFileManager(false);
    setInputFiles([]);
  }
  function emptyErrorMessage (){ 
    setError("");
  }
  const resetFileInput = () => {
    if (fileInput.current) {
      fileInput.current.value = null;
    }
  };

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
    
    const res = await fetch("/api/getnumberofpages", {
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
    const updateFileLength = () => {
      if (userSession.subscription === "free" && inputFiles.length >= 2) {
        setDisabled(true);
      } else {
        setDisabled(false);
        setFileLengthError(false);
      }
      
      if (userSession.subscription === "free" && inputFiles.length > 2) {
        setFileLengthError(true);
      }
    };

    if (userSession && userSession.subscription !== null) {
      updateFileLength();
    }
  }, [inputFiles, userSession]);
  

  const handleFile = async (e, fromDrop = false) => {
   //check User Authentication
   if(userSession === null){
      router.push("/login?callbackUrl=/chat");
      return;
   }
   if(userSession.subscription === 'free' && remainingQuota <= 0){
      toast({
         variant: "destructive",
         title: "Insufficient Quota",
         description: `You have exhausted your chat with doc quota for the month. Please buy a plan for more!`,
       });
       setPricing(true);
       return;
   }
   console.log("hello")
   try{
    e.preventDefault();

    if (fromDrop) {
      e.stopPropagation();
      setDragging(false);
    }
    
    if (userSession === null) {
      return;
    }
    
    const files = Array.from((fromDrop ? e.dataTransfer : e.target).files);
    const newInputFiles = [...inputFiles, ...files];
    setInputFiles(newInputFiles);
    
    //checking for valid files
    if (fileLengthError) {
      setError(`You can only upload two files  at once`);
      return;
    }
    if (files.length >= 2) {
      setOpenFileManager(true);
      setDisabled(true);
    }
    setChatDisable(true);
    const fileValidation = await filesPageLengthCheck(newInputFiles);
    
    for (const result of fileValidation) {
      if (result.pages > 50 && isSubscribed === "free" ) {
        setError(
          `The ${result.fileName} have ${result.pages} pages, You can only upload files with less than 50 pages. Please buy a plan for more!`
          );
          toast({
              variant: "destructive",
             title : "File Upload Error",
             description : `The ${result.fileName} have ${result.pages} pages, You can only upload files with less than 50 pages. Please buy a plan for more!`
          })
          if (openFileManager === false && files.length === 1) {
            setInputFiles([]);
          }
        setDisabled(true);
        setChatDisable(true);
        return;
      }else if(result.pages > 2000 && isSubscribed === "premium"){
         setError(
            `The ${result.fileName} have ${result.pages} pages, You can only upload files with less than 2000 pages. Please buy a plan for more!`
         );
         toast({
             variant: "destructive",
            title : "File Upload Error",
            description : `The ${result.fileName} have ${result.pages} pages, You can only upload files with less than 2000 pages. Please buy a plan for more!`
         })

         if (openFileManager === false && files.length === 1) {
            setInputFiles([]);
         }
         setDisabled(true);
         setChatDisable(true);
         return;
      }
    }
    setChatDisable(false);
    
    if ((files.length === 0 || files.length === 1) && inputFiles.length === 0) {
      processFiles(files);

      if (!fromDrop) {
        e.target.value = null;
      }
      return;
    }

    if (!fromDrop) {
      e.target.value = null;
    }
   }catch(error){
      toast({
         variant: "destructive",
         title: "File Upload Error",
         description: `We couldn't Upload your File :${error.message}`,
       });
   }
  };

  const handleDeleteFile = async (index) => {
    const newUploadedFiles = [...inputFiles];
    newUploadedFiles.splice(index, 1);
    setInputFiles(newUploadedFiles);
    emptyErrorMessage();
    // If there are no more files, close the file manager
    const fileValidation = await filesPageLengthCheck(newUploadedFiles);
    const validFiles = fileValidation.every(result => result.pages <= 30);
    setChatDisable(!validFiles);

    if (newUploadedFiles.length === 0) {
      setOpenFileManager(false);
    }
  };

  const processFiles = async (singleFiles) => {
   if(userSession === null){
      router.push("/login?callbackUrl=/chat");
      return;
   }
   if(userSession.subscription === 'free' && remainingQuota <= 0){
      toast({
         variant: "destructive",
         title: "Insufficient Quota",
         description: `You have exhausted your chat with doc quota for the month. Please buy a plan for more!`,
       });
       setPricing(true);
       return;
   }
    setloader(true);
    setError("");
    setSuccess("");
    const files = inputFiles.length > 0 ? inputFiles : singleFiles;
    const uploadedFiles = [];
    const fileName = files.length > 1 ? "new folder 1" : files[0].name;
    const user = userSession;
    const session = await createChatSession(user.id, fileName, "chatwithdoc");
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {

        const data = await uploadToS3(
          file.name,
          file.type,
          file.size,
          user.id,
          session,
           "user"
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
          
          uploadedFiles.push({ data: data.awsS3.userFile });
         } catch (e) {
           console.log(e);
          toast({
            variant: "destructive",
            title: "File Upload Error",
            description: `We couldn't Upload your File :${e.message}`,
          });
        }
      } catch (e) {
        console.log(e);
        toast({
         variant: "destructive",
         title: "File Upload Error",
         description: `We couldn't Upload your File :${e.message}`,
       });
      }
    }
    //aws s3 bucket upload ends here

    try {
      //for vectorizing the text from the uploaded files
      const responseFromApi = await fetch("/api/vectorstore", {
        method: "PUT",
        body: JSON.stringify(uploadedFiles),
      });
      if (!responseFromApi.ok) {
        setError("Failed to Upload in database, Try Again!");
        return;
      } 
      setloader(false);
      setRedirect(true);
      setSuccess("File upload successfull");
      const newQuota =  remainingQuota - 1;
      setRemainingQuota(newQuota);
      await updateChatWithDocQuota(userSession.id, newQuota);
      router.push(`/chat/${session}`);
      
    } catch (e) {
      console.log(e);
      toast({
         variant: "destructive",
         title: "File Upload Error",
         description: `We couldn't Upload your File :${e.message}`,
      });
    }
  };

  const handleClickFromDropArea = () => {
      if(!userSession){
         router.push("/login?callbackUrl=/chat");
         return;
      }
    fileInput.current.click();
  };
  const handleClickFromButton = () => {
   if(!userSession){
      router.push("/login?callbackUrl=/chat");
      return;
   }
    fileInput.current.click();
  };

  return (<>
  <Toaster />
  {pricing && <Pricing setPricing={setPricing} />}
    <div className="relative text-center w-full flex justify-center">
      {fileLengthError && (
        <FileSelectorWarning
          file={inputFiles.length}
          selectAgain={emptyFiles}
          setPricing={setPricing}
          uploadFirstTwo={removeExtraFiles}
          setFileLengthError={setFileLengthError}
        />
      )}
      {redirect && <Redirecting />}

      <div className="p-2 md:w-2/3 h-auto">
        <div className=" w-full h-auto flex justify-center border border-gray-400 rounded-md">
          <input
            multiple
            ref={fileInput}
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,image/*"
            style={{ display: "none" }}
            onChange={(e) => {
              console.log(e.target.files)
              handleFile(e);
              resetFileInput();
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
                  disabled={chatDisable}
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
               <AiModelSelector
                 model={model}
                 setModel={setModel}
                 subscription={isSubscribed}
                 />
               </div>
                <div
                  className={cn(`w-full border border-dashed border-gray-500 pb-16 block items-center justify-center hover:mouse p-3 rounded-md` , loader ? 'opacity-65' : '')}
                  onDragOver={(e) => {!loader && !validating &&  handleDragOver(e)}}
                  onDrop={(e) =>{!loader && !validating  &&  handleFile(e, true)}}
                  onDragLeave={(e) => {!loader && !validating  && handleDragLeave(e)}}
                  style={{
                    backgroundColor: dragging && "#fbb6cf",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {!loader && !validating  && handleClickFromDropArea(e)}}
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
                        <Link onClick={(e)=>e.stopPropagation()} href="/pricing">Upgrade for More</Link>
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
                  {validating && (
                  <div>
                  <p>Validating File...</p>
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
                  {/* </form> */}
                  <div className="flex items-center justify-center bottom-12 z-10 ">
                    <div className="group inline-block relative" onClick={(e) => e.stopPropagation()}> 
                      <Button2
                        onClick={(e) => {
                          if (!loader  || !validating) {
                            e.stopPropagation();
                            handleClickFromButton();
                          }
                        }}
                        className="relative border p-1 rounded-lg mt-4"
                        disabled={loader}
                      >
                        Upload
                      </Button2>
                      <div className="transform w-[26rem] mt-2 px-2 py-1 bottom-10 rounded text-sm backdrop-blur-lg border border-gray-300 hidden group-hover:block absolute">
                        Hold Control &#40; Ctrl &#41; or Command key &#40; ⌘ &#41;
                        to select multiple files
                      </div>
                    </div> 
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
   </>);
};
