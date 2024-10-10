"use client";

import { FC, useRef, useState } from "react";
import { Icons } from "./ui/Icons";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import React from "react";
import Link from "next/link";
import { Input } from "./ui/input";

import {
  Search,
  ShoppingCart,
  MapPin,
  ChevronDown,
  UsersRound,
  Store,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useOnClickOutside } from "../hooks/use-on-click-outside";
import ShowSearch from "./ShowSearch";
import { Button } from "./ui/button";

import { AuthType } from "@/auth";
import Profile from "./User";
import GeoSearch from "./GeoSearch";

interface NavbarProps {
  session: AuthType | null;
}

type ContentProps = {
  id: number;
  alt: string;
  img: string;
  href: string;
};

const Navbar: FC<NavbarProps> = ({ session }) => {
  const [isOpenSearch, setIsOpenSearch] = useState<boolean | null>(false);

  const navRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(navRef, () => setIsOpenSearch(null));

  const listContent: {
    id: number;
    nama: string;
    content: Array<ContentProps>;
  }[] = [
    {
      id: 1,
      nama: "Featured",
      content: [
        {
          id: 1,
          alt: "promo",
          img: "hero/img/promo.png",
          href: "/",
        },
        {
          id: 2,
          alt: "Layanan Tokopedia",
          img: "hero/img/promo.png",
          href: "/",
        },
        {
          id: 3,
          alt: "Tokopedia Card",
          img: "hero/img/promo.png",
          href: "/",
        },
      ],
    },
    {
      id: 2,
      nama: "Tokopedia Keuangan",
      content: [
        {
          id: 1,
          alt: "Kebutuhan Pembayaran",
          img: "hero/img/promo.png",
          href: "/",
        },
      ],
    },
    {
      id: 3,
      nama: "Halal Corner",
      content: [
        {
          id: 1,
          alt: "Makanan sehat",
          img: "hero/img/promo.png",
          href: "/",
        },
      ],
    },
    {
      id: 4,
      nama: "Lain - lain",
      content: [
        {
          id: 1,
          alt: "Token listrik",
          img: "hero/img/promo.png",
          href: "/",
        },
      ],
    },
  ];
  return (
    <div className="flex mt-2 flex-col border-b border-gray-400/20">
      <div className="w-full flex gap-4 items-center">
        <Link href="/">
          <Icons.Logo className="w-44" />
        </Link>
        <section id="kategori">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger icons>Kategori</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <Tabs defaultValue={listContent[0].nama} className="w-full">
                    <TabsList className={cn("bg-white py-6 px-4")}>
                      {listContent.map((item) => (
                        <TabsTrigger
                          key={item.id}
                          className="hover:text-green-500 focus:text-green-500 max-w-full"
                          value={item.nama}
                        >
                          {item.nama}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                    <Separator />
                    {listContent.map((item, index) => (
                      <React.Fragment key={index}>
                        <TabsContent className="p-4" value={item.nama}>
                          <p className="text-lg font-semibold mb-4">
                            {item.nama}
                          </p>
                          <span className="flex gap-x-10">
                            {item.content.map((content) => (
                              <Link
                                href={content.href}
                                className="flex gap-x-2"
                                key={content.id}
                              >
                                <img
                                  src={content.img}
                                  className="max-w-10 h-auto"
                                  alt={content.alt}
                                />
                                <p className="font-semibold">{content.alt}</p>
                              </Link>
                            ))}
                          </span>
                        </TabsContent>
                      </React.Fragment>
                    ))}
                  </Tabs>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </section>
        <div id="search" className="flex w-full relative" ref={navRef}>
          <Search className="absolute top-2 left-2 text-gray-500 w-5" />
          <Input
            onClick={() => setIsOpenSearch(true)}
            type="text"
            placeholder="Cari di Tokopedia"
            className="min-w-min px-8 py-5"
          />
          {/* show search modal */}
          {isOpenSearch ? (
            <Card className="absolute top-12 px-4 py-1 z-10">
              <CardHeader>
                <CardTitle className="text-lg">Pencarian populer</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-4">
                  <ShowSearch />
                </div>
              </CardContent>
            </Card>
          ) : null}
        </div>
        <div className="flex">
          {/* show admin dashboard */}
          {/* {session?.user && (
            <section id="admin">
              <Link href="/admin">
                <Button variant="ghost" title="admin dashboard">
                  <UsersRound className="w-5 h-5" />
                </Button>
              </Link>
            </section>
          )} */}
          <section id="cart">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem className="relative">
                  <NavigationMenuTrigger>
                    <Button variant="ghost" className="w-9 h-9 p-0">
                      <ShoppingCart className="w-5" />
                    </Button>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="p-8">
                    <div className="flex justify-center flex-col p-6 w-96">
                      <strong>Wah, keranjang belanjamu kosong</strong>
                      <p className="text-gray-500 mb-5">
                        Yuk, isi dengan barang-barang impianmu!
                      </p>
                      <Button variant="outline">Mulai Belanja</Button>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </section>
        </div>
        <Separator orientation="vertical" className="h-8" />
        {session?.user && (
          <section id="toko">
            <Link href="/myshop">
              <Button variant="ghost" className="flex gap-x-2">
                <Store className="w-5 h-5" />
                Toko
              </Button>
            </Link>
          </section>
        )}
        <section id="account" className="flex gap-x-4">
          {session ? (
            <Profile session={session} />
          ) : (
            <>
              <Link href={"/register"}>
                <Button variant="outline">Masuk</Button>
              </Link>

              <Link href={"/register"}>
                <Button>Daftar</Button>
              </Link>
            </>
          )}
        </section>
      </div>
      <div className="flex justify-end mb-1">
        <GeoSearch session={session} />
      </div>
    </div>
  );
};

export default Navbar;
