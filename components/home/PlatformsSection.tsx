export default async function PlatformsSection() {
  const platformsListRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/booking-platforms?_fields=id,acf&acf_format=standard`,
  );
  const platformsList: {
    id: number;
    acf: {
      title: string;
      platforms_list: {
        platform_1: string;
        platform_2: string;
        platform_3: string;
        platform_4: string;
        platform_5: string;
        platform_6: string;
        platform_7: string;
        platform_8: string;
      };
    };
  }[] = await platformsListRes.json();

  const sectionHeadingRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/section-info/175?_fields=id,acf&acf_format=standard`,
  );
  const sectionHeading: {
    id: number;
    acf: {
      title: string;
      description: string;
    };
  } = await sectionHeadingRes.json();

  return (
    <section className="py-20 container">
      <h2 className="font-bold text-3xl md:text-4xl text-[#E0BC78] text-center mt-4 leading-[46px]">
        {sectionHeading.acf.title}
      </h2>
      <p className="text-[#C8BFB0] font-light text-center text-lg mt-4">
        {sectionHeading.acf.description}
      </p>

      <div className="mt-10 border text-center border-[#c9a45541] rounded-2xl grid md:grid-cols-2 lg:grid-cols-4">
        {platformsList.map((platform) => (
          <div
            key={platform.id}
            className="p-8 md:p-10  space-y-2 border-l border-[#c9a45541]"
          >
            <h4 className="text-[#C9A455] font-bold">{platform.acf.title}</h4>
            <hr className="border-[#c9a45541]" />
            <ul className="text-[#C0B09A] space-y-2">
              {Object.values(platform.acf.platforms_list).map(
                (platformName, index) =>
                  platformName && <li key={index}>{platformName}</li>,
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
