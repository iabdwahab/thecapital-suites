export type Coordinates = { lat: number; lng: number };

// Nominatim بتاعة OpenStreetMap — مجانية ومحتاجاش API key، لكن فيها rate limit
// (حد أقصى تقريبًا طلب واحد في الثانية)، فمناسبة هنا لأننا بنعمل طلب واحد بس
// وقت ما المستخدم يغيّر الاختيار، مش على كل حركة.
const NOMINATIM_URL = "https://nominatim.openstreetmap.org/search";

export async function geocodePlace(query: string): Promise<Coordinates | null> {
  const url = `${NOMINATIM_URL}?format=json&limit=1&q=${encodeURIComponent(query)}`;

  const res = await fetch(url, {
    headers: {
      // Nominatim بيطلب User-Agent مميز لأي استخدام برمجي — عدّل الاسم ده لاسم موقعك
      "Accept-Language": "ar",
    },
  });

  if (!res.ok) return null;

  const data: { lat: string; lon: string }[] = await res.json();
  if (!data.length) return null;

  return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
}
