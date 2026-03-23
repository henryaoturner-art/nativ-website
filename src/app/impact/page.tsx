"use client";

import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import { useLanguage } from "@/lib/language-context";

const translations = {
  nl: {
    heroTitle: "The Efficiency Dividend",
    heroSub: "Elke keer dat iemand een diagnostiekvragenlijst invult, gaat er een donatie naar een goed doel. Hogere respons. Betere data. Maatschappelijke impact.",
    howTitle: "Hoe het werkt",
    howSteps: [
      { step: "1", title: "Kies goede doelen", desc: "Bij elke diagnostiek kies je 3 geregistreerde goede doelen die aansluiten bij jouw waarden — lokaal of internationaal." },
      { step: "2", title: "Stel je donatie in", desc: "Bepaal het bedrag per respons (€0,01 – €10). Jij hebt volledige controle over je bijdrage." },
      { step: "3", title: "Respondenten kiezen", desc: "Wanneer medewerkers of stakeholders de vragenlijst openen, kiezen zij welk goed doel hun donatie krijgt." },
      { step: "4", title: "Volg je impact", desc: "Bekijk live hoeveel er gedoneerd is, per goed doel, en hoe je responspercentage stijgt door het donatiemechanisme." },
    ],
    whyTitle: "Waarom het werkt",
    whyCards: [
      { icon: "↑", title: "Hogere responspercentage", desc: "Respondenten vullen eerder en vollediger in als hun deelname direct bijdraagt aan een goed doel." },
      { icon: "€", title: "Lage kosten, groot effect", desc: "Vanaf €0,01 per respons. Een klein bedrag dat zich terugverdient in betere data en hogere betrokkenheid." },
      { icon: "📊", title: "Transparant dashboard", desc: "Realtime inzicht in totale donaties, verdeling per goed doel en responspercentagetrends." },
    ],
    flexTitle: "Volledige flexibiliteit",
    flexP1: "Kies zelf je goede doelen — elk geregistreerd goed doel is mogelijk. Lokaal of internationaal, groot of klein.",
    flexP2: "Pas je donatiebedrag aan per diagnostiek. Meer budget? Hogere donatie. Krap budget? Zelfs €0,01 maakt verschil als honderden mensen deelnemen.",
    flexP3: "Het donatiemechanisme is ingebouwd in elke diagnostiek die via ons platform loopt — van AI Opportunity Scans tot lopende kennisvergaringsworkflows.",
    beyondTitle: "Daarnaast investeren we in",
    beyondItems: [
      { emoji: "🎓", title: "AI-educatie", desc: "Gratis AI-scans en workshops voor non-profits en sociale ondernemingen." },
      { emoji: "🌍", title: "Duurzame technologie", desc: "EU-gehoste, energie-efficiënte AI-modellen. Bewust kiezen voor duurzame infra." },
      { emoji: "🤝", title: "Open kennis", desc: "Inzichten delen via blogs, talks en open-source tools. Wat we leren, delen we terug." },
    ],
    ctaTitle: "Klaar om impact te maken?",
    ctaSub: "Betere data verzamelen én bijdragen aan een betere wereld. Setup duurt minder dan 5 minuten.",
    ctaButton: "Plan een gesprek →",
  },
  en: {
    heroTitle: "The Efficiency Dividend",
    heroSub: "Every time someone completes a diagnostic questionnaire, a donation goes to charity. Higher response rates. Better data. Social impact.",
    howTitle: "How it works",
    howSteps: [
      { step: "1", title: "Choose charities", desc: "For each diagnostic you pick 3 registered charities that align with your values — local or international." },
      { step: "2", title: "Set your donation", desc: "Set the amount per response (€0.01 – €10). You have full control over your contribution." },
      { step: "3", title: "Respondents choose", desc: "When employees or stakeholders open the questionnaire, they choose which charity gets their donation." },
      { step: "4", title: "Track your impact", desc: "See live how much has been donated, per charity, and how your response rate increases through the donation mechanism." },
    ],
    whyTitle: "Why it works",
    whyCards: [
      { icon: "↑", title: "Higher response rates", desc: "Respondents are more likely to complete the survey when their participation directly contributes to a good cause." },
      { icon: "€", title: "Low cost, big effect", desc: "From €0.01 per response. A small amount that pays for itself in better data and higher engagement." },
      { icon: "📊", title: "Transparent dashboard", desc: "Real-time insight into total donations, distribution per charity and response rate trends." },
    ],
    flexTitle: "Full flexibility",
    flexP1: "Choose your own charities — any registered charity is possible. Local or international, big or small.",
    flexP2: "Adjust your donation amount per diagnostic. Bigger budget? Higher donation. Tight budget? Even €0.01 makes a difference when hundreds of people participate.",
    flexP3: "The donation mechanism is built into every diagnostic that runs through our platform — from AI Opportunity Scans to ongoing knowledge gathering workflows.",
    beyondTitle: "We also invest in",
    beyondItems: [
      { emoji: "🎓", title: "AI education", desc: "Free AI scans and workshops for non-profits and social enterprises." },
      { emoji: "🌍", title: "Sustainable technology", desc: "EU-hosted, energy-efficient AI models. Deliberately choosing sustainable infrastructure." },
      { emoji: "🤝", title: "Open knowledge", desc: "Sharing insights through blogs, talks and open-source tools. What we learn, we share back." },
    ],
    ctaTitle: "Ready to make an impact?",
    ctaSub: "Collect better data and contribute to a better world. Setup takes less than 5 minutes.",
    ctaButton: "Book a call →",
  },
};

