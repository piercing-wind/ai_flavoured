export async function POST(req:Request){
      
      const text = await req.json();
      const data = text.data;
      console.log("Form api",data);

      return Response.json({message:"success"});
}