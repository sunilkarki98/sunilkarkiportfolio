type FaqItem = {
  question: string;
  answer: string;
};

type FaqSectionProps = {
  faq: FaqItem[];
};

// Renders the same Q&A pairs that feed the FAQPage JSON-LD in [slug]/page.tsx.
// Keep this in sync with that schema - the visible text and the structured
// data should say the same thing, since mismatched content vs. schema is
// exactly what triggers a manual action for misleading structured data.
export default function FaqSection({ faq }: FaqSectionProps) {
  if (!faq || faq.length === 0) return null;

  return (
    <section aria-labelledby="faq-heading" className="mt-12 border-t pt-8">
      <h2 id="faq-heading" className="text-2xl font-semibold mb-4">
        Frequently asked questions
      </h2>
      <div className="space-y-2">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group border rounded-lg p-4 open:bg-muted/30"
          >
            <summary className="cursor-pointer font-medium list-none flex items-center justify-between">
              {item.question}
              <span className="ml-4 shrink-0 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
