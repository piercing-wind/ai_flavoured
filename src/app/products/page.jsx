import { revalidatePath } from "next/cache";
async function getFlags() {
  let data = [];
  const response = await fetch("http://localhost:3000/api/database", {
    method: "GET",
  });
  if(response.ok){
    data = await response.json();
    // console.log(data);
    revalidatePath("/products");
  }
  return data;
}

const ProductsPage = async () => {
  const data = await getFlags();
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
