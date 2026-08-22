"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeftIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default function WhitepaperPage() {
  return (
    <div className="bg-[#030712] text-white min-h-screen pt-20 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Back + Download */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Back to Home
          </Link>
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition"
          >
            <DocumentArrowDownIcon className="w-4 h-4" />
            Save as PDF
          </button>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs font-medium text-cyan-400 mb-6">
            PoPP Whitepaper
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight mb-4">
            From Civic Problems to a{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Community-Powered Data Economy
            </span>
          </h1>
          <div className="flex items-center gap-4 mt-4 text-sm text-gray-500">
            <span>By PoPP Research Team</span><span>&middot;</span>
            <time dateTime="2025-06-01">June 2025</time><span>&middot;</span>
            <span>Last updated: August 2025</span>
          </div>
        </motion.div>

        {/* Content */}
        <motion.article
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="prose prose-invert prose-lg max-w-none
            [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-12 [&_h2]:mb-4
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
            [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
            [&_strong]:text-white [&_strong]:font-semibold
            [&_ul]:text-gray-300 [&_ul]:mb-4 [&_ul_li]:mb-1
            [&_li]:text-gray-300
          "
        >
          <p>
            What if reporting a pothole was not just about complaining about a broken road?
          </p>
          <p>
            What if that simple action could create valuable data, help other people make safer decisions, and eventually generate an economic opportunity for the person who reported it?
          </p>
          <p>
            That is the idea behind this project.
          </p>
          <p>
            The goal is to build a community-powered system where people can report real-world problems, provide evidence, help verify problems reported by others, and earn rewards for their contributions.
          </p>

          <h2>How does it work?</h2>
          <p>
            When a user finds a real-world problem—such as a pothole, damaged civic infrastructure, water-related issue, or electricity theft—they can create a <strong>problem ticket</strong>.
          </p>
          <p>
            The user must provide evidence, such as photographs, videos, location information, or other relevant information.
          </p>
          <p>
            Once the problem is reported, people within approximately <strong>10 km</strong> of that location can be notified.
          </p>
          <p>
            These nearby participants can review the report and vote on whether the reported problem is genuine.
          </p>
          <p>
            Once the required voting threshold is reached, the system moves the report into the validation process.
          </p>

          <h2>AI + Human Validation</h2>
          <p>
            The system does not simply trust one person&apos;s report.
          </p>
          <p>AI can analyze the submitted evidence and generate information such as:</p>
          <ul>
            <li>Severity score</li>
            <li>Evidence quality</li>
            <li>Possible duplication</li>
            <li>Location consistency</li>
            <li>Problem classification</li>
          </ul>
          <p>
            Human participants can then review and validate the problem.
          </p>
          <p>
            The combination of <strong>community participation, AI analysis, and human validation</strong> can help create a more trustworthy dataset.
          </p>
          <p>
            If the system determines that a report is genuine, the contributors involved in creating and validating that verified information can receive tokens according to their contribution.
          </p>

          <h2>What if the reward is unfair?</h2>
          <p>
            This is an important part of the system.
          </p>
          <p>
            Imagine that the system gives a participant 100 tokens for a particular contribution, but the community believes that the contribution was much more valuable.
          </p>
          <p>
            Instead of making the reward system completely centralized, the community can challenge the reward.
          </p>
          <p>
            A participant or DAO member can raise a <strong>reward-review ticket</strong>.
          </p>
          <p>
            The community can then review the contribution and vote on whether the reward should remain the same or be increased.
          </p>
          <p>This creates a feedback loop:</p>
          <p className="text-cyan-400 font-semibold text-base bg-cyan-500/5 border border-cyan-500/10 rounded-xl px-5 py-4">
            Report → Evidence → Community Vote → AI Analysis → Human Validation → Severity → Reward → Reward Review
          </p>
          <p>
            The objective is to make the system increasingly fair as more people participate.
          </p>

          <h2>But where does the money come from?</h2>
          <p>
            This is the most important question.
          </p>
          <p>
            In the beginning, the platform may have very limited data and therefore limited revenue.
          </p>
          <p>
            At that stage, distributing tokens does not automatically mean that the platform has generated real economic value.
          </p>
          <p>
            So the initial phase is about <strong>building the network and creating verified data</strong>.
          </p>
          <p>
            The long-term value comes from the data and services that can be built on top of that network.
          </p>

          <h3>1. Building a real-world infrastructure map</h3>
          <p>
            Imagine millions of verified civic problems across India.
          </p>
          <p>
            Instead of having a simple map, we could have a continuously changing <strong>real-world infrastructure map</strong>.
          </p>
          <p>For example, the system could calculate:</p>
          <ul>
            <li>Road health</li>
            <li>Pothole density</li>
            <li>Infrastructure condition</li>
            <li>Road safety scores</li>
            <li>Problem severity</li>
            <li>Historical deterioration</li>
            <li>Safer driving recommendations</li>
            <li>Suggested speeds based on road conditions</li>
          </ul>
          <p>
            A road would no longer simply be represented as a line on a map.
          </p>
          <p>
            It could have a <strong>live health score</strong> based on verified real-world observations.
          </p>
          <p>
            This type of information could become valuable to governments, logistics companies, navigation platforms, mobility companies, insurance companies, and other organizations.
          </p>
          <p>
            The platform could offer this information through a <strong>subscription or data-access model</strong>.
          </p>

          <h3>2. Automotive and R&amp;D Data</h3>
          <p>
            There is another interesting possibility.
          </p>
          <p>
            Road conditions affect vehicles.
          </p>
          <p>
            If we have a large amount of verified pothole and road-condition data, automotive companies could potentially use aggregated data for research and development.
          </p>
          <p>For example, researchers could study relationships between poor road conditions and:</p>
          <ul>
            <li>Wheel alignment problems</li>
            <li>Suspension damage</li>
            <li>Tyre damage</li>
            <li>Loose components</li>
            <li>Vehicle maintenance</li>
            <li>Other road-related vehicle issues</li>
          </ul>
          <p>
            The platform could therefore become more than a civic reporting system.
          </p>
          <p>
            It could become a <strong>real-world road-condition data network</strong>.
          </p>

          <h3>3. Advertising and Brand Partnerships</h3>
          <p>
            The third revenue source could be advertising and partnerships.
          </p>
          <p>
            Companies that have a natural connection with this ecosystem could potentially participate.
          </p>
          <p>For example:</p>
          <ul>
            <li>Automobile manufacturers</li>
            <li>Tyre companies</li>
            <li>Insurance companies</li>
            <li>Mobility companies</li>
            <li>Navigation companies</li>
            <li>Automotive service providers</li>
            <li>Infrastructure companies</li>
          </ul>
          <p>
            Instead of showing completely unrelated advertisements, the platform could create opportunities for brands that are relevant to the problems being reported.
          </p>

          <h2>The bigger idea: sharing the value</h2>
          <p>
            This is where the project becomes interesting.
          </p>
          <p>
            If the community creates the data, the community should have an opportunity to participate in the value generated from that data.
          </p>
          <p>
            Think about the creator economy.
          </p>
          <p>
            YouTube does not create every video. Millions of creators create the content, while the platform provides the infrastructure and monetization system.
          </p>
          <p>
            A similar concept could be applied here.
          </p>
          <p>
            Instead of people creating videos, <strong>people create verified real-world data.</strong>
          </p>
          <p>
            One person reports a problem.
          </p>
          <p>
            Another person verifies it.
          </p>
          <p>
            Another person provides additional evidence.
          </p>
          <p>
            AI analyzes it.
          </p>
          <p>
            Human participants validate it.
          </p>
          <p>
            The community determines whether the reward is fair.
          </p>
          <p>
            Over time, millions of these contributions can create something much larger than individual reports.
          </p>

          <h2>From a pothole to an economic network</h2>
          <p>
            A pothole may look like a small problem.
          </p>
          <p>
            But one verified pothole contains information about:
          </p>
          <p className="text-white font-semibold text-base bg-white/5 border border-white/10 rounded-xl px-5 py-4">
            Location + road condition + severity + evidence + time + surrounding infrastructure.
          </p>
          <p>
            Now imagine millions of such records.
          </p>
          <p>
            The individual report becomes a small piece of a much larger dataset.
          </p>
          <p>
            That dataset can help us understand how our roads and infrastructure are actually performing in the real world.
          </p>
          <p>
            And if organizations are willing to pay for that information, the economic value can flow back into the network.
          </p>

          <h2>The vision</h2>
          <p>
            The long-term vision is not simply:
          </p>
          <p className="text-gray-400 italic">
            &ldquo;Report potholes and earn tokens.&rdquo;
          </p>
          <p>It is:</p>
          <p className="text-cyan-400 font-semibold text-base bg-cyan-500/5 border border-cyan-500/10 rounded-xl px-5 py-4">
            People observe the real world → People report problems → Evidence is collected → Communities verify information → AI analyzes it → Trusted data is created → Businesses use the data → Revenue is generated → Contributors share in the value.
          </p>
          <p>
            The ultimate goal is to create a system where <strong>solving and documenting real-world problems becomes economically meaningful</strong>.
          </p>
          <p>
            Today, someone may see a pothole and simply drive past it.
          </p>
          <p>
            Tomorrow, that same person could think:
          </p>
          <p className="text-white font-semibold text-base bg-white/5 border border-white/10 rounded-xl px-5 py-4">
            &ldquo;I can report this, help create verified information, help my community, and potentially earn from the value that this data creates.&rdquo;
          </p>
          <p>
            That changes the incentive.
          </p>
          <p>
            It turns <strong>civic participation into contribution</strong>.
          </p>
          <p>
            And it turns <strong>real-world problems into valuable, verifiable data.</strong>
          </p>
        </motion.article>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-violet-500/10 border border-cyan-500/20 p-8">
            <h3 className="text-xl font-bold text-white mb-3">Ready to contribute?</h3>
            <p className="text-gray-400 mb-6">Join the community building verified real-world data.</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/report"
                className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-cyan-500/25 transition-all"
              >
                Report a Problem
              </Link>
              <Link
                href="/how-it-works"
                className="rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-all"
              >
                How It Works
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
