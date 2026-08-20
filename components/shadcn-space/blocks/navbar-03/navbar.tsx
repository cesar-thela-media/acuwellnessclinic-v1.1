"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
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

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const overHero = pathname === "/" && !scrolled;

  const trigger = overHero
    ? "text-white hover:bg-white/15"
    : "text-forest/75 hover:bg-forest/5 hover:text-forest";

  const linkCls = overHero
    ? "text-white hover:bg-white/15"
    : "text-forest/70 hover:bg-forest/5 hover:text-forest";

  return (
    <header
      className={cn(
        pathname === "/" ? "fixed inset-x-0 top-0" : "sticky top-0",
        "z-50 w-full transition-all duration-300",
        overHero
          ? "bg-gradient-to-b from-forest/80 via-forest/40 to-transparent"
          : "border-b border-forest/10 bg-cream/95 backdrop-blur-md",
      )}
    >
      <div
        className={cn(
          "hidden bg-charcoal/95 text-white transition-all duration-300 lg:block",
          scrolled ? "max-h-10 py-2.5" : "max-h-0 py-0 overflow-hidden",
        )}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-6 sm:px-10 lg:px-16">
          <a
            href={`tel:${site.phoneTel}`}
            className="font-heading text-sm font-semibold tracking-wide"
          >
            {site.phoneDisplay}
          </a>
          <div className="flex items-center gap-6">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              Facebook
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/85 transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href={site.booking.header}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-olive px-4 py-1.5 text-sm font-semibold text-forest transition-colors hover:bg-white"
            >
              Schedule An Appointment
            </a>
          </div>
        </div>
      </div>

      <nav className="mx-auto flex h-16 w-full max-w-7xl min-w-0 items-center justify-between gap-4 px-6 sm:px-10 sm:h-[4.5rem] lg:px-16">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <img
            src={site.media.logo}
            alt={site.name}
            width={439}
            height={512}
            className={cn(
              "w-auto object-contain",
              overHero ? "h-5 brightness-0 invert sm:h-6" : "h-6",
            )}
          />
        </Link>

        <NavigationMenu className="hidden max-w-none flex-1 lg:flex">
          <NavigationMenuList className="flex flex-nowrap items-center gap-1 xl:gap-2">
            {nav.map((item) => (
              <NavigationMenuItem key={item.label}>
                {"children" in item && item.children ? (
                  <NavigationMenuTrigger
                    className={cn(
                      "group inline-flex h-10 items-center gap-1.5 rounded-full px-3.5 font-heading text-sm font-semibold tracking-tight outline-none transition-colors xl:px-4",
                      trigger,
                    )}
                  >
                    {item.label}
                    <ChevronDown
                      size={14}
                      aria-hidden="true"
                      className="opacity-60 transition-transform duration-200 group-data-[state=open]:rotate-180"
                    />
                  </NavigationMenuTrigger>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-10 items-center rounded-full px-3.5 font-heading text-sm font-semibold tracking-tight transition-colors xl:px-4",
                        linkCls,
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                )}
                {"children" in item && item.children && (
                  <NavigationMenuContent>
                    <div className="w-56 rounded-2xl border border-forest/10 bg-white p-2 shadow-[0_20px_50px_-20px_rgba(44,58,40,0.35)]">
                      {item.children.map((child) => (
                        <NavigationMenuLink key={child.label} asChild>
                          <Link
                            href={child.href}
                            className="block rounded-xl px-3 py-2 font-heading text-sm font-medium text-forest/75 transition-colors hover:bg-forest/5 hover:text-forest"
                          >
                            {child.label}
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={`tel:${site.phoneTel}`}
            className={cn(
              "font-heading text-sm font-semibold tracking-wide transition-colors",
              overHero ? "text-white/85 hover:text-white" : "text-forest hover:text-forest/70",
            )}
          >
            {site.phoneDisplay}
          </a>
          <a
            href={site.booking.header}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full bg-olive px-5 font-heading text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
          >
            Schedule An Appointment
          </a>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className={cn(
                "inline-flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
                overHero ? "text-white hover:bg-white/10" : "text-forest hover:bg-forest/5",
              )}
              aria-label="Menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[min(24rem,90vw)] bg-cream">
            <SheetHeader>
              <SheetTitle className="font-heading text-forest">{site.name}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col gap-1">
              {nav.map((item) =>
                "children" in item && item.children ? (
                  <Collapsible key={item.label}>
                    <div className="flex items-center">
                      <SheetClose asChild>
                        <Link
                          href={item.href}
                          className="flex-1 rounded-xl px-3 py-3 font-heading text-base font-semibold text-forest transition-colors hover:bg-forest/5"
                        >
                          {item.label}
                        </Link>
                      </SheetClose>
                      <CollapsibleTrigger
                        asChild
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-forest/60 transition-colors hover:bg-forest/5"
                        aria-label={`Toggle ${item.label}`}
                      >
                        <ChevronDown size={16} />
                      </CollapsibleTrigger>
                    </div>
                    <CollapsibleContent className="ml-3 flex flex-col gap-0.5 border-l border-forest/15 pl-4">
                      {item.children.map((child) => (
                        <SheetClose asChild key={child.label}>
                          <Link
                            href={child.href}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-forest/75 transition-colors hover:bg-forest/5 hover:text-forest"
                          >
                            {child.label}
                          </Link>
                        </SheetClose>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : (
                  <SheetClose asChild key={item.label}>
                    <Link
                      href={item.href}
                      className="rounded-xl px-3 py-3 font-heading text-base font-semibold text-forest transition-colors hover:bg-forest/5"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ),
              )}
            </nav>
            <div className="mt-8 flex flex-col gap-4 border-t border-forest/15 pt-6">
              <a
                href={`tel:${site.phoneTel}`}
                className="font-heading text-base font-semibold text-forest"
              >
                {site.phoneDisplay}
              </a>
              <div className="flex items-center gap-5">
                <SheetClose asChild>
                  <a
                    href={site.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-forest/75 hover:text-forest"
                  >
                    Facebook
                  </a>
                </SheetClose>
                <SheetClose asChild>
                  <a
                    href={site.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-forest/75 hover:text-forest"
                  >
                    Instagram
                  </a>
                </SheetClose>
              </div>
              <a
                href={site.booking.header}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center justify-center rounded-full bg-olive px-6 font-heading text-sm font-semibold text-forest transition-colors hover:bg-forest hover:text-white"
              >
                Schedule An Appointment
              </a>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
};

export default Navbar;