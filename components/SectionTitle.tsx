interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionTitleProps) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#0F4C81]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1F2933]">
        {title}
      </h2>
      {description ? (
        <p className="mt-3 max-w-3xl text-base leading-7 text-[#6B7280]">
          {description}
        </p>
      ) : null}
    </div>
  );
}
