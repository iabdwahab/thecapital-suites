import ImageSlider from "@/components/global/ImageSlider";
import FeaturedLocationsCarousel from "@/components/home/featured-locations/FeaturedLocationsCarousel";
import GallerySection from "@/components/suites-units/GallerySection";
import VideosList from "@/components/suites-units/VideosList";
import Image from "next/image";

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL}/featured-locations/?_fields=id,acf,date&acf_format=standard`,
  );

  const data: {
    id: number;
    acf: {
      title: string;
      images: Record<string, string | false>;
      descripiton: string;
      video: string | false;
      videos_list: Record<string, string | false>;
      "1_room"?: Record<
        string,
        | {
            url: string;
          }
        | false
      >;
      "2_rooms"?: Record<
        string,
        | {
            url: string;
          }
        | false
      >;
      studio?: Record<
        string,
        | {
            url: string;
          }
        | false
      >;
    };
  }[] = await res.json();

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

  const locationData: {
    acf: {
      title: string;
      images: Record<string, string | false>;
      descripiton: string;
      video: string | false;
      videos_list: Record<string, string | false>;
      // الحقول دي ممكن تكون مش موجودة خالص في بعض البوستات، مش بس false
      "1_room"?: Record<
        string,
        | {
            url: string;
          }
        | false
      >;
      "2_rooms"?: Record<
        string,
        | {
            url: string;
          }
        | false
      >;
      studio?: Record<
        string,
        | {
            url: string;
          }
        | false
      >;
    };
  } = await res.json();

  // نجهز نسخة آمنة من كل حقل نوع وحدة، عشان منكررش ?? {} في كل مكان
  const oneRoomImages = locationData.acf["1_room"] ?? {};
  const twoRoomsImages = locationData.acf["2_rooms"] ?? {};
  const studioImages = locationData.acf["studio"] ?? {};

  const hasOneRoom =
    Object.values(oneRoomImages).filter(
      (image): image is { url: string } => image !== false,
    ).length > 0;

  const hasTwoRooms =
    Object.values(twoRoomsImages).filter(
      (image): image is { url: string } => image !== false,
    ).length > 0;

  const hasStudio =
    Object.values(studioImages).filter(
      (image): image is { url: string } => image !== false,
    ).length > 0;

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
            {locationData.acf.title}
          </h1>
          <p className="text-xl md:text-4xl font-extralight text-[#E7DECA] mt-4 max-w-4xl md:leading-[48px] mx-auto">
            {locationData.acf.descripiton ||
              "مجموعة من البنايات الفاخرة بتصاميم معمارية فريدة"}
          </p>
        </div>

        <span className="absolute bottom-0 left-0 w-full h-20 -z-10 bg-linear-to-t from-black to-transparent"></span>
      </section>

      <section className="min-h-screen container ">
        <div className="w-full h-120 overflow-hidden -mt-40 bg-white relative rounded-3xl">
          <video
            src={locationData.acf.video || "/suites-units-video.mp4"}
            className="absolute top-0 left-0 w-full h-full object-cover object-center"
            autoPlay
            loop
            muted
          ></video>
        </div>
      </section>

      <GallerySection images={locationData.acf.images} />
      <VideosList videos={locationData.acf.videos_list} />

      {hasOneRoom && (
        <>
          <section className="py-10 container">
            <h2 className="text-[40px]">غرفة وصالة</h2>
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
    </>
  );
}
