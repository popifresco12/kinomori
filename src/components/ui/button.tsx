interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: string }
export function Button({ className = '', variant = 'default', children, ...props }: ButtonProps) {
  const base = 'px-4 py-2 rounded-xl font-medium transition-all';
  const map: Record<string, string> = {
    default: 'bg-kin-dark text-white hover:bg-kin-gold hover:text-kin-dark',
    ghost: 'bg-transparent hover:bg-gray-100',
  };
  return <button className={base + ' ' + map[variant] + ' ' + className} {...props}>{children}</button>;
}
