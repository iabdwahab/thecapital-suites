import ArticleCard from "@/components/ArticleCard";

export default async function ArticlesPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/articles?_fields=id,acf,date&acf_format=standard`,
  );
  const articlesList: {
    id: number;
    date: string;
    acf: {
      title: string;
      description: string;
      brief: string;
      image: string | false;
    };
  }[] = await res.json();

  return (
    <section className="py-20 container">
      <h1 className="font-extrabold text-[40px] leading-[40px] mb-8">
        المقالات
      </h1>

      {/* <div> */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articlesList.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            title={article.acf.title}
            description={article.acf.description}
            brief={article.acf.brief}
            image={article.acf.image}
            date={article.date}
          />
        ))}
      </div>
    </section>
  );
}
