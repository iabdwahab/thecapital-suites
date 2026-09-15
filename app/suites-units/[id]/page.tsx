import ImageSlider from "@/components/global/ImageSlider";
import FeaturedLocationsCarousel from "@/components/home/featured-locations/FeaturedLocationsCarousel";
import GallerySection from "@/components/suites-units/GallerySection";
import VideosList from "@/components/suites-units/VideosList";
import Image from "next/image";

// شكل عنصر الصورة اللي بترجعه ACF Pro Gallery field
type WpImage = { url: string; [key: string]: unknown };

type Acf = {
  title: string;
  descripiton: string;
  main_video: string | false;
  videos_list: Record<string, string | false>;
  has_studio?: boolean;
  has_1room?: boolean;
  has_2rooms?: boolean;
  studio_images?: WpImage[];
  "1room_images"?: WpImage[];
  "2rooms_images"?: WpImage[];
};

// ImageSlider لسه متوقع الشكل القديم (Record<string, {url}|false>)، فبنحول
// الـ array الجديد لنفس الشكل ده عشان منضطرش نعدّل ImageSlider نفسه دلوقتي.
function toSliderRecord(
  images: WpImage[] | undefined,
): Record<string, { url: string } | false> {
  if (!Array.isArray(images)) return {};
  return Object.fromEntries(
    images.map((img, index) => [`image_${index + 1}`, { url: img.url }]),
  );
}

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/featured-locations/?_fields=id,acf,date&acf_format=standard`,
  );

  const data: { id: number; acf: Acf }[] = await res.json();

  return data.map((post) => ({
    id: post.id.toString(),
  }));
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/featured-locations/${id}?_fields=id,acf&acf_format=standard`,
  );

  const locationData: { acf: Acf } = await res.json();
  const { acf } = locationData;

  // الـ toggle (has_studio/has_1room/has_2rooms) هو مصدر الحقيقة، مش مجرد وجود صور
  // في الحقل — زي ما اتفقنا، عشان نتفادى حالة "مسحت الصور بس فضل عنصر شبح في الـ array".
  const hasStudio = acf.has_studio === true;
  const hasOneRoom = acf.has_1room === true;
  const hasTwoRooms = acf.has_2rooms === true;

  const studioImages = toSliderRecord(acf.studio_images);
  const oneRoomImages = toSliderRecord(acf["1room_images"]);
  const twoRoomsImages = toSliderRecord(acf["2rooms_images"]);

  return (
    <>
      <section className="min-h-screen py-20 flex flex-col justify-center relative">
        <span>
          <Image
            src="/home-hero-image.jpg"
            alt="Hero Image"
            width={4096}
            height={2736}
            className="absolute inset-0 w-full h-full object-cover -z-10"
          />
        </span>
        <span className="absolute left-0 top-0 w-full h-full bg-black/70 -z-10"></span>

        <div className="container text-center">
          <h1 className="text-3xl md:text-6xl font-extrabold text-[#F8F8F8] leading-[50px] md:leading-[80px]">
            {acf.title}
          </h1>
          <p className="text-xl md:text-4xl font-extralight text-[#E7DECA] mt-4 max-w-4xl md:leading-[48px] mx-auto">
            {acf.descripiton ||
              "مجموعة من البنايات الفاخرة بتصاميم معمارية فريدة"}
          </p>
        </div>

        <span className="absolute bottom-0 left-0 w-full h-20 -z-10 bg-linear-to-t from-black to-transparent"></span>
      </section>

      <section className="min-h-screen container ">
        <div className="w-full h-120 overflow-hidden -mt-40 bg-white relative z-20 rounded-3xl">
          <video
            src={acf.main_video || "/suites-units-video.mp4"}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>

      <span className="relative z-10 overflow-hidden">
        <span className="absolute top-0 w-[200px] md:w-[calc(50%)] h-[350px] blur-[180px] md:blur-[350px]  bg-[#5a5904] left-0 -z-10"></span>
        <span className="absolute top-[100vh] w-[200px] md:w-[calc(50%)] h-[350px] blur-[180px] md:blur-[350px]  bg-[#5a5904] right-0 -z-10"></span>
        <span className="absolute top-[200vh] w-[200px] md:w-[calc(50%)] h-[350px] blur-[180px] md:blur-[350px]  bg-[#5a5904] left-0 -z-10"></span>
        <span className="absolute top-[300vh] w-[200px] md:w-[calc(50%)] h-[350px] blur-[180px] md:blur-[350px]  bg-[#5a5904] right-0 -z-10"></span>

        <section className="container pb-10">
          <h2 className="font-black text-4xl leading-[40px] text-center bg-gradient-to-l from-white to-80% to-[#bdbdbd] bg-clip-text text-transparent mb-10">
            <span className="block text-4xl leading-[50px] mb-4">
              استكشف ما نقدمه من خدمات
            </span>
            {/* <span className="leading-[60px] text-5xl ">التصميمات الداخلية</span> */}
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <Image
              src="/featured-1.png"
              alt=""
              width={1080}
              height={1080}
              className="rounded-2xl object-cover w-full h-full"
            />
            <Image
              src="/featured-2.png"
              alt=""
              width={1080}
              height={1080}
              className="rounded-2xl object-cover w-full h-full"
            />
          </div>
        </section>

        {/* <GallerySection images={...} /> — الحقل العام "images" اتشال من الـ schema،
          لسه مش موجود بديل ليه دلوقتي. */}

        {hasOneRoom && (
          <>
            <section className="py-10 container">
              <h2 className="text-[40px] ">غرفة وصالة</h2>
              <ImageSlider images={oneRoomImages} />
            </section>
            <hr className="container border-[#eeeeee38]" />
          </>
        )}

        {hasTwoRooms && (
          <>
            <section className="py-10 container">
              <h2 className="text-[40px]">غرفتين وصالة</h2>
              <ImageSlider images={twoRoomsImages} />
            </section>
            <hr className="container border-[#eeeeee38]" />
          </>
        )}

        {hasStudio && (
          <section className="py-10 container">
            <h2 className="text-[40px]">استوديو</h2>
            <ImageSlider images={studioImages} />
          </section>
        )}

        <VideosList videos={acf.videos_list} />
      </span>
    </>
  );
}
