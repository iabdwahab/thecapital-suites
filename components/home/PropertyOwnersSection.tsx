import Link from "next/link";

export default function PropertyOwnersSection() {
  return (
    <section className="container py-20">
      <span className="text-[14px] text-[#C9A455] text-center block">
        لملاك العقارات والمستثمرين
      </span>
      <h2 className="font-bold text-3xl md:text-4xl text-[#E0BC78] text-center mt-4 leading-[46px]">
        سلّم عقارك لنا... وشاهد نتائج مبهرة <br /> ودخــــلاً لا يُضــــــاهى
      </h2>
      <p className="text-[#C8BFB0] font-light text-center text-lg mt-4">
        إدارة فندقية احترافية تحوّل عقارك إلى مصدر دخل مستقر، بشفافية كاملة
        وعقود موثقة تحفظ حقوقك.
      </p>

      <div className="max-md:space-y-3 md:flex items-center justify-center mt-10 gap-4 flex-wrap">
        <Link
          href="#"
          className="bg-linear-to-br border rounded-lg border-[#A8883A] from-[#C9A455] to-[#A8883A] text-[#1A1208] font-bold px-8 py-4 block hover:opacity-90 transition duration-300 text-center"
        >
          احصل على استشارة مجانية
        </Link>
        <Link
          href="#"
          className="block px-8 py-4 text-[#E0BC78] border border-[#E0BC78] rounded-lg hover:opacity-90 transition duration-300 text-center"
        >
          تعرف على آلية العمل
        </Link>
      </div>
    </section>
  );
}
