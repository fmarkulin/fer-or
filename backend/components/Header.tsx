"use client";

import Link from "next/link";
import { ModeToggle } from "./ModeToggle";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { useUser } from "@auth0/nextjs-auth0/client";
import { ShieldEllipsis, ShieldX } from "lucide-react";
import { Button } from "./ui/button";
import refreshDumps from "@/lib/refreshDumps";
import toast from "react-hot-toast";

const handleDumpRefresh = async () => {
  const loadingToast = toast.loading("Osvježavanje preslika...");
  try {
    await refreshDumps();
    toast.dismiss(loadingToast);
    toast.success("Preslike osvježene.");
  } catch (error) {
    toast.dismiss(loadingToast);
    toast.error("Greška pri osvježavanju preslika.");
  }
};

export default function Header() {
  const { user, error, isLoading } = useUser();

  return (
    <header className="sticky bg-inherit top-0 left-0 right-0 z-10 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-8">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href={"/"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Index
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href={"/datatable"} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Datatable
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <NavigationMenu>
          <NavigationMenuList>
            {error ? (
              <NavigationMenuItem>
                <ShieldX className="text-red-500" />
              </NavigationMenuItem>
            ) : isLoading ? (
              <NavigationMenuItem>
                <ShieldEllipsis className="text-blue-500" />
              </NavigationMenuItem>
            ) : user ? (
              <>
                <NavigationMenuItem>
                  <Link href={"/user"} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Korisnički profil
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Button variant="ghost" onClick={handleDumpRefresh}>
                    Osvježi preslike
                  </Button>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="/api/auth/logout"
                  >
                    Odjava
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            ) : (
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                href="/api/auth/login"
              >
                Prijava
              </NavigationMenuLink>
            )}
            <NavigationMenuItem>
              <ModeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
