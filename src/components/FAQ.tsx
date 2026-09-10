"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

/** FAQ-accordeon in kaartstijl (B3, KAN-425): vraag in Georgia 20px, ChevronDown draait bij openen, Sage-rand alleen open of bij hover. */
export default function FAQ({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div
            key={i}
            className={`bg-white rounded-lg border transition-colors ${open ? "border-sage" : "border-border hover:border-sage"}`}
          >
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 cursor-pointer"
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
            >
              <span className="font-serif text-xl text-grey">{item.question}</span>
              <ChevronDown
                size={20}
                strokeWidth={1.5}
                aria-hidden="true"
                className={`shrink-0 text-sage-dark transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </button>
            <div id={`faq-answer-${i}`} role="region" className={`faq-answer ${open ? "open" : ""}`}>
              <p className="px-6 pb-5 text-grey leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
