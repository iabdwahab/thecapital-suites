import Link from "next/link";

export default async function PropertyOwnersSection() {
  const sectionHeadingRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/section-info/176?_fields=id,acf&acf_format=standard`,
  );
  const sectionHeading: {
    id: 176;
    acf: {
      title: string;
      description: string;
      badge: string;
      link_1: {
        text: string;
        href: string;
      };
      link_2: {
        text: string;
        href: string;
      };
    };
  } = await sectionHeadingRes.json();

  return (
    <section className="container py-20">
      <span className="text-[14px] text-[#C9A455] text-center block">
        {sectionHeading.acf.badge}
      </span>
      <h2 className="font-bold max-w-2xl mx-auto text-3xl md:text-4xl text-[#E0BC78] text-center mt-4 leading-[46px]">
        {sectionHeading.acf.title}
      </h2>
      <p className="text-[#C8BFB0] font-light text-center text-lg mt-4">
        {sectionHeading.acf.description}
      </p>

      <div className="max-md:space-y-3 md:flex items-center justify-center mt-10 gap-4 flex-wrap">
        <Link
          href={sectionHeading.acf.link_1?.href || "/contact"}
          className="bg-linear-to-br border rounded-lg border-[#A8883A] from-[#C9A455] to-[#A8883A] text-[#1A1208] font-bold px-8 py-4 block hover:opacity-90 transition duration-300 text-center"
        >
          {sectionHeading.acf.link_1?.text}
        </Link>
        {/* <Link
          href={sectionHeading.acf.link_2?.href || "/contact"}
          className="block px-8 py-4 text-[#E0BC78] border border-[#E0BC78] rounded-lg hover:opacity-90 transition duration-300 text-center"
        >
          {sectionHeading.acf.link_2?.text}
        </Link> */}
      </div>
    </section>
  );
}
