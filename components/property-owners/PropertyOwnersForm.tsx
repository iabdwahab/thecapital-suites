"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SendHorizontal } from "lucide-react";

interface PropertyOwnersFormData {
  full_name: string;
  phone_number: string;
  property_type: string;
  property_location: string;
  additional_details: string;
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

const submitClass =
  "mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#E0BC78] to-[#BFA045] px-8 py-3.5 font-bold text-[#1A1208] shadow-[0_10px_30px_-10px_rgba(224,188,120,0.5)] transition duration-300 hover:shadow-[0_15px_40px_-8px_rgba(224,188,120,0.7)] focus:outline-none focus:ring-2 focus:ring-[#E0BC78]/50 disabled:cursor-not-allowed disabled:opacity-60";

export default function PropertyOwnersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PropertyOwnersFormData>({
    defaultValues: {
      full_name: "",
      phone_number: "",
      property_type: "",
      property_location: "",
      additional_details: "",
    },
  });

  async function onSubmit(data: PropertyOwnersFormData) {
    const finalFormData = new FormData();
    finalFormData.append("full_name", data.full_name);
    finalFormData.append("phone_number", data.phone_number);
    finalFormData.append("property_type", data.property_type);
    finalFormData.append("property_location", data.property_location);
    finalFormData.append("additional_details", data.additional_details);
    finalFormData.append("_wpcf7_unit_tag", "wpcf7-f1011-p123-o1");

    try {
      const res = await fetch(
        `https://wp.thecapitalsuites.sa/wp-json/contact-form-7/v1/contact-forms/1011/feedback`,
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
        console.error("Error sending message:", responseData);
        toast.error(`فشل في إرسال الطلب: ${responseData.message}`, {
          position: "top-right",
        });
      }
    } catch {
      toast.error("حدث خطأ غير متوقع أثناء الإرسال.", {
        position: "top-right",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="full_name" className={labelClass}>
            الاسم الكامل
          </label>
          <input
            type="text"
            id="full_name"
            placeholder="أدخل اسمك الكامل"
            className={fieldClass(!!errors.full_name)}
            {...register("full_name", { required: "يجب إدخال الاسم." })}
          />
          {errors.full_name && (
            <p className={errorClass}>{errors.full_name.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="phone_number" className={labelClass}>
            رقم الجوال
          </label>
          <input
            type="text"
            id="phone_number"
            placeholder="+966 5X XXX XXXX"
            dir="ltr"
            className={`${fieldClass(!!errors.phone_number)} text-right`}
            {...register("phone_number", {
              required: "يجب إدخال رقم الجوال.",
              pattern: {
                value: /^[0-9+\-() ]+$/,
                message: "صيغة رقم الجوال غير صالحة",
              },
              minLength: {
                value: 7,
                message: "رقم الجوال قصير جدًا.",
              },
            })}
          />
          {errors.phone_number && (
            <p className={errorClass}>{errors.phone_number.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="property_type" className={labelClass}>
            نوع العقار
          </label>
          <input
            type="text"
            id="property_type"
            placeholder="مثال: عمارة سكنية، فيلا..."
            className={fieldClass(!!errors.property_type)}
            {...register("property_type", {
              required: "يجب إدخال نوع العقار.",
            })}
          />
          {errors.property_type && (
            <p className={errorClass}>{errors.property_type.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="property_location" className={labelClass}>
            موقع العقار
          </label>
          <input
            type="text"
            id="property_location"
            placeholder="المدينة والحي"
            className={fieldClass(!!errors.property_location)}
            {...register("property_location", {
              required: "يجب إدخال موقع العقار.",
            })}
          />
          {errors.property_location && (
            <p className={errorClass}>{errors.property_location.message}</p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="additional_details" className={labelClass}>
          تفاصيل إضافية
        </label>
        <textarea
          id="additional_details"
          placeholder="أي تفاصيل أخرى تود إضافتها عن العقار.."
          className={`${fieldClass(!!errors.additional_details)} resize-none`}
          rows={6}
          {...register("additional_details", {
            required: "يجب إدخال التفاصيل.",
            minLength: { value: 10, message: "التفاصيل قصيرة جدًا." },
          })}
        />
        {errors.additional_details && (
          <p className={errorClass}>{errors.additional_details.message}</p>
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
