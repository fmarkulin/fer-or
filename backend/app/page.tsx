"use client";

import Readme from "@/components/Readme";
import { Button } from "@/components/ui/button";
import { storage } from "@/data/firebase";
import { getBlob, ref } from "firebase/storage";
import { Download } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const download = (format: "json" | "csv") => {
  getBlob(ref(storage, `books.${format}`))
    .then((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `books.${format}`;
      a.click();
      URL.revokeObjectURL(url);
    })
    .catch(() => {
      toast.error("Došlo je do pogreške");
    });
};

export default function Home() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (!error) return;
    if (error === "unauthorized") toast.error("Niste prijavljeni");
    else toast.error("Došlo je do pogreške");
  }, [error]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center grow">
      <h1 className="text-4xl font-bold">
        Dobrodošli na skup podataka o knjigama i njihovim autorima
      </h1>
      <Readme />
      <h2 className="text-2xl font-bold">Preuzmite skup podataka</h2>
      <div className="flex font-mono gap-2">
        <Button
          variant={"ghost"}
          className="text-xl active:scale-95"
          asChild
          onClick={async () => await download("json")}
        >
          <span>
            <Download className="mr-2 w-5 h-5" /> JSON
          </span>
        </Button>
        <Button
          variant={"ghost"}
          className="text-xl active:scale-95"
          asChild
          onClick={async () => await download("csv")}
        >
          <span>
            <Download className="mr-2 w-5 h-5" /> CSV
          </span>
        </Button>
      </div>
    </div>
  );
}
