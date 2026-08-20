import Image from "next/image";
import FeaturedLocationsCarousel from "./FeaturedLocationsCarousel";

export default async function FeaturedLocations() {
  const featuredLocationsListRes = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/featured-locations?_fields=id,acf&acf_format=standard`,
  );

  const featuredLocationsList: {
    id: number;
    acf: {
      title: string;
      images: {
        image_1: string | false;
        image_2: string | false;
        image_3: string | false;
        image_4: string | false;
        image_5: string | false;
        image_6: string | false;
        image_7: string | false;
        image_8: string | false;
        image_9: string | false;
        image_10: string | false;
      };
      descripiton: string;
      video: string | false;
    };
  }[] = await featuredLocationsListRes.json();
  console.log("Featured Locations List:", featuredLocationsList);

  return (
    <section className="font-thamnyah container py-20">
      <h2 className="font-black text-5xl leading-[60px] text-center bg-gradient-to-l from-white to-80% to-[#bdbdbd] bg-clip-text text-transparent my-10">
        مواقعنـــــا المميـــــزة
      </h2>

      <FeaturedLocationsCarousel
        featuredLocationsList={featuredLocationsList}
      />
      {/* <div className="bg-[#3d29003b] w-fit mx-auto border border-[#3D2900] p-3 md:p-2 rounded-xl md:rounded-full flex flex-wrap justify-center items-center gap-2">
        {featuredLocationsList.map((location) => (
          <button
            key={location.id}
            className="bg-[#C8AD6A] cursor-pointer hover:opacity-80 border border-[#3D2900] text-[#0B0800] font-medium text-lg px-6 py-2 rounded-full"
          >
            {location.acf.title}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {featuredLocationsList.map((location) => {
          const imagesList = Object.values(location.acf.images).filter(
            (image) => image !== false,
          );

          return imagesList.map((image, index) => (
            <div className="h-60 rounded-xl overflow-hidden relative">
              <Image
                src={image || "/home-hero-image.jpg"}
                alt="Featured Locations"
                width={1200}
                height={800}
                className="w-full h-full object-cover"
              />
            </div>
          ));
        })}
      </div>

      <div className="flex justify-center gap-2 mt-10">
        <button className="border border-[#d9d9d92a] rounded-full p-3 cursor-pointer hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6 rotate-180"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
        <button className="border border-[#d9d9d92a] rounded-full p-3 cursor-pointer hover:opacity-80">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
            />
          </svg>
        </button>
      </div> */}
    </section>
  );
}
