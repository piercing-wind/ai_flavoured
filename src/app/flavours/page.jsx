import {CreateSessionButton} from "@/components/sessionCreatorCards";
const Page = async () => {
 
  return (
    <div className="text-center ">
      <h1 className=" text-2xl">Welcome</h1>
      <div className="flex space-x-2"> 
       <div className="card shadow-sm flex items-center  justify-center border h-56 w-96 rounded-md">
         <CreateSessionButton className="border rounded-md" text="Create Image" name="AI Image Gen" sessionType="image" />
       </div>
       <div className="card shadow-sm flex items-center  justify-center border h-56 w-96 rounded-md">
         <CreateSessionButton className="border rounded-md" text="Generate Audio" name="AI Audio Gen" sessionType="audio" />
       </div>
      </div>
    </div>
  );
};
export default Page;
