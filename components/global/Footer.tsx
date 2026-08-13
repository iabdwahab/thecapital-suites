import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="py-30 relative">
      <span>
        <Image
          src="/footer-image.jpg"
          alt="Footer Image"
          width={2160}
          height={1216}
          className="absolute top-0 left-0 w-full h-full object-cover -z-10 "
        />
      </span>
      <span className="absolute left-0 top-0 w-full h-full bg-black/70 -z-10"></span>

      <div className="container lg:grid lg:grid-cols-[1fr_200px_1fr] lg:gap-10">
        <div className="w-fit mx-auto max-lg:mb-10">
          <Image
            src="/logo.png"
            alt="Logo"
            width={668}
            height={566}
            className="w-38 h-auto object-contain mx-auto"
          />

          <h5 className="text-lg mt-4 text-center">
            إدارة تــــرفــع القــيــمــة .. وضــيــافــة تـصــنــع
            التـــجــربــة
          </h5>

          <ul className="flex items-center justify-center gap-2 mt-4">
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-fit bg-[#f8f8f827] p-2 rounded-full"
              >
                <Image
                  src="/social-media-placeholder.svg"
                  alt="Social Media Placeholder"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-fit bg-[#f8f8f827] p-2 rounded-full"
              >
                <Image
                  src="/social-media-placeholder.svg"
                  alt="Social Media Placeholder"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                />
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center justify-center w-fit bg-[#f8f8f827] p-2 rounded-full"
              >
                <Image
                  src="/social-media-placeholder.svg"
                  alt="Social Media Placeholder"
                  width={20}
                  height={20}
                  className="w-6 h-6"
                />
              </Link>
            </li>
          </ul>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:col-start-3">
          <div>
            <h4 className="text-2xl mb-4">روابط سريعة</h4>
            <ul className="space-y-">
              <li className="font-extralight text-lg">
                <Link href="#">الرئيسية</Link>
              </li>
              <li className="font-extralight text-lg">
                <Link href="#">من نحن</Link>
              </li>
              <li className="font-extralight text-lg">
                <Link href="#">خدماتنا</Link>
              </li>
              <li className="font-extralight text-lg">
                <Link href="#">اتصل بنا</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-2xl mb-4">روابط سريعة</h4>
            <ul className="space-y-">
              <li className="font-extralight text-lg">
                <Link href="#">الرئيسية</Link>
              </li>
              <li className="font-extralight text-lg">
                <Link href="#">من نحن</Link>
              </li>
              <li className="font-extralight text-lg">
                <Link href="#">خدماتنا</Link>
              </li>
              <li className="font-extralight text-lg">
                <Link href="#">اتصل بنا</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
