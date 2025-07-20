"use client";

import "aos/dist/aos.css";

export default function HeroSection() {

  return (
    <section className="relative w-full h-screen overflow-hidden grid-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:flex-row lg:h-full">
        {/* Left Side - Content */}
        <div className="lg:w-1/2 lg:relative lg:z-20 lg:flex lg:flex-col lg:justify-center lg:px-12">
         
          {/* Content */}
          <div className="relative z-10">
            {/* Text Content */}
            <div
              className="flex flex-col gap-6"
              data-aos="fade-up"
              data-aos-delay="0"
            >
              <p className="text-xl text-gray-300 font-bold">
                25+ Ani de experiență și performanță în sudură
              </p>
              <h1 className="text-7xl font-bold leading-tight">
                Produse și Soluții Complete în Sudură
              </h1>
              <h2 className="text-2xl text-gray-200 pt-6 leading-relaxed">
                La Sudexpert oferim o gamă largă de produse de calitate pentru orice proiecte în sudură.
              </h2>
              
              {/* Desktop CTA */}
              <div className="flex flex-col gap-6 mt-8">
                <a
                  href="tel:+40724207132"
                  className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white rounded-full text-xl font-semibold hover:bg-white hover:text-black transition-all duration-300 shadow-[0px_10px_30px_rgba(0,0,0,0.8)] w-fit"
                >
                  +40 724 207 132
                </a>
                
                {/* Trusted By Section */}
                <div className="flex flex-col gap-3">
                  <p className="text-lg text-white">
                    Asigurăm încrederea mărcilor de top din industrie.
                  </p>
                  <div className="flex gap-2 text-2xl text-teal-400">
                    {"★ ★ ★ ★ ★".split(" ").map((star, index) => (
                      <span key={index}>{star}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <div className="lg:w-1/2 lg:relative lg:overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/welding-gif.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/80"></div>
        </div> */}
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/welding-gif.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>
        <div className="relative z-10 flex flex-col items-start p-6 text-white h-full justify-around">
          {/* Text Content */}
          <div
            className="flex flex-col gap-2"
            data-aos="fade-up"
            data-aos-delay="0"
          >
            <p className="text-base sm:text-lg text-gray-300 font-bold">
              25+ Ani de experiență și performanță în sudură
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold">
              Produse și Soluții Complete în Sudură
            </h1>
            <h2 className="text-lg sm:text-lg text-gray-200 pt-4">
              La Sudexpert oferim o gamă largă de produse de calitate pentru orice proiecte în sudură.
            </h2>
          </div>

          {/* Mobile CTA */}
          <div className="flex flex-col justify-between items-center w-full" data-aos="fade-up" data-aos-delay="200">
            {/* Button */}
            <a
              href="tel:+40724207132"
              className="block w-full text-center px-8 py-3 border border-white text-white rounded-full text-lg hover:bg-white hover:text-black transition-all duration-300 max-w-md shadow-[0px_10px_30px_rgba(0,0,0,0.8)]"
            >
              +40 724 207 132
            </a>
            
            {/* Trusted By Section */}
            <div className="flex flex-col items-center gap-2 mt-6">
              <p className="text-md sm:text-lg text-white text-center">
                Asigurăm încrederea mărcilor de top din industrie.
              </p>
              <div className="flex gap-1 text-1xl text-teal-400">
                {"★ ★ ★ ★ ★".split(" ").map((star, index) => (
                  <span key={index}>{star}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
