export default function robots() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://co-work-in.vercel.app";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
