"use client";

import BookRow from "@/components/BookRow";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getBooks } from "@/data/database";
import { BookExport } from "@/models/BookExport";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const header = [
  "Naslov",
  "Ključ",
  "Imena autora",
  "Nakladnici",
  "Subjekti",
  "Broj stranica",
  "Datum objave",
  "Zadnje uređivano",
  "Zadnja revizija",
  "Revizija",
];

export default function DatatablePage() {
  const router = useRouter();

  const [data, setData] = useState<BookExport[] | undefined>(undefined);

  useEffect(() => {
    (async () => {
      const getPromise = getBooks();
      toast.promise(getPromise, {
        loading: "Getting data...",
        success: "Got data!",
        error: "Error getting data!",
      });
      try {
        const books = await getPromise;
        setData(books);
      } catch (error) {
        router.push("/");
      }
    })();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }
  return (
    <Table>
      <TableCaption>Popis knjiga i njihovih informacija</TableCaption>
      <TableHeader>
        <TableRow>
          {header.map((h, i) => (
            <TableHead
              key={h}
              className={i === header.length - 1 ? "text-right" : ""}
            >
              {h}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((book) => (
          <BookRow book={book} />
        ))}
      </TableBody>
    </Table>
  );
}
