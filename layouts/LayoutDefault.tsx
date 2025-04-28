import "./tailwind.css";

export default function LayoutDefault({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-grey-50 min-h-dvh">
      <header className="h-20 sticky bg-white shadow top-0 z-30"></header>
      {children}
    </div>
  );
}


