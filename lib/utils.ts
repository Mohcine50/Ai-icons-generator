import { TStyle } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const styles: TStyle[] = [
  {
    name: "Metallic",
    image: "/styles/Metallic.png",
  },
  {
    name: "Polygon",
    image: "/styles/polygon.png",
  },
  {
    name: "Clay",
    image: "/styles/clay.png",
  },
  {
    name: "Gradient",
    image: "/styles/gradient.png",
  },
  {
    name: "Flat",
    image: "/styles/flat.png",
  },
  {
    name: "Illustrated",
    image: "/styles/illustrated.png",
  },
  {
    name: "Minimalistic",
    image: "/styles/minimalistic.png",
  },
  {
    name: "Hand Drawn",
    image: "/styles/hand-draw.png",
  },
  {
    name: "Water Color",
    image: "/styles/water-color.png",
  },
  {
    name: "Sticker",
    image: "/styles/sticker.png",
  },
];

export const styleData: Record<string, string> = {
  Metallic:
    "shiny metallic, futuristic, reflective surfaces, modern design, polished aesthetics",
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
