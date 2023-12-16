import { TableCell, TableRow } from "./ui/table";
import { BookExport } from "@/models/BookExport";
import dayjs from "dayjs";
import { Fragment } from "react";

interface BookRowProps {
  book: BookExport;
}

const Tag = ({ children }: { children: string }) => (
  <div className="p-2 m-1 rounded bg-accent text-accent-foreground inline-block">
    {children}
  </div>
);

export default function BookRow({ book }: BookRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">{book.title}</TableCell>
      <TableCell>{book.key}</TableCell>
      <TableCell>
        {book.authors.map((author, i) =>
          author ? (
            <Fragment key={author.key}>
              <Tag>{author.name}</Tag>
            </Fragment>
          ) : null
        )}
      </TableCell>
      <TableCell>
        {book.publishers.map((publisher, i) => (
          <Tag key={publisher}>{publisher}</Tag>
        ))}
      </TableCell>
      <TableCell>
        {book.subjects.map((subject) => (
          <Tag key={subject}>{subject}</Tag>
        ))}
      </TableCell>
      <TableCell>{book.number_of_pages}</TableCell>
      <TableCell>
        {book.publish_date.includes(",")
          ? dayjs(book.publish_date).format("YYYY-MM-DD")
          : dayjs(book.publish_date).format("YYYY")}
      </TableCell>
      <TableCell>
        {dayjs(book.last_modified).format("YYYY-MM-DD HH:mm:ss")}
      </TableCell>
      <TableCell>{book.latest_revision}</TableCell>
      <TableCell>{book.revision}</TableCell>
    </TableRow>
  );
}
