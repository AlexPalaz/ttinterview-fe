export default function Container({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="py-6 px-6 w-full">
      {children}
    </div>
  );
}
