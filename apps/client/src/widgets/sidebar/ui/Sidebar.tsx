import { NavLink } from 'react-router-dom'

const navigation = [
  {
    label: 'Income',
    to: '/',
  },
  {
    label: 'Allocation',
    to: '/allocation',
  },
  {
    label: 'Expenses',
    to: '/expenses',
  },
  {
    label: 'Categories',
    to: '/categories',
  },
]

export function Sidebar() {
  return (
    <aside className="w-64 border-r border-zinc-200 bg-white p-6">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">Finance Tracker</h1>
      </div>

      <nav className="flex flex-col gap-2">
        {navigation.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [
                'rounded-xl px-4 py-3 transition-colors',
                isActive ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100',
              ].join(' ')
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
