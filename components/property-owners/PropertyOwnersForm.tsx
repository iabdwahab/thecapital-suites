export default function PropertyOwnersForm() {
  return (
    <form className="bg-white py-8 px-6 border border-[#C6C6CD] rounded-md">
      <div className="grid md:grid-cols-2 gap-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">الاسم الكامل</label>
          <input
            type="text"
            id="name"
            placeholder="أدخل اسمك الكامل"
            className="bg-[#F7F9FB] border border-[#C6C6CD] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">رقم الجوال</label>
          <input
            type="text"
            id="phone"
            placeholder="+966 5X XXX XXXX"
            dir="ltr"
            className="bg-[#F7F9FB] border border-[#C6C6CD] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3 mt-3">
        <div className="flex flex-col gap-2">
          <label htmlFor="property_type">نوع العقار</label>
          <input
            type="text"
            id="property_type"
            placeholder="اختر نوع العقار"
            className="bg-[#F7F9FB] border border-[#C6C6CD] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="property_location">موقع العقار</label>
          <input
            type="text"
            id="property_location"
            placeholder="اختر موقع العقار"
            className="bg-[#F7F9FB] border border-[#C6C6CD] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <label htmlFor="additional_details">تفاصيل إضافية</label>
        <textarea
          id="additional_details"
          placeholder="أي تفاصيل أخرى تود إضافتها عن العقار.."
          className="bg-[#F7F9FB] border border-[#C6C6CD] p-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#C6C6CD] resize-none"
          rows={6}
        ></textarea>
      </div>

      <button className="w-full mt-8 flex items-center justify-center gap-2 bg-black text-white px-8 py-3 rounded-lg cursor-pointer hover:opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#C6C6CD]">
        <span>إرسال الطلب</span>
        <span>
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
        </span>
      </button>
    </form>
  );
}
