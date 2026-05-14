import { NavLink } from 'react-router-dom';

type SidebarItemProps = {
  to: string;
  label: string;
};

const navItemBase = 'rounded-xl px-4 py-3 transition-colors';

function navItemClassName(isActive: boolean): string {
  return [
    navItemBase,
    isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100',
  ].join(' ');
}

export function SidebarItem({ to, label }: SidebarItemProps) {
  return (
    <NavLink to={to} className={({ isActive }) => navItemClassName(isActive)}>
      {label}
    </NavLink>
  );
}
