"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
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
type NavChild = { readonly label: string; readonly href: string };

function linkColumns(items: readonly NavChild[]) {
  const colCount = items.length >= 6 ? 3 : items.length >= 3 ? 2 : 1;
  const perCol = Math.ceil(items.length / colCount);
  return Array.from({ length: colCount }, (_, index) =>
    items.slice(index * perCol, (index + 1) * perCol),
  ).filter((column) => column.length > 0);
}

const MegaMenuPanel = ({ item }: { item: NavItemWithChildren }) => {
  const columns = linkColumns(item.children);

  return (
    <div className="overflow-hidden rounded-[14px] bg-white shadow-lg">
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
                    className="block !bg-transparent px-1 py-2.5 font-heading text-[15px] font-medium text-forest/85 transition-colors hover:!bg-transparent hover:text-forest focus:!bg-transparent"
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
            className="flex min-h-56 flex-col !bg-transparent p-0 transition-colors hover:!bg-transparent focus:!bg-transparent"
          >
            <span className="font-heading text-[11px] font-semibold tracking-[0.14em] text-forest/45 uppercase">
              More
            </span>
            <span className="mt-1 font-heading text-xl font-semibold leading-snug tracking-tight text-forest">
              {item.featured.title}
            </span>
            <div className="site-media mt-auto aspect-[16/10] overflow-hidden rounded-[10px] bg-olive/15">
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

      <nav
        aria-label="Primary"
        className="relative mx-auto h-14 w-full max-w-7xl min-w-0 px-4 sm:h-[4.5rem] sm:px-10 lg:px-8"
      >
        <div className="flex items-center justify-start">
          <Link
            href="/"
            className="relative z-20 flex h-14 shrink-0 items-center"
          >
            <img
              src={site.media.logo}
              alt={site.name}
              width={120}
              height={140}
              className="block !h-14 !w-auto max-h-14 object-contain object-left"
            />
          </Link>
        </div>

        <NavigationMenu className="primary-nav-links" viewport={false}>
          <NavigationMenuList className="flex flex-nowrap items-center justify-center gap-1 xl:gap-2">
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

        <div className="flex items-center justify-end gap-2.5">
          <a
            href={site.booking.header}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "hidden h-10 items-center whitespace-nowrap rounded-[14px] border bg-olive px-4 font-heading text-sm font-semibold !text-white transition-colors hover:bg-forest hover:!text-white xl:inline-flex",
              overHero ? "border-white/70" : "border-forest/20",
            )}
          >
            Schedule An Appointment
          </a>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-[14px] border transition-colors xl:hidden",
                  overHero
                    ? "border-white/40 text-white hover:bg-white/10"
                    : "border-forest/15 text-forest hover:bg-forest/5",
                )}
                aria-label="Menu"
              >
                {open ? <X size={20} /> : <Menu size={20} />}
              </button>
            </SheetTrigger>
            <SheetContent
              side="right"
              showCloseButton={false}
              className="flex w-[min(22rem,92vw)] flex-col gap-0 border-l border-forest/10 bg-cream p-0 sm:max-w-sm"
            >
              <SheetHeader className="shrink-0 border-b border-forest/10 bg-white/70 px-5 py-4 text-left">
                <div className="flex items-center justify-between gap-3">
                  <SheetTitle className="sr-only">{site.name}</SheetTitle>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex min-w-0 items-center gap-3"
                  >
                    <img
                      src={site.media.logo}
                      alt=""
                      width={120}
                      height={48}
                      className="h-10 w-auto max-w-[7.5rem] object-contain"
                    />
                    <span className="font-display text-lg font-semibold tracking-tight text-forest">
                      {site.styledName}
                    </span>
                  </Link>
                  <SheetClose asChild>
                    <button
                      type="button"
                      aria-label="Close menu"
                      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] border border-forest/15 text-forest transition-colors hover:bg-forest/5"
                    >
                      <X size={18} />
                    </button>
                  </SheetClose>
                </div>
              </SheetHeader>

              <nav
                className="min-h-0 flex-1 overflow-y-auto px-3 py-4"
                aria-label="Mobile"
              >
                <ul className="flex list-none flex-col gap-1 p-0 m-0">
                  {nav.map((item) =>
                    "children" in item && item.children ? (
                      <li key={item.label}>
                        <Collapsible className="group/item">
                          <div className="flex items-center gap-1 rounded-[14px] hover:bg-white/80">
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className="min-w-0 flex-1 px-3 py-3 font-heading text-[15px] font-semibold tracking-tight text-forest"
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                            <CollapsibleTrigger
                              className="mr-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[12px] text-forest/55 transition-colors hover:bg-forest/5 hover:text-forest [&[data-state=open]>svg]:rotate-180"
                              aria-label={`Toggle ${item.label}`}
                            >
                              <ChevronDown
                                size={18}
                                className="transition-transform duration-200"
                              />
                            </CollapsibleTrigger>
                          </div>
                          <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-out data-[state=open]:animate-in">
                            <ul className="mb-2 ml-3 flex list-none flex-col gap-0.5 border-l-2 border-olive/50 py-1 pl-3 m-0">
                              {item.children.map((child) => (
                                <li key={child.label}>
                                  <SheetClose asChild>
                                    <Link
                                      href={child.href}
                                      className="block rounded-[12px] px-3 py-2.5 text-sm font-medium leading-snug text-forest/70 transition-colors hover:bg-white hover:text-forest"
                                    >
                                      {child.label}
                                    </Link>
                                  </SheetClose>
                                </li>
                              ))}
                            </ul>
                          </CollapsibleContent>
                        </Collapsible>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <SheetClose asChild>
                          <Link
                            href={item.href}
                            className="block rounded-[14px] px-3 py-3 font-heading text-[15px] font-semibold tracking-tight text-forest transition-colors hover:bg-white/80"
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      </li>
                    ),
                  )}
                </ul>
              </nav>

              <div className="mt-auto shrink-0 border-t border-forest/10 bg-white/80 px-5 py-5">
                <a
                  href={`tel:${site.phoneTel}`}
                  className="mb-4 inline-flex items-center gap-2.5 font-heading text-base font-semibold text-forest transition-colors hover:text-olive"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-olive/15 text-olive">
                    <Phone size={16} aria-hidden="true" />
                  </span>
                  {site.phoneDisplay}
                </a>
                <div className="mb-4 flex items-center gap-2.5">
                  <SheetClose asChild>
                    <a
                      href={site.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-forest/15 text-forest transition-colors hover:border-olive hover:text-olive"
                    >
                      <FacebookIcon size={16} />
                    </a>
                  </SheetClose>
                  <SheetClose asChild>
                    <a
                      href={site.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-[14px] border border-forest/15 text-forest transition-colors hover:border-olive hover:text-olive"
                    >
                      <InstagramIcon size={16} />
                    </a>
                  </SheetClose>
                </div>
                <a
                  href={site.booking.header}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 w-full items-center justify-center rounded-[14px] bg-olive px-4 text-center font-heading text-sm font-semibold !text-white transition-colors hover:bg-forest hover:!text-white"
                >
                  Schedule An Appointment
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;