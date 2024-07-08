"use client";
import React, { useEffect, useRef, useState } from "react";
import { Error } from "@/components/error";
import { Success } from "@/components/success";
import { uploadToS3 } from "@/actions/file/awsS3";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

import { createChatSession } from "@/actions/chat/chatSession";
import { FileSelectorWarning } from "@/components/fileSelectorWarning";
import { Button } from "./ui/button";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { IoMdClose } from "react-icons/io";
import { FormError } from "@/components/auth/form-error";
import { Redirecting } from "@/components/redirecting";
import {AiModelSelector} from "@/components/aiModelSelector";
import {cn} from "@/lib/utils"
import { GrAttachment } from "react-icons/gr";
import { PPTXConfig } from "./PPTXConfig";
import { RiPresentationFill } from "react-icons/ri";
import { generatePresentaionAndStore } from "@/aiflavoured/presentation/generatePresentaionAndStore";
import { presentationSchema } from "@/schemas";
import * as z from "zod"
import { UserFile } from "@/actions/file/awsS3";
import { getAiPresentationQuota, updateAiPresentationQuota } from "@/actions/subscriptionQuota/subscriptionQuota";
import { useToast } from "./ui/use-toast";
import { Toaster } from "./ui/toaster";
import { Pricing } from "./pricing";

