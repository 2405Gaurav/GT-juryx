import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/component/auth/AuthProvider";
import Navbar from "@/component/UserNavbar";

export const metadata: Metadata = {
  title: {
    default: "JURYX | GAURAV THAKUR",
    template: "%s | Gaurav Thakur",
  },
  description:
    "BLOCKCHAIN-POWERED HACKATHON MANAGEMENT SYSTEM BY GAURAV THAKUR. Decentralized judging platform ensuring fair, transparent, and immutable results for hackathons and competitions.",
  keywords: [
    "Gaurav Thakur",
    "Gaurav Thakur Portfolio",
    "Full Stack Developer India",
    "Blockchain Developer",
    "Web3 Developer",
    "Next.js Developer",
    "React Expert",
    "Solidity Developer",
    "Smart Contract Engineer",
    "Web Development Freelancer",
    "JavaScript Specialist",
    "JuryX Platform",
    "Hackathon Management System",
  ],
  authors: [{ name: "Gaurav Thakur", url: "https://thegauravthakur.in" }],
  metadataBase: new URL("https://thegauravthakur.in"),
  openGraph: {
    title: "Gaurav Thakur - Full Stack & Blockchain Developer",
    description:
      "Creator of JuryX - Blockchain powered hackathon management platform. Explore Gaurav's projects and skills in Web3 and full-stack development.",
    url: "https://thegauravthakur.in",
    siteName: "Gaurav Thakur's Portfolio",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/navicn.png",
        width: 1200,
        height: 630,
        alt: "JURYX - Blockchain Hackathon Management",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@GauravT55684844",
    creator: "@GauravT55684844",
    title: "Gaurav Thakur - Full Stack & Blockchain Developer",
    description: "Full Stack Web3 projects, blockchain solutions, and professional portfolio.",
    images: ["/navicn.png"],
  },
  alternates: {
    canonical: "https://thegauravthakur.in",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/globe.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

// Moved cookies access inside the component
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const cookieStore = await cookies();
  // const userId = cookieStore.get('user_id')?.value;
  // // const emailId = cookieStore.get('user_email')?.value;
  // // console.log("userId:",userId,"e:",emailId)
  // const isAuthenticated = !!userId;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gaurav Thakur",
    jobTitle: "Full Stack & Blockchain Developer",
    url: "https://thegauravthakur.in",
    sameAs: [
      "https://github.com/2405Gaurav",
      "https://x.com/GauravT55684844",
      "https://linkedin.com/in/gauravthakur",
    ],
    image: "https://thegauravthakur.in/gaurav.jpg",
    description:
      "Full Stack Developer specializing in blockchain, Web3, and modern web technologies. Creator of JuryX - decentralized hackathon management platform.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "India",
      addressCountry: "India",
    },
    knowsAbout: [
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Blockchain",
      "Solidity",
      "Web3",
      "Smart Contracts",
      "Ethereum",
      "Web Development",
    ],
  };
  return (
    <html lang="en">
      {/* ${geistSans.variable} ${geistMono.variable} */}
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={` antialiased`}>
        <AuthProvider>
          <div className="">
            <Navbar />
          </div>
          {children}{" "}
        </AuthProvider>
      </body>
    </html>
  );
}