import Link from "next/link";
import { nav, site } from "@/lib/site";

export function Header() {
  return (
    <header>
      <p>
        <Link href="/">
          <img src={site.media.logo} alt={site.name} width={120} height={120} />
        </Link>
      </p>
      <p>
        <a href={site.booking.header} target="_blank" rel="noopener noreferrer">
          Schedule An Appointment
        </a>
      </p>
      <nav aria-label="Primary">
        <ul>
          {nav.map((item) => (
            <li key={item.label}>
              <Link href={item.href}>{item.label}</Link>
              {"children" in item && item.children ? (
                <ul>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link href={child.href}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ul>
      </nav>
      <p>
        <a href={site.social.facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>{" "}
        <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
          Instagram
        </a>
      </p>
    </header>
  );
}
