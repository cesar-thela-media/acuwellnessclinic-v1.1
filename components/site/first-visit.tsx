import { PageTitle } from "@/components/site/page-primitives";

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

export function FirstVisit() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section--compact">
          <PageTitle>First Visit</PageTitle>
        </div>
      </section>

      <section className="site-band bg-white">
        <div className="site-container flex flex-col gap-6 md:gap-8">
          <blockquote className="site-card site-card--soft max-w-3xl p-6 md:p-8">
            <p className="text-xl font-semibold leading-snug tracking-tight text-charcoal md:text-2xl !m-0">
              {QUOTE}
            </p>
            <p className="mt-4 text-sm font-medium text-body !m-0">{ATTR}</p>
          </blockquote>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{OPEN_1}</p>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{OPEN_2}</p>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{OPEN_3}</p>
        </div>
      </section>

      <section className="site-band w-full max-w-full overflow-x-clip bg-olive text-white">
        <div className="site-container flex flex-col gap-6 md:gap-8">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl !m-0 text-balance">
            Your treatment plan
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {PLAN_P}
          </p>
          <ul className="max-w-3xl list-disc space-y-2 pl-6 text-base leading-relaxed text-white/90 md:text-lg">
            {PLAN_ITEMS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="site-band bg-white">
        <div className="site-container flex flex-col gap-6 md:gap-8">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-charcoal sm:text-4xl !m-0 text-balance">
            Getting the most out of treatment
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{MOST_P}</p>
          <ul className="max-w-3xl list-disc space-y-2 pl-6 text-base leading-relaxed text-body md:text-lg">
            {MOST_ITEMS.map((item) =>
              item === "Click here for the patient portal" ? (
                <li key={item}>
                  Click{" "}
                  <a
                    href={PORTAL}
                    className="font-medium text-olive underline underline-offset-2"
                  >
                    here for the patient portal
                  </a>
                </li>
              ) : (
                <li key={item}>{item}</li>
              ),
            )}
          </ul>
        </div>
      </section>

      <section className="site-band w-full max-w-full overflow-x-clip bg-olive text-white">
        <div className="site-container flex flex-col gap-6 md:gap-8">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl !m-0 text-balance">
            How treatment works
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {WORK_1}
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {WORK_2}
          </p>
        </div>
      </section>

      <section className="site-band bg-white">
        <div className="site-container flex flex-col gap-6 md:gap-8">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-charcoal sm:text-4xl !m-0 text-balance">
            Your role in the healing process
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{ROLE_1}</p>
          <p className="max-w-3xl text-base leading-relaxed text-body md:text-lg whitespace-pre-wrap !m-0">{ROLE_2}</p>
        </div>
      </section>

      <section className="site-band w-full max-w-full overflow-x-clip bg-olive text-white">
        <div className="site-container flex flex-col gap-6 md:gap-8">
          <h2 className="max-w-4xl text-3xl font-bold tracking-tight text-white sm:text-4xl !m-0 text-balance">
            Acupuncture is not an instant fix
          </h2>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {FIX_1}
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {FIX_2}
          </p>
          <p className="max-w-3xl text-base leading-relaxed text-white/90 md:text-lg whitespace-pre-wrap !m-0">
            {FIX_3}
          </p>
        </div>
      </section>
    </div>
  );
}
