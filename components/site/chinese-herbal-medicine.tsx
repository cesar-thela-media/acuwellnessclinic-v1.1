import { PageTitle } from "@/components/site/page-primitives";

const P1 =
  "Chinese herbal medicine, also known as Chinese herbology is one of the primary modalities within the scope of Oriental medicine. Chinese herbology includes treatment with substances such as plants, roots, minerals and more. Like acupuncture, Chinese herbology has evolved as an integral part of Chinese medicine and is used to re-harmonize imbalances in the body.";
const P2 =
  "The World Health Organization (WHO) defines herbal medicines to include herbs, herbal materials, herbal preparations and finished herbal products that contain as active ingredients parts of plants, or other plant materials, or combinations. Chinese formulas are comprised of herbs designed for each individual patient. This special formulation is crucial because these formulas must be delicately composed for the purpose of achieving balance in each disharmonious state of being. Even small deviations in dosage or herb composition can change the entire focus of the formula and therefore, the results.";

export function ChineseHerbalMedicine() {
  return (
    <div className="w-full bg-white">
      <section className="bg-white">
        <div className="site-container site-section flex flex-col gap-8 md:gap-12">
          <PageTitle className="text-center">What is Chinese Herbal Medicine?</PageTitle>

          <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex min-w-0 flex-col gap-4 sm:gap-5 lg:order-1">
              <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                {P1}
              </p>
              <p className="whitespace-pre-wrap text-base leading-relaxed text-body md:text-lg !m-0">
                {P2}
              </p>
            </div>
            <div className="site-media order-first w-full lg:order-2">
              <img
                src="/media/wp-content/uploads/2017/01/chinese-herbs.jpg"
                alt="Chinese herbs"
                width={2753}
                height={1785}
                className="aspect-[16/10] w-full object-cover object-center sm:aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
