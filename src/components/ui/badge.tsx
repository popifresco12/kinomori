interface BadgeProps { className?: string; children: React.ReactNode; variant?: string }
export function Badge({ className = '', children, variant = 'default' }: BadgeProps) {
  const map: Record<string, string> = {
    default: 'bg-gray-100 text-gray-700',
    destructive: 'bg-red-100 text-red-700',
    warning: 'bg-amber-100 text-amber-700',
    success: 'bg-green-100 text-green-700',
  };
  return <span className={'inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ' + map[variant] + ' ' + className}>{children}</span>;
}
