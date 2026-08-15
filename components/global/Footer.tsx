import Image from "next/image";
import Link from "next/link";

export default async function Footer() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/7?_fields=id,acf&acf_format=standard`,
  );
  const footerData: {
    id: 7;
    acf: {
      logo: string | false;
      text: string;
      social_media: {
        account_1: {
          title: string;
          logo: string | false;
          url: string;
        };
        account_2: {
          title: string;
          logo: string | false;
          url: string;
        };
        account_3: {
          title: string;
          logo: string | false;
          url: string;
        };
        account_4: {
          title: string;
          logo: string | false;
          url: string;
        };
        account_5: {
          title: string;
          logo: string | false;
          url: string;
        };
        account_6: {
          title: string;
          logo: string | false;
          url: string;
        };
        account_7: {
          title: string;
          logo: string | false;
          url: string;
        };
      };
      column_links: {
        title: string;
        links: {
          link_1: {
            title: string;
            href: string;
          };
          link_2: {
            title: string;
            href: string;
          };
          link_3: {
            title: string;
            href: string;
          };
          link_4: {
            title: string;
            href: string;
          };
          link_5: {
            title: string;
            href: string;
          };
          link_6: {
            title: string;
            href: string;
          };
          link_7: {
            title: string;
            href: string;
          };
        };
      };
      column_contact: {
        title: string;
        contact_info: {
          location: string;
          phone: string;
          work_hours: string;
          email: string;
        };
      };
    };
  } = await res.json();

  return (
    <footer className="py-30 relative">
      <span>
        <Image
          src={"/footer-image.jpg"}
          alt="Footer Image"
          width={2160}
          height={1216}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 "
        />
      </span>
      <span className="absolute left-0 top-0 w-full h-full bg-black/70 -z-10"></span>

      <div className="container lg:grid lg:grid-cols-[1fr_1fr] lg:gap-4">
        <div className="w-fit max-lg:mx-auto max-lg:mb-10">
          <Image
            src={footerData.acf.logo || "/logo.png"}
            alt="Logo"
            width={668}
            height={566}
            className="w-38 h-auto object-contain mx-auto"
          />

          <h5 className="text-lg mt-4 text-center">{footerData.acf.text}</h5>

          <ul className="flex items-center justify-center gap-2 mt-4">
            {Object.values(footerData.acf.social_media)
              .filter((item) => Boolean(item.title) && Boolean(item.url))
              .map((account, index) => (
                <li key={index}>
                  <Link
                    href={account.url}
                    className="flex items-center justify-center w-fit bg-[#f8f8f827] p-2 rounded-full"
                  >
                    <Image
                      src={account.logo || "/social-media-placeholder.svg"}
                      alt={account.title || "Social Media Placeholder"}
                      width={20}
                      height={20}
                      className="w-6 h-6"
                    />
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 ">
          <div>
            <h4 className="text-2xl mb-4">
              {footerData.acf.column_links.title || "روابط سريعة"}
            </h4>
            <ul className="space-y-2">
              {Object.values(footerData.acf.column_links.links).map(
                (link, index) => (
                  <li key={index} className="font-extralight text-lg">
                    <Link href={link.href}>{link.title}</Link>
                  </li>
                ),
              )}
            </ul>
          </div>
          <div>
            <h4 className="text-2xl mb-4">
              {footerData.acf.column_contact.title || "تواصل معنا"}
            </h4>
            <ul className="space-y-4">
              <li className="font-extralight flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                    />
                  </svg>
                </span>
                <span>
                  {footerData.acf.column_contact.contact_info.location}
                </span>
              </li>
              <li className="font-extralight flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                    />
                  </svg>
                </span>
                <span>
                  <Link
                    href={`tel:${footerData.acf.column_contact.contact_info.phone}`}
                    className="underline"
                  >
                    {footerData.acf.column_contact.contact_info.phone}
                  </Link>
                </span>
              </li>
              <li className="font-extralight flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                    />
                  </svg>
                </span>
                <span>
                  {footerData.acf.column_contact.contact_info.work_hours}
                </span>
              </li>
              <li className="font-extralight flex items-center gap-2">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                    />
                  </svg>
                </span>
                <span>
                  <Link
                    href={`mailto:${footerData.acf.column_contact.contact_info.email}`}
                    className="underline"
                  >
                    {footerData.acf.column_contact.contact_info.email}
                  </Link>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
