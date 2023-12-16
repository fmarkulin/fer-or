import { Author } from "./Author";

export type BookExport = {
  publishers: string[];
  number_of_pages: number;
  latest_revision: number;
  key: string;
  authors: (Author | undefined)[];
  title: string;
  subjects: string[];
  publish_date: string;
  last_modified: string;
  type: string;
  revision: number;
};
