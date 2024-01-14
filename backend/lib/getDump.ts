"use server";

import * as fs from "fs";
import path from "path";

export default async function getDump(format: "csv" | "json") {
  let dump;
  try {
    if (format === "csv") {
      dump = fs.readFileSync(
        path.join(process.cwd(), "public", "books.csv"),
        "utf-8"
      );
    } else {
      dump = fs.readFileSync(
        path.join(process.cwd(), "public", "books.json"),
        "utf-8"
      );
      dump = JSON.parse(dump);
    }

    return dump;
  } catch (e) {
    console.error(e);
    throw new Error("Error getting dump");
  }
}
