"use client";

import React from "react";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";

type Plan = {
  id: string;
  name: string;
  price: string;
  period: string;
  cta: string;
  highlight?: boolean;
  features: string[];
};

const PLANS: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "$0",
    period: "/mo",
    cta: "Get Started",
    features: [
      "Community access",
      "AI Chatbot (limited)",
      "Technical Analysis (read-only)",
      "Indices & Forex overview",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: "$19",
    period: "/mo",
    cta: "Upgrade to Pro",
    highlight: true,
    features: [
      "Full AI Chatbot access",
      "Interactive Technical Analysis",
      "Custom timeframes & indicators",
      "Priority API throughput",
      "Email support",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "Custom",
    period: "",
    cta: "Contact Sales",
    features: [
      "On-prem/Private cloud",
      "SLAs & dedicated support",
      "SAML/SSO & RBAC",
      "Custom integrations",
      "Advanced analytics",
    ],
  },
];

export default function SubscriptionPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-10 md:px-8 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Choose your plan</h1>
          <p className="mt-3 text-slate-600">Flexible options for investors, analysts, and teams.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-xl border shadow-sm bg-white p-6 flex flex-col ${
                plan.highlight ? "ring-2 ring-[#4B9770]" : ""
              }`}
            >
              <div className="mb-4">
                <div className="text-sm uppercase tracking-wider text-slate-500">{plan.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-slate-900">{plan.price}</div>
                  {plan.period && <div className="text-slate-500">{plan.period}</div>}
                </div>
              </div>

              <ul className="space-y-2 text-sm text-slate-700 flex-1">
                {plan.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-[#4B9770]" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  if (plan.id === "basic") router.push("/signup");
                  else if (plan.id === "pro") router.push("/signup?plan=pro");
                  else router.push("/contact");
                }}
                className={`mt-6 w-full py-2.5 rounded-md text-sm font-medium transition-colors ${
                  plan.highlight
                    ? "bg-[#4B9770] text-white hover:bg-[#3f8462]"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {plan.cta}
              </button>

              {plan.id === "enterprise" && (
                <p className="mt-2 text-xs text-slate-500 text-center">
                  We will tailor pricing to your needs.
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => router.push("/")}
            className="text-[#4B9770] hover:text-[#3f8462] font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