export const DragAndDropForAiPresentation = ({presentationQuota, userSession, isSubscribed}:{presentationQuota:number, userSession : any,isSubscribed : string}) => {
  const [fileLengthError, setFileLengthError] = useState(false);
  const [remainingQuota, setRemainingQuota] = useState(presentationQuota);
  const [isDisabled, setDisabled] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setloader] = useState(false);
  const [openFileManager, setOpenFileManager] = useState(true);
  const [inputFiles, setInputFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const [validating, setValidating] = useState(false);
  const [chatDisable, setChatDisable] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [model, setModel] = useState("gpt-4o");
  const { toast } = useToast();
  
  
  const [textInputValue, setTextInputValue] = useState('');
  const [slides, setSlides] = useState(15);
  const [wordsAmount, setWordsAmount] = useState('Regular');
  const [audience, setAudience] = useState('General');
  const [imageSearch, setImageSearch] = useState('Google Search');
  const [themeFunction, setThemeFunction] = useState('ppPartyThemePresentation');
  const [variant , setVariant] = useState('green')
  const [pricing , setPricing ] = useState<boolean>(false)

  //todo create  to by bass this condition
  useEffect(() => {
   if (isSubscribed === "free" && model !== 'gpt-4o') {
      setPricing(true);
      setModel('gpt-4o');
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

  const resetFileInput = () => {
    if (fileInput.current) {
      fileInput.current.value = "";
    }
  };

  const filesPageLengthCheck = async (files : any) => {
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
      if (userSession?.subscription === "free" && inputFiles.length >= 2) {
        setDisabled(true);
      } else {
        setDisabled(false);
        setFileLengthError(false);
      }
      
      if (userSession?.subscription === "free" && inputFiles.length > 2) {
        setFileLengthError(true);
      }
    };

    if (userSession && userSession?.subscription !== null) {
      updateFileLength();
    }
  }, [inputFiles, userSession]);
  

  const handleFile = async (e : any, fromDrop = false) => {
   if(userSession === null){
      router.push("/login?callbackUrl=/aipresentation");
      return;
   }
   if(remainingQuota <= 0 ){
      throw { message :"You have reached the limit of presentation generation" }
    }
   try{
    e.preventDefault();
    if (fromDrop) {
      e.stopPropagation();
    }
  
    if (userSession === null) {
      console.log("No user found");
      throw { message: "No user found" };
    }

    const file = (fromDrop ? e.dataTransfer : e.target).files[0];
    if (!file) {
      throw { message: "No file selected" };
    }
  
    //have to make sure that the user can only upload 1 files at once
    //we will update this in the future to allow multiple files

    setInputFiles([file]);

    if (fileLengthError) {
      setError(`You can only upload one file at once`);
      throw { message: "You can only upload one file at once" };
    }
    setOpenFileManager(true);
    setDisabled(true);
  
    setChatDisable(true);
    const fileValidation = await filesPageLengthCheck([file]);
  
    if (fileValidation[0].pages > 100 && isSubscribed === "free") {
      setError(
        `The ${fileValidation[0].fileName} have ${fileValidation[0].pages} pages, You can only upload files with less than 50 pages. Please buy a plan for more!`
      );
      if (openFileManager === false) {
        setInputFiles([]);
      }
      setDisabled(true);
      setChatDisable(true);
      throw {message : `The ${fileValidation[0].fileName} have ${fileValidation[0].pages} pages, You can only upload files with less than 50 pages. Please buy a plan for more!`};
    }
  
    setChatDisable(false);
  
    if (!fromDrop) {
      e.target.value = null;
    }
   }catch(e){
      const error = e as { message: string };
      toast({
         variant: "destructive",
         title: "File Upload Error",
         description: `${error.message} : Please try again`,
       });
   }
  };

  const handleDeleteFile = async (index : number) => {
    const newUploadedFiles = [...inputFiles];
    newUploadedFiles.splice(index, 1);
    setInputFiles(newUploadedFiles);
    setError("")
    // If there are no more files, close the file manager
    const fileValidation = await filesPageLengthCheck(newUploadedFiles);
    const validFiles = fileValidation.every((result: any)  => result.pages <= 30); // Explicitly define the type of 'result'
    setChatDisable(!validFiles);

    if (newUploadedFiles.length === 0) {
      setOpenFileManager(false);
    }
    setValidating(false);
  };
  const processFiles = async (singleFiles : any) => {
   console.log(userSession)
   if(userSession === null){
      router.push("/login?callbackUrl=/aipresentation");
      return;
   }
     if(remainingQuota <= 0 ){
        throw { message :"You have reached the limit of presentation generation" }
      }
      if(slides > 15 && isSubscribed === 'free' ){setPricing(true); return;}
      if(imageSearch !== "Google Search" && isSubscribed === "free"){ setPricing(true); return;}
      setloader(true);
      setError("");
      setSuccess("");
    const files = inputFiles.length > 0 ? inputFiles : singleFiles;
    const uploadedFiles : UserFile[] = [];
    const fileName = files.length > 1 ? "new folder 1" : files[0].name;
    const user = userSession;
    const presentationId : string = await createChatSession(user.id, fileName, "presentation");

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const data = await uploadToS3(
          file.name,
          file.type,
          file.size,
          user.id,
          presentationId,
           "user"
        );
        if (data && 'awsS3' in data ) {
          const uploadUrl = (data.awsS3 as any).url;
            
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
          if (res.headers.get("content-type")?.includes("application/json")) {
            let responseData = await res.json();
          }

          uploadedFiles.push(data.awsS3.userFile);
        } catch (e) {
          console.log(e);
        }
        }
      } catch (e) {
        console.log(e);
      }
    }
    //awsS3 upload ends here
    try {
      const data : z.infer<typeof presentationSchema> = {
        user : userSession,
        selectedFiles : uploadedFiles, 
        textInputValue, 
        slides, 
        wordsAmount,  
        audience, 
        imageSearch, 
        themeFunction, 
        variant, 
        ppmodel : model,
        waterMark: isSubscribed === "free" ? true : false
      }

      const response = await generatePresentaionAndStore(data, presentationId);  
       setloader(false);
       const newQuota = presentationQuota - 1;
       setRemainingQuota(newQuota);
       setRedirect(true);
       setSuccess("File upload successfull");
       await updateAiPresentationQuota(user.id, newQuota);
       router.push(response!);
  
    } catch (e) {
      const error = e as any;
      setloader(false);
      setError("Failed to upload file");  
      toast({
         variant: "destructive",
         title: "File Upload Error",
         description: `Failed to upload file ${error.message}`,
         });
    }
  };
  const handleClickFromButton = () => {
   if(userSession === null){
      router.push("/login?callbackUrl=/aipresentation");
      return;
   }
    if(fileInput.current){
      fileInput.current.click();
    }
  };
  return (
   <>
   <Toaster />
    <div className=" text-center w-full flex items-center justify-center flex-col">
      {pricing && <Pricing  setPricing={setPricing}/>}
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

      <div className="p-2 h-auto flex dark:text-neutral-200">
        <div className=" w-full h-auto flex flex-col justify-center rounded-md">
          <input
            multiple
            ref={fileInput}
            type="file"
            name="file"
            accept=".pdf,.doc,.docx,image/*"
            style={{ display: "none" }}
            onChange={async (e) => {
               try{
                  await handleFile(e);
                  resetFileInput();
                }catch(e){
                 const error = e as { message: string };
                 setPricing(true)
                 toast({
                    variant: "destructive",
                    title: "Insufficient Presentation Credits",
                    description: `${error.message } : Please upgrade your plan to generate more presentations `,
                  });
                }        
            }}
          />
          <div className={`w-full justify-center p-2 rounded-md bg-neutral-100 dark:bg-neutral-900 ${loader || validating ? ' bg-slate-200' : ''}` }
          onClick={(e) => {if(loader || validating){e.stopPropagation()}}}
          >
            <div className="flex justify-between items-center">
             <div className="my-2 h-8  left-1 top-1 rounded-md w-44" onClick={(e )=> e.stopPropagation()}>
                <AiModelSelector  model={model} setModel={setModel} presentation={true} subscription={isSubscribed}/>
             </div>

            </div>
            <div className="w-full">
              <PPTXConfig 
              setSlides={setSlides}
              setWordsAmount={setWordsAmount}
              setAudience={setAudience}
              setImageSearch={setImageSearch}
              variant={variant}
              themeFunction={themeFunction}
              slides={slides}
              wordsAmount={wordsAmount}
              audience={audience}
              imageSearch={imageSearch}
              setThemeFunction={setThemeFunction}
              setVariant={setVariant}
              />
            </div>
            <hr className=" border-t border-neutral-400 my-1"/>
          
                <div
                  className={cn(`w-full flex flex-col pb-16  hover:mouse p-3 rounded-md` , loader ? 'opacity-65' : '')}
                >
                  <div className=" border-b border-b-neutral-500 my-2 flex flex-col-reverse">
                    <textarea 
                    className=" h-8 w-full bg-transparent rounded-md focus:ring-0 focus:outline-none overflow-y-auto max-h-28"
                    placeholder="Enter your Presentation Topic here "
                    value={textInputValue}
                    style={{
                      writingMode: "horizontal-tb",
                      direction: "ltr",
                    }}
                    onChange={(e) => setTextInputValue(e.target.value)}
                    />
                  </div>
                  {openFileManager && 
                  <div className="relative w-full flex items-center">
            
                        {/* {loader && (
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
                        )} */}

                        {inputFiles.map((file, index) => (
                          <div
                            key={index}
                            className="relative left-0 flex w-52 h-8 items-center justify-between border border-pink-400 my-2 mx-1 rounded-md  "
                          >
                            <HiOutlineDocumentText className=" text-2xl mx-2" />
                            <div className="flex w-full items-center">
                              <p
                                className="text-sm w-32 overflow-ellipsis"
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
                              <IoMdClose className=" text-xl" />
                            </button>
                          </div>
                        ))}
                      {validating && (
                        <div className="w-full flex justify-center items-center"> 
                          <div className="backdrop-blur-md self-center">
                            <p>Validating Files...</p>
                            <div className="loader m-4 flex justify-center">
                              <BarLoader
                                className="w-full"
                                color="#ff0783"
                                loading
                                height={5}
                                width={200}
                                />
                            </div>
                          </div>
                        </div>
                        )}

                  </div>
                  }
                <div className="relative flex items-center w-full ">
                  <div className="flex relative group items-center w-48 justify-center border cursor-pointer dark:text-black bg-slate-100 rounded-md p-1 hover:bg-slate-200"
                     onClick={(e) => {
                      if (loader  || validating) {
                        e.stopPropagation();
                     }else{
                         e.stopPropagation();
                        handleClickFromButton();
                      }
                    }}
                  >               
                    <h1 className="text-sm font-semibold">
                      Upload Reference File 
                    </h1>
                    {/* <form onSubmit={handleFile}> */}
                    <GrAttachment className="h-6 w-6 p-1 inline" />
         
                    </div>
                      &nbsp;
                      &nbsp;
                  <div className=" opacity-75 ">
                      <p className=" text-sm">
                        Word / PPTX and PDF files only. Max 100 pages.
                      </p>
                  </div>
                   <div className="absolute right-0 bottom-0 flex items-center">
                      <Button
                        onClick={async ()=>{
                           try{
                             await processFiles(inputFiles)
                           }catch(e){
                             const error = e as { message: string };
                             setPricing(true)
                             toast({
                                variant: "destructive",
                                title: "Insufficient Presentation Credits",
                                description: `${error.message } : Please upgrade your plan to generate more presentations `,
                              });
                          }}}
                        variant="outline"
                        className="border h-9 rounded-lg font-medium bg-neutral-900 text-white hover:bg-neutral-700 dark:text-black dark:bg-neutral-100 dark:hover:bg-neutral-300"
                        disabled={!(textInputValue !== "" || inputFiles.length > 0) || chatDisable || loader || validating ? true : false}
                        title={chatDisable ? "Please select valid files" : ""}
                      >
                        <RiPresentationFill /> &nbsp; Generate 
                      </Button>
                   </div>

                  </div>

                    
                  {loader && (
                    <div className="loader m-4 flex justify-center">
                      <BarLoader
                        className="w-full"
                        color="#ff0783"
                        loading
                        height={5}
                        width={200}
                      />
                    </div>
                  )}

               </div>
              </div>
            </div>
      </div>
      {success !== "" && <Success message={success} />}
      {/* {error !== "" && <Error message={error} />} */}
      {error !== "" && error !== " " && (
        // console.log(error),
        <FormError message={error} clearMessage={setError} />
      )}
    </div>
    </>
  )};
