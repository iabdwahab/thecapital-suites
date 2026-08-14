import Image from "next/image";

export default function FeaturedLocations() {
  return (
    <section className="font-thamnyah container py-20">
      <h2 className="font-black text-5xl leading-[60px] text-center bg-gradient-to-l from-white to-80% to-[#bdbdbd] bg-clip-text text-transparent my-10">
        مواقعنـــــا المميـــــزة
      </h2>

      <div className="bg-[#3d29003b] w-fit mx-auto border border-[#3D2900] p-3 md:p-2 rounded-xl md:rounded-full flex flex-wrap justify-center items-center gap-2">
        <button className="bg-[#C8AD6A] cursor-pointer hover:opacity-80 border border-[#3D2900] text-[#0B0800] font-medium text-lg px-6 py-2 rounded-full">
          حي العـــــارض
        </button>
        <button className="border min-w-30  cursor-pointer hover:opacity-80 border-[#3D2900] text-[#E7DECA] font-medium text-lg px-6 py-2 rounded-full">
          حطين
        </button>
        <button className="border min-w-30  cursor-pointer hover:opacity-80 border-[#3D2900] text-[#E7DECA] font-medium text-lg px-6 py-2 rounded-full">
          القيـــروان
        </button>
        <button className="border min-w-30  cursor-pointer hover:opacity-80 border-[#3D2900] text-[#E7DECA] font-medium text-lg px-6 py-2 rounded-full">
          الملز
        </button>
        <button className="border min-w-30  cursor-pointer hover:opacity-80 border-[#3D2900] text-[#E7DECA] font-medium text-lg px-6 py-2 rounded-full">
          الرمال
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        <div className="h-60 rounded-xl overflow-hidden relative">
          <Image
            src="/home-hero-image.jpg"
            alt="Featured Locations"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-60 rounded-xl overflow-hidden relative">
          <Image
            src="/home-hero-image.jpg"
            alt="Featured Locations"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-60 rounded-xl overflow-hidden relative">
          <Image
            src="/home-hero-image.jpg"
            alt="Featured Locations"
            width={1200}
            height={800}
            className="w-full h-full object-cover"
          />
        </div>
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
      </div>
    </section>
  );
}
