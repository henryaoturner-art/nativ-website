"use client";

import Card from "@/components/Card";
import FadeIn from "@/components/FadeIn";
import Section from "@/components/Section";
import { useLanguage } from "@/lib/language-context";
import { Database, Eye, FileCheck, Lock, Server, Shield } from "lucide-react";

// Opbouw van de pagina: deel E4 van de website-ronde (KAN-425, 10 sep 2026):
// hero links uitgelijnd, de zes principes als kaartenrij met een lucide-icoon
// boven elke H3, en "Vragen over security?" als de ene Sand-band in één rij.
// "Vertrouwd door" toonde alleen generieke badges (geen namen of logo's) en is
// geschrapt (beslissing E-1, standaard uit de brief). De teksten zijn ongewijzigd.

const translations = {
  nl: {
    heroTitle: "Security & Privacy",
    heroSub: "Jouw data is van jou. Wij passen erop.",
    principlesTitle: "Onze principes",
    principles: [
      { title: "EU Data Hosting", desc: "Al onze data wordt opgeslagen en verwerkt binnen de Europese Unie (AWS EU-North-1, Stockholm). Geen uitzonderingen." },
      { title: "GDPR Compliant", desc: "We voldoen volledig aan de AVG/GDPR. Je hebt altijd controle over je data: inzage, correctie en verwijdering op verzoek." },
      { title: "Encryptie", desc: "Data wordt versleuteld in transit (SSL/TLS) en at rest. Alle verbindingen zijn beveiligd." },
      { title: "Jouw data blijft van jou", desc: "Jouw bedrijfsdata wordt nooit gebruikt om AI-modellen te trainen of doorverkocht aan derden. Alles draait op jouw accounts, volledig overdraagbaar." },
      { title: "Multi-tenant isolatie", desc: "Strikte scheiding tussen klantdata op database-niveau. Alleen geautoriseerde teamleden hebben toegang." },
      { title: "Transparantie", desc: "We zijn altijd open over hoe we data verwerken. Vraag het ons, we leggen het uit." },
    ],
    questionTitle: "Vragen over security?",
    questionSub: "We beantwoorden graag al je vragen over hoe we met data omgaan.",
  },
  en: {
    heroTitle: "Security & Privacy",
    heroSub: "Your data is yours. We guard it.",
    principlesTitle: "Our principles",
    principles: [
      { title: "EU Data Hosting", desc: "All our data is stored and processed within the European Union (AWS EU-North-1, Stockholm). No exceptions." },
      { title: "GDPR Compliant", desc: "We fully comply with GDPR. You always have control over your data: access, correction and deletion on request." },
      { title: "Encryption", desc: "Data is encrypted in transit (SSL/TLS) and at rest. All connections are secured." },
      { title: "Your data stays yours", desc: "Your company data is never used to train AI models or sold to third parties. Everything runs on your accounts, fully transferable." },
      { title: "Multi-tenant isolation", desc: "Strict separation of client data at database level. Only authorised team members have access." },
      { title: "Transparency", desc: "We are always open about how we process data. Ask us, we’ll explain." },
    ],
    questionTitle: "Questions about security?",
    questionSub: "We’re happy to answer all your questions about how we handle data.",
  },
};

// Eén icoon per principe, in de volgorde van de lijst hierboven (B3: lucide,
// 24px, lijndikte 1,5, Sage Dark, links boven de H3). De brief noemt Shield,
// Lock, Server en FileCheck; er zijn zes principes, dus Database (isolatie op
// database-niveau) en Eye (transparantie) erbij.
const PRINCIPLE_ICONS = [Server, FileCheck, Lock, Shield, Database, Eye];

export default function SecurityPage() {
  const { t } = useLanguage();
  const c = t(translations);

  return (
    <>
      {/* Hero */}
      <Section hero>
        <FadeIn>
          <h1 className="font-serif text-grey">{c.heroTitle}</h1>
          <p className="mt-4 max-w-[640px] text-lg text-grey leading-relaxed">{c.heroSub}</p>
        </FadeIn>
      </Section>

      {/* Principes als kaartenrij met iconen */}
      <Section>
        <FadeIn>
          <h2 className="font-serif text-grey">{c.principlesTitle}</h2>
        </FadeIn>
        <FadeIn delay={150}>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {c.principles.map((item, i) => {
              const Icon = PRINCIPLE_ICONS[i] ?? Shield;
              return (
                <Card as="li" key={item.title}>
                  <Icon size={24} strokeWidth={1.5} className="text-sage-dark" aria-hidden="true" />
                  <h3 className="mt-4 font-serif text-grey">{item.title}</h3>
                  <p className="mt-3 text-grey leading-relaxed">{item.desc}</p>
                </Card>
              );
            })}
          </ul>
        </FadeIn>
      </Section>

      {/* Vragen over security? De ene Sand-band van de pagina, in één rij. */}
      <Section band="sand">
        <FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:items-center">
            <div className="md:col-span-7">
              <h2 className="font-serif text-grey">{c.questionTitle}</h2>
              <p className="mt-4 max-w-[640px] text-lg text-grey leading-relaxed">{c.questionSub}</p>
            </div>
            <p className="md:col-span-5 md:justify-self-end text-lg text-grey">
              <a
                href="mailto:info@gonativ.nl"
                className="underline underline-offset-4 decoration-1 decoration-sage-dark hover:decoration-grey"
              >
                info@gonativ.nl
              </a>
            </p>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
