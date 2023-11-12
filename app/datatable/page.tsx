"use client";

import BookTable from "@/components/BookTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getBooks } from "@/data/database";
import { BookExport } from "@/models/BookExport";
import { Download, Link, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const searchAtributes = [
  {
    value: "title",
    label: "Naslov",
  },
  {
    value: "key",
    label: "Ključ",
  },
  {
    value: "author_name",
    label: "Imena autora",
  },
  {
    value: "publisher",
    label: "Nakladnici",
  },
  {
    value: "subject",
    label: "Subjekti",
  },
  {
    value: "number_of_pages",
    label: "Broj stranica",
  },
  {
    value: "publish_date",
    label: "Datum objave",
  },
  {
    value: "last_modified",
    label: "Zadnje uređivano",
  },
  {
    value: "latest_revision",
    label: "Zadnja revizija",
  },
  {
    value: "revision",
    label: "Revizija",
  },
  {
    value: "author_key",
    label: "Ključ autora",
  },
  {
    value: "author_type",
    label: "Tip autora",
  },
  {
    value: "author_revision",
    label: "Revizija autora",
  },
  {
    value: "author_last_modified",
    label: "Zadnje uređivanje autora",
  },
  {
    value: "type",
    label: "Tip knjige",
  },
];

const FormSchema = z.object({
  atribut: z.string({
    required_error: "Molimo odaberite polje za pretragu",
  }),
  pretraga: z.string(),
});

export default function DatatablePage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      atribut: "wildcard",
      pretraga: "",
    },
  });

  const [data, setData] = useState<BookExport[] | undefined>(undefined);
  const [filteredData, setFilteredData] = useState<BookExport[] | undefined>(
    undefined
  );

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
        setFilteredData(books);
      } catch (error) {
        router.push("/");
      }
    })();
  }, []);

  useEffect(() => {
    const select = document.getElementsByName("atribut")[0];
    if (!select) return;
    document.getElementsByName("atribut")[0].id = "atribut";
  }, []);

  function onSubmit(formData: z.infer<typeof FormSchema>) {
    if (!data) return;
    const filtered = data.filter((book) => {
      if (formData.pretraga === "") return true;
      if (formData.atribut === "wildcard") {
        return Object.values(book).some((value) => {
          if (typeof value === "string") {
            return value
              .toLowerCase()
              .includes(formData.pretraga.toLowerCase());
          } else if (typeof value === "number") {
            return value === Number(formData.pretraga);
          } else if (Array.isArray(value)) {
            return value.some((v) => {
              if (v === undefined) return;
              if (typeof v === "string") {
                return v
                  .toLowerCase()
                  .includes(formData.pretraga.toLowerCase());
              } else if ("key" in v) {
                // author
                return Object.values(v).some((v) => {
                  if (typeof v === "string") {
                    return v
                      .toLowerCase()
                      .includes(formData.pretraga.toLowerCase());
                  } else if (typeof v === "number") {
                    return v === Number(formData.pretraga);
                  }
                  return false;
                });
              }
            });
          }
        });
      } else if (formData.atribut === "publisher") {
        return book.publishers.some((publisher) => {
          if (typeof publisher === "string") {
            return publisher
              .toLowerCase()
              .includes(formData.pretraga.toLowerCase());
          }
          return false;
        });
      } else if (formData.atribut === "subject") {
        return book.subjects.some((subject) => {
          if (typeof subject === "string") {
            return subject
              .toLowerCase()
              .includes(formData.pretraga.toLowerCase());
          }
          return false;
        });
      } else if (formData.atribut === "author_name") {
        return book.authors.some((author) => {
          if (!author) return false;
          return author.name
            .toLowerCase()
            .includes(formData.pretraga.toLowerCase());
        });
      } else if (formData.atribut === "author_key") {
        return book.authors.some((author) => {
          if (!author) return false;
          return author.key
            .toLowerCase()
            .includes(formData.pretraga.toLowerCase());
        });
      } else if (formData.atribut === "author_type") {
        return book.authors.some((author) => {
          if (!author) return false;
          return author.type
            .toLowerCase()
            .includes(formData.pretraga.toLowerCase());
        });
      } else if (formData.atribut === "author_revision") {
        return book.authors.some((author) => {
          if (!author) return false;
          return author.revision === Number(formData.pretraga);
        });
      } else if (formData.atribut === "author_last_modified") {
        return book.authors.some((author) => {
          if (!author) return false;
          return author.last_modified
            .toLowerCase()
            .includes(formData.pretraga.toLowerCase());
        });
      } else if (formData.atribut === "type") {
        return book.type
          .toLowerCase()
          .includes(formData.pretraga.toLowerCase());
      } else if (formData.atribut === "revision") {
        return book.revision === Number(formData.pretraga);
      } else if (formData.atribut === "last_modified") {
        return book.last_modified
          .toLowerCase()
          .includes(formData.pretraga.toLowerCase());
      } else if (formData.atribut === "latest_revision") {
        return book.latest_revision === Number(formData.pretraga);
      } else if (formData.atribut === "publish_date") {
        return book.publish_date
          .toLowerCase()
          .includes(formData.pretraga.toLowerCase());
      } else if (formData.atribut === "number_of_pages") {
        return book.number_of_pages === Number(formData.pretraga);
      } else if (formData.atribut === "key") {
        return book.key.toLowerCase().includes(formData.pretraga.toLowerCase());
      } else if (formData.atribut === "title") {
        return book.title
          .toLowerCase()
          .includes(formData.pretraga.toLowerCase());
      }
      return false;
    });
    setFilteredData(filtered);
  }

  const downloadJSON = () => {
    if (!filteredData || filteredData.length === 0) {
      toast.error("No data to download!");
      return;
    }

    const blob = new Blob([JSON.stringify(filteredData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_books.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCommas = (input: any) => {
    if (typeof input === "string" && (input as string).includes(","))
      return `"${input}"`;
    else return input;
  };

  const downloadCSV = () => {
    if (!filteredData || filteredData.length === 0) {
      toast.error("No data to download!");
      return;
    }

    const header =
      "last_modified,publisher,title,author_key,author_type,author_revision,author_last_modified,author_name,publish_date,type,key,subject,latest_revision,revision,number_of_pages\n";
    const rows = filteredData.flatMap((book) =>
      book.publishers.flatMap((publisher) =>
        book.authors.flatMap((author) =>
          book.subjects.map((subject) => [
            handleCommas(book.last_modified),
            handleCommas(publisher),
            handleCommas(book.title),
            handleCommas(author?.key),
            handleCommas(author?.type),
            handleCommas(author?.revision),
            handleCommas(author?.last_modified),
            handleCommas(author?.name),
            handleCommas(book.publish_date),
            handleCommas(book.type),
            handleCommas(book.key),
            handleCommas(subject),
            handleCommas(book.latest_revision),
            handleCommas(book.revision),
            handleCommas(book.number_of_pages),
          ])
        )
      )
    );
    const csv = header + rows.map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], {
      type: "text/csv",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_books.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!data || !filteredData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-wrap gap-3 justify-space-between items-center"
        >
          {/* <FormField
            control={form.control}
            name="atribut"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Polje za pretragu</FormLabel>
                <select {...field} id="atribut">
                  {searchAtributes.map((atribut) => (
                    <option key={atribut.value} value={atribut.value}>
                      {atribut.label}
                    </option>
                  ))}
                </select>
                <FormDescription>
                  Po ovom polju će se vršiti pretraga
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="atribut"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Polje za pretragu</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Odaberite polje za pretragu" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[60vh]">
                    <SelectItem value="wildcard">
                      Sva polja (wildcard)
                    </SelectItem>
                    {searchAtributes.map((atribut) => (
                      <SelectItem key={atribut.value} value={atribut.value}>
                        {atribut.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Po ovom polju će se vršiti pretraga
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pretraga"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Polje za pretragu</FormLabel>
                <FormControl>
                  <Input
                    id="pretraga"
                    placeholder="Unesite vrijednost"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Po ovoj vrijednosti će se pretraživati odabrano polje
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="active:scale-95" type="submit" id="gumb" size="icon">
            <Search />
          </Button>
          <div className="flex font-mono gap-2">
            <Button
              onClick={downloadJSON}
              variant={"ghost"}
              className="text-lg active:scale-95"
            >
              <Download className="mr-2 w-5 h-5" /> JSON
            </Button>
            <Button
              onClick={downloadCSV}
              variant={"ghost"}
              className="text-lg active:scale-95"
            >
              <Download className="mr-2 w-5 h-5" /> CSV
            </Button>
          </div>
        </form>
      </Form>
      <div className="overflow-auto w-full">
        <BookTable books={filteredData} />
      </div>
    </div>
  );
}
