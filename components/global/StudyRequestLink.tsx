import Link from "next/link";

export default async function StudyRequestLink() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/posts/985?_fields=id,acf&acf_format=standard`,
  );

  const data: {
    acf: {
      link: string;
    };
  } = await res.json();

  return (
    <>
      <style>{`
        @keyframes glowPulse {
          0%, 100% {
            box-shadow: 0 0 0 0 rgba(179, 119, 0, 0.7), 0 4px 6px rgba(0,0,0,0.3);
          }
          50% {
            box-shadow: 0 0 0 14px rgba(179, 119, 0, 0), 0 4px 6px rgba(0,0,0,0.3);
          }
        }
        .study-request-btn {
          animation: glowPulse 2s ease-out infinite;
        }
      `}</style>
      <Link
        href={"/property-owners/#study-request-form"}
        aria-label="دراسة مبنى مجانية"
        className="study-request-btn fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full text-black px-4 py-1 font-bold bg-[#C9A455] hover:scale-110 transition-transform duration-200"
      >
        دراسة مبنى مجانية
      </Link>
    </>
  );
}
