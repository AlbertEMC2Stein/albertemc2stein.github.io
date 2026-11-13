import { cp, access } from "node:fs/promises";
import { join } from "node:path";

// Fail the deployment if the legacy homepage was not generated.
await access(join("_site", "legacy", "index.html"));

// Keep the old site routes without replacing the new homepage.
for (const route of [
  "legacy",
  "about",
  "projects",
  "privacy",
  "manifest.json",
  "assets",
]) {
  const source = join("_site", route);
  try {
    await access(source);
  } catch (error) {
    if (error.code === "ENOENT") continue;
    throw error;
  }
  await cp(source, join("out", route), { recursive: true });
}
