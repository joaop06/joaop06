import { useState } from "react";
import { Copy } from "lucide-react";
import { Icon } from "./Icon";

type CopyButtonProps = {
  value: string;
  label: string;
  copiedLabel: string;
  buttonLabel: string;
  className?: string;
};

/** Botão para copiar credencial UUID (F2.12). */
export function CopyButton({
  value,
  label,
  copiedLabel,
  buttonLabel,
  className,
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <button
      type="button"
      className={className}
      onClick={handleCopy}
      aria-label={label}
    >
      <Icon icon={Copy} className="size-4" aria-hidden />
      <span>{copied ? copiedLabel : buttonLabel}</span>
    </button>
  );
}
