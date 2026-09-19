import {franc} from "franc";

export function detectLanguage(text) {
  const langCode = franc(text); // returns 'eng' for English, 'arb' for Arabic, etc.
  return langCode;
}