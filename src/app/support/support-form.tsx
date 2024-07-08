'use client'
import {
   Card,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader, 
   CardTitle,
 } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {supporFormData} from "@/actions/support"
import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Toaster } from "@/components/ui/toaster";
import  {useToast} from "@/components/ui/use-toast"
import { UserSession, getUserSession } from "@/actions/userSession";
import { useRouter } from "next/navigation";
import { GoInfo } from "react-icons/go";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { uploadToS3, uploadToSupportAttachment } from "@/actions/file/awsS3";
// import { useTransition } from "react";


export  const SupportForm = ({user} :{user: UserSession}) => {
   const router = useRouter();
   const [totalSize, setTotalSize] = useState(0);
   const [inputKey, setInputKey] = useState(Date.now());
   
   const {toast} = useToast();
   const [isPending, startTransition] = useTransition();
   const form = useForm({
      defaultValues: {
         title: "",
         subject: "",
         description: "",
         files : [] as File[],
      },
   });

   const Submit = async (values: { title: string; subject: string; description: string,files: File[]})=>{
      if(user === null){
         router.push('/login?callbackUrl=/support');
         return;
      }
      if(totalSize > 20){
         toast({
            variant : 'destructive',
            title : "File size exceeded",
            description : "The total size of files attached should be less than 20 MB",
            duration : 10000
         })
         return;
      }
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('subject', values.subject);
      formData.append('description', values.description);
      formData.append('submittedBy', user.email);
      
      for (const file of values.files) {
         try{
            const upload = await uploadToSupportAttachment(file.name, file.type, file.size, user.id);
            const res = await fetch(upload.uploadUrl,{
               method: 'PUT',
               body : file,
               headers : {
                  'Content-Type' : file.type,
                  'Content-Length' : file.size.toString(),
                  'Content-Disposition' : `attachment; filename="${file.name}"`,
                  'Metadata' : `userId=${user.id}`
               }
            })
            if(res.ok){
               formData.append('files', upload.downloadUrl);
            }
         }catch(e){
            toast({
               variant : 'destructive',
               title : "An error occured while uploading the file",
               description : `Error : ${(e as Error).message}`,
               duration : 10000
            })
            return;
         }
     } 

      startTransition(()=> 
       supporFormData(formData)
       .then((data: string) => {
         toast({
            title : data,
            description : "Please wait for our team to get back to you, we will reach out to you soon! in a day or less. Thank you for your patience 🙏",
            duration : 10000,
         })
         form.reset();
         setInputKey(Date.now());
        }
       ).catch((e: Error) => {
         toast({
            variant : 'destructive',
            title : "We are unable to receive your message😔! An error occured ",
            description : `We are sorry for the inconvenience, Error Reason : ${e.message} 🤔 : please try again later`,
            duration : 10000
         })
       })
       )
   }

   return (
      <div className="w-[95%] sm:w-[60%] xl:w-[40%] mx-auto rounded-lg mb-[10rem] " style={{boxShadow : "0px 0px 5px gray"}}>
         <Toaster/>
      <Card>
        <CardHeader>
          <CardTitle>Report an Issue</CardTitle>
          <CardDescription>Please fill the form below if you are facing issues on our platform!</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="w-[90%] mx-auto ">
               <Form {...form}>
               <form onSubmit={form.handleSubmit(Submit)} className="gap-y-2 space-y-6 flex flex-col m-auto">
                  <FormField
                     control={form.control}
                     name="title"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xl py-4">Title <span className="text-red-500">*</span></FormLabel>
                         <FormControl> 
                            <Input
                             {...field}
                             placeholder="Provide a title for your issue"
                             required
                             max={150}
                             min={5} 
                             className="mb-5 border-none sapce-y-8"
                             style={{boxShadow : "0px 0px 2px gray"}}
                             />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                     />
                  <FormField
                     control={form.control}
                     name="subject"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xl py-4">Subject <span className="text-red-500">*</span></FormLabel>
                         <FormControl> 
                            <Input
                             {...field}
                             placeholder="Provide category of your issue"
                             required
                             max={150}
                             min={5} 
                             className="mb-5 border-none"
                             style={{boxShadow : "0px 0px 2px gray"}}
                             />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                     />
                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel className="text-xl py-4">Describe your issue in detail <span className="text-red-500">*</span></FormLabel>
                         <FormControl> 
                            <textarea
                               {...field}
                               title="Description"
                               name="description"
                               placeholder="Please include all the relevant details of the issue you are facing."
                               required
                               maxLength={5000}
                               minLength={150}
                               className="w-full h-full max-h-[15rem] my-auto p-2 border-none rounded-md"
                               style={{boxShadow : "0px 0px 2px gray"}}
                            />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                     />
                  <div className="w-full flex items-baseline justify-between">
                  <FormField
                     control={form.control}
                     name="files"
                     render={({ field }) => (
                        <FormItem className="relative">
                           <div className="flex items-center space-x-2">
                           <FormLabel className="text-lg flex items-baseline text-center" title="Optional" >Additional Attachment </FormLabel><GoInfo  data-tooltip-id="files" data-tooltip-content="Hold Ctrl or Command key to select Mutliple files, Total size should be less than 20 MB" className=" opacity-70" />
                           <Tooltip id="files"/>
                           </div>
                           <p className={`absolute top-3 right-2 text-xs ${totalSize > 20 && 'text-red-600'}`}>{totalSize.toFixed(2)}/MB</p>
                         <FormControl> 
                              <Input
                               type='file'
                               name="files"
                               multiple
                               key={inputKey}
                               onChange={(e) => {
                               if(e.target.files){
                                  const totalSize = Array.from(e.target.files).reduce((total, file) => total + file.size, 0);
                                  setTotalSize(totalSize / (1024 * 1024));
                                  form.setValue('files', Array.from(e.target.files))
                                  }
                              }}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                      )}
                     />
                        
                     <Button disabled={isPending} variant={'outline'} className="p-1 my-5 sm:my-9 max-w-[12rem] w-full self-end text-lg bg-black text-white hover:bg-white hover:text-black dark:bg-white dark:text-black dark:hover:text-white dark:hover:bg-black">
                        Submit
                     </Button>
                  </div>
               </form>
             </Form>
            </div> 
        </CardContent>
        <CardFooter>
            <Label>Need help? Contact us at <a href="mailto:support@aiflavoure.com" className="text-blue-500">Ai Flavoured</a></Label>
        </CardFooter>
      </Card>
    </div>
   )
}