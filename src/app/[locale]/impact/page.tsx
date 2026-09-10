"use client";

import Button from "@/components/Button";
import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";
import { BookOpen, Euro, GraduationCap, LayoutDashboard, Leaf, TrendingUp } from "lucide-react";

// Eén lucide-icoon per kaart (B3, KAN-425). `whyIcons` volgt de volgorde van
// `whyCards` (hogere respons, lage kosten, transparant dashboard) en vervangt
// de tekens "↑", "€" en "≡" die daar als icoon dienden. `beyondIcons` volgt
// `beyondItems` (AI-educatie, duurzame technologie, open kennis).
const whyIcons = [TrendingUp, Euro, LayoutDashboard];
const beyondIcons = [GraduationCap, Leaf, BookOpen];

const translations = {
  nl: {
    heroTitle: "The Efficiency Dividend",
    heroSub: "Elke keer dat iemand een diagnostiekvragenlijst invult, gaat er een donatie naar een goed doel. Hogere respons. Betere data. Maatschappelijke impact.",
    howTitle: "Hoe het werkt",
    howSteps: [
      { step: "1", title: "Kies goede doelen", desc: "Bij elke diagnostiek kies je 3 geregistreerde goede doelen die aansluiten bij jouw waarden, lokaal of internationaal." },
      { step: "2", title: "Stel je donatie in", desc: "Bepaal het bedrag per respons (€0,01 tot €10). Jij hebt volledige controle over je bijdrage." },
      { step: "3", title: "Respondenten kiezen", desc: "Wanneer medewerkers of stakeholders de vragenlijst openen, kiezen zij welk goed doel hun donatie krijgt." },
      { step: "4", title: "Volg je impact", desc: "Bekijk live hoeveel er gedoneerd is, per goed doel, en hoe je responspercentage stijgt door het donatiemechanisme." },
    ],
    whyTitle: "Waarom het werkt",
    whyCards: [
      { title: "Hogere responspercentage", desc: "Respondenten vullen eerder en vollediger in als hun deelname direct bijdraagt aan een goed doel." },
      { title: "Lage kosten, groot effect", desc: "Vanaf €0,01 per respons. Een klein bedrag dat zich terugverdient in betere data en hogere betrokkenheid." },
      { title: "Transparant dashboard", desc: "Realtime inzicht in totale donaties, verdeling per goed doel en responspercentagetrends." },
    ],
    flexTitle: "Volledige flexibiliteit",
    flexP1: "Kies zelf je goede doelen: elk geregistreerd goed doel is mogelijk. Lokaal of internationaal, groot of klein.",
    flexP2: "Pas je donatiebedrag aan per diagnostiek. Meer budget? Hogere donatie. Krap budget? Zelfs €0,01 maakt verschil als honderden mensen deelnemen.",
    flexP3: "Het donatiemechanisme is ingebouwd in elke diagnostiek die via ons platform loopt, van AI-scans tot lopende kennisvergaringsworkflows.",
    beyondTitle: "Daarnaast investeren we in",
    beyondItems: [
      { title: "AI-educatie", desc: "Gratis AI-scans en workshops voor non-profits en sociale ondernemingen." },
      { title: "Duurzame technologie", desc: "EU-gehoste, energie-efficiënte AI-modellen. Bewust kiezen voor duurzame infra." },
      { title: "Open kennis", desc: "Inzichten delen via blogs, talks en open-source tools. Wat we leren, delen we terug." },
    ],
    ctaTitle: "Klaar om impact te maken?",
    ctaSub: "Betere data verzamelen én bijdragen aan een betere wereld. Setup duurt minder dan 5 minuten.",
    ctaButton: "Plan een gesprek",
  },
  en: {
    heroTitle: "The Efficiency Dividend",
    heroSub: "Every time someone completes a diagnostic questionnaire, a donation goes to charity. Higher response rates. Better data. Social impact.",
    howTitle: "How it works",
    howSteps: [
      { step: "1", title: "Choose charities", desc: "For each diagnostic you pick 3 registered charities that align with your values, local or international." },
      { step: "2", title: "Set your donation", desc: "Set the amount per response (€0.01 to €10). You have full control over your contribution." },
      { step: "3", title: "Respondents choose", desc: "When employees or stakeholders open the questionnaire, they choose which charity gets their donation." },
      { step: "4", title: "Track your impact", desc: "See live how much has been donated, per charity, and how your response rate increases through the donation mechanism." },
    ],
    whyTitle: "Why it works",
    whyCards: [
      { title: "Higher response rates", desc: "Respondents are more likely to complete the survey when their participation directly contributes to a good cause." },
      { title: "Low cost, big effect", desc: "From €0.01 per response. A small amount that pays for itself in better data and higher engagement." },
      { title: "Transparent dashboard", desc: "Real-time insight into total donations, distribution per charity and response rate trends." },
    ],
    flexTitle: "Full flexibility",
    flexP1: "Choose your own charities: any registered charity is possible. Local or international, big or small.",
    flexP2: "Adjust your donation amount per diagnostic. Bigger budget? Higher donation. Tight budget? Even €0.01 makes a difference when hundreds of people participate.",
    flexP3: "The donation mechanism is built into every diagnostic that runs through our platform, from AI scans to ongoing knowledge gathering workflows.",
    beyondTitle: "We also invest in",
    beyondItems: [
      { title: "AI education", desc: "Free AI scans and workshops for non-profits and social enterprises." },
      { title: "Sustainable technology", desc: "EU-hosted, energy-efficient AI models. Deliberately choosing sustainable infrastructure." },
      { title: "Open knowledge", desc: "Sharing insights through blogs, talks and open-source tools. What we learn, we share back." },
    ],
    ctaTitle: "Ready to make an impact?",
    ctaSub: "Collect better data and contribute to a better world. Setup takes less than 5 minutes.",
    ctaButton: "Book a call",
  },
};

