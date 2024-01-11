import { getSession } from "@auth0/nextjs-auth0";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function UserPage() {
  const session = await getSession();
  if (!session) redirect("/?error=unauthorized");

  const { user } = session;
  console.log(user);

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>
            <Avatar>
              <AvatarImage src={user.picture} alt={user.name} />
              <AvatarFallback>{user.nickname}</AvatarFallback>
            </Avatar>
            <CardDescription>Korisnički podaci</CardDescription>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {Object.entries(user)
            .filter(([key]) => key !== "picture")
            .map(([key, value]) => (
              <div
                key={key}
                className="flex flex-row justify-between gap-4 items-center "
              >
                <span>{key}:</span>
                <code className="bg-secondary text-secondary-foreground p-1 rounded ">
                  {value.toString()}
                </code>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
