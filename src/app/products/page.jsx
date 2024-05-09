import { DragAndDrop } from "@/components/DragAndDrop";
import { Chat } from "./chat";
// export ex


const ProductsPage = async () => {
  return (
    <div className="text-center ">
      <h1 className=" mt-12 text-2xl">Welcome</h1>
      <Chat />
      <DragAndDrop />
      
    </div>
  );
};
export default ProductsPage;
