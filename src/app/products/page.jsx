import { revalidatePath } from "next/cache";
async function getFlags() {
  let data = [];
  const response = await fetch("http://localhost:3000/api/auth/database", {
    method: "GET",
  });
  if(response.ok){
    data = response.json();
    // console.log(data);
    revalidatePath("/products");
  }else{
    throw new Error("Error: ", response.status);
  }
  return data;
}

const ProductsPage = async () => {
  const data = await getFlags();
  if(data){console.log("true")}else{console.log("false")}
    return (
      <div>
        {data?.map((items) => (
          <div key={items.id}>
            <h3>
              {items.country} : {items.flag}
            </h3>
          </div>
        ))}
      </div>
    );
};
export default ProductsPage;
