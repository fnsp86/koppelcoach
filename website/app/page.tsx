import type { Metadata } from "next";
import Link from "next/link";
import {
  Heart,
  MessageCircle,
  Gamepad2,
  BookHeart,
  Compass,
  TrendingUp,
  ArrowRight,
  Smartphone,
  Star,
  Users,
  ChevronDown,
  Sparkles,
  Shield,
  Clock,
  Zap,
  HelpCircle,
  Brain,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Samen | De app voor koppels die willen groeien",
  description:
    "Versterk jullie relatie met dagelijkse check-ins, leuke quizzen, gespreksstarters en een persoonlijke relatiepols. Download de Samen app.",
};

const FEATURES = [
  {
    icon: Heart,
    title: "Check-in",
    desc: "Hoe gaat het echt met jullie? Dagelijks een moment van verbinding.",
    color: "#C4704B",
  },
  {
    icon: MessageCircle,
    title: "Gespreksstarters",
    desc: "Verder praten dan 'hoe was je dag?' met diepgaande vragen.",
    color: "#5B8FA8",
  },
  {
    icon: Brain,
    title: "Relatie quiz",
    desc: "Hoeveel weten jullie echt van elkaar? Ontdek het samen.",
    color: "#7A9E7E",
  },
  {
    icon: Gamepad2,
    title: "Koppelspellen",
    desc: "Lachen en leren tegelijk met speelse activiteiten.",
    color: "#D4A843",
  },
  {
    icon: BookHeart,
    title: "Dagboek",
    desc: "Bewaar mooie momenten in jullie gedeelde dagboek.",
    color: "#C4704B",
  },
  {
    icon: Compass,
    title: "Date roulette",
    desc: "200+ date-ideeen op maat van jullie budget en tijd.",
    color: "#5B8FA8",
  },
  {
    icon: TrendingUp,
    title: "Relatiepols",
    desc: "Volg jullie groei over tijd met persoonlijke inzichten.",
    color: "#7A9E7E",
  },
  {
    icon: Users,
    title: "Vergelijken",
    desc: "Bekijk elkaars antwoorden en ontdek nieuwe kanten.",
    color: "#D4A843",
  },
];


const FAQS = [
  {
    q: "Is de app gratis?",
    a: "Ja, de basisfuncties zijn gratis. Je kunt dagelijkse check-ins doen, vragen beantwoorden en spellen spelen zonder te betalen.",
  },
  {
    q: "Hoe verbind ik mijn partner?",
    a: "Na het aanmaken van je profiel krijg je een persoonlijke koppelcode. Deel deze met je partner, en jullie zijn direct verbonden in de app.",
  },
  {
    q: "Is mijn data veilig?",
    a: "Absoluut. Jullie gegevens worden versleuteld opgeslagen en we delen nooit persoonlijke informatie met derden.",
  },
  {
    q: "Werkt het ook als mijn partner de app niet heeft?",
    a: "De app is het leukst samen, maar je kunt ook solo beginnen en je partner later uitnodigen.",
  },
];

