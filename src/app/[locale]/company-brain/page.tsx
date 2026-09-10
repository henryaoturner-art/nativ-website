import type { Metadata } from "next";
import { pageMeta, webPage } from "@/lib/site-meta";
import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import { BadgeCheck, Database, KeyRound, MessagesSquare, Users, Workflow } from "lucide-react";

export const metadata: Metadata = pageMeta(
  "/company-brain",
  "Company Brain: één AI-kennisbank voor je bedrijf | nativ",
  "Eén centrale kennislaag, gevuld vanuit de hoofden van je mensen, je systemen en de buitenwereld. De basis onder elke workflow. Voor het mkb.",
);

const faqItems = [
  {
    question: "Wat is een Company Brain?",
    answer:
      "Een Company Brain is één centrale kennislaag voor je bedrijf: alles wat je bedrijf weet, uit de hoofden van je mensen, je systemen en documenten, op één plek en klaar voor AI. Het is de basis waarop je AI-workflows draaien.",
  },
  {
    question: "Waarom heb je een Company Brain nodig voor AI?",
    answer:
      "Bedrijfs-AI loopt niet vast op een te dom model, maar op te weinig context. Een Company Brain geeft AI de specifieke kennis van jouw bedrijf, zodat antwoorden kloppen in plaats van algemeen blijven.",
  },
  {
    question: "Voor wie is een Company Brain?",
    answer:
      "Voor het mkb dat AI bedrijfsbreed wil inzetten, niet als los experiment maar als vaste basis onder het werk.",
  },
  {
    question: "Wat is het verschil tussen een Company Brain en een chatbot zoals ChatGPT?",
    answer:
      "Een losse chatbot weet niets van jouw bedrijf en begint elk gesprek opnieuw. Een Company Brain geeft AI de context van jouw organisatie: jullie kennis, afspraken en manier van werken. Zo krijg je consistente antwoorden die kloppen met hoe jullie echt werken, en die kennis blijft van jou in plaats van te verdwijnen in losse chats.",
  },
  {
    question: "Waarom niet gewoon losse AI-tools gebruiken?",
    answer:
      "Losse tools lossen elk een stukje op, maar delen geen kennis en bouwen niets op. Een Company Brain legt de kennis één keer vast en laat elke workflow eruit putten. Je bouwt aan één laag die met je bedrijf meegroeit, in plaats van losse abonnementen die niets van elkaar weten.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((f) => ({
    "@type": "Question",
    name: f.question,
    acceptedAnswer: { "@type": "Answer", text: f.answer },
  })),
};

// E1 (KAN-425): de twee bronnen als kaartenrij. Een derde bron staat bewust
// niet op de pagina (gtm/website/2026-09-02-derde-bron-open-vraag.md).
const sources = [
  {
    icon: Users,
    title: "De hoofden van je mensen.",
    body: "Het meeste van wat je bedrijf weet, staat nergens opgeschreven. nativ haalt het eruit met InsightFlow, een gestructureerde, spraakgestuurde manier van uitvragen, en schrijft het naar de Brain.",
  },
  {
    icon: Database,
    title: "Je systemen en documenten.",
    body: "Wat al is vastgelegd, in je CRM, je drive, je mail, wordt ingelezen, geordend en doorzoekbaar gemaakt.",
  },
];

const benefits = [
  {
    icon: KeyRound,
    title: "Je kennis blijft van je bedrijf.",
    body: "Wat we vastleggen, uit je mensen, je systemen en je werkwijze, wordt eigendom van je bedrijf. Het zit niet meer verspreid in hoofden en losse spreadsheets, en het verdwijnt niet als iemand weggaat.",
  },
  {
    icon: MessagesSquare,
    title: "Iedereen kan de Company Brain alles vragen.",
    body: "Eén centrale kennisbank met een bronvermelding bij elk antwoord. Dat is de basis en de manier waarop je team went aan werken met AI.",
  },
  {
    icon: Workflow,
    title: "Workflows per afdeling.",
    body: "Boven op de Brain zet je workflows in voor marketing, sales, finance of hr. Ze werken in jullie eigen toon, want ze putten uit dezelfde Brain.",
  },
  {
    icon: BadgeCheck,
    title: "Output die klopt.",
    body: "Antwoorden en documenten in de stem van je bedrijf, met de bron erbij, zodat je weet waar het vandaan komt.",
  },
];

// De alinea onder "Hoe je begint", zin voor zin, als stappenrij.
const steps = [
  "Je begint met een Company Brain, toegankelijk voor al je medewerkers.",
  "En dan kan je AI-workflows toevoegen als je daar behoefte aan hebt.",
  "Zo begin je klein en concreet, en breid je uit zodra jij de waarde ziet.",
];

