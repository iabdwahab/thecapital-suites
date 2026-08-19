import Image from "next/image";

export default async function FeaturesSection() {
  const featuresListRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/dealing-features?_fields=id,acf&acf_format=standard`,
  );
  const featuresList: {
    id: number;
    acf: {
      icon: string;
      title: string;
      description: string;
    };
  }[] = await featuresListRes.json();

  const sectionHeadingRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/section-info/174?_fields=id,acf&acf_format=standard`,
  );
  const sectionHeading: {
    id: number;
    acf: {
      title: string;
      description: string;
    };
  } = await sectionHeadingRes.json();

  return (
    <section className="py-10 container">
      <div>
        <Image
          src="/logo.png"
          alt="Logo"
          width={668}
          height={566}
          className="w-25 h-25 object-contain mx-auto"
        />
        <h2 className="font-bold text-3xl md:text-4xl text-[#E0BC78] text-center mt-2">
          {sectionHeading.acf.title}
        </h2>
        <p className="text-[#A09080] font-light text-center text-lg mt-2">
          {sectionHeading.acf.description}
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {featuresList.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.acf.icon}
            title={feature.acf.title}
            description={feature.acf.description}
          />
        ))}
      </div>
    </section>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative group overflow-hidden rounded-xl p-8 border border-[#C9A45526] flex flex-col items-center text-center">
      <Image
        src={icon || "/feature-placeholder.svg"}
        alt={title}
        width={36}
        height={36}
        className=""
      />

      <h3 className="font-semibold text-lg text-[#F0E0C0] mt-4">{title}</h3>
      <p className="text-[#7D6E58] font-light mt-1">{description}</p>

      <span className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-[100px] h-[100px] blur-[100px] group-hover:bg-[#ffa600] rounded-full transition duration-300"></span>
      <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-[100px] h-[100px] blur-[100px] group-hover:bg-[#ffa600] rounded-full transition duration-300"></span>
    </div>
  );
}
