"use client";
import { ChatCompletion } from "@/openai_models/gpt-3.5-turbo";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import {chats} from "@/aiflavoured/chat"

type ChatMessage = {
  role: string;
  content: string;
};

type FormData = {
  message: string;
};

export const Chat = () => {
  const [chat, setChat] = useState<ChatMessage | null>(null);
  const { control, handleSubmit } = useForm<any>();
  const form = useForm<any>();

  const onSubmit = async (data: any) => {
    try {
      const chatResponse = await ChatCompletion(data.message);
      setChat({
        role: chatResponse.choices[0].message.role,
        content: chatResponse.choices[0].message.content || "", // Handle null content
      });
    } catch (error) {
      console.error("Failed to fetch chat:", error);
    }
  };
  const x = async (data:any) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <FormField
          control={control}
          name="message"
          defaultValue=""
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">Message</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Your message" type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button type="submit" onClick={handleSubmit(onSubmit)}>
          Send message
        </button>
      </Form>
            <br />
            <p className="">{chat?.content}</p>
    </div>
  );
};
