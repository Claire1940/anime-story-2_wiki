"use client";

import { Suspense, lazy } from "react";
import { Gift, Check, ArrowRight, Sparkles, ExternalLink } from "lucide-react";
import Link from "next/link";
import { useMessages } from "next-intl";
import { VideoFeature } from "@/components/home/VideoFeature";
import { LatestGuidesAccordion } from "@/components/home/LatestGuidesAccordion";
import { NativeBannerAd, AdBanner } from "@/components/ads";
import { getPreferredMobileBannerSelection } from "@/components/ads/mobileAdConfigs";
import { SidebarAd } from "@/components/ads/SidebarAd";
import { scrollToSection } from "@/lib/scrollToSection";
import { DynamicIcon } from "@/components/ui/DynamicIcon";
import type { ContentItemWithType } from "@/lib/getLatestArticles";
import type { ModuleLinkMap } from "@/lib/buildModuleLinkMap";

const HeroStats = lazy(() => import("@/components/home/HeroStats"));
const FAQSection = lazy(() => import("@/components/home/FAQSection"));
const CTASection = lazy(() => import("@/components/home/CTASection"));

const LoadingPlaceholder = ({ height = "h-64" }: { height?: string }) => (
  <div className={`${height} bg-white/5 border border-border rounded-xl animate-pulse`} />
);

interface HomePageClientProps {
  latestArticles: ContentItemWithType[];
  moduleLinkMap: ModuleLinkMap;
  locale: string;
}

