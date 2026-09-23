import PropertyOwnersForm from "./PropertyOwnersForm";

export default function PropertyOwnersSection() {
  return (
    <section className=" text-white py-6 lg:py-20 relative z-10">
      <div className="container border border-[#c6c6cd28] p-10! rounded-lg  lg:grid lg:grid-cols-[480px_1fr] gap-4">
        <div className="pt-6 lg:pt-10">
          <h2 className="text-3xl">نموذج تقديم العقار</h2>
          <p className="text-white mt-6">
            املأ النموذج التالي ببياناتك وتفاصيل عقارك، وسيقوم فريقنا المختص
            بالتواصل معك في أقرب وقت لمناقشة خطة الإدارة الأنسب لك.
          </p>

          <div className="flex flex-col gap-6 mt-10">
            <div className="flex items-center gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">دعم فني مخصص</h4>
                <p className="text-white">
                  فريقنا متواجد للرد على استفساراتكم.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-medium text-white">سرية تامة</h4>
                <p className="text-white">بياناتك محمية ولن يتم مشاركتها.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-lg:mt-8">
          <PropertyOwnersForm />
        </div>
      </div>
    </section>
  );
}
