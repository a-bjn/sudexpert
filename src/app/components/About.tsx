import Image from "next/image";

export default function About() {
  return (
    <section className="relative h-min flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/welder.webp"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/30"></div>

      {/* Grey Overlay */}
      <div className="relative z-10 bg-gray-800 w-full h-full clip-path-custom text-white p-8 md:p-16">
        {/* Title */}
        <h1 className="text-2xl font-bold mb-4">Despre noi</h1>

        {/* Description */}
        <p className="top-0 mb-8 leading-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          ipsum vel elit hendrerit tincidunt vel a justo.
        </p>

        {/* Button */}
        <button className="px-6 py-2 bg-teal-500 text-white rounded-lg">
          About Us
        </button>
      </div>
    </section>
  );
}
