"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ContactFormData {
  full_name: string;
  phone_number: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    defaultValues: {
      full_name: "",
      phone_number: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: ContactFormData) {
    const finalFormData = new FormData();
    finalFormData.append("full_name", data.full_name);
    finalFormData.append("phone_number", data.phone_number);
    finalFormData.append("email", data.email);
    finalFormData.append("message", data.message);
    finalFormData.append("_wpcf7_unit_tag", "wpcf7-f507-p123-o1");

    try {
      const res = await fetch(
        `https://wp.thecapitalsuites.sa/wp-json/contact-form-7/v1/contact-forms/1003/feedback`,
        {
          method: "POST",
          body: finalFormData,
        },
      );

      const responseData = await res.json();
      console.log("Response from server:", responseData);
      if (responseData.status === "mail_sent") {
        toast.success("تم إرسال رسالتك بنجاح!", { position: "top-right" });
        reset();
      } else {
        console.error("Error sending message:", responseData);
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
              errors.full_name ? "border-red-500" : "border-[#c6c6cd3f]"
            }`}
            {...register("full_name", { required: "يجب إدخال الاسم." })}
          />
          {errors.full_name && (
            <p className="text-sm text-red-500">{errors.full_name.message}</p>
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
              errors.phone_number ? "border-red-500" : "border-[#c6c6cd3f]"
            }`}
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
            <p className="text-sm text-red-500">
              {errors.phone_number.message}
            </p>
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
        <label htmlFor="message">الرسالة</label>
        <textarea
          id="message"
          placeholder="أدخل رسالتك..."
          className={`bg-black border p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] resize-none ${
            errors.message ? "border-red-500" : "border-[#c6c6cd3f]"
          }`}
          rows={6}
          {...register("message", {
            required: "يجب إدخال الرسالة.",
            minLength: { value: 10, message: "الرسالة قصيرة جدًا." },
          })}
        ></textarea>
        {errors.message && (
          <p className="text-sm text-red-500">{errors.message.message}</p>
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
