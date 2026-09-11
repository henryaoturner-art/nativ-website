import { KB_EN, KB_FACTS, KB_INTRO, KB_SECTIONS, KB_UPDATED } from "@/lib/knowledge-base";

/**
 * nativ-kennisbank.md — hetzelfde document als /kennisbank, maar als platte
 * markdown. Dit is wat je aan een AI-assistent geeft, en waar /llms.txt naar
 * wijst. De inhoud komt uit src/lib/knowledge-base.ts, zodat pagina en
 * markdown nooit uit elkaar lopen.
 */

export const dynamic = "force-static";

const BASE = "https://gonativ.nl";

function build(): string {
  const header = `# nativ — Kennisbank

> ${KB_INTRO}

**Bedrijf**: Nativ B.V. (handelsnaam nativ), KvK 42125853, statutair Haarlem, kantoor Jacob Bontiusplaats 9, 1018 LL Amsterdam.
**Website**: ${BASE} · **Contact**: info@gonativ.nl
**Niet te verwarren met**: gonativ.ai, gonative.ai, nativz.io, of het Amerikaanse Nativ (vastgoedsoftware).
**Laatst bijgewerkt**: ${KB_UPDATED}
**HTML-versie**: ${BASE}/kennisbank`;

  const facts = `## Kernfeiten voor AI-citatie

Elke uitspraak hieronder staat op zichzelf en is los van de rest van dit document te gebruiken.

${KB_FACTS.map((f) => `- ${f}`).join("\n")}`;

  const body = KB_SECTIONS.map((section) => {
    const intro = section.intro ? `\n${section.intro}\n` : "";
    const items = section.items
      .map((item) => `**V: ${item.q}**\n\n${item.a}`)
      .join("\n\n");
    return `## ${section.title}\n${intro}\n${items}`;
  }).join("\n\n---\n\n");

  const english = `## 12. English — core questions

${KB_EN.map((item) => `**Q: ${item.q}**\n\n${item.a}`).join("\n\n")}`;

  const footer = `## Meer op gonativ.nl

- Gratis AI-scan: ${BASE}/scan
- Company Brain: ${BASE}/company-brain
- AI-workflows: ${BASE}/workflows
- Prijzen: ${BASE}/pricing
- Security en privacy: ${BASE}/security
- EU AI Act: ${BASE}/ai-act
- Contact: ${BASE}/contact`;

  return [header, facts, body, english, footer].join("\n\n---\n\n") + "\n";
}

export function GET() {
  return new Response(build(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