export default function ImpactPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero */}
      <section className="py-10 md:py-14 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">{c.heroTitle}</h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed max-w-2xl mx-auto">{c.heroSub}</p>
          </FadeIn>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">{c.howTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {c.howSteps.map((item, i) => (
              <FadeIn key={item.step} delay={i * 150}>
                <div className="text-center">
                  <div className="w-12 h-12 rounded-full bg-sage/10 flex items-center justify-center mx-auto mb-4">
                    <span className="text-sage font-serif text-lg">{item.step}</span>
                  </div>
                  <h3 className="font-serif text-lg mb-2">{item.title}</h3>
                  <p className="text-grey/70 font-light leading-relaxed text-sm">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-12">{c.whyTitle}</h2>
          </FadeIn>
          <FadeIn delay={200}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {c.whyCards.map((card) => (
                <div key={card.title} className="bg-white rounded-xl p-8 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <p className="text-4xl md:text-5xl font-serif text-sage">{card.icon}</p>
                  <p className="mt-3 font-serif text-lg">{card.title}</p>
                  <p className="mt-2 text-sm text-grey/60 font-light">{card.desc}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Flexibility */}
      <section className="py-12 md:py-16 px-6 bg-white">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight mb-8">{c.flexTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>{c.flexP1}</p>
              <p>{c.flexP2}</p>
              <p>{c.flexP3}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Beyond Diagnostics */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">{c.beyondTitle}</h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {c.beyondItems.map((item, i) => (
              <FadeIn key={item.title} delay={i * 150}>
                <div className="bg-white rounded-xl p-8 h-full shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
                  <span className="text-3xl">{item.emoji}</span>
                  <h3 className="font-serif text-xl mt-4 mb-3">{item.title}</h3>
                  <p className="text-grey/70 font-light leading-relaxed text-[15px]">{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16 px-6">
        <div className="max-w-[680px] mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">{c.ctaTitle}</h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-6 text-lg font-light text-grey/70 leading-relaxed">{c.ctaSub}</p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10">
              <Link href="/contact" className="bg-sage text-white px-8 py-4 rounded-lg hover:bg-sage-dark transition-colors inline-block">
                {c.ctaButton}
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
