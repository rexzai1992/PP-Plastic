import Link from "next/link";

interface EmptyStateProps {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-[#D6DCE3] bg-white p-10 text-center shadow-sm">
      <h2 className="text-2xl font-semibold text-[#1F2933]">{title}</h2>
      <p className="mt-3 text-base leading-7 text-[#6B7280]">{description}</p>
      {actionHref && actionLabel ? (
        <Link
          className="mt-6 inline-flex rounded-lg bg-[#0F4C81] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0C3B63]"
          href={actionHref}
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}
