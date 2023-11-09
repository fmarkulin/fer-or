"use client";

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center grow">
      <h1 className="text-4xl font-bold">Download dataset</h1>
      <div className="flex font-mono gap-2">
        <Button variant={"ghost"} className="text-xl active:scale-95">
          <Download className="mr-2 w-5 h-5" /> JSON
        </Button>
        <Button variant={"ghost"} className="text-xl active:scale-95">
          <Download className="mr-2 w-5 h-5" /> CSV
        </Button>
      </div>
    </div>
  );
}
