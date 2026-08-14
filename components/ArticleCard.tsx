import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({
  id,
  title,
  description,
  brief,
  image,
  date,
}: {
  id: number;
  title: string;
  description: string;
  brief: string;
  image: string | false;
  date: string;
}) {
  return (
    <article className="px-3 py-3 bg-[#202020] rounded-md">
      <div className="w-full h-[230px] relative overflow-hidden rounded-md">
        <Link
          href={`/articles/${id}`}
          className="group block w-full h-full relative overflow-hidden rounded-md"
        >
          <Image
            src={image || "/article-placeholder.jpg"}
            alt="article"
            width={400}
            height={200}
            loading="eager"
            className="w-full h-full object-cover object-center rounded-md group-hover:blur-xs transition duration-200"
          />

          <span className="invisible group-hover:visible absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#FFAA00] text-[14px] font-light bg-[#202020] px-4 py-2 rounded-full border border-[#FFAA00] transition duration-400">
            عرض المقال
          </span>
        </Link>
      </div>
      <div className="space-y-2 pt-4 px-1">
        {date && (
          <span className="block w-fit rounded-full bg-[#FFAA0012] text-[#FFAA00] px-2 py-1 border-[#FFAA00] border-[1px] text-[11px] font-light">
            {new Date(date).toLocaleDateString("ar-EG", {
              dateStyle: "short",
            })}
          </span>
        )}
        <h3 className="text-[#F8F8F8] font-normal">
          <Link
            href={`/articles/${id}`}
            className="hover:underline hover:text-[#FFAA00] transition duration-100"
          >
            {title}
          </Link>
        </h3>
        <p className="text-[#888888BF] text-[14px] leading-[21px] font-light">
          {brief}
        </p>
      </div>
      <div className="px-2 pb-2">
        <Link
          href={`/articles/${id}`}
          className="block w-fit p-2 mr-auto rounded-full bg-[#202020] border border-[#d9d9d95b] hover:bg-[#FFAA0012] hover:text-[#FFAA00] hover:border-[#FFAA00] transition duration-200"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 rotate-45"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </div>
    </article>
  );
}
