/** AY 2026–27 school calendar — single source for home calendar + announcement centre. */

const COLORS = {
  Holiday: "#E74C3C",
  "Tentative Holiday": "#E67E22",
  "School Day": "#0F52BA",
  Workshop: "#0F52BA",
  "Farm Visit": "#27AE60",
  "Working Saturday": "#8E44AD",
  Special: "#D35400",
};

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function e(date, title, category, endDate) {
  return {
    date,
    endDate: endDate || undefined,
    title,
    category,
    slug: `${slugify(title)}-${date}`,
    dotColor: COLORS[category] || "#0F52BA",
    time: category,
  };
}

export const SCHOOL_EVENTS = [
  // Reopening / orientation
  e("2026-06-03", "Erdkinder Reopening Date", "School Day"),
  e("2026-06-06", "SI Parent Workshop", "Workshop"),
  e("2026-06-13", "Orientation for New Parents", "Workshop"),
  e("2026-06-13", "Elementary New Parent Orientation", "Workshop"),
  e("2026-06-13", "SI Parent Workshop", "Workshop"),
  e("2026-06-13", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-06-15", "SI / Toddler / Elementary Reopening Date", "School Day"),
  e("2026-06-17", "All New SI & Toddler Opening Date", "School Day"),
  e("2026-06-18", "Transition (SI to Ele) & New Elementary Opening Date", "School Day"),
  e("2026-06-26", "Muharram", "Holiday"),
  e("2026-06-27", "Erdkinder Working Saturday", "Working Saturday"),

  // July
  e("2026-07-11", "Erdkinder Farm Visit", "Farm Visit"),
  e("2026-07-11", "Grandparents, Nanny & Driver Partner Workshop", "Special"),
  e("2026-07-18", "Elementary Farm Visit", "Farm Visit"),
  e("2026-07-18", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-07-25", "Elementary New Parent Characteristic Workshop", "Workshop"),
  e("2026-07-25", "Primary Farm Visit", "Farm Visit"),

  // August
  e("2026-08-01", "SI to Elementary Transition Workshop-1", "Workshop"),
  e("2026-08-01", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-08-08", "Elementary Parent Connect-1", "Workshop"),
  e("2026-08-08", "Navigating Adolescence Together Workshop", "Workshop"),
  e("2026-08-08", "Toddler Parent Workshop", "Workshop"),
  e("2026-08-08", "SI Parent Workshop", "Workshop"),
  e("2026-08-10", "Bonalu", "Tentative Holiday"),
  e("2026-08-15", "Independence Day", "Holiday"),
  e("2026-08-21", "Varalakshmi Vratam", "Tentative Holiday"),
  e("2026-08-22", "Elementary Farm Visit", "Farm Visit"),
  e("2026-08-22", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-08-26", "Milad-un-Nabi", "Holiday"),
  e("2026-08-28", "Raksha Bandhan", "Holiday"),
  e("2026-08-29", "Elementary to Erdkinder Transition Workshop", "Workshop"),

  // September
  e("2026-09-04", "Sri Krishna Janmashtami", "Holiday"),
  e("2026-09-05", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-09-12", "Elementary Parent Workshop-1", "Workshop"),
  e("2026-09-12", "Trek Discussion (Erdkinder)", "Workshop"),
  e("2026-09-14", "Vinayaka Chavithi", "Holiday"),
  e("2026-09-19", "Primary Farm Visit", "Farm Visit"),
  e("2026-09-19", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-09-26", "Erdkinder Farm Visit", "Farm Visit"),

  // October
  e("2026-10-02", "Gandhi Jayanthi", "Holiday"),
  e("2026-10-03", "SI to Elementary Transition Workshop-2", "Workshop"),
  e("2026-10-03", "Erdkinder Farm Visit", "Farm Visit"),
  e("2026-10-12", "Dussehra Break", "Holiday", "2026-10-20"),
  e("2026-10-24", "SI Parent Workshop", "Workshop"),
  e("2026-10-24", "Elementary Farm Visit", "Farm Visit"),
  e("2026-10-31", "Elementary Parent Workshop-2", "Workshop"),
  e("2026-10-31", "Understanding the Curriculum Workshop (Erdkinder)", "Workshop"),
  e("2026-10-31", "Erdkinder Working Saturday", "Working Saturday"),

  // November
  e("2026-11-09", "Diwali", "Holiday"),
  e("2026-11-14", "Elementary Parent Connect-2 (Explore Connect)", "Workshop"),
  e("2026-11-24", "Guru Nanak's Jayanthi", "Holiday"),
  e("2026-11-27", "Blue Blocks Specific Holiday", "Holiday"),
  e("2026-11-28", "Explore Montessori", "Special"),

  // December
  e("2026-12-05", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-12-12", "Primary Farm Visit", "Farm Visit"),
  e("2026-12-19", "Elementary Farm Visit", "Farm Visit"),
  e("2026-12-19", "Erdkinder Working Saturday", "Working Saturday"),
  e("2026-12-25", "Christmas", "Holiday", "2026-12-26"),

  // January 2027
  e("2027-01-01", "New Year", "Holiday"),
  e("2027-01-11", "Sankranti", "Holiday", "2027-01-15"),
  e("2027-01-23", "Primary Farm Visit", "Farm Visit"),
  e("2027-01-23", "Elementary Farm Visit", "Farm Visit"),
  e("2027-01-23", "Erdkinder Farm Visit", "Farm Visit"),
  e("2027-01-26", "Republic Day", "Holiday"),
  e("2027-01-30", "Erdkinder Working Saturday", "Working Saturday"),

  // February 2027
  e("2027-02-06", "Grandparents, Nanny & Driver Partner Workshop", "Special"),
  e("2027-02-06", "Erdkinder Working Saturday", "Working Saturday"),
  e("2027-02-20", "SI Parent Workshop", "Workshop"),
  e("2027-02-20", "Erdkinder Working Saturday", "Working Saturday"),
  e("2027-02-27", "Drone Day", "Special"),

  // March 2027
  e("2027-03-03", "Class Photos — SI & Toddler", "Special"),
  e("2027-03-04", "Class Photos — Elementary & Erdkinder", "Special"),
  e("2027-03-06", "Mahashivaratri", "Tentative Holiday"),
  e("2027-03-09", "Eid", "Tentative Holiday"),
  e("2027-03-20", "Erdkinder Working Saturday", "Working Saturday"),
  e("2027-03-22", "Holi", "Tentative Holiday"),
  e("2027-03-26", "Good Friday", "Holiday"),

  // April 2027
  e("2027-04-07", "Ugadi", "Tentative Holiday"),
  e("2027-04-09", "Last Working Day", "School Day"),
  e("2027-04-10", "Elementary Parent Workshop-3 (Summer Workshop)", "Workshop"),
  e("2027-04-10", "Toddler Summer Engagement Workshop", "Workshop"),
  e("2027-04-10", "SI Parent Workshop", "Workshop"),
  e("2027-04-12", "Internal Team Meetings", "Special", "2027-04-14"),
  e("2027-04-15", "Sri Rama Navami", "Holiday"),
];

function parseISO(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return { y, m: m - 1, d };
}

function dayUTC(y, m, d) {
  return Date.UTC(y, m, d);
}

export function eventsOnDate(year, monthIndex, day) {
  const t = dayUTC(year, monthIndex, day);
  return SCHOOL_EVENTS.filter((ev) => {
    const start = parseISO(ev.date);
    const end = ev.endDate ? parseISO(ev.endDate) : start;
    return t >= dayUTC(start.y, start.m, start.d) && t <= dayUTC(end.y, end.m, end.d);
  });
}

function formatDateLabel(iso, endIso) {
  const start = new Date(`${iso}T12:00:00`);
  const opts = { day: "numeric", month: "short", year: "numeric" };
  if (!endIso || endIso === iso) return start.toLocaleDateString("en-IN", opts);
  const end = new Date(`${endIso}T12:00:00`);
  return `${start.toLocaleDateString("en-IN", opts)} – ${end.toLocaleDateString("en-IN", opts)}`;
}

/** One card per calendar entry for Announcement Centre. */
export function schoolEventsAsAnnouncements() {
  return SCHOOL_EVENTS.map((ev) => ({
    slug: ev.slug,
    badge: ev.category,
    date: formatDateLabel(ev.date, ev.endDate),
    title: ev.title,
    messages: [`Academic Year 2026–27 school calendar · ${ev.category}`],
  }));
}
