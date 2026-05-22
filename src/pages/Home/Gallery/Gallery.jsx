// src/components/Gallery.jsx

import {
  FaCamera,
  FaMusic,
  FaBirthdayCake,
  FaTree,
  FaWarehouse,
  FaLandmark,
} from "react-icons/fa";

const cards = [
  {
    title: "Photographers",
    description: "Browse galleries to find your look.",
    button: "See photographers",
    bg: "bg-[#9FC3E6]",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
    type: "small",
    top: "-mt-10", // moved upward
  },

  {
    title: "Outdoor Spaces",
    description: "See outdoor spaces",
    category: "RECEPTION VENUES",
    bgImage:
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1200&auto=format&fit=crop",
    icon: <FaTree className="text-pink-400" size={18} />,
    type: "image",
  },

  {
    title: "Cakes",
    description: "Meet bakers and set up tastings.",
    button: "Browse cakes",
    bg: "bg-[#F2B632]",
    image:
      "https://images.unsplash.com/photo-1621303837174-89787a7d4729?q=80&w=800&auto=format&fit=crop",
    type: "small",
    top: "-mt-10", // moved upward
  },

  {
    title: "Barns",
    description: "See barns",
    category: "HOME DECORATION",
    bgImage:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    icon: <FaWarehouse className="text-orange-300" size={18} />,
    type: "image", 
  },

  {
    title: "DJs",
    description: "Keep your dance floor moving.",
    button: "Discover DJs",
    bg: "bg-[#F97316]",
    image:
      "https://i.ibb.co.com/LDTd5G4x/photo-1577648884063-1d3d1477b8a7.avif",
    type: "small",
    top: "mt-10", // slightly upward
  },

  {
    title: "Historic Buildings",
    description: "See historic buildings",
    category: "RECEPTION VENUES",
    bottom:'mt-75',
    bgImage:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop",
    icon: <FaLandmark className="text-orange-300" size={18} />,
    type: "image",
  },
];

export default function Gallery() {
  return (
    <section className="min-h-screen bg-[#F3EBE5] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-primary uppercase tracking-[4px] text-sm font-semibold mb-4">
          Modern Art Gallery Inspiration
        </p>
          <h1 className="text-4xl md:text-6xl font-bold text-neutral mb-6 leading-tight">
            Find vendors for every vibe
          </h1>

          <p className="mt-5 text-neutral-700 text-sm md:text-lg leading-7">
          Discover top-rated professionals for photography, venues, food,
          music and unforgettable event experiences.
        </p>
        </div>

        {/* Masonry Layout */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {cards.map((card, index) =>
            card.type === "small" ? (
              <div
                key={index}
                className={`${card.bg} ${card.top} rounded-[28px] p-8 text-center`}
              >
                <h2 className="text-[42px] leading-none font-black text-black">
                  {card.title}
                </h2>

                <p className="mt-3 text-sm text-neutral-800">
                  {card.description}
                </p>

                <div className="mx-auto mt-6 h-28 w-28 overflow-hidden rounded-md">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <button className="btn btn-outline mt-8 rounded-full border-2 border-black bg-transparent px-6 text-black hover:bg-black hover:text-white">
                  {card.button}
                </button>
              </div>
            ) : (
              <div
                key={index}
                className="relative h-90 overflow-hidden rounded-[28px]"
              >
                <img
                  src={card.bgImage}
                  alt={card.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/30" />

                <div className="relative flex h-full flex-col items-center justify-center text-center text-white">
                  <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-[0.2em]">
                    {card.icon}
                    <span>{card.category}</span>
                  </div>

                  <h2 className="text-4xl font-black leading-tight">
                    {card.title}
                  </h2>

                  <button className="mt-3 text-sm font-semibold underline underline-offset-4">
                    {card.description}
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}