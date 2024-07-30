export type InputProps = {
  name: string;
  type: string;
  placeholder: string;
  min?: string;
  step?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
};

export default function Input(props: InputProps) {
  return (
    <input
    {...props}
    className={`outline-none p-2 border rounded-md border-gray-300 bg-transparent text-xs w-full ${props.className}`}
    />
  );
}
