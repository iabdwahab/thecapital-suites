"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SendHorizontal } from "lucide-react";

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

// ===== ستايل الحقول =====
const fieldClass = (hasError = false) =>
  `w-full rounded-xl border bg-[#C9A455]/[0.06] p-3 text-[#F0E0C0] placeholder:text-[#8a7a62] transition duration-200 hover:border-[#C9A455]/40 focus:bg-[#C9A455]/10 focus:outline-none focus:shadow-[0_0_0_3px_rgba(201,164,85,0.15)] ${
    hasError
      ? "border-red-400/70 focus:border-red-400"
      : "border-[#C9A455]/20 focus:border-[#E0BC78]"
  }`;

const labelClass = "text-sm text-[#B5A590]";
const errorClass = "text-sm text-red-400";

const groupTitleClass =
  "mb-4 flex items-center gap-2 font-medium text-[#E0BC78]";

// خيار (checkbox / radio) على شكل كارت صغير يضيء عند الاختيار
const optionClass =
  "flex cursor-pointer items-center gap-3 rounded-xl border border-[#C9A455]/20 bg-[#C9A455]/[0.04] px-4 py-3 text-[#F0E0C0] transition duration-200 hover:border-[#C9A455]/40 has-checked:border-[#E0BC78]/70 has-checked:bg-[#C9A455]/10";

const optionInputClass = "size-4 shrink-0 accent-[#C9A455]";

const submitClass =
  "mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#E0BC78] to-[#BFA045] px-8 py-3.5 font-bold text-[#1A1208] shadow-[0_10px_30px_-10px_rgba(224,188,120,0.5)] transition duration-300 hover:shadow-[0_15px_40px_-8px_rgba(224,188,120,0.7)] focus:outline-none focus:ring-2 focus:ring-[#E0BC78]/50 disabled:cursor-not-allowed disabled:opacity-60";

const unitFields = [
  { name: "studio_count", label: "استديو" },
  { name: "one_bedroom_count", label: "غرفة وصالة" },
  { name: "two_bedroom_count", label: "غرفتين وصالة" },
  { name: "three_bedroom_count", label: "3 غرف وصالة" },
] as const;

