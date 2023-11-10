"use client";

import Readme from "@/components/Readme";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center grow">
      <h1 className="text-4xl font-bold">
        Dobrodošli na skup podataka o knjigama i njihovim autorima
      </h1>
      <Readme />
      <h2 className="text-2xl font-bold">Preuzmite skup podataka</h2>
      <div className="flex font-mono gap-2">
        <Button variant={"ghost"} className="text-xl active:scale-95" asChild>
          <a href={"/books.json"} download>
            <Download className="mr-2 w-5 h-5" /> JSON
          </a>
        </Button>
        <Button variant={"ghost"} className="text-xl active:scale-95" asChild>
          <a href="/books.csv" download>
            <Download className="mr-2 w-5 h-5" /> CSV
          </a>
        </Button>
      </div>
    </div>
  );
}
