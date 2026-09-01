"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface StudyRequestFormData {
  client_name: string;
  phone: string;
  region: string;
  email: string;
  website_url: string;
  buildings_count: string;
  studio_count: string;
  one_bedroom_count: string;
  two_bedroom_count: string;
  three_bedroom_count: string;
  other_units: string;
  rental_daily: boolean;
  rental_monthly: boolean;
  rental_yearly: boolean;
  send_method: "whatsapp" | "email" | "";
  send_whatsapp_number: string;
  send_email: string;
}

export default function StudyRequestForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<StudyRequestFormData>({
    defaultValues: {
      client_name: "",
      phone: "",
      region: "",
      email: "",
      website_url: "",
      buildings_count: "",
      studio_count: "",
      one_bedroom_count: "",
      two_bedroom_count: "",
      three_bedroom_count: "",
      other_units: "",
      rental_daily: false,
      rental_monthly: false,
      rental_yearly: false,
      send_method: "",
      send_whatsapp_number: "",
      send_email: "",
    },
  });

  const sendMethod = watch("send_method");

  async function onSubmit(data: StudyRequestFormData) {
    const rentalTypes = [
      data.rental_daily && "يومي (يلزم وجود ترخيص سياحي)",
      data.rental_monthly && "شهري",
      data.rental_yearly && "سنوي",
    ]
      .filter(Boolean)
      .join(" - ");

    const sendMethodText =
      data.send_method === "whatsapp"
        ? `واتساب: ${data.send_whatsapp_number}`
        : data.send_method === "email"
          ? `بريد: ${data.send_email}`
          : "";

    const finalFormData = new FormData();
    finalFormData.append("client_name", data.client_name);
    finalFormData.append("phone", data.phone);
    finalFormData.append("region", data.region);
    finalFormData.append("email", data.email);
    finalFormData.append("website_url", data.website_url);
    finalFormData.append("buildings_count", data.buildings_count);
    finalFormData.append("studio_count", data.studio_count || "0");
    finalFormData.append("one_bedroom_count", data.one_bedroom_count || "0");
    finalFormData.append("two_bedroom_count", data.two_bedroom_count || "0");
    finalFormData.append(
      "three_bedroom_count",
      data.three_bedroom_count || "0",
    );
    finalFormData.append("other_units", data.other_units || "-");
    finalFormData.append("rental_types", rentalTypes || "-");
    finalFormData.append("send_method", sendMethodText);
    finalFormData.append("_wpcf7_unit_tag", "wpcf7-f1010-p123-o1");

    try {
      const res = await fetch(
        `https://wp.thecapitalsuites.sa/wp-json/contact-form-7/v1/contact-forms/1010/feedback`,
        {
          method: "POST",
          body: finalFormData,
        },
      );

      const responseData = await res.json();

      if (responseData.status === "mail_sent") {
        toast.success("تم إرسال طلبك بنجاح!", { position: "top-right" });
        reset();
      } else {
        toast.error(`فشل في إرسال الطلب: ${responseData.message}`, {
          position: "top-right",
        });
      }
    } catch (error) {
      toast.error("حدث خطأ غير متوقع أثناء الإرسال.", {
        position: "top-right",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-black py-8 px-6 border text-white border-[#c6c6cd4b] rounded-md"
    >
      {/* البيانات الأساسية */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="client_name">اسم العميل</label>
          <input
            type="text"
            id="client_name"
            placeholder="أدخل اسمك الكامل"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.client_name ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("client_name", { required: "يجب إدخال الاسم." })}
          />
          {errors.client_name && (
            <p className="text-sm text-red-500">{errors.client_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone">رقم الجوال</label>
          <input
            type="text"
            id="phone"
            placeholder="+966 5X XXX XXXX"
            dir="ltr"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.phone ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("phone", {
              required: "يجب إدخال رقم الجوال.",
              pattern: {
                value: /^[0-9+\-() ]+$/,
                message: "صيغة رقم الجوال غير صالحة",
              },
              minLength: { value: 7, message: "رقم الجوال قصير جدًا." },
            })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="region">المنطقة</label>
          <input
            type="text"
            id="region"
            placeholder="أدخل المنطقة"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.region ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("region", { required: "يجب إدخال المنطقة." })}
          />
          {errors.region && (
            <p className="text-sm text-red-500">{errors.region.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            placeholder="أدخل بريدك الإلكتروني"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.email ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("email", {
              required: "البريد الإلكتروني مطلوب",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "صيغة البريد الإلكتروني غير صالحة",
              },
            })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="website_url">رابط الموقع</label>
          <input
            type="text"
            id="website_url"
            placeholder="أدخل رابط الموقع (إن وجد)"
            dir="ltr"
            className="bg-black border border-[#c6c6cd4b] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
            {...register("website_url")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="buildings_count">عدد العمائر</label>
          <input
            type="number"
            id="buildings_count"
            placeholder="أدخل عدد العمائر"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.buildings_count ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("buildings_count", {
              required: "يجب إدخال عدد العمائر.",
            })}
          />
          {errors.buildings_count && (
            <p className="text-sm text-red-500">
              {errors.buildings_count.message}
            </p>
          )}
        </div>
      </div>

      {/* تقسيم العمائر */}
      <div className="mt-6">
        <p className="mb-3 font-medium">تقسيم العمائر إلى</p>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="studio_count">استديو (العدد)</label>
            <input
              type="number"
              id="studio_count"
              placeholder="0"
              className="bg-black border border-[#c6c6cd4b] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
              {...register("studio_count")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="one_bedroom_count">غرفة وصالة (العدد)</label>
            <input
              type="number"
              id="one_bedroom_count"
              placeholder="0"
              className="bg-black border border-[#c6c6cd4b] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
              {...register("one_bedroom_count")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="two_bedroom_count">غرفتين وصالة (العدد)</label>
            <input
              type="number"
              id="two_bedroom_count"
              placeholder="0"
              className="bg-black border border-[#c6c6cd4b] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
              {...register("two_bedroom_count")}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="three_bedroom_count">3 غرف وصالة (العدد)</label>
            <input
              type="number"
              id="three_bedroom_count"
              placeholder="0"
              className="bg-black border border-[#c6c6cd4b] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
              {...register("three_bedroom_count")}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-3">
          <label htmlFor="other_units">وحدات أخرى (اذكر الوصف)</label>
          <input
            type="text"
            id="other_units"
            placeholder="اكتب وصف الوحدات الأخرى إن وجدت"
            className="bg-black border border-[#c6c6cd4b] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
            {...register("other_units")}
          />
        </div>
      </div>

      {/* نوع التأجير */}
      <div className="mt-6">
        <p className="mb-3 font-medium">نوع التأجير</p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("rental_daily")} />
            <span>يومي</span>
            <span className="text-xs text-red-500">
              (يلزم وجود ترخيص سياحي)
            </span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("rental_monthly")} />
            <span>شهري</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("rental_yearly")} />
            <span>سنوي</span>
          </label>
        </div>
      </div>

      {/* وسيلة إرسال الدراسة */}
      <div className="mt-6">
        <p className="mb-3 font-medium">وسيلة إرسال الدراسة المناسبة</p>
        <div className="flex flex-col gap-3">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="whatsapp"
              {...register("send_method", {
                required: "يجب اختيار وسيلة الإرسال.",
              })}
            />
            <span>واتس</span>
          </label>
          {sendMethod === "whatsapp" && (
            <input
              type="text"
              placeholder="اكتب رقم الواتساب"
              dir="ltr"
              className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
                errors.send_whatsapp_number
                  ? "border-red-500"
                  : "border-[#C6C6CD]"
              }`}
              {...register("send_whatsapp_number", {
                required:
                  sendMethod === "whatsapp" ? "يجب إدخال رقم الواتساب." : false,
              })}
            />
          )}
          {errors.send_whatsapp_number && (
            <p className="text-sm text-red-500">
              {errors.send_whatsapp_number.message}
            </p>
          )}

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="email"
              {...register("send_method", {
                required: "يجب اختيار وسيلة الإرسال.",
              })}
            />
            <span>بريد</span>
          </label>
          {sendMethod === "email" && (
            <input
              type="email"
              placeholder="اكتب بريدك الإلكتروني"
              dir="ltr"
              className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
                errors.send_email ? "border-red-500" : "border-[#C6C6CD]"
              }`}
              {...register("send_email", {
                required:
                  sendMethod === "email"
                    ? "يجب إدخال البريد الإلكتروني."
                    : false,
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "صيغة البريد الإلكتروني غير صالحة",
                },
              })}
            />
          )}
          {errors.send_email && (
            <p className="text-sm text-red-500">{errors.send_email.message}</p>
          )}
          {errors.send_method && (
            <p className="text-sm text-red-500">{errors.send_method.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-8 flex items-center justify-center gap-2 bg-[#B37700] text-white px-8 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] disabled:opacity-60"
      >
        <span>{isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}</span>
      </button>
    </form>
  );
}
