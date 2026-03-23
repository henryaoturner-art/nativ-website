"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="bg-white rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
            aria-expanded={openIndex === i}
            aria-controls={`faq-answer-${i}`}
          >
            <span className="font-serif text-lg text-grey font-normal">
              {item.question}
            </span>
            <span
              className="text-sage text-2xl shrink-0 transition-transform duration-300"
              style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          <div
            id={`faq-answer-${i}`}
            role="region"
            className={`faq-answer ${openIndex === i ? "open" : ""}`}
          >
            <p className="px-6 pb-5 text-grey/80 leading-relaxed">
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
