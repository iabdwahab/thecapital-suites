"use client";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface ContactFormData {
  full_name: string;
  phone_number: string;
  email: string;
  message: string;
}

// ستايل موحّد للحقول — بدل تكراره في كل input
const fieldClass = (hasError: boolean) =>
  `w-full rounded-xl border bg-[#C9A455]/[0.06] p-3 text-[#F0E0C0] placeholder:text-[#8a7a62] transition duration-200 hover:border-[#C9A455]/40 focus:bg-[#C9A455]/10 focus:outline-none focus:shadow-[0_0_0_3px_rgba(201,164,85,0.15)] ${
    hasError
      ? "border-red-400/70 focus:border-red-400"
      : "border-[#C9A455]/20 focus:border-[#E0BC78]"
  }`;

const labelClass = "text-sm text-[#B5A590]";

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
      if (responseData.status === "mail_sent") {
        toast.success("تم إرسال رسالتك بنجاح!", { position: "top-right" });
        reset();
      } else {
        console.error("Error sending message:", responseData);
        toast.error(`فشل في إرسال الرسالة: ${responseData.message}`, {
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
      <h3 className="mb-6 text-xl font-semibold text-[#E0BC78]">
        أرسل لنا رسالة
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClass}>
            الاسم الكامل
          </label>
          <input
            type="text"
            id="name"
            placeholder="أدخل اسمك الكامل"
            className={fieldClass(!!errors.full_name)}
            {...register("full_name", { required: "يجب إدخال الاسم." })}
          />
          {errors.full_name && (
            <p className="text-sm text-red-400">{errors.full_name.message}</p>
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
            <p className="text-sm text-red-400">
              {errors.phone_number.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-2">
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
        {errors.email && (
          <p className="text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <label htmlFor="message" className={labelClass}>
          الرسالة
        </label>
        <textarea
          id="message"
          placeholder="أدخل رسالتك..."
          className={`${fieldClass(!!errors.message)} resize-none`}
          rows={6}
          {...register("message", {
            required: "يجب إدخال الرسالة.",
            minLength: { value: 10, message: "الرسالة قصيرة جدًا." },
          })}
        />
        {errors.message && (
          <p className="text-sm text-red-400">{errors.message.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-8 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-b from-[#E0BC78] to-[#BFA045] px-8 py-3.5 font-bold text-[#1A1208] shadow-[0_10px_30px_-10px_rgba(224,188,120,0.5)] transition duration-300 hover:shadow-[0_15px_40px_-8px_rgba(224,188,120,0.7)] focus:outline-none focus:ring-2 focus:ring-[#E0BC78]/50 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <span>{isSubmitting ? "جاري الإرسال..." : "تواصل معنا"}</span>
      </button>
    </form>
  );
}
