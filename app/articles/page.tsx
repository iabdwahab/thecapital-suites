import ArticleCard from "@/components/ArticleCard";

export default function ArticlesPage() {
  return (
    <section className="py-20 container">
      <h1 className="font-extrabold text-[40px] leading-[40px] mb-8">
        المقالات
      </h1>

      {/* <div> */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
        <ArticleCard />
      </div>
    </section>
  );
}
