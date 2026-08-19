"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

const PORTAL = "https://www.optimantra.com/optimus/om/patient/login";
const QUOTE = "\"A journey of a thousand miles begins with a single step.\"";
const ATTR = "– Lao-tzu";

const OPEN_1 = "Initial visits generally last from 30 to 90 minutes. Your acupuncturist will take a detailed health history, perform a physical exam, and provide you with your unique treatment plan.";
const OPEN_2 = "During your first appointment, you may be asked a wide range of questions about your symptoms, eating, exercise, sleep habits, emotional states and anything that may offer insight into your health.  Often we see a relationship between symptoms that is not recognized in an allopathic setting.";
const OPEN_3 = "Your practitioner will also employ diagnostic tools that are unique to acupuncture and TCM such as tongue and pulse diagnosis.";
const PLAN_P = "Once your acupuncturist has gathered enough information, you'll receive a comprehensive diagnosis and a treatment plan that will cover:";
const MOST_P = "For the best results, keep a few things in mind:";
const WORK_1 = "Fine, sterile needles will be inserted at specific acupuncture points along the meridian pathways. Your acupuncturist will concentrate on acupuncture points related to specific organs, based on your unique issues and symptoms.  These points may be local or they may be somewhere else on your body-kind of like a light switch-it is not always right next to the light you are turning on.";
const WORK_2 = "Your acupuncturist may include other related therapies in your treatment plan, such as cupping, Gua Sha or moxabustion. Herbal remedies are another important aspect of acupuncture and TCM, and it is important to understand and follow your practitioner's directions in order to get the most benefit from these treatments.  The intent of these is to speed the healing process";
const ROLE_1 = "Your actions are a key component of your treatment plan. TCM works toward restoring balance in your body.  In many cases, people have had a condition for many years, even decades.  In order to resolve or manage those symptoms, it will take some work at home as well. Unfortunately there is no magic point to \"fix it\" though we all wish for a magic weight loss point. 🙂";
const ROLE_2 = "In order for you to get the results you want, it will be important for you to take a role in your health as well.  Our goal is to help you enjoy a stronger, healthier life going forward.";
const FIX_1 = "True healing takes time and dedication. Depending on your current health and symptoms, you could feel better right away, or you may need treatments for weeks, months or years to achieve the results you want. We will discuss this at your first appointment and provide guidance as to what to expect.";
const FIX_2 = "Acupuncture and TCM offer a safe and effective holistic health care system. This natural approach can both resolve symptoms and enhance your overall health.";
const FIX_3 = "By taking the right steps and planting the seeds of health, you are on the road to a healthier you!";

const PLAN_ITEMS = ["Your underlying imbalances", "Your time line of care", "What types of treatment you will receive"];
const MOST_ITEMS = ["Please show up on time", "Click here for the patient portal", "Eat a small meal or snack before your visit and drink lots of water", "Wear loose, comfortable clothes", "Please feel free to bring a list of questions", "Refrain from overexertion, drugs or alcohol for at least six hours after treatment", "Keep notes between visits", "Follow your treatment plan as the results are cumulative"];

function Band({ title }: { title: string }) {
  return (
    <section className="fv-line w-full bg-olive/15">
      <div className="mx-auto w-full max-w-3xl px-6 py-10 sm:px-10 sm:py-12 lg:px-0">
        <h2 className="text-center font-heading text-lg font-semibold tracking-[0.12em] text-charcoal sm:text-xl">
          {title}
        </h2>
      </div>
    </section>
  );
}

export function FirstVisit() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      gsap.from(".fv-line", {
        autoAlpha: 0,
        y: 18,
        duration: 1.3,
        stagger: 0.1,
        ease: "power2.out",
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="w-full bg-white">
      <header className="mx-auto w-full max-w-3xl px-6 pb-6 pt-20 sm:px-10 sm:pt-28 lg:px-0">
        <h1 className="fv-line font-heading text-2xl font-semibold tracking-[0.18em] text-charcoal sm:text-3xl">
          First Visit
        </h1>
      </header>

      <blockquote className="fv-line mx-auto w-full max-w-3xl border-y border-charcoal/20 px-6 py-12 text-center sm:px-10 lg:px-0">
        <p className="font-hero text-2xl leading-snug text-charcoal sm:text-3xl">{QUOTE}</p>
        <p className="mt-4 font-heading text-sm tracking-wide text-body">{ATTR}</p>
      </blockquote>

      <div className="fv-line mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p className="whitespace-pre-wrap">{OPEN_1}</p>
        <p className="whitespace-pre-wrap">{OPEN_2}</p>
        <p className="whitespace-pre-wrap">{OPEN_3}</p>
      </div>

      <Band title="Your treatment plan" />
      <div className="fv-line mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p className="whitespace-pre-wrap">{PLAN_P}</p>
        <ul className="list-disc space-y-1 pl-6">
          {PLAN_ITEMS.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>

      <Band title="Getting the most out of treatment" />
      <div className="fv-line mx-auto flex w-full max-w-3xl flex-col gap-6 px-6 py-12 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p className="whitespace-pre-wrap">{MOST_P}</p>
        <ul className="list-disc space-y-1 pl-6">
          {MOST_ITEMS.map((item) =>
            item === "Click here for the patient portal" ? (
              <li key={item}>
                Click{" "}
                <a href={PORTAL} className="text-olive underline">
                  here for the patient portal
                </a>
              </li>
            ) : (
              <li key={item}>{item}</li>
            ),
          )}
        </ul>
      </div>

      <Band title="How treatment works" />
      <div className="fv-line mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p className="whitespace-pre-wrap">{WORK_1}</p>
        <p className="whitespace-pre-wrap">{WORK_2}</p>
      </div>

      <Band title="Your role in the healing process" />
      <div className="fv-line mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 font-sans text-base leading-8 text-body sm:px-10 lg:px-0">
        <p className="whitespace-pre-wrap">{ROLE_1}</p>
        <p className="whitespace-pre-wrap">{ROLE_2}</p>
      </div>

      <Band title="Acupuncture is not an instant fix" />
      <div className="fv-line mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-12 pb-24 font-sans text-base leading-8 text-body sm:px-10 sm:pb-28 lg:px-0">
        <p className="whitespace-pre-wrap">{FIX_1}</p>
        <p className="whitespace-pre-wrap">{FIX_2}</p>
        <p className="whitespace-pre-wrap">{FIX_3}</p>
      </div>
    </div>
  );
}
