import { ImageSessionButton } from "@/components/imageSessionCreatorButton";

const Page = async () => {
 
  return (
    <div className="text-center ">
      <h1 className=" text-2xl">Welcome</h1>
       <div className="card flex items-center  justify-center border h-56 w-96 rounded-md">
         <ImageSessionButton className="border rounded-md" text="Create Image" />
       </div>
    </div>
  );
};
export default Page;
