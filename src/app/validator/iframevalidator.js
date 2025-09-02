import { URL } from "url";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";


const window = new JSDOM("").window;
const DOMPurify = createDOMPurify(window);

// Combined validator + sanitizer
export function processGoogleIframe(input) {
  if (!input) return null;

  // Regex: only <iframe> with src
  const iframeRegex = /^<iframe[^>]*src=["']([^"']+)["'][^>]*><\/iframe>$/i;
  const match = input.trim().match(iframeRegex);
  if (!match) return null;

  try {
    const srcUrl = new URL(match[1]);

    // Only allow Google
    const allowedHosts = [
      "www.google.com",
      "maps.google.com",
      "drive.google.com"
    ];

    if (!allowedHosts.includes(srcUrl.hostname)) {
      return null;
    }

    // Sanitize
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: ["iframe"],
      ALLOWED_ATTR: ["src", "width", "height", "allowfullscreen", "loading", "referrerpolicy"]
    });
  } catch (err) {
    return null;
  }
}

