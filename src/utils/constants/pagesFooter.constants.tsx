import { FacebookIcon, InstagramIcon, TwitterIcon } from "@/assets/icons";

type ColumnProps = {
  title: string;
  rows: {
    label: string;
    link: string;
  }[];
};

type SocialMediaProps = {
  icon: React.ReactElement;
  link: string;
};

export const pagesFooterColumns: ColumnProps[] = [
  {
    title: "Company",
    rows: [
      {
        label: "About",
        link: "https://www.spotify.com/fr/about-us/contact/",
      },
      {
        label: "Jobs",
        link: "https://www.lifeatspotify.com/",
      },
      {
        label: "For the Record",
        link: "https://newsroom.spotify.com/",
      },
    ],
  },
  {
    title: "Communities",
    rows: [
      {
        label: "For Artists",
        link: "https://artists.spotify.com/home",
      },
      {
        label: "Developers",
        link: "https://developer.spotify.com/",
      },
      {
        label: "Advertising",
        link: "https://ads.spotify.com/fr-FR/",
      },
      {
        label: "Investors",
        link: "https://investors.spotify.com/home/default.aspx",
      },
      {
        label: "Vendors",
        link: "https://spotifyforvendors.com/",
      },
    ],
  },
  {
    title: "Useful links",
    rows: [
      {
        label: "Support",
        link: "https://support.spotify.com/fr/",
      },
      {
        label: "Free Mobile App",
        link: "https://www.spotify.com/fr/free/",
      },
      {
        label: "Popular by Country",
        link: "https://open.spotify.com/popular-in/fr",
      },
    ],
  },
  {
    title: "Spotify Plans",
    rows: [
      {
        label: "Premium Individual",
        link: "https://www.spotify.com/fr/premium/#ref=spotifycom_footer_premium_individual",
      },
      {
        label: "Premium Duo",
        link: "https://www.spotify.com/fr/duo/#ref=spotifycom_footer_premium_duo",
      },
      {
        label: "Premium Family",
        link: "https://www.spotify.com/fr/family/#ref=spotifycom_footer_premium_family",
      },
      {
        label: "Premium Student",
        link: "https://www.spotify.com/fr/student/#ref=spotifycom_footer_premium_student",
      },
      {
        label: "Spotify Free",
        link: "https://www.spotify.com/fr/free/#ref=spotifycom_footer_free",
      },
    ],
  },
];

export const pagesFooterSocialMedia: SocialMediaProps[] = [
  {
    icon: <InstagramIcon />,
    link: "https://www.instagram.com/spotify",
  },
  {
    icon: <TwitterIcon />,
    link: "https://x.com/spotify",
  },
  {
    icon: <FacebookIcon />,
    link: "https://www.facebook.com/Spotify",
  },
];
