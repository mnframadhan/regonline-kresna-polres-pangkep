type Props = {
  title: string;
};

export function PageHeader({ title }: Props) {
  return (
    <div className="flex bg-slate-200 flex-col items-center justify-center mb-4 py-2 text-center shadow-lg">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}
