import { getData, postData } from "./databaseController";


export async function GET() {
  try {
    const result = await getData();
    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ err: "Data fetching failed!" }, { status: 500 });
  }
}
export async function POST(req, res) {
  const {id,country, flag} = await req.json();
  try{
    const result = await postData(id,country,flag);
    return Response.json(result);
  }catch(err){
    console.error(err);
    return Response.json({ err: "Data posting failed!" }, { status: 500 });
  }

}