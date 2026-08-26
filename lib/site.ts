export const site = {
  name: "Si Shou Acupuncture and Wellness, PLLC",
  legalName: "Si Shou Acupuncture and Wellness, PLLC",
  styledName: "Sì Shòu",
  tagline: "Acupuncture in Austin, TX",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://acuwellnessclinic.com",
  phoneDisplay: "(512) 387-4002",
  phoneTel: "5123874002",
  email: "",
  inLanguage: "en-US",
  address: {
    line1: "Si Shou Acupuncture and Wellness, PLLC",
    line2: "5424 W US Hwy 290 Service Rd Ste 106",
    line3: "Austin, TX 78735",
    street: "5424 W US Hwy 290 Service Rd Ste 106",
    streetMap: "5424 W US Hwy 290 Service Rd Ste #106",
    city: "Austin",
    region: "TX",
    postal: "78735",
    country: "US",
  },
  hours: [
    { day: "Mon", hours: "10:00am - 5:00pm" },
    { day: "Tue", hours: "2:00pm - 6:00pm" },
    { day: "Wed", hours: "10:00am - 5:00pm" },
    { day: "Thu", hours: "10:00am - 2:00pm" },
    { day: "Fri", hours: "10:00am - 7:00pm" },
    { day: "Sat", hours: "10:00am - 3:00pm" },
    { day: "Sun", hours: "Closed" },
  ],
  openingHoursSpec: [
    "Mo 10:00-17:00",
    "Tu 14:00-18:00",
    "We 10:00-17:00",
    "Th 10:00-14:00",
    "Fr 10:00-19:00",
    "Sa 10:00-15:00",
  ],
  social: {
    facebook: "https://www.facebook.com/SiShouAcu/",
    instagram: "https://www.instagram.com/sishouacu/",
    reviews: "https://feedback.acuwellnessclinic.com",
  },
  booking: {
    header:
      "https://www.optimantra.com/optimus/patient/patientaccess/servicesall?pid=WWUvSUxvR2NwdzlOYTBOUjdpdFR1dz09&lid=WkxqU1Z6MlROZDIxbTlndjBRVUNYUT09",
    footer:
      "https://www.optimantra.com/optimus/patient/patientaccess/servicesall?pid=Q3VuRUF1cFl4ZEVvbWNDU0JJcVJtZz09&lid=STFPSDU4d3JQeFdOWmIwRHhDcWtzQT09",
    neuropathy:
      "https://www.optimantra.com/optimus/patient/patientaccess/servicesall?pid=QVBCdnp5Y2I2K3o5K2kwdnhaQWkydz09&lid=S1ZJUUlSYUZvZUFwcEJWbE1RTkM4Zz09",
    portal: "https://www.optimantra.com/optimus/om/patient/login",
  },
  media: {
    logo: "/media/wp-content/uploads/2019/02/Artboard-1@sishou-cropped.png",
    logoOnDark: "/media/wp-content/uploads/2019/02/Artboard-1@sishou-cropped-white.png",
    logoCircle: "/media/wp-content/uploads/2019/02/logo.png",
    hero: "/media/wp-content/uploads/2017/01/chinese-herbs.jpg",
    neuropathy: "/media/wp-content/uploads/2017/08/Foot-soak.jpg",
    privacyPdf:
      "/media/wp-content/uploads/2011/10/SSAW-Privacy-Policy-Jan-2017.pdf",
    youtubeHome: "https://www.youtube.com/embed/S2ewQXzt8oM?rel=0",
    youtubeVideos: "https://www.youtube.com/embed/dGj0Om-6RzU",
    calendar:
      "https://calendar.google.com/calendar/embed?src=gioqel5mt1r49ebf3rveii6tto@group.calendar.google.com&ctz=America/Chicago",
  },
  titleHome: "Si Shou Acupuncture and Wellness, PLLC | Acupuncture in Austin, TX",
  titleInner: (page: string) =>
    `${page} » Si Shou Acupuncture and Wellness, PLLC | Acupuncture in Austin, TX`,
} as const;

export const nav = [
  {
    label: "About",
    href: "/about-us",
    featured: {
      title: "View All About Pages",
      image: "/media/wp-content/uploads/2019/05/couple.jpg",
      alt: "Si Shou acupuncture practitioner",
    },
    children: [
      { label: "About Us", href: "/about-us" },
      { label: "Our Team", href: "/our-team" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Upcoming Events", href: "/upcoming-events" },
      { label: "Treatment Modalities", href: "/treatment-modalities" },
    ],
  },
  { label: "Blog", href: "/blog" },
  {
    label: "About Acupuncture",
    href: "/what-is-acupuncture",
    featured: {
      title: "View All About Acupuncture",
      image: "/media/wp-content/uploads/2018/03/pexels-photo-413707.jpeg",
      alt: "Acupuncture meridian illustration",
    },
    children: [
      { label: "What Is Acupuncture?", href: "/what-is-acupuncture" },
      { label: "What We Treat", href: "/what-is-acupuncture/what-we-treat" },
      { label: "First Visit", href: "/what-is-acupuncture/first-visit" },
      { label: "Q & A", href: "/what-is-acupuncture/q-a" },
    ],
  },
  { label: "Clinic Forms", href: "/clinic-forms" },
  {
    label: "Resources",
    href: "/resources",
    featured: {
      title: "View All Resources",
      image: "/media/wp-content/uploads/2018/06/blog_watermelon.jpg",
      alt: "Facial acupuncture treatment",
    },
    children: [
      { label: "Facial Rejuvenation", href: "/resources/facial-rejuvenation" },
      { label: "More Research", href: "/resources/more-research" },
      { label: "Patient Resources", href: "/resources/one-pagers" },
      { label: "Videos", href: "/resources/videos" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    featured: {
      title: "View All Contact Options",
      image: "/media/wp-content/uploads/2017/12/pexels-photo-237180.jpg",
      alt: "Chinese herbs and wellness tools",
    },
    children: [
      { label: "Contact Form", href: "/contact" },
      { label: "Map & Directions", href: "/contact/map-directions" },
    ],
  },
] as const;
