import { cp, readFile, writeFile } from "node:fs/promises";

const source = new URL("./dist/", import.meta.url);
const output = new URL("./build/", import.meta.url);
const domain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const marker = "<!-- Vercel share URLs -->";
const index = new URL("index.html", output);

await cp(source, output, { recursive: true });

if (domain) {
  const origin = new URL(`https://${domain}`).origin;
  const html = await readFile(index, "utf8");
  const tags = [
    `<meta property="og:url" content="${origin}/">`,
    `<meta property="og:image" content="${origin}/assets/whatsapp-preview.jpg">`,
    '<meta property="og:image:type" content="image/jpeg">',
    '<meta property="og:image:width" content="1200">',
    '<meta property="og:image:height" content="630">',
    '<meta property="og:image:alt" content="Wedding invitation for Niththiyaguru and Sitra">',
  ];

  await writeFile(index, html.replace(marker, tags.join("\n  ")));
}
