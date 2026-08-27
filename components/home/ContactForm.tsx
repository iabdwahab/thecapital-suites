"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  additional_details: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      additional_details: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    const finalFormData = new FormData();
    finalFormData.append("full-name", data.name);
    finalFormData.append("email", data.email);
    finalFormData.append("phone", data.phone);
    finalFormData.append("message", data.additional_details);
    finalFormData.append("_wpcf7_unit_tag", "wpcf7-f507-p123-o1");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/contact-form-7/v1/contact-forms/507/feedback`,
        {
          method: "POST",
          body: finalFormData,
        },
      );

      const responseData = await res.json();

      if (responseData.status === "mail_sent") {
        toast.success("تم إرسال رسالتك بنجاح!", { position: "top-right" });
        reset();
      } else {
        toast.error(`فشل في إرسال الرسالة: ${responseData.message}`, {
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
      className="bg-black py-8 px-6 border border-[#c6c6cd3f] rounded-md"
    >
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">الاسم الكامل</label>
          <input
            type="text"
            id="name"
            placeholder="أدخل اسمك الكامل"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.name ? "border-red-500" : "border-[#c6c6cd3f]"
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
              errors.phone ? "border-red-500" : "border-[#c6c6cd3f]"
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

      <div className="mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">البريد الإلكتروني</label>
          <input
            type="email"
            id="email"
            placeholder="أدخل بريدك الإلكتروني"
            className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] ${
              errors.email ? "border-red-500" : "border-[#c6c6cd3f]"
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

      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="additional_details">تفاصيل إضافية</label>
        <textarea
          id="additional_details"
          placeholder="أي تفاصيل أخرى تود إضافتها عن العقار.."
          className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] resize-none ${
            errors.additional_details ? "border-red-500" : "border-[#c6c6cd3f]"
          }`}
          rows={6}
          {...register("additional_details", {
            required: "يجب إدخال التفاصيل.",
            minLength: { value: 10, message: "الرسالة قصيرة جدًا." },
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
        <span>{isSubmitting ? "جاري الإرسال..." : "تواصل معنا"}</span>
      </button>
    </form>
  );
}
