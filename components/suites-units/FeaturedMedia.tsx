export default function FeaturedMedia() {
  return (
    <section className="min-h-screen container py-10">
      <div className="w-full h-120 overflow-hidden -mt-40 bg-white relative rounded-3xl">
        <video
          src="/suites-units-video.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover object-center"
          autoPlay
          loop
          muted
        ></video>
      </div>
    </section>
  );
}
