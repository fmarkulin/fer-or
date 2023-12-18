import { NextRequest, NextResponse } from "next/server";
import { stringify, parse } from "yaml";
import * as fs from "fs";
import dayjs from "dayjs";

export async function GET(req: NextRequest) {
  console.log(`${dayjs().toISOString()} GET /api/specification`);

  const yaml = fs.readFileSync("./public/openapi.yml", "utf8");
  const yamlParse = parse(yaml);
  const yamlString = stringify(yamlParse);
  return new NextResponse(yamlString, {
    headers: {
      "content-type": "text/yaml;charset=UTF-8",
    },
  });
}
