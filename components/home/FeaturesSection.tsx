import Image from "next/image";

export default function FeaturesSection() {
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
          مميزات التعامل معنا
        </h2>
        <p className="text-[#A09080] font-light text-center text-lg mt-2">
          ما يجعل ملاك العقارات يثقون بنا
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
        <FeatureCard />
      </div>
    </section>
  );
}

function FeatureCard() {
  return (
    <div className="relative group overflow-hidden rounded-xl p-8 border border-[#C9A45526] flex flex-col items-center text-center">
      <Image
        src="/feature-placeholder.svg"
        alt="Feature 1"
        width={36}
        height={36}
        className=""
      />

      <h3 className="font-semibold text-lg text-[#F0E0C0] mt-4">
        خبرة واسعة بالسوق
      </h3>
      <p className="text-[#7D6E58] font-light mt-1">
        معرفة عميقة بالسوق السعودي والخليجي
      </p>

      <span className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 w-[100px] h-[100px] blur-[100px] group-hover:bg-[#ffa600] rounded-full transition duration-300"></span>
      <span className="absolute bottom-0 left-0 transform -translate-x-1/2 translate-y-1/2 w-[100px] h-[100px] blur-[100px] group-hover:bg-[#ffa600] rounded-full transition duration-300"></span>
    </div>
  );
}