export default function HomePageClient({ latestArticles, locale }: HomePageClientProps) {
  const t = useMessages() as any;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://anime-story-2.wiki";
  const mobileBannerAd = getPreferredMobileBannerSelection();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: siteUrl,
        name: "Anime Story 2 Wiki",
        description: "Anime Story 2 wiki hub with codes, beginner route, tier picks, units, traits, worlds, items, and endgame farming guides.",
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Anime Story 2 Wiki",
        url: siteUrl,
        sameAs: [
          "https://www.roblox.com/games/116766451305209/Anime-Story-2",
          "https://www.roblox.com/communities/35906875/Anime-Story-Lab",
          "https://www.youtube.com/watch?v=QzjTUZUQeAE",
        ],
      },
    ],
  };

  return (
    <div className="home-shell min-h-screen bg-background text-foreground">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ left: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x300" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X300} />
      </aside>
      <aside className="hidden xl:block fixed top-20 w-40 z-10" style={{ right: "calc((100vw - 896px) / 2 - 180px)" }}>
        <SidebarAd type="sidebar-160x600" adKey={process.env.NEXT_PUBLIC_AD_SIDEBAR_160X600} />
      </aside>

      <section className="relative overflow-hidden px-4 pt-24 pb-14 md:pt-32 md:pb-20">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8 scroll-reveal">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 md:px-4 md:py-2 bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] mb-4 md:mb-6">
              <Sparkles className="w-4 h-4 text-[hsl(var(--nav-theme-light))]" />
              <span className="text-xs md:text-sm font-medium">{t.hero.badge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 md:mb-6 leading-[1.05]">{t.hero.title}</h1>
            <p className="mx-auto mb-8 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg md:mb-10 md:max-w-3xl md:text-2xl">{t.hero.description}</p>
            <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row md:mb-12 md:gap-4">
              <button
                onClick={() => scrollToSection("codes")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 bg-[hsl(var(--nav-theme))] hover:bg-[hsl(var(--nav-theme)/0.9)] text-white rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                <Gift className="w-5 h-5" />
                {t.hero.getFreeCodesCTA}
              </button>
              <a
                href="https://www.roblox.com/games/116766451305209/Anime-Story-2"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 md:px-8 md:py-4 border border-border hover:bg-white/10 rounded-lg font-semibold text-base md:text-lg transition-colors"
              >
                {t.hero.playOnSteamCTA}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
          <Suspense fallback={<LoadingPlaceholder height="h-32" />}>
            <HeroStats stats={Object.values(t.hero.stats)} />
          </Suspense>
        </div>
      </section>

      <NativeBannerAd adKey={process.env.NEXT_PUBLIC_AD_NATIVE_BANNER || ""} />

      <section className="px-4 py-10 md:py-12">
        <div className="scroll-reveal container mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl">
            <VideoFeature videoId="QzjTUZUQeAE" title="Anime Story 2 Release & Codes" posterImage="/images/hero.webp" />
          </div>
        </div>
      </section>

      <LatestGuidesAccordion articles={latestArticles} locale={locale} max={12} />

      <section className="px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-8 md:mb-12 scroll-reveal">
            <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4">
              {t.tools.title} <span className="text-[hsl(var(--nav-theme-light))]">{t.tools.titleHighlight}</span>
            </h2>
            <p className="text-base md:text-lg text-muted-foreground">{t.tools.subtitle}</p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
            <a href="#codes" onClick={(e) => { e.preventDefault(); scrollToSection("codes"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "0ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[0].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[0].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[0].description}</p></a>
            <a href="#beginner-guide" onClick={(e) => { e.preventDefault(); scrollToSection("beginner-guide"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "50ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[1].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[1].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[1].description}</p></a>
            <a href="#tier-list" onClick={(e) => { e.preventDefault(); scrollToSection("tier-list"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "100ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[2].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[2].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[2].description}</p></a>
            <a href="#units-guide" onClick={(e) => { e.preventDefault(); scrollToSection("units-guide"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "150ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[3].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[3].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[3].description}</p></a>
            <a href="#traits-rerolls" onClick={(e) => { e.preventDefault(); scrollToSection("traits-rerolls"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "200ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[4].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[4].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[4].description}</p></a>
            <a href="#worlds-progression" onClick={(e) => { e.preventDefault(); scrollToSection("worlds-progression"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "250ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[5].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[5].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[5].description}</p></a>
            <a href="#items-relics-materials" onClick={(e) => { e.preventDefault(); scrollToSection("items-relics-materials"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "300ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[6].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[6].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[6].description}</p></a>
            <a href="#tower-raids-slime-event" onClick={(e) => { e.preventDefault(); scrollToSection("tower-raids-slime-event"); }} className="scroll-reveal group rounded-xl border border-border p-4 md:p-6 bg-card hover:border-[hsl(var(--nav-theme)/0.5)] transition-all duration-300 cursor-pointer text-left hover:shadow-lg hover:shadow-[hsl(var(--nav-theme)/0.1)]" style={{ animationDelay: "350ms" }}><div className="mb-3 h-10 w-10 rounded-lg md:mb-4 md:h-12 md:w-12 bg-[hsl(var(--nav-theme)/0.1)] flex items-center justify-center group-hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors"><DynamicIcon name={t.tools.cards[7].icon} className="h-5 w-5 md:h-6 md:w-6 text-[hsl(var(--nav-theme-light))]" /></div><h3 className="mb-1.5 text-sm md:text-base font-semibold">{t.tools.cards[7].title}</h3><p className="text-sm text-muted-foreground">{t.tools.cards[7].description}</p></a>
          </div>
        </div>
      </section>

      <AdBanner type="banner-300x250" adKey={process.env.NEXT_PUBLIC_AD_BANNER_300X250} className="md:hidden" />
      <AdBanner type="banner-728x90" adKey={process.env.NEXT_PUBLIC_AD_BANNER_728X90} className="hidden md:flex" />

      <section id="codes" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2Codes.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2Codes.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {t.modules.animeStory2Codes.cards.map((card: any) => (
              <div key={card.code} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <div className="flex items-center justify-between gap-3 mb-2">
                  <p className="font-bold text-[hsl(var(--nav-theme-light))]">{card.code}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)]">{card.tag}</span>
                </div>
                <p className="text-sm text-muted-foreground">{card.reward}</p>
              </div>
            ))}
          </div>
          <div className="p-5 bg-[hsl(var(--nav-theme)/0.06)] border border-[hsl(var(--nav-theme)/0.3)] rounded-xl">
            <h3 className="font-bold mb-3">{t.modules.animeStory2Codes.redeemTitle}</h3>
            <ul className="space-y-2">
              {t.modules.animeStory2Codes.redeemSteps.map((step: string, i: number) => (
                <li key={step} className="flex items-start gap-2 text-sm text-muted-foreground"><Check className="w-4 h-4 mt-0.5 text-[hsl(var(--nav-theme-light))]" />{i + 1}. {step}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="beginner-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2BeginnerGuide.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2BeginnerGuide.intro}</p>
          <div className="space-y-3">
            {t.modules.animeStory2BeginnerGuide.steps.map((step: any, i: number) => (
              <div key={step.title} className="p-5 bg-white/5 border border-border rounded-xl hover:border-[hsl(var(--nav-theme)/0.5)] transition-colors">
                <h3 className="font-bold mb-2">{i + 1}. {step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tier-list" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2TierList.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2TierList.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {t.modules.animeStory2TierList.tiers.map((tier: any) => (
              <div key={tier.name} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold text-[hsl(var(--nav-theme-light))] mb-2">{tier.name}</h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {tier.units.map((unit: string) => <li key={unit}>• {unit}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="units-guide" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2UnitsGuide.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2UnitsGuide.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.animeStory2UnitsGuide.cards.map((card: any) => (
              <div key={card.name} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1">{card.name}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="traits-rerolls" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2TraitsRerollsGuide.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2TraitsRerollsGuide.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.animeStory2TraitsRerollsGuide.traits.map((item: any) => (
              <div key={item.name} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1 text-[hsl(var(--nav-theme-light))]">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="worlds-progression" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2WorldsProgression.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2WorldsProgression.intro}</p>
          <div className="space-y-3">
            {t.modules.animeStory2WorldsProgression.steps.map((step: any, i: number) => (
              <div key={step.title} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-2">Stage {i + 1}: {step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="items-relics-materials" className="scroll-mt-24 px-4 py-14 md:py-20">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2ItemsRelicsMaterials.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2ItemsRelicsMaterials.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {t.modules.animeStory2ItemsRelicsMaterials.cards.map((card: any) => (
              <div key={card.name} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1">{card.name}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="tower-raids-slime-event" className="scroll-mt-24 px-4 py-14 md:py-20 bg-white/[0.02]">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-center">{t.modules.animeStory2TowerRaidsSlimeEvent.title}</h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto text-center mb-8">{t.modules.animeStory2TowerRaidsSlimeEvent.intro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {t.modules.animeStory2TowerRaidsSlimeEvent.cards.map((card: any) => (
              <div key={card.name} className="p-5 bg-white/5 border border-border rounded-xl">
                <h3 className="font-bold mb-1 text-[hsl(var(--nav-theme-light))]">{card.name}</h3>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
          <a href="https://www.roblox.com/games/116766451305209/Anime-Story-2" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--nav-theme)/0.1)] border border-[hsl(var(--nav-theme)/0.3)] text-sm hover:bg-[hsl(var(--nav-theme)/0.2)] transition-colors">
            Open Anime Story 2 on Roblox <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      <Suspense fallback={<LoadingPlaceholder />}>
        <FAQSection title={t.faq.title} titleHighlight={t.faq.titleHighlight} subtitle={t.faq.subtitle} questions={t.faq.questions} />
      </Suspense>

      <Suspense fallback={<LoadingPlaceholder />}>
        <CTASection title={t.cta.title} description={t.cta.description} joinCommunity={t.cta.joinCommunity} joinGame={t.cta.joinGame} />
      </Suspense>

      {mobileBannerAd && <AdBanner type={mobileBannerAd.type} adKey={mobileBannerAd.adKey} className="md:hidden" />}

      <footer className="bg-white/[0.02] border-t border-border">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4 text-[hsl(var(--nav-theme-light))]">{t.footer.title}</h3>
              <p className="text-sm text-muted-foreground">{t.footer.description}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.community}</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="https://www.roblox.com/communities/35906875/Anime-Story-Lab" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.discord}</a></li>
                <li><a href="https://www.youtube.com/watch?v=QzjTUZUQeAE" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.twitter}</a></li>
                <li><a href="https://www.roblox.com/games/116766451305209/Anime-Story-2" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.robloxCommunity}</a></li>
                <li><a href="https://www.roblox.com/games/116766451305209/Anime-Story-2" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.robloxPlatform}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.legal}</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.about}</Link></li>
                <li><Link href="/privacy-policy" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.privacy}</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.terms}</Link></li>
                <li><Link href="/copyright" className="text-muted-foreground hover:text-[hsl(var(--nav-theme-light))] transition">{t.footer.copyrightNotice}</Link></li>
              </ul>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-2">{t.footer.copyright}</p>
              <p className="text-xs text-muted-foreground">{t.footer.disclaimer}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
