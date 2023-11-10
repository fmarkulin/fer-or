import { Table } from "lucide-react";
import { TableCell, TableRow } from "./ui/table";
import { BookExport } from "@/models/BookExport";

interface BookRowProps {
  book: BookExport;
}

export default function BookRow({ book }: BookRowProps) {
  return (
    <TableRow>
      <TableCell>{book.last_modified}</TableCell>
      <TableCell>{book.publishers}</TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>
        {book.authors.map((author) => `${author ? author.key : ""},`)}
      </TableCell>
      <TableCell>
        {book.authors.map((author) => `${author ? author.type : ""},`)}
      </TableCell>
      <TableCell>
        {book.authors.map((author) => `${author ? author.revision : ""},`)}
      </TableCell>
      <TableCell>
        {book.authors.map((author) => `${author ? author.last_modified : ""},`)}
      </TableCell>
      <TableCell>
        {book.authors.map((author) => `${author ? author.name : ""},`)}
      </TableCell>
      <TableCell>{book.publish_date}</TableCell>
      <TableCell>{book.type}</TableCell>
      <TableCell>{book.key}</TableCell>
      <TableCell>{book.subjects}</TableCell>
      <TableCell>{book.latest_revision}</TableCell>
      <TableCell>{book.revision}</TableCell>
      <TableCell>{book.number_of_pages}</TableCell>
    </TableRow>
  );
}
