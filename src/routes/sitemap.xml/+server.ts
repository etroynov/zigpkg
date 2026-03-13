import { text } from "@sveltejs/kit";
import { SitemapStream, streamToPromise } from "sitemap";
import type { RequestHandler } from "./$types";
import { getAllPackageNames } from "$lib/server/packages/queries";

export const GET: RequestHandler = async () => {
  try {
    const smStream = new SitemapStream({ hostname: "https://zigpkg.dev/" });

    smStream.write({ url: "/" });
    smStream.write({ url: "/packages" });

    const pkgs = await getAllPackageNames();
    for (const pkg of pkgs) {
      smStream.write({
        url: `/packages/${encodeURIComponent(pkg.name)}`,
        lastmod: new Date(pkg.updatedAt).toISOString(),
      });
    }

    smStream.end();
    const res = await streamToPromise(smStream);

    return text(res.toString(), {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (e) {
    console.error(e);
    return text("Internal server error", { status: 500 });
  }
};
