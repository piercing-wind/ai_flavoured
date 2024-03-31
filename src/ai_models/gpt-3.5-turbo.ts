'use server'
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
// const config = new Configuration();
const api = { apiKey: process.env.OPENAI_API_KEY, };
export const ChatCompletion = async (message : string) => {
  try {
    const chat : any = [{ role: "system", content: "You are a Software engineer" }];
    if(message === "") {
      throw new Error("Message is required");
    }
    if(message){
      chat.push({ role: "user", content: message });
    }
    const openai = new OpenAI(api);
    const response = await openai.chat.completions.create({
      messages: chat,
      model: "gpt-3.5-turbo",
    });
    console.log(chat);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }

  // } catch (error) {console.log(error);}
};
