"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

interface PropertyOwnersFormData {
  name: string;
  phone: string;
  property_type: string;
  property_location: string;
  additional_details: string;
}

export default function PropertyOwnersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PropertyOwnersFormData>({
    defaultValues: {
      name: "",
      phone: "",
      property_type: "",
      property_location: "",
      additional_details: "",
    },
  });

  async function onSubmit(data: PropertyOwnersFormData) {
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          full_name: data.name,
          phone_number: data.phone,
          property_type: data.property_type,
          property_location: data.property_location,
          message: data.additional_details,
          form_title: "ملاك العقارات",
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
      );

      toast.success("تم إرسال طلبك بنجاح!", { position: "top-right" });
      reset();
    } catch (error) {
      toast.error("حدث خطأ غير متوقع أثناء الإرسال.", {
        position: "top-right",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-black text-white py-8 px-6 border border-[#c6c6cd4b] rounded-md"
    >
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">الاسم الكامل</label>
          <input
            type="text"
            id="name"
            placeholder="أدخل اسمك الكامل"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.name ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("name", { required: "يجب إدخال الاسم." })}
          />
          {errors.name && (
            <p className="text-sm text-red-500">{errors.name.message}</p>
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
              minLength: {
                value: 7,
                message: "رقم الجوال قصير جدًا.",
              },
            })}
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="property_type">نوع العقار</label>
          <input
            type="text"
            id="property_type"
            placeholder="اختر نوع العقار"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.property_type ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("property_type", {
              required: "يجب إدخال نوع العقار.",
            })}
          />
          {errors.property_type && (
            <p className="text-sm text-red-500">
              {errors.property_type.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="property_location">موقع العقار</label>
          <input
            type="text"
            id="property_location"
            placeholder="اختر موقع العقار"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.property_location ? "border-red-500" : "border-[#c6c6cd4b]"
            }`}
            {...register("property_location", {
              required: "يجب إدخال موقع العقار.",
            })}
          />
          {errors.property_location && (
            <p className="text-sm text-red-500">
              {errors.property_location.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="additional_details">تفاصيل إضافية</label>
        <textarea
          id="additional_details"
          placeholder="أي تفاصيل أخرى تود إضافتها عن العقار.."
          className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] resize-none ${
            errors.additional_details ? "border-red-500" : "border-[#c6c6cd4b]"
          }`}
          rows={6}
          {...register("additional_details", {
            required: "يجب إدخال التفاصيل.",
            minLength: { value: 10, message: "التفاصيل قصيرة جدًا." },
          })}
        ></textarea>
        {errors.additional_details && (
          <p className="text-sm text-red-500">
            {errors.additional_details.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-8 flex items-center justify-center gap-2 bg-[#B37700] text-white px-8 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] disabled:opacity-60"
      >
        <span>{isSubmitting ? "جاري الإرسال..." : "إرسال الطلب"}</span>
        {!isSubmitting && (
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
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
        )}
      </button>
    </form>
  );
}
