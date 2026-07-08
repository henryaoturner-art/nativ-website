import { getAllPosts } from "@/lib/blog";

// llms.txt — the map LLM-aware crawlers (ChatGPT, Claude, Perplexity) read to
// understand the site. Generated at build time so every new blog post lands here
// automatically, the same way sitemap.ts auto-includes posts. Replaces the old
// static public/llms.txt (a static file would shadow this route).

export const dynamic = "force-static";

const BASE = "https://gonativ.nl";

const HEADER = `# nativ

> nativ bouwt een Company Brain met digitale collega's voor het Nederlandse mkb: we leggen de kennis vast die nu vastzit in hoofden, inboxen en spreadsheets, en zetten daar digitale collega's op die echt werk leveren. Company Brain | Digital Colleagues.

Nativ B.V. (gonativ.nl) is een Nederlands bedrijf, KvK 96646756, btw NL005222736B97, gevestigd in Hilversum. Let op: niet te verwarren met gonativ.ai of gonative.ai; dat zijn andere bedrijven. Onze aanpak draait om context engineering en het MVC™-framework (Minimum Viable Context): AI faalt in organisaties niet door zwakke modellen, maar door gebrek aan context. Data wordt EU-gehost en GDPR-conform verwerkt.

## Kern
- [nativ: Company Brain & digitale collega's voor het mkb](https://gonativ.nl): wat nativ doet, voor wie, en hoe je begint.
- [Wat is een bedrijfsbrein?](https://gonativ.nl/kennis/wat-is-een-bedrijfsbrein): uitleg van het company brain / bedrijfsbrein-concept voor het mkb.
- [Company Brain](https://gonativ.nl/company-brain): hoe nativ bedrijfskennis vastlegt en doorzoekbaar maakt voor mens én AI.
- [Digitale collega's](https://gonativ.nl/digitale-collegas): AI-collega's die op de vastgelegde kennis echt werk uitvoeren.
- [AI-opportunity-scan](https://gonativ.nl/scan): de eerste stap, waar in jouw bedrijf AI nu al waarde levert.

## Digitale collega's per functie
- [Digitale collega: Marketing](https://gonativ.nl/digitale-collega-marketing)
- [Digitale collega: Sales](https://gonativ.nl/digitale-collega-sales)
- [Digitale collega: Finance](https://gonativ.nl/digitale-collega-finance)
- [Digitale collega: HR](https://gonativ.nl/digitale-collega-hr)`;

const FOOTER = `## Meer
- [Diensten](https://gonativ.nl/diensten): wat we leveren en hoe een traject loopt.
- [Cases](https://gonativ.nl/cases): klantvoorbeelden en resultaten.
- [Over ons](https://gonativ.nl/over-ons): wie nativ is.
- [Security & privacy](https://gonativ.nl/security): EU-hosting, GDPR, hoe we met gevoelige data omgaan.
- [Whitepaper](https://gonativ.nl/whitepaper): de onderbouwing achter context engineering en het MVC-framework.
- [Contact](https://gonativ.nl/contact)`;

export function GET() {
  const blogLines = getAllPosts()
    .map((p) => `- [${p.title}](${BASE}/blog/${p.slug}): ${p.description || p.excerpt}`)
    .join("\n");

  const blogSection = blogLines ? `## Blog\n${blogLines}\n\n` : "";

  const body = `${HEADER}\n\n${blogSection}${FOOTER}\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