function PhoneMockup({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto w-[300px] ${className}`}
    >
      {/* Phone frame - iPhone proportions */}
      <div className="rounded-[2.8rem] border-[6px] border-nachtblauw bg-warmwit p-2 shadow-2xl">
        {/* Dynamic Island */}
        <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-28 h-7 bg-nachtblauw rounded-full z-10" />
        {/* Screen */}
        <div className="rounded-[2.2rem] bg-warmwit overflow-hidden pt-8 aspect-[9/19]">
          {children}
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-[0.07] bg-terracotta blur-[100px]" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.05] bg-oceaan blur-[100px]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-4 py-1.5 mb-8">
                <Sparkles className="h-4 w-4 text-terracotta" />
                <span className="text-sm font-semibold text-terracotta">
                  Voor koppels die willen groeien
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.08] tracking-tight text-nachtblauw mb-6">
                Jullie relatie
                <br />
                verdient{" "}
                <span className="relative">
                  <span className="text-terracotta">aandacht</span>
                  <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 200 8" fill="none">
                    <path d="M2 6c30-4 60-4 98-2s68 2 98-2" stroke="#C4704B" strokeWidth="3" strokeLinecap="round" opacity="0.3"/>
                  </svg>
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-leisteen mb-8 max-w-md">
                Dagelijkse check-ins, verrassende quizzen en gespreksstarters
                die er toe doen. In 5 minuten per dag.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <div
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-nachtblauw/70 px-7 py-4 text-base font-bold text-white cursor-default"
                >
                  <Clock className="h-5 w-5" />
                  Binnenkort beschikbaar
                </div>
                <a
                  href="#hoe-werkt-het"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-zand px-7 py-4 text-base font-semibold text-nachtblauw transition-colors hover:bg-zand-light"
                >
                  Hoe werkt het?
                </a>
              </div>

              {/* Social proof */}
              <div className="flex flex-wrap items-center gap-5 text-sm text-leisteen">
                <span>Binnenkort gratis te downloaden</span>
                <div className="h-4 w-px bg-zand" />
                <span>iOS & Android</span>
              </div>
            </div>

            {/* Phone mockup - compact Vandaag tab */}
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup>
                <div className="px-5 py-4">
                  {/* App header */}
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-xs text-leisteen">Goedemorgen</p>
                      <p className="text-base font-bold text-nachtblauw">Vandaag</p>
                    </div>
                    <div className="flex items-center gap-1.5 rounded-full px-2.5 py-1" style={{ backgroundColor: '#D4A84315' }}>
                      <Zap className="h-3.5 w-3.5 text-goud" />
                      <span className="text-xs font-bold text-goud">3 dagen</span>
                    </div>
                  </div>

                  <p className="text-sm font-bold text-nachtblauw mb-3">Dagelijkse activiteiten</p>

                  {/* Timeline */}
                  <div className="space-y-2.5">
                    {[
                      { label: "Check-in", title: "Relatiepols", sub: "Hoe voelen jullie je vandaag?", Icon: TrendingUp, color: "#7A9E7E" },
                      { label: "Vraag", title: "Vraag van de dag", sub: "Wat waardeer je het meest?", Icon: MessageCircle, color: "#C4704B" },
                      { label: "Quiz", title: "Relatie Check-up", sub: "Hoe goed kennen jullie elkaar?", Icon: HelpCircle, color: "#5B8FA8" },
                      { label: "Spel", title: "Jij of Ik?", sub: "Wie past het beste bij...?", Icon: Gamepad2, color: "#D4A843" },
                    ].map((item, i, arr) => (
                      <div key={item.label} className="flex gap-2.5">
                        <div className="flex flex-col items-center pt-3">
                          <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                          {i < arr.length - 1 && <div className="w-px flex-1 bg-zand mt-1" />}
                        </div>
                        <div className="flex-1">
                          <div className="rounded-md px-2 py-0.5 self-start inline-block mb-1.5" style={{ backgroundColor: item.color + '12' }}>
                            <span className="text-[10px] font-bold" style={{ color: item.color }}>{item.label}</span>
                          </div>
                          <div className="rounded-xl border border-zand bg-warmwit p-3 flex items-center">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-nachtblauw">{item.title}</p>
                              <p className="text-[10px] text-leisteen mt-0.5">{item.sub}</p>
                            </div>
                            <div className="h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ml-2" style={{ backgroundColor: item.color + '10' }}>
                              <item.Icon className="h-5 w-5" style={{ color: item.color }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Bottom nav */}
                  <div className="flex justify-around border-t border-zand pt-3 pb-1 mt-4">
                    {[
                      { icon: Heart, label: "Vandaag", active: true },
                      { icon: Compass, label: "Ontdek", active: false },
                      { icon: MessageCircle, label: "Bespreek", active: false },
                      { icon: Users, label: "Wij", active: false },
                    ].map((tab) => (
                      <div key={tab.label} className="flex flex-col items-center gap-0.5">
                        <tab.icon className={`h-4 w-4 ${tab.active ? "text-terracotta" : "text-leisteen/40"}`} />
                        <span className={`text-[9px] font-medium ${tab.active ? "text-terracotta" : "text-leisteen/40"}`}>{tab.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </PhoneMockup>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TICKER / TRUST STRIP ═══ */}
      <section className="border-y border-zand bg-zand-light/50">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3">
            {[
              { icon: Clock, text: "5 minuten per dag" },
              { icon: Shield, text: "100% prive" },
              { icon: Zap, text: "150+ activiteiten" },
              { icon: Compass, text: "200+ date ideeen" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-sm text-leisteen">
                <item.icon className="h-4 w-4 text-terracotta" />
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SHOWCASE 1: Check-in / Relatiepols ═══ */}
      <section className="border-b border-zand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center">
              <PhoneMockup>
                <div className="px-5 py-4">
                  <div className="flex items-center gap-2 mb-5">
                    <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#7A9E7E20' }}>
                      <TrendingUp className="h-4 w-4 text-salie" />
                    </div>
                    <span className="text-sm font-bold text-nachtblauw">Relatiepols</span>
                  </div>
                  <p className="text-xs text-leisteen mb-4">Hoe voelen jullie je vandaag?</p>

                  {/* Likert scales */}
                  <div className="space-y-3 mb-5">
                    {[
                      { label: "Verbondenheid", selected: 4 },
                      { label: "Communicatie", selected: 3 },
                      { label: "Waardering", selected: 5 },
                      { label: "Intimiteit", selected: 4 },
                    ].map((row) => (
                      <div key={row.label} className="rounded-xl border border-zand bg-warmwit p-3">
                        <p className="text-[10px] font-bold text-nachtblauw mb-2">{row.label}</p>
                        <div className="flex gap-1.5">
                          {[1, 2, 3, 4, 5].map((n) => (
                            <div key={n} className={`flex-1 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${n === row.selected ? 'bg-salie text-white' : 'border border-zand text-leisteen'}`}>
                              {n}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl py-3 text-center text-sm font-bold text-white bg-salie">
                    Verstuur
                  </div>
                </div>
              </PhoneMockup>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-4 bg-salie/10 text-salie">
                <TrendingUp className="h-3.5 w-3.5" />
                Dagelijkse check-in
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-4 leading-tight">
                Begin de dag samen
              </h2>
              <p className="text-base text-leisteen leading-relaxed mb-6 max-w-md">
                In 2 minuten weten hoe het echt met jullie gaat. Scoor verbondenheid, communicatie en waardering - en volg jullie groei over tijd in de relatiepols grafiek.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-salie">
                Binnenkort beschikbaar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHOWCASE 2: Quiz - Relatie Check-up ═══ */}
      <section className="bg-zand-light/40 border-b border-zand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center lg:[direction:rtl] lg:[&>*]:[direction:ltr]">
            <div className="flex justify-center">
              <PhoneMockup>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#5B8FA820' }}>
                        <HelpCircle className="h-4 w-4 text-oceaan" />
                      </div>
                      <span className="text-sm font-bold text-nachtblauw">Relatie Check-up</span>
                    </div>
                    <span className="text-[10px] text-leisteen">4 / 12</span>
                  </div>

                  {/* Progress bar */}
                  <div className="h-1.5 rounded-full bg-zand mb-5">
                    <div className="h-full rounded-full bg-oceaan" style={{ width: '33%' }} />
                  </div>

                  {/* Statement card */}
                  <div className="rounded-2xl border border-oceaan/15 bg-oceaan/5 p-5 mb-5">
                    <p className="text-sm font-semibold text-nachtblauw text-center leading-relaxed">
                      &ldquo;Mijn partner weet wat me bezighoudt, ook als ik het niet zeg&rdquo;
                    </p>
                  </div>

                  {/* Likert options */}
                  <div className="space-y-2">
                    {['Helemaal oneens', 'Oneens', 'Neutraal', 'Eens', 'Helemaal eens'].map((label, i) => (
                      <div
                        key={label}
                        className={`rounded-xl px-4 py-2.5 text-center text-xs font-semibold ${i === 3 ? 'bg-oceaan text-white' : 'border border-zand bg-warmwit text-nachtblauw'}`}
                      >
                        {label}
                      </div>
                    ))}
                  </div>
                </div>
              </PhoneMockup>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-4 bg-oceaan/10 text-oceaan">
                <HelpCircle className="h-3.5 w-3.5" />
                Relatie Check-up
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-4 leading-tight">
                Hoe goed kennen jullie elkaar?
              </h2>
              <p className="text-base text-leisteen leading-relaxed mb-6 max-w-md">
                Beantwoord stellingen over communicatie, vertrouwen en intimiteit. Vergelijk jullie scores en ontdek waar jullie sterk in zijn - en waar ruimte is om te groeien.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-oceaan">
                Binnenkort beschikbaar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHOWCASE 3: Spel - Jij of Ik? ═══ */}
      <section className="border-b border-zand">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="flex justify-center">
              <PhoneMockup>
                <div className="px-5 py-4">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#D4A84320' }}>
                        <Gamepad2 className="h-4 w-4 text-goud" />
                      </div>
                      <span className="text-sm font-bold text-nachtblauw">Jij of Ik?</span>
                    </div>
                    <span className="text-[10px] text-leisteen">6 / 10</span>
                  </div>

                  {/* Progress */}
                  <div className="h-1.5 rounded-full bg-zand mb-5">
                    <div className="h-full rounded-full bg-goud" style={{ width: '60%' }} />
                  </div>

                  {/* Trait card */}
                  <div className="rounded-2xl border border-goud/15 bg-goud/5 p-6 mb-5 text-center">
                    <p className="text-[10px] font-bold text-goud uppercase tracking-wider mb-2">Wie is...</p>
                    <p className="text-lg font-extrabold text-nachtblauw">de beste kok?</p>
                  </div>

                  {/* Choice buttons */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="rounded-xl border-2 border-terracotta bg-terracotta/5 p-4 text-center">
                      <Users className="h-6 w-6 text-terracotta mx-auto mb-1" />
                      <p className="text-xs font-bold text-nachtblauw">Ik</p>
                    </div>
                    <div className="rounded-xl border border-zand bg-warmwit p-4 text-center">
                      <Heart className="h-6 w-6 text-oceaan mx-auto mb-1" />
                      <p className="text-xs font-bold text-nachtblauw">Mijn partner</p>
                    </div>
                  </div>

                  {/* Score bar */}
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="font-bold text-terracotta">Ik: 4</span>
                    <div className="flex-1 h-2 rounded-full bg-zand overflow-hidden flex">
                      <div className="bg-terracotta h-full" style={{ width: '60%' }} />
                      <div className="bg-oceaan h-full" style={{ width: '40%' }} />
                    </div>
                    <span className="font-bold text-oceaan">Partner: 2</span>
                  </div>
                </div>
              </PhoneMockup>
            </div>
            <div>
              <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold mb-4 bg-goud/10 text-goud">
                <Gamepad2 className="h-3.5 w-3.5" />
                Koppelspel
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-4 leading-tight">
                Wie past het beste bij...?
              </h2>
              <p className="text-base text-leisteen leading-relaxed mb-6 max-w-md">
                Speels en verrassend. Kies bij elke eigenschap wie het beste past: jij of je partner. Vergelijk daarna jullie antwoorden en lach om de verschillen.
              </p>
              <span className="inline-flex items-center gap-1.5 text-sm font-bold text-goud">
                Binnenkort beschikbaar
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ ALL FEATURES GRID ═══ */}
      <section id="features" className="bg-zand-light">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-3">
              Alles in een app
            </h2>
            <p className="text-base text-leisteen max-w-lg mx-auto">
              Acht manieren om jullie relatie te versterken. Elke dag iets
              anders.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="group rounded-2xl bg-warmwit border border-zand p-4 sm:p-5 text-center transition-all hover:shadow-lg hover:-translate-y-1"
              >
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-2xl mx-auto mb-3 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: f.color + "12" }}
                >
                  <f.icon className="h-5.5 w-5.5" style={{ color: f.color }} />
                </div>
                <h3 className="text-sm font-bold text-nachtblauw mb-1">
                  {f.title}
                </h3>
                <p className="text-xs text-leisteen leading-relaxed hidden sm:block">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section id="hoe-werkt-het" className="border-t border-zand">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-3">
              In 4 stappen aan de slag
            </h2>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-terracotta/20 via-salie/20 to-oceaan/20" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: 1, title: "Download", desc: "Gratis voor iPhone en Android", color: "#C4704B", icon: Smartphone },
                { step: 2, title: "Profiel aanmaken", desc: "Vertel iets over jullie relatie", color: "#7A9E7E", icon: Users },
                { step: 3, title: "Partner koppelen", desc: "Deel je code en verbind", color: "#5B8FA8", icon: Heart },
                { step: 4, title: "Samen groeien", desc: "Dagelijks een moment samen", color: "#D4A843", icon: Sparkles },
              ].map((s) => (
                <div key={s.step} className="text-center relative">
                  <div
                    className="flex h-16 w-16 items-center justify-center rounded-[1.25rem] mx-auto mb-4 shadow-sm"
                    style={{ backgroundColor: s.color + "15" }}
                  >
                    <s.icon className="h-7 w-7" style={{ color: s.color }} />
                  </div>
                  <div
                    className="text-xs font-extrabold mb-1"
                    style={{ color: s.color }}
                  >
                    Stap {s.step}
                  </div>
                  <h3 className="text-base font-bold text-nachtblauw mb-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-leisteen">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SOCIAL PROOF / QUOTE ═══ */}
      <section className="bg-nachtblauw">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <div className="flex justify-center gap-1 mb-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="h-5 w-5 text-goud fill-goud" />
            ))}
          </div>
          <blockquote className="text-xl sm:text-2xl font-semibold text-white leading-relaxed mb-6 max-w-2xl mx-auto">
            &ldquo;We praten nu over dingen waar we anders nooit over zouden beginnen. De check-ins zijn ons dagelijkse ritueel geworden.&rdquo;
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="h-10 w-10 rounded-full bg-terracotta flex items-center justify-center text-white font-bold text-sm">
              L&M
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-white">Lisa & Mark</div>
              <div className="text-xs text-white/50">3 jaar samen</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="border-t border-zand">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-3">
              Vragen?
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-2xl border border-zand bg-warmwit"
              >
                <summary className="flex cursor-pointer items-center justify-between px-5 py-4 text-[15px] font-bold text-nachtblauw list-none [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <ChevronDown className="h-4 w-4 text-leisteen transition-transform group-open:rotate-180 shrink-0 ml-4" />
                </summary>
                <div className="px-5 pb-4 text-sm text-leisteen leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1 text-sm font-bold text-terracotta hover:gap-2 transition-all"
            >
              Alle vragen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BLOG PREVIEW ═══ */}
      <section className="bg-zand-light/40 border-t border-zand">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-nachtblauw mb-3">
              Tips voor jullie relatie
            </h2>
            <p className="text-base text-leisteen max-w-lg mx-auto">
              Praktische artikelen over communicatie, quality time en meer.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { slug: "relatie-verbeteren", title: "Relatie verbeteren: 10 tips die echt werken" },
              { slug: "communicatie-in-relatie", title: "Beter communiceren met je partner" },
              { slug: "date-ideeen", title: "50 leuke date-ideeen voor koppels" },
            ].map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group rounded-2xl border border-zand bg-warmwit p-5 transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                <h3 className="text-sm font-bold text-nachtblauw mb-2 group-hover:text-terracotta transition-colors">
                  {post.title}
                </h3>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-terracotta group-hover:gap-2 transition-all">
                  Lees meer <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-sm font-bold text-terracotta hover:gap-2 transition-all"
            >
              Alle artikelen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ VADERCOACH CROSS-PROMO ═══ */}
      <section className="border-t border-zand">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="rounded-2xl border border-[#F59E0B]/20 bg-[#F59E0B]/5 p-6 sm:p-10 flex flex-col sm:flex-row items-start gap-6 sm:gap-10">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F59E0B]/10">
              <BookOpen className="h-7 w-7 text-[#F59E0B]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-extrabold text-nachtblauw mb-3">
                Ook vader? Ontdek De Vadercoach
              </h2>
              <p className="text-base text-leisteen leading-relaxed mb-5">
                Een sterke relatie en goed vaderschap gaan hand in hand. Met De Vadercoach werk je aan je opvoedvaardigheden met wetenschappelijk onderbouwde cursussen en dagelijkse oefeningen.
              </p>
              <a
                href="https://devadercoach.nl"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-[#F59E0B] px-6 py-3 text-sm font-bold text-nachtblauw transition-all hover:scale-[0.97]"
              >
                Bekijk De Vadercoach <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FINAL CTA ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-terracotta via-terracotta-dark to-nachtblauw" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-white/30" />
          <div className="absolute bottom-10 right-20 w-60 h-60 rounded-full border border-white/20" />
          <div className="absolute top-1/2 left-1/3 w-20 h-20 rounded-full border border-white/20" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur mb-6">
            <Heart className="h-8 w-8 text-white" strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            Jullie relatie begint hier
          </h2>
          <p className="text-lg text-white/75 mb-8 max-w-md mx-auto">
            Samen komt binnenkort beschikbaar voor iPhone en Android. Houd deze pagina in de gaten.
          </p>
          <div className="flex justify-center">
            <div
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white/20 backdrop-blur border border-white/25 px-8 py-4 text-base font-bold text-white cursor-default"
            >
              <Clock className="h-5 w-5" />
              Binnenkort beschikbaar
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
              },
            })),
          }),
        }}
      />
    </>
  );
}
