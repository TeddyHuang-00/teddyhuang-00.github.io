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
    linkTitle: "on",
    iconName: "tabler:brand-github",
  },
  {
    name: "Bilibili",
    href: "https://space.bilibili.com/13229205",
    linkTitle: "on",
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
    linkTitle: "via",
    iconName: "tabler:mail",
  },
] as const;

export const SHARE_LINKS: Social[] = [
  {
    name: "WhatsApp",
    href: "https://wa.me/?text=",
    linkTitle: "via",
    iconName: "tabler:brand-whatsapp",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/sharer.php?u=",
    linkTitle: "on",
    iconName: "tabler:brand-facebook",
  },
  {
    name: "X",
    href: "https://x.com/intent/post?url=",
    linkTitle: "on",
    iconName: "tabler:brand-x",
  },
  {
    name: "Telegram",
    href: "https://t.me/share/url?url=",
    linkTitle: "via",
    iconName: "tabler:brand-telegram",
  },
  {
    name: "Pinterest",
    href: "https://pinterest.com/pin/create/button/?url=",
    linkTitle: "on",
    iconName: "tabler:brand-pinterest",
  },
  {
    name: "Mail",
    href: "mailto:?subject=See%20this%20post&body=",
    linkTitle: "via",
    iconName: "tabler:mail",
  },
] as const;
