type Props = {
  title: string;
};

export function PageHeader({ title }: Props) {
  return (
    <div className="flex bg-gradient-to-b from-slate-200 via-slate-300 to-slate-200 flex-col items-center justify-center mb-4 py-2 text-center shadow-sm">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
