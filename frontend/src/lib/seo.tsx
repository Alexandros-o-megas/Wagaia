import { Helmet } from "react-helmet-async";

export function Seo({
  title,
  description,
  path = "/",
  noindex = false,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
}) {
  const full = title.includes("WAGAIA") ? title : `${title} — WAGAIA`;
  return (
    <Helmet>
      <title>{full}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
      <meta property="og:title" content={full} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/logo.png" />
      <link rel="canonical" href={path} />
    </Helmet>
  );
}
