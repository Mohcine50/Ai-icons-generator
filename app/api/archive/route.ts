import { image } from "@/types/types";
import JSZip from "jszip";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const images = JSON.parse(searchParams.get("images") || "");

  const downloads = await Promise.all(
    images.map(async (image: image) => {
      const response = await fetch(image.imageUrl);
      const contentType = response.headers.get("Content-Type");
      const data = await response.arrayBuffer();
      return {
        ...image,
        data,
        type: contentType?.replace("image/", ""),
      };
    })
  );

  const zip = new JSZip();

  downloads.forEach((download, index) => {
    zip.file(`${download.id}.${download.type}`, download.data);
  });

  const collection = await zip.generateAsync({ type: "blob" });

  return new Response(collection, {
    status: 200,
    headers: {
      "Content-Type": "application/zip",
    },
  });
}
