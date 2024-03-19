import { getData, postData } from "./databaseController";
import {auth} from '@/auth'

export async function GET() {
  const session = await auth();
  console.log("Session : ", session);
  try {
    const result = await getData();
    return Response.json(result);
  } catch (err) {
    console.error(err);
    return Response.json({ err: "Data fetching failed!" }, { status: 500 });
  }
}
export async function POST(req, res) {

  try{
    const result = await postData(id,country,flag);
    return Response.json(result);
  }catch(err){
    console.error(err);
    return Response.json({ err: "Data posting failed!" }, { status: 500 });
  }

}