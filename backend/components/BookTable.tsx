import { BookExport } from "@/models/BookExport";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import BookRow from "./BookRow";

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

interface BookTableProps {
  books: BookExport[];
}

export default function BookTable({ books }: BookTableProps) {
  return (
    <Table id="tablica">
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
        {books.map((book) => (
          <BookRow key={book.key} book={book} />
        ))}
      </TableBody>
    </Table>
  );
}
