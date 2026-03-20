interface PageHeaderProps {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function PageHeader({ label, title, subtitle }: PageHeaderProps) {
  return (
    <header className="page-header">
      <div className="container">
        <p className="section-label">{label}</p>
        <h1>{title}</h1>
        {subtitle && <p className="sub">{subtitle}</p>}
      </div>
    </header>
  );
}
