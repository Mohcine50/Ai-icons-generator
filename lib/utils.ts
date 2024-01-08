import { TStyle } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const styles: TStyle[] = [
  {
    name: "Metallic",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Polygon",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Clay",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Gradient",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Flat",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Illustrated",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Minimalistic",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Hand Drawn",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "Water Color",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
  {
    name: "sticker",
    image:
      "https://www.icongeneratorai.com/static/styles/dall-e-2/metallic.png",
  },
];

export const styleData: Record<string, string> = {
  sticker:
    "sticker, vibrant sticker art, cute, playful, colorful, eye-catching",
  "Water Color": "watercolor, artistic, traditional, painting",
  "Hand Drawn":
    "hand-crafted, sketch, artistic, intricately detailed, expressively crafted, whimsical doodles",
  Minimalistic: "minimalistic, simple, clean, modern",
  Illustrated: "illustrated, detailed, storytelling, narrative",
  Flat: "flat design, 2D, simple, geometric",
  Gradient:
    "2D vector art, gradient, centred, artstation, digital illustration",
  Clay: "cute, 3D clay render, artstation",
  Polygon:
    "vector art, symmetrical, digital painting, low poly, artstation, centred",
};

export const colors: string[] = [
  "blue",
  "red",
  "orange",
  "purple",
  "yellow",
  "pink",
  "cyan",
  "green",
  "teal",
  "black",
  "lime",
  "maroon",
  "navy",
  "gold",
  "silver",
  "indigo",
  "magenta",
  "olive",
  "aqua",
  "coral",
  "violet",
  "salmon",
  "chartreuse",
];
