export type LatLng = [number, number];

// الإحداثيات دي ثابتة يدويًا — مطابقة لأسماء الأحياء زي ما راجعة من ووردبريس بالظبط.
// لو ضفت حي جديد في ووردبريس، لازم تضيفه هنا برضو بنفس الاسم، وإلا الخريطة هترجع لمركز المدينة.
export const DISTRICT_COORDINATES: Record<string, LatLng> = {
  "حي العـــــارض": [24.8908749, 46.6038971],
  حطين: [24.7579556, 46.6145058],
  القيـــروان: [24.8278961, 46.594696],
  الملز: [24.6628451, 46.7243154],
  الرمال: [24.8483795, 46.825007],
};

export const CITY_COORDINATES: Record<string, LatLng> = {
  riyadh: [24.6725, 46.6725],
};

export const CITY_ZOOM = 10;
export const DISTRICT_ZOOM = 14;

export function getDistrictCoordinates(name: string): LatLng | null {
  return DISTRICT_COORDINATES[name] ?? null;
}
