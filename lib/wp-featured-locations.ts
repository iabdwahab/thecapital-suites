const WP_API_URL =
  "https://wp.thecapitalsuites.sa/wp-json/wp/v2/featured-locations/?_fields=id,acf&acf_format=standard";

// شكل عنصر الصورة اللي بترجعه ACF Pro Gallery field
type WpImage = { url: string; [key: string]: unknown };

// شكل حقل الفيديو (ACF Pro File/Video field) — بيرجع object فيه url، أو false لو فاضي
type WpVideo = { url: string; [key: string]: unknown } | false;

type RawAcf = {
  title: string;
  descripiton?: string;
  has_studio?: boolean;
  has_1room?: boolean;
  has_2rooms?: boolean;
  studio_images?: WpImage[];
  "1room_images"?: WpImage[];
  "2rooms_images"?: WpImage[];
  studio_main_video?: WpVideo;
  "1room_main_video"?: WpVideo;
  "2rooms_main_video"?: WpVideo;
};

type RawPost = {
  id: number;
  acf: RawAcf;
};

export type District = {
  id: number;
  name: string;
  description: string;
  units: {
    key: string;
    label: string;
    images: string[];
    video: string | null;
  }[];
};

// تعريف صريح لكل نوع وحدة: مفتاح الصور، مفتاح الفيديو، وحقل التفعيل (toggle)،
// والتسمية العربية. محتاجين تعريف صريح كده (بدل الاكتشاف التلقائي) لأن أسماء
// الحقول بقت غير متطابقة مع بعضها (has_1room / 1room_images / "غرفة وصالة").
const UNIT_DEFINITIONS: {
  key: string;
  label: string;
  enabledField: keyof RawAcf;
  imagesField: keyof RawAcf;
  videoField: keyof RawAcf;
}[] = [
  {
    key: "studio",
    label: "استديو",
    enabledField: "has_studio",
    imagesField: "studio_images",
    videoField: "studio_main_video",
  },
  {
    key: "1_room",
    label: "غرفة وصالة",
    enabledField: "has_1room",
    imagesField: "1room_images",
    videoField: "1room_main_video",
  },
  {
    key: "2_rooms",
    label: "غرفتين وصالة",
    enabledField: "has_2rooms",
    imagesField: "2rooms_images",
    videoField: "2rooms_main_video",
  },
];

function collectGalleryUrls(images: WpImage[] | undefined): string[] {
  if (!Array.isArray(images)) return [];
  return images.map((img) => img.url).filter(Boolean);
}

function collectVideoUrl(video: WpVideo | undefined): string | null {
  if (video && typeof video === "object" && typeof video.url === "string") {
    return video.url;
  }
  return null;
}

function normalizePost(post: RawPost): District {
  const { acf } = post;

  const units = UNIT_DEFINITIONS.map(
    ({ key, label, enabledField, imagesField, videoField }) => {
      // الـ toggle هو مصدر الحقيقة — لو false أو غير موجود، النوع ده مش متاح حتى لو
      // فيه صور فعلية لسه قاعدة في الحقل (حالة "مسحت الصور بس فضل عنصر شبح في الـ array")
      const isEnabled = acf[enabledField] === true;

      return {
        key,
        label,
        images: isEnabled
          ? collectGalleryUrls(acf[imagesField] as WpImage[] | undefined)
          : [],
        video: isEnabled
          ? collectVideoUrl(acf[videoField] as WpVideo | undefined)
          : null,
      };
    },
  ).filter((unit) => unit.images.length > 0 || unit.video);

  return {
    id: post.id,
    name: acf.title,
    description: acf.descripiton ?? "",
    units,
  };
}

export async function getFeaturedLocations(): Promise<District[]> {
  const res = await fetch(WP_API_URL, {
    // عدّل الوقت حسب احتياجك — أو استخدم { cache: "no-store" } لو عايز بيانات لحظية
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`فشل جلب البيانات من ووردبريس: ${res.status}`);
  }

  const posts: RawPost[] = await res.json();
  return posts.map(normalizePost);
}
