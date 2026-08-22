"use client";

import {
  LightBulbIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  MapPinIcon,
  UserGroupIcon,
  CpuChipIcon,
  CurrencyDollarIcon,
  ShieldCheckIcon,
  BuildingLibraryIcon,
  TruckIcon,
  MegaphoneIcon,
  EyeIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

/* ─── Flow Step ─── */
function FlowStep({
  icon: Icon,
  title,
  desc,
  color,
  step,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  color: string;
  step: number;
}) {
  return (
    <div className="relative flex flex-col items-center text-center group">
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg mb-3 group-hover:scale-110 transition-transform`}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>
      <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white/10 border border-white/20 text-[10px] font-bold text-slate-300 flex items-center justify-center">
        {step}
      </span>
      <h4 className="text-sm font-semibold text-white mb-1">{title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

/* ─── Revenue Card ─── */
function RevenueCard({
  icon: Icon,
  title,
  desc,
  gradient,
}: {
  icon: React.ElementType;
  title: string;
  desc: string;
  gradient: string;
}) {
  return (
    <div className={`rounded-2xl p-6 bg-gradient-to-br ${gradient} border border-white/10`}>
      <Icon className="w-8 h-8 text-white/80 mb-3" />
      <h4 className="text-base font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-white/70 leading-relaxed">{desc}</p>
    </div>
  );
}

export default function HowItWorksPage() {
  return (
    <main className="bg-[#0A0E1A] text-white min-h-screen pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">

        {/* ─── Hero ─── */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-1.5 text-xs font-medium text-cyan-400 mb-6">
            <SparklesIcon className="w-3.5 h-3.5" />
            The Vision
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            From Civic Problems to a{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Community-Powered Data Economy
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 max-w-3xl mx-auto leading-relaxed">
            What if reporting a pothole could create valuable data, help others make safer decisions,
            and generate economic opportunity for the reporter? That&apos;s the idea behind PoPP.
          </p>
        </section>

        {/* ─── The Goal ─── */}
        <section className="mb-16 rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <LightBulbIcon className="w-5 h-5 text-amber-400" />
            The Goal
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Build a community-powered system where people can{" "}
            <span className="text-cyan-400 font-medium">report real-world problems</span>,{" "}
            <span className="text-blue-400 font-medium">provide evidence</span>,{" "}
            <span className="text-violet-400 font-medium">help verify problems</span> reported by others, and{" "}
            <span className="text-emerald-400 font-medium">earn rewards</span> for their contributions.
          </p>
        </section>

        {/* ─── How It Works ─── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-8 text-center">How Does It Work?</h2>

          {/* Flow diagram */}
          <div className="flex flex-wrap items-start justify-center gap-4 sm:gap-6 mb-10">
            <FlowStep icon={MapPinIcon} title="Report" desc="User finds a problem and creates a ticket with evidence" color="from-cyan-500 to-blue-600" step={1} />
            <div className="hidden sm:flex items-center pt-5"><ArrowRightIcon className="w-5 h-5 text-slate-600" /></div>
            <FlowStep icon={EyeIcon} title="Evidence" desc="Photos, videos, location data submitted as proof" color="from-blue-500 to-violet-600" step={2} />
            <div className="hidden sm:flex items-center pt-5"><ArrowRightIcon className="w-5 h-5 text-slate-600" /></div>
            <FlowStep icon={UserGroupIcon} title="Community Vote" desc="Nearby participants (~10km) verify genuineness" color="from-violet-500 to-purple-600" step={3} />
            <div className="hidden sm:flex items-center pt-5"><ArrowRightIcon className="w-5 h-5 text-slate-600" /></div>
            <FlowStep icon={CpuChipIcon} title="AI + Human" desc="AI analyzes evidence, humans validate the result" color="from-purple-500 to-pink-600" step={4} />
            <div className="hidden sm:flex items-center pt-5"><ArrowRightIcon className="w-5 h-5 text-slate-600" /></div>
            <FlowStep icon={CurrencyDollarIcon} title="Earn Rewards" desc="Contributors receive tokens for verified data" color="from-emerald-500 to-teal-600" step={5} />
          </div>

          <div className="rounded-xl bg-white/[0.03] border border-white/10 p-5 text-sm text-slate-400 leading-relaxed">
            <p className="mb-2">
              When a user finds a problem &mdash; a pothole, damaged infrastructure, water issue, or electricity theft &mdash;
              they create a <span className="text-white font-medium">problem ticket</span> with evidence.
            </p>
            <p className="mb-2">
              People within approximately <span className="text-cyan-400 font-medium">10 km</span> are notified.
              They review the report and vote on whether it&apos;s genuine. Once the threshold is reached,
              the report moves to validation.
            </p>
            <p>
              <span className="text-white font-medium">AI analysis</span> (severity score, evidence quality, duplication check)
              combined with <span className="text-white font-medium">human validation</span> creates a trustworthy dataset.
              Verified contributors receive tokens.
            </p>
          </div>
        </section>

        {/* ─── Fairness ─── */}
        <section className="mb-16 rounded-2xl bg-gradient-to-br from-amber-500/5 to-orange-500/5 border border-amber-500/20 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <ShieldCheckIcon className="w-5 h-5 text-amber-400" />
            What If the Reward Is Unfair?
          </h2>
          <p className="text-slate-300 leading-relaxed mb-4">
            The community can challenge any reward. A participant or DAO member can raise a{" "}
            <span className="text-amber-400 font-medium">reward-review ticket</span>.
            The community reviews the contribution and votes on whether the reward should stay the same or increase.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-400">
            {["Report", "Evidence", "Community Vote", "AI Analysis", "Human Validation", "Severity", "Reward", "Reward Review"].map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <ArrowRightIcon className="w-3 h-3 text-slate-600" />}
                <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1 text-white/70">{s}</span>
              </span>
            ))}
          </div>
        </section>

        {/* ─── Revenue ─── */}
        <section className="mb-16">
          <h2 className="text-xl font-bold text-white mb-3 text-center">Where Does the Money Come From?</h2>
          <p className="text-sm text-slate-400 text-center mb-8 max-w-2xl mx-auto">
            The initial phase builds the network and creates verified data. Long-term value comes from the data and services built on top.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            <RevenueCard
              icon={MapPinIcon}
              title="Infrastructure Map"
              desc="Millions of verified civic problems create a live road health map — valuable to governments, logistics, navigation, and insurance companies via subscription data access."
              gradient="from-cyan-600/20 to-blue-600/20"
            />
            <RevenueCard
              icon={TruckIcon}
              title="Automotive & R&D Data"
              desc="Verified road-condition data helps automotive companies study relationships between potholes, suspension damage, tyre wear, and vehicle maintenance."
              gradient="from-violet-600/20 to-purple-600/20"
            />
            <RevenueCard
              icon={MegaphoneIcon}
              title="Brand Partnerships"
              desc="Automobile, tyre, insurance, and infrastructure companies can participate with relevant advertising — connected to the problems being reported."
              gradient="from-emerald-600/20 to-teal-600/20"
            />
          </div>
        </section>

        {/* ─── Creator Economy Parallel ─── */}
        <section className="mb-16 rounded-2xl bg-white/[0.03] border border-white/10 p-6 sm:p-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <BuildingLibraryIcon className="w-5 h-5 text-cyan-400" />
            The Creator Economy for Real-World Data
          </h2>
          <div className="text-slate-300 leading-relaxed space-y-3">
            <p>
              YouTube doesn&apos;t create every video. Millions of creators create content; the platform provides infrastructure and monetization.
            </p>
            <p>
              Here, instead of creating videos, <span className="text-cyan-400 font-medium">people create verified real-world data</span>.
              One person reports. Another verifies. Another provides evidence. AI analyzes. Humans validate.
              The community decides if rewards are fair.
            </p>
            <p>
              Over time, millions of contributions create something much larger than individual reports —
              a <span className="text-white font-medium">real-world data network</span> that generates economic value flowing back to contributors.
            </p>
          </div>
        </section>

        {/* ─── Vision ─── */}
        <section className="mb-16 text-center">
          <h2 className="text-xl font-bold text-white mb-6">The Vision</h2>
          <div className="max-w-3xl mx-auto rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/20 p-6 sm:p-8">
            <p className="text-slate-300 leading-relaxed mb-4">
              People observe the real world → report problems → evidence is collected → communities verify →
              AI analyzes → trusted data is created → businesses use it → revenue is generated →
              <span className="text-cyan-400 font-medium"> contributors share in the value</span>.
            </p>
            <p className="text-white font-semibold text-lg">
              Solving and documenting real-world problems becomes economically meaningful.
            </p>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="text-center">
          <p className="text-slate-400 mb-4">
            Today, someone sees a pothole and drives past it.<br />
            Tomorrow, they can <span className="text-cyan-400">report it, verify it, and earn from it</span>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/submit"
              className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              Report a Problem
            </Link>
            <Link
              href="/validators"
              className="rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
            >
              Become a Validator
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
