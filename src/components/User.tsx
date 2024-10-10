"use client";

import {
  ChevronRight,
  CreditCard,
  LogOut,
  Settings,
  User,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { AuthType } from "@/auth";
import { signOut } from "next-auth/react";

export default function Profile({ session }: { session: AuthType | null }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="focus-visible:ring-0 flex gap-x-2">
          <Avatar className="h-7 w-7">
            <AvatarImage
              src={session?.user?.image ?? "https://github.com/shadcn.png"}
              alt={session?.user?.name ?? "img"}
            />
            <AvatarFallback>{session?.user?.name?.[0] ?? "?"}</AvatarFallback>
          </Avatar>
          <p>{session?.user?.name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2">
        <DropdownMenuLabel>
          <div className="flex gap-x-2 py-2 px-3 shadow-md rounded ">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={session?.user?.image ?? "https://github.com/shadcn.png"}
                alt={session?.user?.name ?? "img"}
              />
              <AvatarFallback>{session?.user?.name?.[0] ?? "?"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <p className="text-sm">{session?.user?.name}</p>
              <p className="text-xs text-gray-500/90 font-normal flex gap-x-1 items-center">
                <UserRound className="h-4 w-4" />
                Member silver
                <ChevronRight className="h-4 w-4" />
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Pembelian</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <div
            onClick={() => signOut()}
            className="cursor-pointer flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
