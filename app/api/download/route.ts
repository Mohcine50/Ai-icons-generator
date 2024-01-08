import { image } from "@/types/types";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const image = JSON.parse(searchParams.get("image") || "");

  const response = await fetch(image.imageUrl);
  const contentType = response.headers.get("Content-Type");
  const imageBuffer = await response.blob();

  return new Response(imageBuffer, {
    status: 200,
    headers: {
      "Content-Type": "image/png",
      "Content-Disposition": "attachment; filename=" + image.id + ".png",
    },
  });
}
