"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Logo from "@/assets/logo/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import {
  DribbbleIcon,
  InstagramIcon,
  TwitterIcon,
  LinkedinIcon,
} from "@/components/shadcn-space/blocks/hero-29/social-icons";
import { Equal, X } from "lucide-react";

export type NavigationSection = {
  title: string;
  href: string;
  isActive?: boolean;
};

interface NavbarProps {
  navigationData: NavigationSection[];
  className?: string;
}

const Navbar = ({ navigationData, className }: NavbarProps) => {
  const [isSticky, setIsSticky] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "dark fixed top-0 left-0 right-0 z-50 w-full py-4 transition-all duration-300",
        isSticky
          ? "border-b border-border/40 bg-background/60 shadow-lg shadow-black/5 backdrop-blur-lg"
          : "border-b border-transparent bg-transparent",
        className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 lg:px-8 xl:px-16">
        <a
          href="#"
          className="shrink-0 flex items-center hover:opacity-80 transition-opacity"
        >
          <Logo className="w-auto" />
        </a>

        <NavigationMenu
          className="hidden lg:flex"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <NavigationMenuList className="flex items-center gap-1 relative">
            {navigationData.map((item, index) => {
              const isHovered = hoveredIndex === index;
              return (
                <NavigationMenuItem
                  key={item.title}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className="relative"
                >
                  {item.isActive && !isHovered && (
                    <div className="absolute inset-0 bg-primary/30 rounded-full" />
                  )}
                  <AnimatePresence>
                    {isHovered && (
                      <motion.div
                        layoutId="hero29-nav-hover-bg"
                        className="absolute inset-0 bg-primary/30 rounded-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <NavigationMenuLink
                    href={item.href}
                    className="relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors bg-transparent hover:bg-transparent focus:bg-transparent data-active:bg-transparent text-foreground"
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-2">
          <Button className="h-9 rounded-full px-4 font-medium hover:bg-primary/80 cursor-pointer">
            Contact us
          </Button>

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 rounded-full bg-primary/20 text-foreground hover:bg-primary/30 dark:hover:bg-primary/30 cursor-pointer lg:hidden"
                >
                  <Equal size={16} />
                  <span className="sr-only">Menu</span>
                </Button>
              }
            />

            <SheetContent
              side="right"
              showCloseButton={false}
              className="dark flex flex-col gap-10 overflow-auto border-l border-border bg-background p-6 no-scrollbar"
            >
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>

              <SheetHeader className="flex-row items-center justify-between p-0">
                <a href="#" className="flex items-center">
                  <Logo className="w-auto" />
                </a>
                <SheetClose className="rounded-full bg-foreground p-2.5 text-background cursor-pointer transition-opacity hover:opacity-90">
                  <X size={18} />
                </SheetClose>
              </SheetHeader>

              <NavigationMenu
                orientation="vertical"
                className="flex-none items-start"
              >
                <NavigationMenuList className="flex flex-col items-start gap-4">
                  {navigationData.map((item) => (
                    <NavigationMenuItem key={item.title}>
                      <NavigationMenuLink
                        href={item.href}
                        className={cn(
                          "group/navlink flex w-fit items-center rounded-none bg-transparent p-0 text-2xl font-medium transition-all duration-500 ease-in-out hover:bg-transparent focus:bg-transparent data-active:bg-transparent",
                          item.isActive ? "gap-3" : "gap-0 hover:gap-3",
                        )}
                      >
                        <div
                          className={cn(
                            "flex items-center overflow-hidden transition-all duration-500 ease-in-out",
                            item.isActive
                              ? "max-w-6 opacity-100"
                              : "max-w-0 opacity-0 group-hover/navlink:max-w-6 group-hover/navlink:opacity-100",
                          )}
                        >
                          <div className="h-0.5 w-6 rounded-full bg-foreground" />
                        </div>
                        <span
                          className={cn(
                            "transition-colors duration-300",
                            item.isActive
                              ? "text-foreground"
                              : "text-muted-foreground",
                          )}
                        >
                          {item.title}
                        </span>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>

              <Button className="h-10 w-fit rounded-full px-6 font-medium hover:bg-primary/80 cursor-pointer">
                Contact us
              </Button>

              <div className="mt-auto flex flex-col gap-4">
                <div className="flex gap-3">
                  {(
                    [
                      { icon: DribbbleIcon, label: "Dribbble" },
                      { icon: InstagramIcon, label: "Instagram" },
                      { icon: TwitterIcon, label: "Twitter" },
                      { icon: LinkedinIcon, label: "LinkedIn" },
                    ] as const
                  ).map(({ icon: SocialIcon, label }) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex items-center justify-center rounded-full p-3 outline outline-border transition hover:bg-muted"
                    >
                      <SocialIcon size={16} />
                    </a>
                  ))}
                </div>

                <p className="text-sm text-muted-foreground">
                  © 2026 Shadcnspace
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
