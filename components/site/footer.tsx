import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer>
      <p>
        <a href={`tel:${site.phoneTel}`}>{site.phoneDisplay}</a>
      </p>
      <h2>Booking</h2>
      <p>
        <a href={site.booking.footer} target="_blank" rel="noopener noreferrer">
          Schedule Appointment with Kate
        </a>
      </p>
      <p>
        <a href={site.booking.footer} target="_blank" rel="noopener noreferrer">
          Schedule Appointment with Aaron
        </a>
      </p>
      <h2>Hours</h2>
      <ul>
        {site.hours.map((row) => (
          <li key={row.day}>
            {row.day}: {row.hours}
          </li>
        ))}
      </ul>
      <p>
        {site.address.line1}
        <br />
        {site.address.line2}
        <br />
        {site.address.line3}
      </p>
    </footer>
  );
}
