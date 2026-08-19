"use client";

import { useRef } from "react";
import { site } from "@/lib/site";
import { gsap, useGSAP } from "@/lib/gsap";

const testimonials = [
  {
    title: "Best Massage Ever!",
    quotes: [
      '"This was the best massage I\'ve ever had. Huge compliment to you, Susan. I\'ve never met anyone this knowledgeable!! You\'re amazing." - CJ',
    ],
    attribution: [] as string[],
  },
  {
    title: "Improved quality of life",
    quotes: [
      "Gary was diagnosed with Parkinson’s Disease 14 years ago. We exhausted what conventional medicine had to offer during these years: Numerous medicines, DBS: Deep Brain Stimulation (brain surgery)and intensive physical therapy. While some things had been helpful, they all had a downside or hit a limit. As well, no one had anything to offer to prevent Gary’s frequent falling from poor balance.  And when all this had culminated in a ‘catastrophic’, violent, drowning cough that was ruining what social life and freedom Gary still had.  Several different specialists had nothing to offer. Mayo clinic turned Gary down with nothing ‘new’ to offer.  And his lifelong GP said to accept that this was end-stage Parkinson’s.  After 9 mos of a catastrophic cough, Kate’s acupuncture protocol, Chinese herbs, and homeopathy turned it around 75% in 3 weeks. By now it is 90% gone. It was a stunning success. And Gary continues to have better balance, more energy, increased mental clarity, and almost no cough as treatment continues.",
    ],
    attribution: ["-J.Y.  Austin, TX"],
  },
  {
    title: "Threw my back out!",
    quotes: [
      "Kate treated me for severe back pain the day after I threw my back out at the grocery store. My pain was an 8-9 on a scale of 1-10 and it hurt to move, sit, stand, and lie down. I was also experiencing a great deal of anxiety from the injury and pain and although I knew I needed help, I was afraid to have anyone touch my back. Kate listened to everything I had to say and provided gentle and very effective treatment that helped immensely. She treated my back with cupping and acupuncture which helped a lot. Her treatment was thorough and brought my pain from a 8-9 to a 3 in the course of the treatment. It normally takes me 2-3 weeks to fully recover from this type of back injury but this time, I threw my back out on a Monday, received treatment from Kate on Tuesday and was completely restored by Friday! I highly recommend Kate!",
    ],
    attribution: ["M. S.  - Austin, TX"],
  },
  {
    title: "Avoided Surgery!",
    quotes: [
      "After many years of bodybuilding, I developed compartment syndrome in my lower legs and extremely tight leg, glute, hip, and back muscles.",
      "Working with Colleen for several years, her services such as Tuina and cupping have helped me recover quicker and even avoid surgery.  I would recommend her to anyone who needs assistance in recovering from an injury.  Thanks, Colleen!",
    ],
    attribution: ["-Ralph"],
  },
  {
    title: "Colleen is wonderful!",
    quotes: [
      "Colleen is wonderful. She's very intuitive and knowledgeable about the human body. She has helped me through a high ankle sprain and a number of other body troubles. Her background as a dancer and mover is infinitely informative in how she approaches her patients. She's very organized, reliable, and just a genuinely caring person! You'll be in such good hands. The clinic itself is very clean, spacious, and they've created a very warm and comfortable environment.",
    ],
    attribution: ["-Alexa C, Austin TX"],
  },
  {
    title: "Acupuncture for equestrians",
    quotes: [
      "As a competitive equestrian, it is vital that my body is in prime condition. For years, I had an uncomfortable—and often painful—tightness in my leg that negatively impacted my riding ability. Riding was not the only area affected by what turned out to be an overly tight piriformis muscle—my foot had rotated outwards noticeably due to this. Once I told Kate about this, she treated it with acupuncture. After one treatment, my foot was completely straight again. Since then, the pain has not returned, and I have",
      "seen Kate periodically to check on it. Anytime I need acupuncture or cupping, I do not hesitate to contact Kate.",
    ],
    attribution: ["Competitive Equestrian - Austin"],
  },
  {
    title: "Mei Zen Cosmetic Acupuncture System",
    quotes: [
      "After trying Botox and dermal fillers a few years back, I wasn\u02BCt satisfied with the artificial results and the concept of injecting foreign substances into my body. Fortunately, I had recently heard about facial acupuncture, and I began seeing Kate for treatments. I absolutely love the natural results! There is a visible reduction in deep wrinkles, an elimination of fine lines, a rejuvenation in the eyelids again, a lessening of age spots, and a tightening of the skin on my neck. Aside from outwardly feeling more youthful with improved elasticity and glowing skin, the Mei Zen treatments also clear my sinuses and create a general feeling of well being. I highly recommend Kate as she is a qualified practitioner with over 3000 hours of acupuncture training!",
    ],
    attribution: ["RN, MS - Austin"],
  },
  {
    title: "Chronic Back & Nerve Pain",
    quotes: [
      "Since a car accident in the fall of 2013 I have had constant back and nerve pain. Surgery was not an option and pain injections did little.  As a nurse I had seen many patients become addicted to narcotics.  Wishing to avoid this problem, I turned to acupuncture at the advice of my back specialist.  Using acupuncture and herbs, Colleen has made it possible for me to once again enjoy activities such as gardening, hiking and spending time with my very active grandchildren!  I am so grateful to have found such a compassionate and caring person to help me manage this chronic pain.  Thank you, Colleen!",
    ],
    attribution: ["Catherine T."],
  },
  {
    title: "Terrible Knee Pain",
    quotes: [
      "I had terrible knee pain and could only walk with a limp before Kate started treating me with her acupuncture techniques. She was terrific! I never had this type of therapy before and wish I had started sooner. I was amazed at how quickly I started feeling the positive effects and was so happy to be able to walk like normal after just a couple of treatments! Thank you Kate.",
    ],
    attribution: ["Todd P"],
  },
  {
    title: "Fixed my knee pain! no surgery needed now.",
    quotes: [
      "Kate is fantastic - this was my last step before considering knee surgery, and I am finally making progress. Wish I started here! Whether it is cupping, acupuncture, or basic exercises to alleviate back pain, I'm coming here first next time.",
    ],
    attribution: ["Craig B - Austin"],
  },
  {
    title: "I am feeling so much better....",
    quotes: [
      "I started going to Kate when she was at AOMA and was AMAZED at how much and how many issues she was able to help- anxiety, stress, bad knees, and more. My first appointment at her newly opened clinic was yesterday and it was fantastic, just as I expected. The energy in the space is so peaceful. I'm already looking forward to my appointment next week! I highly recommend Kate- she is a natural and very caring healer.",
    ],
    attribution: ["Sarah B - Austin"],
  },
  {
    title: "I Love Acupuncture!!!",
    quotes: [
      "I am a ‘book-end’ war veteran. I enlisted in the US Army during the Viet Nam war and retired four years after Desert Shield/Desert Storm. I was med-evac’ed out of the war zone in June 1991 with a severe bone infection. I have since been diagnosed with Gulf War syndrome, PTSD, and had a bout with breast cancer. So I have had more than my share of doctors with mood affecting drugs, pain killers and antibiotics. I hated what drugs did to me, so I was so happy to discover acupuncture.  While acupuncture doesn’t cure things like cancer, what it DOES do is alleviate pain.  The first time I had acupuncture, I was in severe pain with an inflammation of my facial nerves that no pain killer could touch. I also was, at the time, suffering from PTSD that was misdiagnosed as ‘depression” (with all the nightmares and flashbacks that that entails). I was a mess.  I was scared that the acupuncture might hurt, because I don’t like needles. But I was desperate, the pain killers a doctor had prescribed to me didn’t work and made me nauseous.  The acupuncture was not even close to painful. It was like a slight pinch of the skin for a split second. My acupuncturist explained to me about ‘chi’, what was being done and why. She applied the wires all over me, and then turned on a CD of birds singing in the forest and left me in a nice, warm, quiet room.  I almost fell asleep!  Afterwards I drove home in crazy bad Friday night traffic with heavy rain and hail, when I suddenly realized that the pain in my face was gone. It NEVER CAME BACK. Even better, I felt like I was high. I felt…HAPPY. Not just because the pain had been stopped, but because I suddenly realized I was safe, and nobody was shooting at me anymore.  I am not promising that you will have the same results as I did, but I can say that my  PTSD was not so bad anymore. I stopped having nightmares and flashbacks. If the little pinch of a wire was all it took to alleviate my PTSD, it was well worth it.  I attribute it to acupuncture. Now, when something hurts, I go in for some acupuncture and it works. Sometimes it takes a few sessions, but almost inevitably, it works to relieve my pain without pain killers or drugs. It’s so easy. It’s so gentle. It works.",
    ],
    attribution: ["Michelle B", "SFC (Ret) US Army"],
  },
] as const;

export default function Testimonial() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".quote-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%", once: true },
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-20 px-6 py-20 sm:px-10 sm:py-28 lg:px-0">
        <div className="quote-line flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <h1 className="font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
            Testimonials
          </h1>
          <a
            href={site.social.reviews}
            target="_self"
            className="inline-flex w-fit bg-olive px-4 py-2 font-heading text-sm text-white"
          >
            Leave A Review
          </a>
        </div>
        <div className="flex flex-col gap-20">
          {testimonials.map((item) => (
            <article key={item.title} className="quote-line flex flex-col gap-5">
              <h2 className="font-heading text-xl font-semibold text-charcoal">{item.title}</h2>
              {item.quotes.map((quote) => (
                <blockquote
                  key={quote.slice(0, 48)}
                  className="whitespace-pre-wrap font-hero text-lg leading-8 text-charcoal"
                >
                  {quote}
                </blockquote>
              ))}
              {item.attribution.length > 0 ? (
                <p className="font-sans text-sm leading-6 text-body">
                  {item.attribution.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
