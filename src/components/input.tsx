import type { HTMLInputTypeAttribute } from "react";

interface Props {
  placeholder: string;
  subtitle: string;
  inputType?: HTMLInputTypeAttribute;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ placeholder, subtitle, inputType, onChange }: Props) {
  return (
    <div className="gap-3 flex flex-col">
      <p className="font-black text-left dark:text-neutral-300 text-black text-2xl">
        {subtitle}
      </p>
      <input
        onChange={onChange}
        type={inputType}
        className="bg-neutral-100 dark:bg-neutral-900 dark:border-neutral-950 border border-neutral-200 px-3 py-2 rounded-2xl w-full"
        placeholder={placeholder}
      ></input>
    </div>
  );
}
