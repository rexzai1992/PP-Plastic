"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { ContactFormValues } from "@/types/quote";
import { generateContactMessage, generateWhatsAppLink } from "@/lib/whatsapp";
import { useLanguage } from "@/components/LanguageProvider";

const initialValues: ContactFormValues = {
  company: "",
  email: "",
  message: "",
  name: "",
  phone: "",
};

export function ContactForm() {
  const { language } = useLanguage();
  const copy =
    language === "bm"
      ? {
          nameError: "Nama diperlukan.",
          phoneError: "Nombor telefon diperlukan.",
          title: "Hubungi Pasukan Jualan",
          description:
            "Borang ini akan buka WhatsApp supaya team kami boleh respon dengan cepat.",
          name: "Nama",
          company: "Syarikat",
          phone: "Telefon",
          email: "Email",
          message: "Mesej",
          placeholder: "Beritahu produk plastik atau maklumat harga yang anda perlukan.",
          send: "Hantar ke WhatsApp",
        }
      : {
          nameError: "Name is required.",
          phoneError: "Phone number is required.",
          title: "Contact Sales Team",
          description: "This contact form redirects to WhatsApp so your team can respond quickly.",
          name: "Name",
          company: "Company",
          phone: "Phone",
          email: "Email",
          message: "Message",
          placeholder: "Tell us what plastic products or quotation details you need.",
          send: "Send to WhatsApp",
        };
  const [values, setValues] = useState(initialValues);

  function updateValue<Key extends keyof ContactFormValues>(
    key: Key,
    value: ContactFormValues[Key],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function handleSubmit() {
    if (!values.name.trim()) {
      toast.error(copy.nameError);
      return;
    }

    if (!values.phone.trim()) {
      toast.error(copy.phoneError);
      return;
    }

    window.open(
      generateWhatsAppLink(generateContactMessage(values)),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <div className="rounded-3xl border border-[#E5E7EB] bg-white p-8 shadow-sm">
      <h2 className="text-2xl font-semibold text-[#1F2933]">{copy.title}</h2>
      <p className="mt-3 text-sm leading-7 text-[#6B7280]">
        {copy.description}
      </p>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.name}
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={values.name}
            onChange={(event) => updateValue("name", event.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.company}
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={values.company}
            onChange={(event) => updateValue("company", event.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.phone}
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={values.phone}
            onChange={(event) => updateValue("phone", event.target.value)}
          />
        </label>
        <label className="block text-sm font-medium text-[#1F2933]">
          {copy.email}
          <input
            className="mt-2 h-11 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 text-sm outline-none transition focus:border-[#0F4C81]"
            value={values.email}
            onChange={(event) => updateValue("email", event.target.value)}
          />
        </label>
      </div>

      <label className="mt-4 block text-sm font-medium text-[#1F2933]">
        {copy.message}
        <textarea
          className="mt-2 min-h-28 w-full rounded-lg border border-[#D6DCE3] bg-white px-3 py-3 text-sm outline-none transition focus:border-[#0F4C81]"
          placeholder={copy.placeholder}
          value={values.message}
          onChange={(event) => updateValue("message", event.target.value)}
        />
      </label>

      <button
        className="mt-6 inline-flex rounded-lg bg-[#1F6F5B] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#175746]"
        type="button"
        onClick={handleSubmit}
      >
        {copy.send}
      </button>
    </div>
  );
}
