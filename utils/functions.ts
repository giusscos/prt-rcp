export function createSlug(text: string) {
    return text
      .toLowerCase() // Convert to lowercase
      .trim() // Remove leading/trailing spaces
      .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .replace(/-+/g, "-") // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, ""); // Trim hyphens from the start and end
  }
  