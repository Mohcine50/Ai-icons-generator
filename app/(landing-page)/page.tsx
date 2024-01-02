import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen flex flex-col justify-center items-center gap-5 py-10">
      <h1 className="text-3xl font-bold text-indigo-600">Icons Generator</h1>
      <p>Icons generator using AI built using OpenAi with dall-e Model</p>
      <Link href="/generate">
        <Button>Try Now</Button>
      </Link>
    </main>
  );
}
