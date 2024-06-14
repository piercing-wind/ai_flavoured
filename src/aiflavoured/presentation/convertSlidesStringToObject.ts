"use server";

export const convertSlidesStringToObject = async (
  slides: string | Object 
): Promise<any> => {
  if (typeof slides === "string") {
    return JSON.parse(slides);
  } else {
    return slides;
  }
};