import FadeIn from "./FadeIn";

const rows = [
  { label: "Kosten", old: "€30.000 – €80.000", nativ: "Vanaf €495" },
  { label: "Doorlooptijd", old: "4–8 weken", nativ: "1 week" },
  { label: "Resultaat", old: "PDF die op de plank belandt", nativ: "Levende kennisbank" },
  { label: "Updates", old: "Eenmalige snapshot", nativ: "Continu bijgewerkt" },
];

export default function ComparisonTable() {
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
                Traditioneel adviesbureau
              </th>
              <th className="text-left py-4 px-4 text-sm font-sans font-normal uppercase tracking-wider text-sage" scope="col">
                Nativ
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
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
