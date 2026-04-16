import type { HTMLInputTypeAttribute } from "react";

interface Props {
  placeholder: string;
  subtitle: string;
  inputType?: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextZone({ placeholder, subtitle, onChange }: Props) {
  return (
    <div className="gap-3 flex flex-col">
      <p className="font-black text-left dark:text-neutral-200 text-black text-2xl">
        {subtitle}
      </p>
      <textarea
        onChange={onChange}
        className="bg-neutral-100 dark:text-white dark:bg-neutral-900 dark:border-neutral-950 border border-neutral-200 px-3 py-2 rounded-2xl w-full"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
}
