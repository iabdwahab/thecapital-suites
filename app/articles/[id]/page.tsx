import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/articles?_fields=id,acf,date&acf_format=standard`,
  );

  const data: {
    id: number;
    date: string;
    acf: {
      title: string;
      description: string;
      brief: string;
      image: string | false;
    };
  }[] = await res.json();

  return data.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/articles/${id}?_fields=id,acf,date&acf_format=standard`,
  );
  const data: {
    id: number;
    date: string;
    acf: {
      title: string;
      description: string;
      brief: string;
      image: string | false;
    };
  } = await res.json();

  const moreArticlesRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/articles?_fields=id,acf,date&acf_format=standard`,
  );
  const moreArticlesData: {
    id: number;
    date: string;
    acf: {
      title: string;
      description: string;
      brief: string;
      image: string | false;
    };
  }[] = await moreArticlesRes.json();

  return (
    <>
      <section className="container py-20">
        <div className="w-full h-[430px] rounded-2xl overflow-hidden relative">
          <Image
            src={data.acf.image || "/article-placeholder.jpg"}
            alt="article"
            width={400}
            height={400}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div>
          <h1 className="text-[#f8f8f8] font-normal text-4xl mt-6 mb-14">
            {data.acf.title}
          </h1>

          <div
            className="text-lg md:text-xl text-[#fff] leading-[30px] font-light space-y-5"
            dangerouslySetInnerHTML={{ __html: data.acf.description }}
          ></div>
        </div>
      </section>

      <div className="container">
        <hr className="border-[#333]" />
      </div>

      <section className="py-20 container">
        <h2 className="font-extrabold text-[30px]  md:text-[40px] leading-[50px] mb-8">
          المزيد من المقالات
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {moreArticlesData.slice(0, 3).map((article) => (
            <ArticleCard
              key={article.id}
              id={article.id}
              brief={article.acf.brief}
              date={article.date}
              description={article.acf.description}
              image={article.acf.image}
              title={article.acf.title}
            />
          ))}
        </div>
        <Link
          href="/articles"
          className="block text-[#fff] w-fit  mt-8 py-3 px-6 rounded-lg bg-[#333] hover:bg-[#444] transition-all duration-300"
        >
          عرض جميع المقالات
        </Link>
      </section>
    </>
  );
}
