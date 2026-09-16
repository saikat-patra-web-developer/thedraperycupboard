function Icon({ name = "check", size = 28, className = "" }) {
  const paths = {
    check: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    shield: (
      <>
        <path d="m12 2 8 3v6c0 5-4 9-8 11-4-2-8-6-8-11V5z" />
        <path d="m8 11 3 3 5-6" />
      </>
    ),
    truck: (
      <>
        <path d="M2 5h12v13H2zM14 10h5l3 4v4h-8" />
        <circle cx="6" cy="19" r="2" />
        <circle cx="18" cy="19" r="2" />
      </>
    ),
    headset: (
      <>
        <path d="M4 13v-2a8 8 0 0 1 16 0v6c0 4-4 4-7 4" />
        <rect x="2" y="11" width="4" height="7" rx="2" />
        <rect x="18" y="11" width="4" height="7" rx="2" />
      </>
    ),
    grid: (
      <>
        {[3, 10, 17].flatMap((x) =>
          [3, 10, 17].map((y) => (
            <rect key={x + "-" + y} x={x} y={y} width="4" height="4" rx=".5" />
          )),
        )}
      </>
    ),
    pin: (
      <>
        <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0" />
        <circle cx="12" cy="10" r="3" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m2 5 10 8L22 5" />
      </>
    ),
    phone: (
      <path d="m5 2 4 5-3 3c2 4 4 6 8 8l3-3 5 4c-1 4-4 4-7 3C8 20 3 15 2 8 1 5 2 3 5 2Z" />
    ),
    tools: (
      <>
        <path d="m3 21 10-10M14 3a6 6 0 0 0 7 7l-4-4 1-4M3 3l18 18M2 2l5 2-3 3z" />
      </>
    ),
    wifi: (
      <>
        <path d="M2 7a16 16 0 0 1 20 0M5 11a11 11 0 0 1 14 0M8 15a6 6 0 0 1 8 0" />
        <circle cx="12" cy="20" r="1" />
      </>
    ),
    spark: <path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />,
    leaf: <path d="M20 3C6 1 1 11 7 17s16 0 13-14ZM3 22 16 8" />,
    blinds: <path d="M3 3h18v18H3zM3 7h18M3 11h18M3 15h18M3 19h18" />,
    arrow: <path d="M3 12h17m-6-6 6 6-6 6" />,
    calendar: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </>
    ),
    share: (
      <>
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </>
    ),
    copy: (
      <>
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </>
    ),
    book: (
      <>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </>
    ),
    print: (
      <>
        <polyline points="6 9 6 2 18 2 18 9" />
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <rect x="6" y="14" width="12" height="8" />
      </>
    ),
    bookmark: (
      <path d="m19 21-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    ),
    star: (
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    ),
    external: (
      <>
        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        <polyline points="15 3 21 3 21 9" />
        <line x1="10" y1="14" x2="21" y2="3" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.35"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={"shrink-0 " + className}
    >
      {paths[name] || paths.shield}
    </svg>
  );
}

export default Icon;
