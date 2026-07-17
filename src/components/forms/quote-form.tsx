"use client";

import { useState } from "react";
import { Check, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { contact } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

type QuoteData = {
  need: "source" | "ship" | "";
  make: string;
  model: string;
  year: string;
  auctionSite: string;
  vin: string;
  ghanaCity: string;
  name: string;
  phone: string;
  email: string;
};

const initialData: QuoteData = {
  need: "",
  make: "",
  model: "",
  year: "",
  auctionSite: "",
  vin: "",
  ghanaCity: "",
  name: "",
  phone: "",
  email: "",
};

const steps = ["What you need", "Vehicle basics", "Delivery city", "Your contact"];

function inputClasses() {
  return "w-full rounded-sm border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";
}

function labelClasses() {
  return "block text-sm font-medium text-ink mb-1.5";
}

export default function QuoteForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [data, setData] = useState<QuoteData>(initialData);

  const update = (patch: Partial<QuoteData>) => setData((d) => ({ ...d, ...patch }));

  const canProceed = () => {
    if (step === 0) return data.need !== "";
    if (step === 1) return data.make.trim() !== "" && data.model.trim() !== "" && data.year.trim() !== "";
    if (step === 2) return data.ghanaCity.trim() !== "";
    if (step === 3) return data.name.trim() !== "" && data.phone.trim() !== "" && data.email.trim() !== "";
    return true;
  };

  const handleSubmit = async () => {
    if (!canProceed() || submitting) return;
    setSubmitting(true);
    setSubmitError(null);

    const needLabel = data.need === "source" ? "Source a car" : "Ship a car I already bought";
    const vehicleInterest = [
      `${needLabel}: ${data.year} ${data.make} ${data.model}`.trim(),
      data.auctionSite && `auction: ${data.auctionSite}`,
      data.vin && `VIN ${data.vin}`,
    ]
      .filter(Boolean)
      .join(" — ");

    const supabase = createClient();
    const { error } = await supabase.from("leads").insert({
      name: data.name,
      contact: `${data.phone} / ${data.email}`,
      vehicle_interest: vehicleInterest,
      ghana_city: data.ghanaCity,
    });

    setSubmitting(false);

    if (error) {
      setSubmitError(
        "Something went wrong sending your request. Your answers are still here — try again, or message us on WhatsApp."
      );
      return;
    }

    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-md border border-line bg-paper p-8 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink">
          <Check size={28} />
        </span>
        <h2 className="mt-5 font-heading text-2xl font-semibold uppercase tracking-wide text-ink">
          Thanks, {data.name.split(" ")[0] || "there"}
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/70 max-w-md mx-auto">
          We&apos;ve got your request for a {data.year} {data.make} {data.model} shipping to{" "}
          {data.ghanaCity}. Our team will reach out at {data.phone} within one business day.
        </p>
        <p className="mt-4 text-sm text-ink/60">
          Need a faster answer? Message us directly on{" "}
          <a href={contact.whatsapp.us.link} target="_blank" rel="noreferrer" className="text-gold-deep font-medium">
            WhatsApp
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border border-line bg-paper p-6 sm:p-8">
      <ol className="mb-8 flex items-center gap-2">
        {steps.map((label, i) => (
          <li key={label} className="flex-1">
            <div
              className={cn(
                "h-1.5 rounded-full",
                i <= step ? "bg-gold" : "bg-line"
              )}
            />
            <span
              className={cn(
                "mt-2 hidden sm:block text-xs font-medium uppercase tracking-wide",
                i === step ? "text-ink" : "text-ink/40"
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ol>

      {step === 0 && (
        <div>
          <h2 className="font-heading text-xl font-semibold uppercase tracking-wide text-ink">
            What do you need?
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              { value: "source", title: "Source a car", body: "Find and bid on a vehicle for me at auction." },
              { value: "ship", title: "Ship a car I already bought", body: "I've already won a vehicle and need it shipped to Ghana." },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => update({ need: opt.value as QuoteData["need"] })}
                className={cn(
                  "rounded-md border p-5 text-left transition-colors",
                  data.need === opt.value
                    ? "border-gold bg-gold/10"
                    : "border-line hover:border-ink/30"
                )}
              >
                <p className="font-heading text-base font-semibold uppercase tracking-wide text-ink">
                  {opt.title}
                </p>
                <p className="mt-1.5 text-sm text-ink/70">{opt.body}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="font-heading text-xl font-semibold uppercase tracking-wide text-ink">
            Vehicle basics
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClasses()}>Make *</label>
              <input
                className={inputClasses()}
                value={data.make}
                onChange={(e) => update({ make: e.target.value })}
                placeholder="Toyota"
              />
            </div>
            <div>
              <label className={labelClasses()}>Model *</label>
              <input
                className={inputClasses()}
                value={data.model}
                onChange={(e) => update({ model: e.target.value })}
                placeholder="Camry"
              />
            </div>
            <div>
              <label className={labelClasses()}>Year *</label>
              <input
                className={inputClasses()}
                value={data.year}
                onChange={(e) => update({ year: e.target.value })}
                placeholder="2020"
                inputMode="numeric"
              />
            </div>
            <div>
              <label className={labelClasses()}>Auction site (if known)</label>
              <input
                className={inputClasses()}
                value={data.auctionSite}
                onChange={(e) => update({ auctionSite: e.target.value })}
                placeholder="Copart, IAAI, Manheim..."
              />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClasses()}>VIN (if known)</label>
              <input
                className={inputClasses()}
                value={data.vin}
                onChange={(e) => update({ vin: e.target.value })}
                placeholder="17-character VIN"
              />
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="font-heading text-xl font-semibold uppercase tracking-wide text-ink">
            Where in Ghana is this headed?
          </h2>
          <div className="mt-5">
            <label className={labelClasses()}>Delivery city *</label>
            <input
              className={inputClasses()}
              value={data.ghanaCity}
              onChange={(e) => update({ ghanaCity: e.target.value })}
              placeholder="Accra, Kumasi, Takoradi..."
            />
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="font-heading text-xl font-semibold uppercase tracking-wide text-ink">
            How do we reach you?
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClasses()}>Full name *</label>
              <input
                className={inputClasses()}
                value={data.name}
                onChange={(e) => update({ name: e.target.value })}
                placeholder="Kwame Asante"
              />
            </div>
            <div>
              <label className={labelClasses()}>Phone / WhatsApp *</label>
              <input
                className={inputClasses()}
                value={data.phone}
                onChange={(e) => update({ phone: e.target.value })}
                placeholder="+233 ..."
              />
            </div>
            <div>
              <label className={labelClasses()}>Email *</label>
              <input
                type="email"
                className={inputClasses()}
                value={data.email}
                onChange={(e) => update({ email: e.target.value })}
                placeholder="you@example.com"
              />
            </div>
          </div>
        </div>
      )}

      {submitError && (
        <div className="mt-6 flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <p>{submitError}</p>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-sm font-medium text-ink/60 hover:text-ink disabled:opacity-0"
        >
          Back
        </button>

        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => canProceed() && setStep((s) => s + 1)}
            disabled={!canProceed()}
            className="inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink hover:bg-gold-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canProceed() || submitting}
            className="inline-flex items-center justify-center rounded-sm bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-ink hover:bg-gold-soft transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {submitting ? "Submitting…" : submitError ? "Try Again" : "Submit Request"}
          </button>
        )}
      </div>
    </div>
  );
}
