import React from "react";
import Script from "next/script";
import faqData from "./faqData";
import Link from "next/link";

const FAQSection = ({ limit }) => {
  const visibleFaqs =
    typeof limit === "number" ? faqData.slice(0, limit) : faqData;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    name: "FAQ dotyczące róż",
    mainEntity: visibleFaqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section>
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      {typeof limit === "number" ? (
        <h2 className="text-3xl text-center font-bold text-rose-900 mb-8">
          Często Zadawane Pytania
        </h2>
      ) : (
        <h1 className="text-4xl text-center font-bold text-rose-900 mb-8">
          Często Zadawane Pytania
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {visibleFaqs.map((item, idx) => (
          <article key={idx} className="p-6 bg-rose-50 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-rose-900">
              {item.question}
            </h3>
            <p className="mt-2 text-rose-800">{item.answer}</p>
          </article>
        ))}
      </div>
      {typeof limit === "number" && faqData.length > limit && (
        <div className="text-center mt-3">
          <Link
            href="/najczesciej-zadawane-pytania"
            className="text-rose-700 underline"
          >
            Zobacz wszystkie odpowiedzi na pytania
          </Link>
        </div>
      )}
    </section>
  );
};

export default FAQSection;