const related = [
  { href: "/kennis/wat-is-een-bedrijfsbrein", label: "Wat is een Company Brain?" },
  { href: "/workflows", label: "Workflows" },
  { href: "/scan", label: "Gratis AI-scan" },
  { href: "/ai-act", label: "De EU AI Act en herleidbare AI" },
];

const stepNumberCls = "font-serif text-[40px] leading-none text-sage-dark";

export default function CompanyBrainPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            webPage("/company-brain", "Company Brain: één AI-kennisbank voor je bedrijf", "Eén centrale AI-kennislaag, gevuld vanuit de hoofden van je mensen, je systemen en de buitenwereld. De basis onder elke workflow, voor het mkb."),
            faqSchema,
          ]),
        }}
      />

      {/* Hero: links uitgelijnd, het korte hero-ritme */}
      <Section hero>
        <FadeIn>
          <h1 className="font-serif text-grey">Een Company Brain voor je bedrijf</h1>
        </FadeIn>
        <FadeIn delay={150}>
          <p className="mt-6 max-w-[640px] text-lg text-grey leading-relaxed">
            Een Company Brain is de centrale kennislaag van je bedrijf: één
            plek waar samenkomt wat je bedrijf weet, klaar voor AI om mee te
            werken. Geen losse tool, maar de basis waarop je AI-workflows
            draaien. Het lost op waar bedrijfs-AI echt op vastloopt: niet een
            te dom model, maar te weinig context.
          </p>
        </FadeIn>
      </Section>

      {/* E1: de twee bronnen als kaartenrij, de MVC-alinea eronder */}
      <Section>
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-4 items-end">
            <h2 className="font-serif text-grey md:col-span-5">Waar de kennis vandaan komt</h2>
            <p className="max-w-[640px] text-grey leading-relaxed md:col-span-7">
              Een Company Brain wordt uit twee bronnen gevuld. Die combinatie
              maakt het compleet:
            </p>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 list-none p-0">
            {sources.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.title} as="li">
                  <Icon size={24} strokeWidth={1.5} className="text-sage-dark" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-grey">{s.title}</h3>
                  <p className="mt-3 text-grey leading-relaxed">{s.body}</p>
                </Card>
              );
            })}
          </ul>
          <p className="mt-6 max-w-[640px] text-grey leading-relaxed">
            Je hoeft niet alles vast te leggen. nativ begint met de Minimum
            Viable Context (MVC™): de gestructureerde twintig procent van je
            bedrijfscontext die zo&apos;n tachtig procent van de AI-taken dekt.
          </p>
        </FadeIn>
      </Section>

      {/* E1: wat het oplevert in twee kolommen, met een icoon boven elke H3 */}
      <Section>
        <FadeIn>
          <h2 className="font-serif text-grey">Wat het oplevert</h2>
        </FadeIn>
        <FadeIn delay={150}>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-8 list-none p-0">
            {benefits.map((b) => {
              const Icon = b.icon;
              return (
                <li key={b.title}>
                  <Icon size={24} strokeWidth={1.5} className="text-sage-dark" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-grey">{b.title}</h3>
                  <p className="mt-3 max-w-[640px] text-grey leading-relaxed">{b.body}</p>
                </li>
              );
            })}
          </ul>
        </FadeIn>
      </Section>

      {/* Veilig: H2 links, de alinea ernaast */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
          <FadeIn className="md:col-span-5">
            <h2 className="font-serif text-grey">Veilig, en je data blijft van jou</h2>
          </FadeIn>
          <FadeIn delay={150} className="md:col-span-7">
            <p className="max-w-[640px] text-grey leading-relaxed">
              Je Company Brain draait in een eigen, afgeschermde omgeving: per
              bedrijf gescheiden, versleuteld opgeslagen, en de isolatie wordt
              bij elke zoekopdracht afgedwongen. Je kunt je data in de EU laten
              staan. Elk antwoord komt met een bronvermelding, dus het is geen
              zwarte doos. Gevoelige informatie wordt alleen getoond aan wie die
              mag zien. En de kennis die we vastleggen, blijft van jou.
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* E1: hoe je begint als stappenrij, de afsluiting en de verwante pagina's; de ene band van de pagina */}
      <Section band="sand">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            <h2 className="font-serif text-grey md:col-span-3 lg:col-span-1">Hoe je begint</h2>
            {steps.map((step, i) => (
              <div key={step}>
                <p className={stepNumberCls} aria-hidden="true">
                  {i + 1}
                </p>
                <p className="mt-3 text-grey leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-10 pt-10 border-t border-border flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="max-w-[640px] text-lg text-grey leading-relaxed">
              Wil je weten of dit bij jou past? Plan een gesprek.
            </p>
            <Button href="/contact" className="shrink-0">
              Plan een gesprek
            </Button>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
            {related.map((r) => (
              <Button key={r.href} variant="tertiary" href={r.href}>
                {r.label}
              </Button>
            ))}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
