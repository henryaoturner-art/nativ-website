import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Over ons",
  description:
    "Drie man. Dertig man output. Niet door harder te werken — door AI-native te zijn.",
};

const team = [
  {
    name: "Livius van Heemstra",
    role: "CEO & Strategy",
    bio: "Verbindt bedrijfsstrategie met AI-mogelijkheden. Achtergrond in consulting en tech. Overtuigd dat de beste AI-oplossingen beginnen bij het begrijpen van de business.",
  },
  {
    name: "Gokul Menon",
    role: "Technology",
    bio: "Bouwt de technische kern van Nativ. Van kennisbank-architectuur tot AI-integraties. Gelooft in simpele, robuuste systemen die écht werken.",
  },
  {
    name: "Jorus Everaerd",
    role: "Operations & Delivery",
    bio: "Zorgt dat elke klant krijgt wat beloofd is. Hands-on, scherp op kwaliteit, en altijd eerlijk over wat wel en niet kan.",
  },
];

export default function OverOnsPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-24 md:py-32 px-6">
        <div className="max-w-[800px] mx-auto text-center">
          <FadeIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-[56px] leading-[1.15] text-grey">
              Wij zijn Nativ
            </h1>
          </FadeIn>
          <FadeIn delay={200}>
            <p className="mt-6 text-lg md:text-xl font-light text-grey/70 leading-relaxed">
              Drie man. Dertig man output.
              <br />
              Niet door harder te werken — door AI-native te zijn.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Waarom Nativ bestaat
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <div className="mt-8 space-y-6 text-lg font-light leading-relaxed text-grey/80">
              <p>
                We zagen het steeds weer. Bedrijven die duizenden euro&apos;s
                uitgeven aan AI-tools. Die er vervolgens niets mee doen. Niet
                omdat de tools slecht zijn — maar omdat niemand de
                bedrijfskennis had gestructureerd die AI nodig heeft om nuttig
                te zijn.
              </p>
              <p>
                Consultants vragen €30K+ voor een PDF. AI-vendors verkopen tools
                zonder context. Daar tussenin zit een gat. Dat gat zijn wij.
              </p>
              <p className="font-serif text-grey text-xl italic">
                Nativ bouwt de brug tussen wat je bedrijf weet en wat AI kan.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-[1200px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight text-center mb-16">
              Het team
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {team.map((member, i) => (
              <FadeIn key={member.name} delay={i * 150}>
                <div className="text-center">
                  {/* Photo placeholder */}
                  <div className="w-32 h-32 rounded-full bg-sage/10 mx-auto mb-6 flex items-center justify-center" aria-hidden="true">
                    <span className="font-serif text-sage text-3xl">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl">{member.name}</h3>
                  <p className="text-sage text-sm mt-1">{member.role}</p>
                  <p className="mt-4 text-grey/70 font-light leading-relaxed text-sm max-w-xs mx-auto">
                    {member.bio}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-[680px] mx-auto">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-[42px] leading-tight">
              Hoe wij werken
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mt-8 text-lg font-light leading-relaxed text-grey/80">
              We doen wat we zeggen. Ons eigen bedrijf draait op dezelfde
              principes die we aan klanten leveren. Alles wat we bouwen, testen
              we eerst op onszelf.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <ul className="mt-8 space-y-3 text-grey/80 font-light">
              <li className="flex items-start gap-3">
                <span className="text-sage mt-0.5">·</span>
                AI-native sinds dag één
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-0.5">·</span>
                Lean team, grote output
              </li>
              <li className="flex items-start gap-3">
                <span className="text-sage mt-0.5">·</span>
                Eerlijk over wat AI wel en niet kan
              </li>
            </ul>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
