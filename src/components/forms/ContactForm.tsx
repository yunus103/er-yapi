"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const schema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalı"),
  email: z.string().email("Geçerli bir e-posta girin"),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, "Mesaj en az 10 karakter olmalı"),
});

type FormData = z.infer<typeof schema>;
type Status = "idle" | "loading" | "success" | "error";
type FieldErrors = Partial<Record<keyof FormData, string[]>>;

type ContactFormProps = {
  formTitle?: string;
  successMessage?: string;
};

export function ContactForm({
  formTitle = "Bize Ulaşın",
  successMessage = "Mesajınız alındı. En kısa sürede size dönüş yapacağız.",
}: ContactFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Alan hatasını temizle
    if (fieldErrors[name as keyof FormData]) {
      setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setFieldErrors({});

    // Client-side validasyon
    const result = schema.safeParse(formData);
    if (!result.success) {
      setFieldErrors(result.error.flatten().fieldErrors as FieldErrors);
      setStatus("idle");
      return;
    }

    // Honeypot alanını al
    const form = e.currentTarget;
    const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, honeypot }),
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json();
        if (data.error && typeof data.error === "object") {
          setFieldErrors(data.error);
        }
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border bg-card p-8 text-center shadow-sm space-y-4">
        <div className="size-16 rounded-full bg-emerald-50 text-emerald-600 font-bold text-3xl flex items-center justify-center mx-auto border border-emerald-200">
          ✓
        </div>
        <h3 className="text-2xl font-bold font-heading text-foreground">Mesajınız Alındı</h3>
        <p className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed">{successMessage}</p>
        <Button onClick={() => setStatus("idle")} variant="outline" className="mt-4">
          Yeni Mesaj Gönder
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border bg-card p-6 md:p-8 shadow-sm space-y-6">
      {formTitle && (
        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-heading text-foreground">{formTitle}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aşağıdaki formu doldurarak bize doğrudan mesaj gönderebilirsiniz.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Honeypot — spam botları için gizli alan */}
        <div className="absolute opacity-0 pointer-events-none h-0 overflow-hidden" aria-hidden="true">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-semibold text-foreground">
              Ad Soyad *
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Adınız Soyadınız"
              className="h-11 rounded-xl bg-background text-sm"
              aria-invalid={!!fieldErrors.name}
            />
            {fieldErrors.name && (
              <p className="text-sm font-medium text-destructive">{fieldErrors.name[0]}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-semibold text-foreground">
              E-posta *
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@mail.com"
              className="h-11 rounded-xl bg-background text-sm"
              aria-invalid={!!fieldErrors.email}
            />
            {fieldErrors.email && (
              <p className="text-sm font-medium text-destructive">{fieldErrors.email[0]}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-semibold text-foreground">
              Telefon
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+90 5XX XXX XX XX"
              className="h-11 rounded-xl bg-background text-sm"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-semibold text-foreground">
              Konu
            </Label>
            <Input
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Mesajınızın konusu"
              className="h-11 rounded-xl bg-background text-sm"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="text-sm font-semibold text-foreground">
            Mesajınız *
          </Label>
          <Textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Ürün talebi, stok sorgulama veya mesajınız..."
            rows={5}
            className="rounded-xl bg-background text-sm resize-none"
            aria-invalid={!!fieldErrors.message}
          />
          {fieldErrors.message && (
            <p className="text-sm font-medium text-destructive">{fieldErrors.message[0]}</p>
          )}
        </div>

        {status === "error" && (
          <div className="p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-sm font-medium text-destructive">
            Mesajınız gönderilemedi. Lütfen alanları kontrol edip tekrar deneyin.
          </div>
        )}

        <Button
          type="submit"
          disabled={status === "loading"}
          size="lg"
          className="w-full sm:w-auto h-12 px-8 text-base font-semibold cursor-pointer"
        >
          {status === "loading" ? "Gönderiliyor..." : "Mesajı Gönder"}
        </Button>
      </form>
    </div>
  );
}
