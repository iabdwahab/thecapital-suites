import ArticleCard from "@/components/ArticleCard";
import Image from "next/image";
import Link from "next/link";

export default function ArticlePage() {
  return (
    <>
      <section className="container py-20">
        <div className="w-full h-[430px] rounded-2xl overflow-hidden relative">
          <Image
            src="/article-placeholder.jpg"
            alt="article"
            width={400}
            height={400}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div>
          <h1 className="text-[#f8f8f8] font-normal text-4xl mt-6 mb-14">
            فـــــلل الـــــربـــــوة الـــــفـــــاخـــــرة
          </h1>

          <div className="text-lg md:text-xl text-[#fff] leading-[30px] font-light space-y-5">
            <p>
              العمل مع شركتكم كان تجربة استثنائية حقاً. أبدع مصمموكم الداخليون
              إبداعاً لافتاً في كل تفصيلة العمل مع شركتكم كان تجربة استثنائية
              حقاً. أبدع مصمموكم الداخليون إبداعاً لافتاً في كل تفصيلة{" "}
            </p>
            <p>
              العمل مع شركتكم كان تجربة استثنائية حقاً. أبدع مصمموكم الداخليون
              إبداعاً لافتاً في كل تفصيلة العمل مع شركتكم كان تجربة استثنائية
              حقاً. أبدع مصمموكم الداخليون إبداعاً لافتاً في كل تفصيلة{" "}
            </p>
            <p>
              العمل مع شركتكم كان تجربة استثنائية حقاً. أبدع مصمموكم الداخليون
              إبداعاً لافتاً في كل تفصيلة العمل مع شركتكم كان تجربة استثنائية
              حقاً. أبدع مصمموكم الداخليون إبداعاً لافتاً في كل تفصيلة{" "}
            </p>
            <p>
              العمل مع شركتكم كان تجربة استثنائية حقاً. أبدع مصمموكم الداخليون
              إبداعاً لافتاً في كل تفصيلة العمل مع شركتكم كان تجربة استثنائية
              حقاً. أبدع مصمموكم الداخليون إبداعاً لافتاً في كل تفصيلة{" "}
            </p>
            <p>
              العمل مع شركتكم كان تجربة استثنائية حقاً. أبدع مصمموكم الداخليون
              إبداعاً لافتاً في كل تفصيلة العمل مع شركتكم كان تجربة استثنائية
              حقاً. أبدع مصمموكم الداخليون إبداعاً لافتاً في كل تفصيلة{" "}
            </p>
          </div>
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
          <ArticleCard />
          <ArticleCard />
          <ArticleCard />
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
