"use client";

import FadeIn from "./FadeIn";
import { useLanguage } from "@/lib/language-context";

const tableTranslations = {
  nl: {
    oldHeader: "Traditioneel adviesbureau",
    rows: [
      { label: "Kosten", old: "€30.000 – €80.000", nativ: "Vanaf €2.495" },
      { label: "Doorlooptijd", old: "4–8 weken", nativ: "1 week" },
      { label: "Resultaat", old: "PDF die op de plank belandt", nativ: "Levende kennisbank" },
      { label: "Updates", old: "Eenmalige snapshot", nativ: "Continu bijgewerkt" },
      { label: "Kennis", old: "Zit in hoofden van consultants", nativ: "Levend systeem dat groeit met je organisatie" },
    ],
  },
  en: {
    oldHeader: "Traditional consultancy",
    rows: [
      { label: "Cost", old: "€30,000 – €80,000", nativ: "From €2,495" },
      { label: "Timeline", old: "4–8 weeks", nativ: "1 week" },
      { label: "Result", old: "PDF that gathers dust", nativ: "Living knowledge base" },
      { label: "Updates", old: "One-time snapshot", nativ: "Continuously updated" },
      { label: "Knowledge", old: "Lives in consultants' heads", nativ: "Living system that grows with your organisation" },
    ],
  },
};

export default function ComparisonTable() {
  const { t } = useLanguage();
  const table = t(tableTranslations);

  return (
    <FadeIn>
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr>
              <th className="text-left py-4 px-4 text-sm font-sans font-normal uppercase tracking-wider text-grey/50" scope="col">
                &nbsp;
              </th>
              <th className="text-left py-4 px-4 text-sm font-sans font-normal uppercase tracking-wider text-grey/40 line-through" scope="col">
                {table.oldHeader}
              </th>
              <th className="text-left py-4 px-4 text-sm font-sans font-normal uppercase tracking-wider text-sage" scope="col">
                Nativ
              </th>
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, i) => (
              <tr key={i} className="border-t border-sage-light">
                <td className="py-4 px-4 font-serif text-grey">{row.label}</td>
                <td className="py-4 px-4 text-grey/40 line-through">{row.old}</td>
                <td className="py-4 px-4 text-grey font-medium">
                  <span className="text-sage">●</span>{" "}
                  {row.nativ}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </FadeIn>
  );
}
