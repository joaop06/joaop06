import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { contact } from "@/data/contact";
import { trackUmami } from "@/lib/umami";

export type ContactFormLabels = {
  name: string;
  email: string;
  subject: string;
  message: string;
  submit: string;
  sending: string;
  mailtoHint: string;
  required: string;
  invalidEmail: string;
  defaultSubject: string;
  /** F7.5 — rótulos do corpo mailto alinhados ao locale */
  bodyName: string;
  bodyEmail: string;
};

type ContactFormProps = {
  labels: ContactFormLabels;
};

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function buildSchema(labels: ContactFormLabels) {
  return z.object({
    name: z.string().trim().min(1, labels.required),
    email: z.email({ error: labels.invalidEmail }),
    subject: z.string().trim(),
    message: z.string().trim().min(1, labels.required),
  });
}

/** Island: React Hook Form + Zod → mailto: (F2.23 / F2.24). */
export function ContactForm({ labels }: ContactFormProps) {
  const schema = buildSchema(labels);
  const [showMailtoHint, setShowMailtoHint] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    resolver: async (values) => {
      const parsed = schema.safeParse(values);
      if (parsed.success) {
        return { values: parsed.data, errors: {} };
      }
      const fieldErrors: Record<string, { type: string; message: string }> =
        {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "");
        if (key && !fieldErrors[key]) {
          fieldErrors[key] = { type: issue.code, message: issue.message };
        }
      }
      return { values: {}, errors: fieldErrors };
    },
  });

  function onSubmit(data: FormValues) {
    const subject = data.subject || labels.defaultSubject;
    const body = [
      `${labels.bodyName}: ${data.name}`,
      `${labels.bodyEmail}: ${data.email}`,
      "",
      data.message,
    ].join("\n");

    const href = `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    trackUmami("form-submit", { channel: "mailto" });
    setShowMailtoHint(false);
    window.location.href = href;

    window.setTimeout(() => {
      setShowMailtoHint(true);
    }, 1500);
  }

  const fieldClass =
    "mt-1 w-full rounded-xl border border-border-glass bg-bg-elevated px-3 py-2 text-fg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

  return (
    <form
      className="mt-6 flex max-w-xl flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-fg">
          {labels.name}
        </label>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          className={fieldClass}
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "contact-name-error" : undefined}
          {...register("name")}
        />
        {errors.name?.message ? (
          <p id="contact-name-error" className="mt-1 text-sm text-danger" role="alert">
            {errors.name.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-fg">
          {labels.email}
        </label>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          className={fieldClass}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={errors.email ? "contact-email-error" : undefined}
          {...register("email")}
        />
        {errors.email?.message ? (
          <p id="contact-email-error" className="mt-1 text-sm text-danger" role="alert">
            {errors.email.message}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="contact-subject" className="text-sm font-medium text-fg">
          {labels.subject}
        </label>
        <input
          id="contact-subject"
          type="text"
          className={fieldClass}
          {...register("subject")}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-fg">
          {labels.message}
        </label>
        <textarea
          id="contact-message"
          rows={5}
          className={fieldClass}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={
            errors.message ? "contact-message-error" : undefined
          }
          {...register("message")}
        />
        {errors.message?.message ? (
          <p
            id="contact-message-error"
            className="mt-1 text-sm text-danger"
            role="alert"
          >
            {errors.message.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-fit items-center justify-center rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-on-accent no-underline transition-opacity duration-[var(--dur-fast)] hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting ? labels.sending : labels.submit}
      </button>

      {showMailtoHint ? (
        <p className="text-sm text-fg-muted" role="status">
          {labels.mailtoHint}{" "}
          <a className="text-accent underline" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </p>
      ) : null}
    </form>
  );
}
