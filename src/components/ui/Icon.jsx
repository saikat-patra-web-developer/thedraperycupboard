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
