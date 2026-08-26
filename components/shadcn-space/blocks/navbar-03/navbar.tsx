"use client";

import { useState } from "react";
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

const FacebookIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

type NavItem = (typeof nav)[number];
type NavItemWithChildren = Extract<NavItem, { children: readonly unknown[] }>;

function linkColumns<T>(items: readonly T[]) {
  const colCount = items.length >= 6 ? 3 : items.length >= 3 ? 2 : 1;
  const perCol = Math.ceil(items.length / colCount);
  return Array.from({ length: colCount }, (_, index) =>
    items.slice(index * perCol, (index + 1) * perCol),
  ).filter((column) => column.length > 0);
}

const MegaMenuPanel = ({ item }: { item: NavItemWithChildren }) => {
  const columns = linkColumns(item.children);

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_60px_-24px_rgba(56,69,47,0.45)]">
      <div
        className={cn(
          "grid gap-8 p-7 sm:p-8",
          columns.length === 1 && "md:grid-cols-[minmax(0,1fr)_18rem]",
          columns.length === 2 && "md:grid-cols-[repeat(2,minmax(0,1fr))_20rem]",
          columns.length >= 3 && "md:grid-cols-[repeat(3,minmax(0,1fr))_20rem]",
        )}
      >
        {columns.map((column, index) => (
          <ul key={index} className="flex min-w-0 flex-col gap-1">
            {column.map((child) => (
              <li key={child.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={child.href}
                    className="block rounded-lg px-1 py-2.5 font-heading text-[15px] font-medium text-forest/85 transition-colors hover:bg-transparent hover:text-forest"
                  >
                    {child.label}
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        ))}

        <NavigationMenuLink asChild>
          <Link
            href={item.href}
            className="flex min-h-56 flex-col rounded-2xl bg-[#f3f1ec] p-5 transition-colors hover:bg-[#efece6]"
          >
            <span className="font-heading text-[11px] font-semibold tracking-[0.14em] text-forest/45 uppercase">
              More
            </span>
            <span className="mt-1 font-heading text-xl font-semibold leading-snug tracking-tight text-forest">
              {item.featured.title}
            </span>
            <div className="mt-auto aspect-[16/10] overflow-hidden rounded-xl bg-olive/15">
              <img
                src={item.featured.image}
                alt={item.featured.alt}
                className="!h-full w-full object-cover"
              />
            </div>
          </Link>
        </NavigationMenuLink>
      </div>
    </div>
  );
};

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";
  const overHero = isHome;

  const itemBase =
    "inline-flex h-10 items-center whitespace-nowrap rounded-full px-2.5 py-0 font-heading text-sm font-semibold tracking-tight outline-none transition-colors xl:px-3.5";

  const trigger = cn(
    itemBase,
    "!bg-transparent [&_svg]:top-0",
    overHero
      ? "!text-white hover:bg-white/15 hover:!text-white data-[state=open]:bg-white/10 data-[state=open]:!text-white data-[state=open]:hover:bg-white/15 data-[state=open]:hover:!text-white focus:bg-white/10 focus:!text-white focus-visible:ring-white/40 [&>svg]:!text-white"
      : "text-forest/85 hover:bg-forest/5 hover:text-forest data-[state=open]:bg-forest/5 data-[state=open]:hover:bg-forest/10 data-[state=open]:hover:text-forest focus:bg-forest/5 focus-visible:ring-forest/30 [&>svg]:text-forest/70",
  );

  const linkCls = cn(
    itemBase,
    overHero
      ? "!text-white hover:bg-white/15 hover:!text-white focus:!text-white"
      : "text-forest/85 hover:bg-forest/5 hover:text-forest",
  );

  return (
    <header
      className={cn(
        isHome ? "home-header absolute inset-x-0 top-0" : "sticky top-0",
        "z-50 w-full transition-all duration-300",
        overHero
          ? "bg-transparent"
          : "border-b border-forest/10 bg-cream/95 backdrop-blur-md",
      )}
    >
      {!isHome && (
      <nav
        aria-label="Utility navigation"
        className="hidden bg-olive text-forest lg:block"
      >
        <div className="mx-auto flex min-h-11 w-full max-w-7xl items-center justify-between gap-x-8 px-6 sm:px-10 lg:px-8">
          <a
            href={`tel:${site.phoneTel}`}
            aria-label={`Call ${site.name} at ${site.phoneDisplay}`}
            className="inline-flex min-h-8 items-center rounded-full px-2 font-heading text-sm font-semibold tracking-wide no-underline transition-colors hover:bg-forest/10"
          >
            {site.phoneDisplay}
          </a>
          <div className="flex items-center gap-2.5">
            <a
              href={site.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Facebook (opens in a new tab)"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full no-underline transition-colors hover:bg-forest/10"
            >
              <FacebookIcon />
            </a>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit us on Instagram (opens in a new tab)"
              className="inline-flex h-8 w-8 items-center justify-center rounded-full no-underline transition-colors hover:bg-forest/10"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </nav>
      )}

      <nav className="relative mx-auto grid h-16 w-full max-w-7xl min-w-0 grid-cols-[4rem_minmax(0,1fr)_auto] items-center gap-3 px-6 sm:h-[4.5rem] sm:grid-cols-[4.5rem_minmax(0,1fr)_auto] sm:px-10 lg:px-8">
        <Link
          href="/"
          className="flex h-9 w-12 shrink-0 items-center sm:h-11 sm:w-14"
        >
          <img
            src={overHero ? site.media.logoOnDark : site.media.logo}
            alt={site.name}
            width={300}
            height={300}
            className="block h-full w-auto max-w-[12rem] object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]"
          />
        </Link>

        <NavigationMenu
          className="hidden min-w-0 max-w-none justify-center !static lg:flex"
          viewport={false}
        >
          <NavigationMenuList className="flex flex-nowrap items-center justify-center gap-0.5 xl:gap-1.5">
            {nav.map((item) => (
              <NavigationMenuItem key={item.label} className="static">
                {"children" in item && item.children ? (
                  <NavigationMenuTrigger
                    className={cn(
                      "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full px-2.5 py-0 font-heading text-sm font-semibold leading-none tracking-tight outline-none transition-colors xl:px-3.5",
                      trigger,
                    )}
                  >
                    {item.label}
                  </NavigationMenuTrigger>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={cn(
                        "inline-flex h-10 items-center justify-center whitespace-nowrap rounded-full px-2.5 py-0 font-heading text-sm font-semibold leading-none tracking-tight transition-colors xl:px-3.5",
                        linkCls,
                      )}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                )}
                {"children" in item && item.children && (
                  <NavigationMenuContent className="left-0 right-0 z-50 mt-2 w-full !overflow-visible !border-0 !bg-transparent p-0 !shadow-none md:w-full">
                    <MegaMenuPanel item={item} />
                  </NavigationMenuContent>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="hidden shrink-0 items-center gap-2.5 lg:flex">
          <a
            href={site.booking.header}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center whitespace-nowrap rounded-full bg-olive px-4 font-heading text-sm font-semibold !text-white transition-colors hover:bg-forest hover:!text-white"
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
                className="inline-flex h-11 items-center justify-center rounded-full bg-olive px-6 font-heading text-sm font-semibold !text-white transition-colors hover:bg-forest hover:!text-white"
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