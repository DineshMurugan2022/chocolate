import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({ 
  title = "ChocoLux | The Ultimate Chocolate Shop Experience", 
  description = "Discover artisanal chocolates crafted with heritage ingredients like Karupatti and Himalayan Honey. The finest chocolate shop experience in India.",
  image = "/og-image.jpg",
  url = "https://chocolux.in",
  type = "website"
}: SEOProps) {
  const siteTitle = title.includes("ChocoLux") ? title : `${title} | ChocoLux`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
}
