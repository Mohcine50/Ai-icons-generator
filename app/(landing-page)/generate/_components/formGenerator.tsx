"use client";
import React, { FC } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import clsx from "clsx";
import { TStyle } from "@/types/types";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addPrompt, fetchPrompts } from "@/actions/promptActions";
import { Toast } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { TGeneratedImages } from "../page";
import { useRouter } from "next/navigation";
import { Router } from "next/router";

const formSchema = z.object({
  character: z
    .string()
    .min(2, {
      message: "Your username must be atleast 6 chars",
    })
    .max(50),
  style: z.string(),
  color: z.string(),
  quantity: z.string(),
});

const styles: TStyle[] = [
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
];

const colors: string[] = [
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

type Props = {
  setGeneratedImages: any;
  setShowImages: any;
};

const FormGenerator = ({ setGeneratedImages, setShowImages }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      character: "",
      color: "",
      style: "",
      quantity: "1",
    },
  });

  const { toast } = useToast();
  const route = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const char = values.character;
    const style = values.style;
    const color = values.color;
    const quantity = Number(values.quantity);

    try {
      const result = await addPrompt({
        char,
        style,
        color,
        quantity,
      });
      if (result.error) {
        toast({
          title: "Icons Generated",
          description: result.error,
        });
      } else {
        const gImage: TGeneratedImages = {
          prompt: { char, style, color, quantity },
          images: result.images,
        };
        setGeneratedImages(gImage);
        setShowImages(true);
        route.refresh();
      }
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      // Handle unexpected errors here
    }

    /* addPrompt({
      char,
      style,
      color,
      quantity,
    })
      .then((data) => {
        toast({
          title: "Icons Generated",
          description: "Your Icons Has been generated successfuly",
        });
        const gImage: TGeneratedImages = {
          prompt: { char, style, color, quantity },
          images: data?.images,
        };
        setGeneratedImages(gImage);
        setShowImages(true);
      })
      .catch((Error) => {
        console.log(JSON.stringify(Error));
      }); */
  }

  return (
    <div className="flex flex-col justify-center w-full items-center">
      <div className="px-4 py-2 max-w-lg ">
        <h1 className="text-2xl text-center font-bold mt-5 p-2">
          Start generate your icon
        </h1>
        <p className="text-medium text-center font-medium  my-2 p-2">
          Your results may vary. We are working on fine tuning results for each
          style.
        </p>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* this input field  For Charcter*/}
            <FormField
              control={form.control}
              name="character"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>1- Character</FormLabel>
                  <FormControl>
                    <Input placeholder="Character" {...field} />
                  </FormControl>
                  <FormMessage className="text-green-500" />
                </FormItem>
              )}
            />
            {/* this radio buttons field for Color*/}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>2- Chose your main Color:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-2 flex-wrap space-y-1"
                    >
                      {colors.map((color, idx) => {
                        return (
                          <FormItem
                            className="flex items-center space-x-3 space-y-0"
                            key={idx}
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={color}
                                className="sr-only peer"
                                id={color}
                              />
                            </FormControl>
                            <FormLabel
                              className={clsx(
                                "font-normal w-14 h-14 appearance-none rounded-lg px-[1.2rem] py-[1rem] cursor-pointer",
                                form.getValues().color === color
                                  ? "opacity-100 scale-110 transform shadow-md"
                                  : "hover:opacity-75 opacity-50"
                              )}
                              htmlFor={color}
                              style={{ background: color }}
                            />
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* this radio buttons field for Style*/}
            <FormField
              control={form.control}
              name="style"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>2- Chose your main Style:</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex gap-2 flex-wrap space-y-1"
                    >
                      {styles.map((style, idx) => {
                        return (
                          <FormItem
                            className="flex items-center space-x-3 space-y-0 flex-col"
                            key={idx}
                          >
                            <FormControl>
                              <RadioGroupItem
                                value={style.name}
                                className="sr-only peer"
                                id={style.name}
                              />
                            </FormControl>
                            <FormLabel
                              className={clsx(
                                "font-normal w-14 h-14 appearance-none rounded-lg cursor-pointer overflow-hidden",
                                form.getValues().style === style.name
                                  ? "opacity-100 scale-110 transform shadow-md"
                                  : "hover:opacity-75 opacity-50"
                              )}
                              htmlFor={style.name}
                              style={{ background: "white" }}
                            >
                              <Image
                                alt={style.name}
                                src="/metallic.png"
                                width={56}
                                height={56}
                              />
                            </FormLabel>
                            <h1 className=" text-xs font-light text-center mt-2">
                              {style.name}
                            </h1>
                          </FormItem>
                        );
                      })}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* this select field for icons quantity*/}
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3- Quantity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Icons quantity" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[...Array<number>(10).keys()].map((number) => (
                        <SelectItem
                          value={(number + 1).toString()}
                          key={number}
                        >
                          {number + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="block w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default FormGenerator;
