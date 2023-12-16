import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Separator } from "./ui/separator";

interface ReadmeEntryProps {
  readme: Readme;
}

export default function ReadmeEntry({ readme }: ReadmeEntryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{readme.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {"content" in readme ? (
          "link" in readme ? (
            <Link href={readme.link!} className="underline">
              {readme.content}
            </Link>
          ) : (
            readme.content
          )
        ) : (
          <ul className="space-y-2">
            {readme.list.map((item, i) => (
              <div key={item.key}>
                <li>
                  <span className="font-mono bg-accent text-accent-foreground">
                    {item.key}
                  </span>{" "}
                  - {item.value}
                </li>
                {i !== readme.list.length - 1 && <Separator />}
              </div>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
