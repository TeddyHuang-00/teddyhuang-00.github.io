import { SITE } from "@/config";

interface Social {
  name: string;
  href: string;
  linkTitle: string;
  iconName: string;
}

export const SOCIALS: Social[] = [
  {
    name: "GitHub",
    href: "https://github.com/teddyhuang-00",
    linkTitle: `${SITE.author} on GitHub`,
    iconName: "tabler:brand-github",
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/13229205",
    linkTitle: `${SITE.author} on Bilibili`,
    iconName: "tabler:brand-bilibili",
  },
  // {
  //   name: "X",
  //   href: "https://x.com/username",
  //   linkTitle: `${SITE.title} on X`,
  //   icon: IconBrandX,
  // },
  // {
  //   name: "LinkedIn",
  //   href: "https://www.linkedin.com/in/username/",
  //   linkTitle: `${SITE.title} on LinkedIn`,
  //   icon: IconLinkedin,
  // },
  {
    name: "Mail",
    href: "mailto:teddyhuangnan@gmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    iconName: "tabler:mail",
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: `Share this post via WhatsApp`,
    iconName: "tabler:brand-whatsapp",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: `Share this post on Facebook`,
    iconName: "tabler:brand-facebook",
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: `Share this post on X`,
    iconName: "tabler:brand-x",
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: `Share this post via Telegram`,
    iconName: "tabler:brand-telegram",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: `Share this post on Pinterest`,
    iconName: "tabler:brand-pinterest",
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: `Share this post via email`,
    iconName: "tabler:mail",
  },
] as const;