// معيّن ذهبي صغير بجانب عناوين المجموعات
const GroupMark = () => <span className="size-1.5 rotate-45 bg-[#E0BC78]" />;

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

      console.error("Error submitting form:", error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* ===== البيانات الأساسية ===== */}
      <p className={groupTitleClass}>
        <GroupMark />
        البيانات الأساسية
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="client_name" className={labelClass}>
            اسم العميل
          </label>
          <input
            type="text"
            id="client_name"
            placeholder="أدخل اسمك الكامل"
            className={fieldClass(!!errors.client_name)}
            {...register("client_name", { required: "يجب إدخال الاسم." })}
          />
          {errors.client_name && (
            <p className={errorClass}>{errors.client_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClass}>
            رقم الجوال
          </label>
          <input
            type="text"
            id="phone"
            placeholder="+966 5X XXX XXXX"
            dir="ltr"
            className={`${fieldClass(!!errors.phone)} text-right`}
            {...register("phone", {
              required: "يجب إدخال رقم الجوال.",
              pattern: {
                value: /^[0-9+\-() ]+$/,
                message: "صيغة رقم الجوال غير صالحة",
              },
              minLength: { value: 7, message: "رقم الجوال قصير جدًا." },
            })}
          />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="region" className={labelClass}>
            المنطقة
          </label>
          <input
            type="text"
            id="region"
            placeholder="أدخل المنطقة"
            className={fieldClass(!!errors.region)}
            {...register("region", { required: "يجب إدخال المنطقة." })}
          />
          {errors.region && (
            <p className={errorClass}>{errors.region.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>
            البريد الإلكتروني
          </label>
          <input
            type="email"
            id="email"
            placeholder="أدخل بريدك الإلكتروني"
            className={fieldClass(!!errors.email)}
            {...register("email", {
              required: "البريد الإلكتروني مطلوب",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "صيغة البريد الإلكتروني غير صالحة",
              },
            })}
          />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="website_url" className={labelClass}>
            رابط الموقع
          </label>
          <input
            type="text"
            id="website_url"
            placeholder="أدخل رابط الموقع (إن وجد)"
            dir="ltr"
            className={`${fieldClass()} text-right`}
            {...register("website_url")}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="buildings_count" className={labelClass}>
            عدد العمائر
          </label>
          <input
            type="number"
            min={0}
            id="buildings_count"
            placeholder="أدخل عدد العمائر"
            className={fieldClass(!!errors.buildings_count)}
            {...register("buildings_count", {
              required: "يجب إدخال عدد العمائر.",
            })}
          />
          {errors.buildings_count && (
            <p className={errorClass}>{errors.buildings_count.message}</p>
          )}
        </div>
      </div>

      {/* ===== تقسيم العمائر ===== */}
      <div className="mt-8 border-t border-[#C9A455]/15 pt-8">
        <p className={groupTitleClass}>
          <GroupMark />
          تقسيم العمائر إلى
        </p>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {unitFields.map(({ name, label }) => (
            <div key={name} className="flex flex-col gap-2">
              <label htmlFor={name} className={labelClass}>
                {label}
              </label>
              <input
                type="number"
                min={0}
                id={name}
                placeholder="0"
                className={`${fieldClass()} text-center`}
                {...register(name)}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="other_units" className={labelClass}>
            وحدات أخرى (اذكر الوصف)
          </label>
          <input
            type="text"
            id="other_units"
            placeholder="اكتب وصف الوحدات الأخرى إن وجدت"
            className={fieldClass()}
            {...register("other_units")}
          />
        </div>
      </div>

      {/* ===== نوع التأجير ===== */}
      <div className="mt-8 border-t border-[#C9A455]/15 pt-8">
        <p className={groupTitleClass}>
          <GroupMark />
          نوع التأجير
        </p>

        <div className="grid gap-3 sm:grid-cols-3">
          <label className={optionClass}>
            <input
              type="checkbox"
              className={optionInputClass}
              {...register("rental_daily")}
            />
            <span className="flex flex-col">
              <span>يومي</span>
              <span className="text-xs text-[#E0BC78]/80">
                يلزم وجود ترخيص سياحي
              </span>
            </span>
          </label>
          <label className={optionClass}>
            <input
              type="checkbox"
              className={optionInputClass}
              {...register("rental_monthly")}
            />
            <span>شهري</span>
          </label>
          <label className={optionClass}>
            <input
              type="checkbox"
              className={optionInputClass}
              {...register("rental_yearly")}
            />
            <span>سنوي</span>
          </label>
        </div>
      </div>

      {/* ===== وسيلة إرسال الدراسة ===== */}
      <div className="mt-8 border-t border-[#C9A455]/15 pt-8">
        <p className={groupTitleClass}>
          <GroupMark />
          وسيلة إرسال الدراسة المناسبة
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <label className={optionClass}>
            <input
              type="radio"
              value="whatsapp"
              className={optionInputClass}
              {...register("send_method", {
                required: "يجب اختيار وسيلة الإرسال.",
              })}
            />
            <span>واتساب</span>
          </label>
          <label className={optionClass}>
            <input
              type="radio"
              value="email"
              className={optionInputClass}
              {...register("send_method", {
                required: "يجب اختيار وسيلة الإرسال.",
              })}
            />
            <span>البريد الإلكتروني</span>
          </label>
        </div>

        {sendMethod === "whatsapp" && (
          <div className="mt-4 flex flex-col gap-2">
            <input
              type="text"
              placeholder="اكتب رقم الواتساب"
              dir="ltr"
              className={`${fieldClass(!!errors.send_whatsapp_number)} text-right`}
              {...register("send_whatsapp_number", {
                required:
                  sendMethod === "whatsapp" ? "يجب إدخال رقم الواتساب." : false,
              })}
            />
            {errors.send_whatsapp_number && (
              <p className={errorClass}>
                {errors.send_whatsapp_number.message}
              </p>
            )}
          </div>
        )}

        {sendMethod === "email" && (
          <div className="mt-4 flex flex-col gap-2">
            <input
              type="email"
              placeholder="اكتب بريدك الإلكتروني"
              dir="ltr"
              className={`${fieldClass(!!errors.send_email)} text-right`}
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
            {errors.send_email && (
              <p className={errorClass}>{errors.send_email.message}</p>
            )}
          </div>
        )}

        {errors.send_method && (
          <p className={`${errorClass} mt-2`}>{errors.send_method.message}</p>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className={submitClass}>
        <span>{isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}</span>
        {!isSubmitting && (
          <SendHorizontal className="size-5 rotate-180" aria-hidden="true" />
        )}
      </button>
    </form>
  );
}