// Cijfer in een stappenrij (B1): Georgia 400, 40px, Sage Dark, regelhoogte 1.
const stepNumberCls = "font-serif text-[40px] leading-none text-sage-dark";

export default function ImpactPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero: links uitgelijnd, het korte hero-ritme (B1, B4) */}
      <Section hero>
        <FadeIn>
          <h1 className="font-serif text-grey">{c.heroTitle}</h1>
          <p className="mt-4 max-w-[640px] text-lg text-grey leading-relaxed">{c.heroSub}</p>
        </FadeIn>
      </Section>

      {/* E5: Hoe het werkt als stappenrij van vier, cijfer boven de H3 */}
      <Section>
        <FadeIn>
          <h2 className="font-serif text-grey">{c.howTitle}</h2>
        </FadeIn>
        <FadeIn delay={150}>
          <ol className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 list-none p-0">
            {c.howSteps.map((item) => (
              <li key={item.step}>
                <p className={stepNumberCls} aria-hidden="true">
                  {item.step}
                </p>
                <h3 className="mt-4 font-serif text-grey">{item.title}</h3>
                <p className="mt-3 text-grey leading-relaxed">{item.desc}</p>
              </li>
            ))}
          </ol>
        </FadeIn>
      </Section>

      {/* E5: Waarom het werkt als kaartenrij van drie, één icoon per kaart (B3) */}
      <Section>
        <FadeIn>
          <h2 className="font-serif text-grey">{c.whyTitle}</h2>
        </FadeIn>
        <FadeIn delay={150}>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 list-none p-0">
            {c.whyCards.map((card, i) => {
              const Icon = whyIcons[i];
              return (
                <Card key={card.title} as="li">
                  <Icon size={24} strokeWidth={1.5} className="text-sage-dark" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-grey">{card.title}</h3>
                  <p className="mt-3 text-grey leading-relaxed">{card.desc}</p>
                </Card>
              );
            })}
          </ul>
        </FadeIn>
      </Section>

      {/* E5: twee blokken naast elkaar. Links de lopende tekst van Volledige
          flexibiliteit (max 640px), rechts Daarnaast investeren we in als
          gestapelde kaarten met een icoon per kaart (B3, B4) */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-12">
          <FadeIn className="md:col-span-6">
            <h2 className="font-serif text-grey">{c.flexTitle}</h2>
            <div className="mt-6 max-w-[640px] space-y-5 text-grey leading-relaxed">
              <p>{c.flexP1}</p>
              <p>{c.flexP2}</p>
              <p>{c.flexP3}</p>
            </div>
          </FadeIn>
          <FadeIn delay={150} className="md:col-span-6">
            <h2 className="font-serif text-grey">{c.beyondTitle}</h2>
            <ul className="mt-6 grid grid-cols-1 gap-6 list-none p-0">
              {c.beyondItems.map((item, i) => {
                const Icon = beyondIcons[i];
                return (
                  <Card key={item.title} as="li" className="flex items-start gap-4">
                    <Icon size={24} strokeWidth={1.5} className="mt-0.5 shrink-0 text-sage-dark" aria-hidden="true" />
                    <div>
                      <h3 className="font-serif text-grey">{item.title}</h3>
                      <p className="mt-2 text-grey leading-relaxed">{item.desc}</p>
                    </div>
                  </Card>
                );
              })}
            </ul>
          </FadeIn>
        </div>
      </Section>

      {/* E5: de afsluiting als de ene Sand-band van de pagina (B4) */}
      <Section band="sand">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <h2 className="font-serif text-grey">{c.ctaTitle}</h2>
              <p className="mt-4 max-w-[640px] text-grey leading-relaxed">{c.ctaSub}</p>
            </div>
            <div className="md:col-span-5 flex md:justify-end">
              <Button href="/contact">{c.ctaButton}</Button>
            </div>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
