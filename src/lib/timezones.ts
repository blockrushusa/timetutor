const GMT_OFFSET_REGEX = /GMT([+-])(\d{1,2})(?::?(\d{2}))?/i;

export type TimezoneOption = {
  id: string;
  label: string;
  country: string;
  offsetLabel: string;
  standardOffsetMinutes: number;
  dstOffsetMinutes?: number;
  dstObserves: boolean;
  dstStartNote?: string;
  dstEndNote?: string;
  dstResources?: string;
};

export type TimezonePair = {
  source: string;
  target: string;
};

export const timezoneOptions: TimezoneOption[] = [
  {
    id: "America/New_York",
    label: "New York",
    country: "United States",
    offsetLabel: "GMT-05:00",
    standardOffsetMinutes: -300,
    dstOffsetMinutes: -240,
    dstObserves: true,
    dstStartNote: "Second Sunday in March (2:00 AM local → 3:00 AM EDT)",
    dstEndNote: "First Sunday in November (2:00 AM EDT → 1:00 AM EST)",
  },
  {
    id: "America/Los_Angeles",
    label: "Los Angeles",
    country: "United States",
    offsetLabel: "GMT-08:00",
    standardOffsetMinutes: -480,
    dstOffsetMinutes: -420,
    dstObserves: true,
    dstStartNote: "Second Sunday in March (2:00 AM PST → 3:00 AM PDT)",
    dstEndNote: "First Sunday in November (2:00 AM PDT → 1:00 AM PST)",
  },
  {
    id: "Europe/London",
    label: "London",
    country: "United Kingdom",
    offsetLabel: "GMT±00:00",
    standardOffsetMinutes: 0,
    dstOffsetMinutes: 60,
    dstObserves: true,
    dstStartNote: "Last Sunday in March (1:00 AM GMT → 2:00 AM BST)",
    dstEndNote: "Last Sunday in October (2:00 AM BST → 1:00 AM GMT)",
  },
  {
    id: "Europe/Paris",
    label: "Paris",
    country: "France",
    offsetLabel: "GMT+01:00",
    standardOffsetMinutes: 60,
    dstOffsetMinutes: 120,
    dstObserves: true,
    dstStartNote: "Last Sunday in March (2:00 AM CET → 3:00 AM CEST)",
    dstEndNote: "Last Sunday in October (3:00 AM CEST → 2:00 AM CET)",
  },
  {
    id: "Europe/Berlin",
    label: "Berlin",
    country: "Germany",
    offsetLabel: "GMT+01:00",
    standardOffsetMinutes: 60,
    dstOffsetMinutes: 120,
    dstObserves: true,
    dstStartNote: "Last Sunday in March (2:00 AM CET → 3:00 AM CEST)",
    dstEndNote: "Last Sunday in October (3:00 AM CEST → 2:00 AM CET)",
  },
  {
    id: "Pacific/Auckland",
    label: "Auckland",
    country: "New Zealand",
    offsetLabel: "GMT+13:00",
    standardOffsetMinutes: 720,
    dstOffsetMinutes: 780,
    dstObserves: true,
    dstStartNote: "Last Sunday in September (2:00 AM NZST → 3:00 AM NZDT)",
    dstEndNote: "First Sunday in April (3:00 AM NZDT → 2:00 AM NZST)",
  },
  {
    id: "Australia/Sydney",
    label: "Sydney",
    country: "Australia",
    offsetLabel: "GMT+11:00",
    standardOffsetMinutes: 600,
    dstOffsetMinutes: 660,
    dstObserves: true,
    dstStartNote: "First Sunday in October (2:00 AM AEST → 3:00 AM AEDT)",
    dstEndNote: "First Sunday in April (3:00 AM AEDT → 2:00 AM AEST)",
  },
  {
    id: "Asia/Tokyo",
    label: "Tokyo",
    country: "Japan",
    offsetLabel: "GMT+09:00",
    standardOffsetMinutes: 540,
    dstObserves: false,
  },
  {
    id: "Asia/Kolkata",
    label: "Mumbai",
    country: "India",
    offsetLabel: "GMT+05:30",
    standardOffsetMinutes: 330,
    dstObserves: false,
  },
  {
    id: "Asia/Dubai",
    label: "Dubai",
    country: "United Arab Emirates",
    offsetLabel: "GMT+04:00",
    standardOffsetMinutes: 240,
    dstObserves: false,
  },
  {
    id: "America/Sao_Paulo",
    label: "São Paulo",
    country: "Brazil",
    offsetLabel: "GMT-03:00",
    standardOffsetMinutes: -180,
    dstObserves: false,
  },
  {
    id: "Africa/Johannesburg",
    label: "Johannesburg",
    country: "South Africa",
    offsetLabel: "GMT+02:00",
    standardOffsetMinutes: 120,
    dstObserves: false,
  },
  {
    id: "Asia/Singapore",
    label: "Singapore",
    country: "Singapore",
    offsetLabel: "GMT+08:00",
    standardOffsetMinutes: 480,
    dstObserves: false,
  },
  {
    id: "Etc/UTC",
    label: "UTC",
    country: "Coordinated Universal Time",
    offsetLabel: "GMT±00:00",
    standardOffsetMinutes: 0,
    dstObserves: false,
  },
];

export const timezoneOptionMap = timezoneOptions.reduce<Record<string, TimezoneOption>>(
  (acc, option) => {
    acc[option.id] = option;
    return acc;
  },
  {},
);

export const defaultTimezonePair: TimezonePair = {
  source: "America/New_York",
  target: "America/New_York",
};

export const pinnedTimezoneScenarios: Array<{
  id: string;
  label: string;
  description: string;
  pair: TimezonePair;
}> = [
  {
    id: "classic-12-24",
    label: "12 ↔ 24 Hour",
    description: "Stay in one zone and flip between 24-hour and 12-hour clocks.",
    pair: { source: "America/New_York", target: "America/New_York" },
  },
  {
    id: "nyc-auckland",
    label: "NYC → Auckland",
    description: "Practice the extreme EST to NZDT jump.",
    pair: { source: "America/New_York", target: "Pacific/Auckland" },
  },
  {
    id: "nyc-london",
    label: "NYC → London",
    description: "Classic US East Coast to UK timing.",
    pair: { source: "America/New_York", target: "Europe/London" },
  },
  {
    id: "nyc-la",
    label: "NYC → Los Angeles",
    description: "Handle cross-country meetings with ease.",
    pair: { source: "America/New_York", target: "America/Los_Angeles" },
  },
];

function getOffsetMinutes(zone: string, date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "shortOffset",
  });
  const parts = formatter.formatToParts(date);
  const offsetValue =
    parts.find((part) => part.type === "timeZoneName")?.value ?? "GMT";
  const match = GMT_OFFSET_REGEX.exec(offsetValue);
  if (!match) return 0;
  const sign = match[1] === "-" ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = match[3] ? Number(match[3]) : 0;
  return sign * (hours * 60 + minutes);
}

export function isCurrentlyDst(zoneId: string) {
  const meta = timezoneOptionMap[zoneId];
  if (!meta?.dstObserves) return false;
  const currentOffset = getOffsetMinutes(zoneId, new Date());
  if (typeof meta.dstOffsetMinutes === "number") {
    return currentOffset === meta.dstOffsetMinutes;
  }
  return currentOffset !== meta.standardOffsetMinutes;
}
