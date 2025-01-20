export const REGEXP = {
  SONG_ID: /^[a-zA-Z0-9-_]{11}$/,
  CLEAT_TITLE: [
    / *\([^)]*\) */g,
    / *\[[^\]]*\] */g,
    / *\{[^}]*\} */g,
    / *<[^>]*> */g,
    /\s{2,}/g,
  ],
  TEXT_DATE: /(\d+)\s*(years?|months?|days?|hours?|minutes?)\s*ago/,
};
