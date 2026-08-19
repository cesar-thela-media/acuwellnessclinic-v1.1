"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, TextAlignJustify, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { nav, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const barOn = "bg-white/80 backdrop-blur-md";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (pathname !== "/") {
      setScrolled(false);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const overHero = pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "z-50 w-full",
        pathname === "/"
          ? cn("fixed top-0 left-0", scrolled && barOn)
          : cn("sticky top-0", barOn),
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-4 py-2 sm:px-6">
        <Link href="/" className="shrink-0">
          <img
            src={site.media.logo}
            alt={site.name}
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
        </Link>

        <NavigationMenu className="hidden max-w-none lg:flex">
          <NavigationMenuList className="flex flex-nowrap gap-0">
            {nav.map((item) => (
              <NavigationMenuItem key={item.label}>
                {"children" in item && item.children ? (
                  <>
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={cn(
                          "whitespace-nowrap px-1.5 py-1.5 font-heading text-sm font-medium",
                          overHero ? "text-white" : "text-charcoal",
                        )}
                      >
                        {item.label}
                      </Link>
                      <NavigationMenuTrigger
                        className={cn(
                          "h-auto w-auto min-w-0 bg-transparent px-0.5 py-1.5",
                          overHero
                            ? "text-white hover:bg-white/10 hover:text-white"
                            : "text-charcoal",
                        )}
                        aria-label={`${item.label} submenu`}
                      />
                    </div>
                    <NavigationMenuContent className="bg-white p-2">
                      <ul className="flex min-w-52 flex-col">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="block px-3 py-2 font-heading text-sm text-charcoal"
                              >
                                {child.label}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "whitespace-nowrap px-1.5 py-1.5 font-heading text-sm font-medium",
                        overHero ? "text-white" : "text-charcoal",
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={site.social.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("font-heading text-xs", overHero ? "text-white" : "text-charcoal")}
          >
            Facebook
          </a>
          <a
            href={site.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={cn("font-heading text-xs", overHero ? "text-white" : "text-charcoal")}
          >
            Instagram
          </a>
          <Button
            asChild
            className="h-auto rounded-none bg-olive px-4 py-2 font-heading text-sm text-white hover:bg-olive/90"
          >
            <a href={site.booking.header} target="_blank" rel="noopener noreferrer">
              Schedule An Appointment
            </a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn("lg:hidden", overHero ? "text-white" : "text-charcoal")}
              aria-label="Menu"
            >
              {open ? <X /> : <TextAlignJustify />}
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-white">
            <SheetHeader>
              <SheetTitle className="font-heading text-charcoal">{site.name}</SheetTitle>
            </SheetHeader>
            <nav className="mt-4 flex flex-col gap-1">
              {nav.map((item) =>
                "children" in item && item.children ? (
                  <Collapsible key={item.label}>
                    <div className="flex items-center">
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className="flex-1 px-2 py-2 font-heading text-sm text-charcoal"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                      <CollapsibleTrigger
                        className="px-2 py-2 text-charcoal"
                        aria-label={`${item.label} submenu`}
                      >
                        <ChevronDown size={16} />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                      {item.children.map((child) => (
                        <SheetClose asChild key={child.href}>
                          <Link href={child.href} className="block px-4 py-2 font-heading text-sm text-body">
                            {child.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SheetClose asChild key={item.label}>
                    <Link href={item.href} className="px-2 py-2 font-heading text-sm text-charcoal">
                      {item.label}
                    </Link>
                  </SheetClose>
                ),
              )}
            </nav>
            <div className="mt-6 flex flex-col gap-3 px-2">
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" className="font-heading text-sm">
                Facebook
              </a>
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="font-heading text-sm">
                Instagram
              </a>
              <Button asChild className="rounded-none bg-olive font-heading text-white hover:bg-olive/90">
                <a href={site.booking.header} target="_blank" rel="noopener noreferrer">
                  Schedule An Appointment
                </a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
