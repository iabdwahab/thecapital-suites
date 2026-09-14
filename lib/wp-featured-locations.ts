const WP_API_URL =
  "https://wp.thecapitalsuites.sa/wp-json/wp/v2/featured-locations/?_fields=id,acf&acf_format=standard";

// أسماء الحقول اللي مش عبارة عن "نوع وحدة" — أي حقل تاني غيرهم بيتعامل معاه كنوع وحدة تلقائيًا
const NON_UNIT_FIELDS = new Set([
  "title",
  "images",
  "descripiton",
  "video",
  "videos_list",
]);

// ترجمة اسم الحقل لنص عربي يتعرض للمستخدم — ضيف هنا أي نوع جديد يظهر
const UNIT_LABELS: Record<string, string> = {
  studio: "استديو",
  "1_room": "غرفة وصالة",
  "2_rooms": "غرفتين وصالة",
  "3_rooms": "ثلاث غرف وصالة",
};

type RawImageValue = string | false | { url: string; [key: string]: unknown };

type RawAcf = {
  title: string;
  images?: Record<string, RawImageValue>;
  descripiton?: string;
  video?: string | false;
  videos_list?: Record<string, RawImageValue>;
  [unitField: string]: unknown;
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
  generalImages: string[];
  units: { key: string; label: string; images: string[] }[];
};

// يحول أي قيمة صورة (string / false / object) لـ url نضيف، أو null لو مفيش صورة
function extractUrl(value: RawImageValue): string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (typeof value === "object" && "url" in value) return value.url;
  return null;
}

// يحول object فيه image_1..image_N لمصفوفة urls نضيفة (بيشيل false والقيم الفاضية)
function collectImages(
  obj: Record<string, RawImageValue> | undefined,
): string[] {
  if (!obj) return [];
  return Object.values(obj)
    .map(extractUrl)
    .filter((url): url is string => Boolean(url));
}

function normalizePost(post: RawPost): District {
  const { acf } = post;

  const units = Object.entries(acf)
    .filter(([key]) => !NON_UNIT_FIELDS.has(key))
    .map(([key, value]) => ({
      key,
      label: UNIT_LABELS[key] ?? key,
      images: collectImages(value as Record<string, RawImageValue>),
    }))
    // لو نوع الوحدة مفيهوش ولا صورة واحدة، منعرضوش كخيار في القائمة أصلًا
    .filter((unit) => unit.images.length > 0);

  const videosList = collectImages(acf.videos_list);

  return {
    id: post.id,
    name: acf.title,
    description: acf.descripiton ?? "",
    mainVideo: acf.video || null,
    extraVideos: videosList,
    generalImages: collectImages(acf.images),
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
