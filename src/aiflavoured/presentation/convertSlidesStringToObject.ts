"use server";
import { aiSlides } from "./aiSlides";
import { getSlidesDataFromAi2 } from "./bogus/getSlidesDataFromAiCopy";

interface Slides {
  titleSlide?: {
    title: string;
    body: string[] | string;
  };
  titleAndContent?: {
    title: string;
    body: string[] | string;
  };
  sectionHeader?: {
    title: string;
    body: string[] | string;
  };
  twoContent?: {
    title: string;
    content: string[] | string;
    content2: string[] | string;
  };
  comparison?: {
    title: string;
    subheading: string;
    subheading2: string;
    content: string[] | string;
    content2: string[] | string;
  };
  titleOnly?: {
    title: string;
    picture?: string;
  };
  blank?: {
    picture: string;
  };
  contentWithCaption?: {
    title: string;
    content: string[] | string;
    caption: string;
  };
  pictureWithCaption?: {
    title: string;
    picture: string;
    caption: string;
  };
}

type Presentation = Slides[];

export const convertSlidesStringToObject = async (
  slides: string
): Promise<Presentation> => {
  console.log(JSON.parse(slides) as Presentation);
  if (typeof slides === "string") {
    return JSON.parse(slides) as Presentation;
  } else {
    return slides;
  }
};