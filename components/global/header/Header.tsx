import HeaderClient from "./HeaderClient";

export default async function Header() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/217?_fields=id,acf&acf_format=standard`,
  );
  const headerData: {
    id: number;
    acf: {
      logo: false | string;
      links: {
        link_1: { text: string; href: string };
        link_2: { text: string; href: string };
        link_3: { text: string; href: string };
        link_4: { text: string; href: string };
        link_5: { text: string; href: string };
        link_6: { text: string; href: string };
      };
      button: { text: string; href: string };
    };
  } = await res.json();

  return <HeaderClient data={headerData} />;
}
