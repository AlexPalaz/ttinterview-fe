import { ReactNode } from "react";

export type DropdownProps = {
  name: string;
  children: ReactNode;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function Dropdown({ children, name, onChange }: DropdownProps) {
  return (
    <select
      onChange={onChange}
      className="outline-none p-2 border rounded-md border-gray-300 bg-transparent text-xs w-full"
      name={name}
    >
      {children}
    </select>
  );
}
