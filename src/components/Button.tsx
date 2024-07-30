export type ButtonProps = {
  label: string;
  className?: string;
  onClick: () => void;
  active?: boolean;
};

export default function Button({ label, className, onClick, active }: ButtonProps) {
  return (
    <button
      className={`tracking-wide font-semibold bg-zinc-600 hover:bg-zinc-800 transition-all shadow text-white outline-none p-2 border rounded border-gray-300 bg-transparent text-xs w-full ${className} ${active === false ? 'text-gray-200 bg-slate-100 shadow-none hover:bg-slate-100 pointer-events-none select-none' : ''}`}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );
}
