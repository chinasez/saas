'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks } from "@/constants";
import { Show, UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";

const MobileNav = () => {
    const pathname = usePathname();


  return (
    <header className="header">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Image
          src="/assets/images/logo-text.svg"
          alt="logo"
          width={180}
          height={28}
        />
      </Link>

      <nav className="flex gap-2">
        <Show when={"signed-in"}>
          <UserButton />
        

            <Sheet>
          <SheetTrigger>
            <Image
              src="/assets/icons/menu.svg"
              alt="menu"
              width={32}
              height={32}
              className="cursor-pointer"
            />
          </SheetTrigger>
          <SheetContent className="sheet-content sm:w-64">
            <>
              <Image
                src="/assets/images/logo-text.svg"
                alt="logo"
                width={152}
                height={23}
                className="m-5"
              />

              <ul className="header-nav_elements">
                {navLinks.map((link) => {
                  const isActive = link.route === pathname;

                  return (
                    <li
                      key={link.route}
                      className={`${ isActive && 
                        'gradient-text'} ml-1 p-18 flex 
                        whitespace-nowrap text-dark-700`}
                    >
                      <Link className="sidebar-link cursor-pointer" href={link.route}>
                        <Image
                          src={link.icon}
                          alt="logo"
                          width={24}
                          height={24}
                          className={`${isActive && "brightness-200"}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          </SheetContent>
            </Sheet>
        </Show>

        <Show when={'signed-out'}>
            <Button asChild className="button bg-purple-gradient bg-cover">
                <Link href='/sign-in'>Login</Link>
            </Button>
        </Show>
      </nav>
    </header>
  );
};

export default MobileNav;
