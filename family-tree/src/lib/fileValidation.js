export const MAX_IMAGE_BYTES = 3 * 1024 * 1024; // 3 MB
export const MAX_IMAGE_LABEL = "3MB";

// No explicit limit was requested for video, but leaving uploads completely
// unbounded risks someone uploading a huge file straight from the browser.
// 100MB is a generous, practical ceiling for short family-history clips.
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024; // 100 MB
export const MAX_VIDEO_LABEL = "100MB";

export function validateImageFile(file) {
  if (!file) return "No file selected.";
  if (!file.type.startsWith("image/")) return "Please choose an image file.";
  if (file.size > MAX_IMAGE_BYTES) return `Image must be ${MAX_IMAGE_LABEL} or smaller.`;
  return null;
}

export function validateVideoFile(file) {
  if (!file) return "No file selected.";
  if (!file.type.startsWith("video/")) return "Please choose a video file.";
  if (file.size > MAX_VIDEO_BYTES) return `Video must be ${MAX_VIDEO_LABEL} or smaller.`;
  return null;
}
