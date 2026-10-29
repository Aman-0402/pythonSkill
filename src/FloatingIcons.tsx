import type { ReactNode } from 'react'

const icons: { name: string; shape: ReactNode }[] = [
  {
    name: 'Bar chart',
    shape: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
  },
  {
    name: 'Line chart',
    shape: (
      <>
        <path d="M3 3v18h18" />
        <path d="m6 15 4-5 3 3 6-8" />
      </>
    ),
  },
  {
    name: 'Pie chart',
    shape: (
      <>
        <path d="M21 12A9 9 0 1 1 12 3v9z" />
        <path d="M15 3.5A9 9 0 0 1 20.5 9H15z" />
      </>
    ),
  },
  {
    name: 'Database',
    shape: (
      <>
        <ellipse cx="12" cy="5" rx="8" ry="3" />
        <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </>
    ),
  },
  {
    name: 'Table',
    shape: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 10h18M3 15h18M9 4v16" />
      </>
    ),
  },
  {
    name: 'Search',
    shape: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </>
    ),
  },
  {
    name: 'Scatter plot',
    shape: (
      <>
        <path d="M3 3v18h18" />
        <circle cx="8" cy="15" r="1.2" />
        <circle cx="12" cy="10" r="1.2" />
        <circle cx="16" cy="13" r="1.2" />
        <circle cx="19" cy="7" r="1.2" />
      </>
    ),
  },
  {
    name: 'Filter',
    shape: <path d="M3 4h18l-7 8.5V19l-4 2v-8.5z" />,
  },
  {
    name: 'SQL',
    shape: (
      <text x="12" y="15.5" textAnchor="middle" className="icon-text">
        SQL
      </text>
    ),
  },
  {
    name: 'Sum',
    shape: <path d="M18 5H6l7 7-7 7h12" />,
  },
]

export default function FloatingIcons() {
  return (
    <div className="floaters" aria-hidden="true">
      {icons.map((icon) => (
        <div className="floater" key={icon.name}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            {icon.shape}
          </svg>
        </div>
      ))}
    </div>
  )
}
