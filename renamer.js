import { readdir, rename } from "node:fs/promises";
import { extname } from "node:path";

(async () => {
  const dir1s = await readdir("src/pages");
  for (const ent of dir1s) {
    const ext = extname(ent);
    if (ext === ".js") await rename(`src/pages/${ent}`, `src/pages/${ent.replace(".js", ".jsx")}`);
  }
  // const dir2s = await readdir("src/pages");
})().catch(console.error);
