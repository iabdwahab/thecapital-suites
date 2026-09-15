const WP_API_URL =
  "https://wp.thecapitalsuites.sa/wp-json/wp/v2/featured-locations/?_fields=id,acf&acf_format=standard";

// شكل عنصر الصورة اللي بترجعه ACF Pro Gallery field
type WpImage = { url: string; [key: string]: unknown };

// videos_list لسه بنفس الشكل القديم (object فيه video_1..video_10، كل قيمة string | false)
type VideosListValue = Record<string, string | false>;

type RawAcf = {
  title: string;
  descripiton?: string;
  main_video?: string | false;
  videos_list?: VideosListValue;
  has_studio?: boolean;
  has_1room?: boolean;
  has_2rooms?: boolean;
  studio_images?: WpImage[];
  "1room_images"?: WpImage[];
  "2rooms_images"?: WpImage[];
};

type RawPost = {
  id: number;
  acf: RawAcf;
};

export type District = {
  id: number;
  name: string;
  description: string;
  mainVideo: string | null;
  extraVideos: string[];
  units: { key: string; label: string; images: string[] }[];
};

// تعريف صريح لكل نوع وحدة: مفتاح الحقل اللي بيحمل الصور، حقل التفعيل (toggle)،
// والتسمية العربية. بقينا محتاجين تعريف صريح كده (بدل الاكتشاف التلقائي القديم) لأن
// أسماء الحقول بقت غير متطابقة مع بعضها (has_1room / 1room_images / "غرفة وصالة").
const UNIT_DEFINITIONS: {
  key: string;
  label: string;
  enabledField: keyof RawAcf;
  imagesField: keyof RawAcf;
}[] = [
  {
    key: "studio",
    label: "استديو",
    enabledField: "has_studio",
    imagesField: "studio_images",
  },
  {
    key: "1_room",
    label: "غرفة وصالة",
    enabledField: "has_1room",
    imagesField: "1room_images",
  },
  {
    key: "2_rooms",
    label: "غرفتين وصالة",
    enabledField: "has_2rooms",
    imagesField: "2rooms_images",
  },
];

function collectGalleryUrls(images: WpImage[] | undefined): string[] {
  if (!Array.isArray(images)) return [];
  return images.map((img) => img.url).filter(Boolean);
}

// videos_list لسه object قديم الشكل (video_1..video_10)، فمحتاجين طريقة تجميع مختلفة
// عن الـ Gallery fields (اللي هي arrays أصلاً).
function collectVideoListUrls(obj: VideosListValue | undefined): string[] {
  if (!obj) return [];
  return Object.values(obj).filter(
    (v): v is string => typeof v === "string" && v.length > 0,
  );
}

function normalizePost(post: RawPost): District {
  const { acf } = post;

  const units = UNIT_DEFINITIONS.map(
    ({ key, label, enabledField, imagesField }) => {
      // الـ toggle هو مصدر الحقيقة — لو false أو غير موجود، النوع ده مش متاح حتى لو
      // فيه صور فعلية لسه قاعدة في الحقل (حالة "مسحت الصور بس فضل عنصر شبح في الـ array")
      const isEnabled = acf[enabledField] === true;

      return {
        key,
        label,
        images: isEnabled
          ? collectGalleryUrls(acf[imagesField] as WpImage[] | undefined)
          : [],
      };
    },
  ).filter((unit) => unit.images.length > 0);

  return {
    id: post.id,
    name: acf.title,
    description: acf.descripiton ?? "",
    mainVideo: acf.main_video || null,
    extraVideos: collectVideoListUrls(acf.videos_list),
    units,
  };
}

export async function getFeaturedLocations(): Promise<District[]> {
  const res = await fetch(WP_API_URL, {
    // عدّل الوقت حسب احتياجك — أو استخدم { cache: "no-store" } لو عايز بيانات لحظية
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`فشل جلب البيانات من ووردبريس: ${res.status}`);
  }

  const posts: RawPost[] = await res.json();
  return posts.map(normalizePost);
}
