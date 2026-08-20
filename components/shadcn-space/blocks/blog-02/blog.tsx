import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const HEADING = "RECENT ARTICLES";

const posts = [
  {
    href: "/eye-disorders/",
    image: "/media/wp-content/uploads/2017/06/Blogimg-Eyes-Red-or-Inflamed.jpg",
    date: "June 2, 2022",
    title: "Eye Disorders",
    excerpt:
      "There are hundreds of different eye diseases that lead to vision loss. Degenerative eye diseases, from diabetic retinopathy to age-related macular degeneration, often have no cure while many others are treatable and … following a healthy lifestyle and seeing your Ophthalmologist in conjunction with your […]",
  },
  {
    href: "/acupuncture-and-the-treatment-of-neurological-disorders/",
    image: "/media/wp-content/uploads/2011/08/Parkinsons.png",
    date: "May 26, 2022",
    title: "Acupuncture and the Treatment of Neurological Disorders",
    excerpt:
      "Neurological disorders cover a wide swath of health issues, including: traumatic brain injuries and concussions, headaches, Parkinson's disease, strokes, Bell's palsy, Alzheimer's disease, seizures, and MS (just to … rldwide from some sort of neurological disorder. What most people don't know is that […]",
  },
  {
    href: "/effects-of-acupuncture-on-alzheimers/",
    image: "/media/wp-content/uploads/2018/06/healthy-skin-acupuncture.jpg",
    date: "June 2, 2021",
    title: "Effects of Acupuncture on Alzheimer’s",
    excerpt:
      "June is Alzheimer’s Awareness Month. Among people over 65 years old, Alzheimer’s is the disease that is found to cause most cases of dementia. Dementia is the loss of cognitive function so severe it interferes with daily life and ranges in severity from the loss of memory, ability to think, reason, plan and can even […]",
  },
  {
    href: "/does-acupuncture-hurt/",
    image: "/media/wp-content/uploads/2017/08/hands-2568594_1280.jpg",
    date: "February 10, 2021",
    title: "Does Acupuncture Hurt?",
    excerpt:
      "This is by far the most commonly asked question by new patients. The quick answer is, it shouldn’t. Kate might not be so willing to allow students to practice on her and we wouldn’t have so many happily returning and referring patients if it hurt! There are hundreds of acupuncture points on the body. […]",
  },
] as const;

const Blog = () => {
  return (
    <section className="w-full bg-cream py-20 md:py-24 lg:py-28">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col gap-4">
          <p className="font-display text-lg italic text-olive !m-0">03</p>
          <h2 className="max-w-md font-display text-3xl leading-[1.12] tracking-[-0.01em] text-forest sm:text-4xl !m-0">
            {HEADING}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <article
              key={post.href}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_16px_40px_-24px_rgba(44,58,40,0.35)]"
            >
              <Link href={post.href} className="relative block overflow-hidden">
                <div className="aspect-[4/3] w-full overflow-hidden bg-olive/20">
                  <img
                    src={post.image}
                    alt=""
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <span className="absolute left-3 top-3 rounded-full bg-forest/90 px-3 py-1 font-heading text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">
                  {post.date}
                </span>
              </Link>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <Link
                  href={post.href}
                  className="font-heading text-lg font-semibold leading-snug tracking-tight text-forest"
                >
                  {post.title}
                </Link>
                <p className="text-sm leading-relaxed text-body !m-0">{post.excerpt}</p>
                <Link
                  href={post.href}
                  className="mt-auto inline-flex items-center gap-1.5 font-heading text-sm font-semibold text-olive transition-colors hover:text-forest"
                >
                  Read More
                  <ArrowUpRight
                    size={14}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
