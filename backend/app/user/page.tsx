"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUser } from "@auth0/nextjs-auth0/client";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function UserPage() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  const [disable, setDisable] = useState(true);

  useEffect(() => {
    if (isLoading) return;

    if (!isLoading && error) {
      toast.error("Greška prilikom dohvaćanja korisničkih podataka.");
      router.push("/");
    }

    if (!isLoading && !user) {
      toast.error("Niste prijavljeni.");
      router.push("/");
    }

    if (!isLoading && user) {
      setDisable(false);
    }
  }, [isLoading, error, user, router]);

  if (disable || isLoading || error || !user) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 max-w-full">
      <Card className="p-4">
        <CardHeader>
          <CardTitle>
            <Avatar>
              <AvatarImage
                src={user.picture ?? undefined}
                alt={user.name ?? undefined}
              />
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
                  {value!.toString()}
                </code>
              </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
