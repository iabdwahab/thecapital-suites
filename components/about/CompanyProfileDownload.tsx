import Link from "next/link";

export default function CompanyProfileDownload() {
  return (
    <div className="flex justify-center pb-20" dir="rtl">
      <Link
        href="/profile-capital-suites-2026.pdf"
        download
        className="inline-flex items-center gap-2 bg-[#BFA045] text-black font-bold py-3 px-8 rounded-xl hover:opacity-90 transition-opacity duration-200"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
          />
        </svg>
        تحميل الملف التعريفي للشركة
      </Link>
    </div>
  );
}
