import AnimateOnScroll from './AnimateOnScroll';

const features = [
  {
    title: 'Curated Selection',
    description: 'Every hotel, flight, and experience is handpicked by our travel experts to ensure an extraordinary stay.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      </svg>
    ),
  },
  {
    title: 'Seamless Packages',
    description: 'Book your flight, hotel, and transfer in one step — we handle every detail from departure to return.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
      </svg>
    ),
  },
  {
    title: '24/7 Concierge',
    description: 'Personal travel support from the moment you book to the day you return home.',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />
      </svg>
    ),
  },
];

export default function WhyOrbis() {
  return (
    <section className="bg-[#F5F5F0] py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <AnimateOnScroll className="text-center mb-20">
          <p className="text-[#C9A96E] text-xs font-semibold tracking-[0.45em] uppercase mb-4">
            The Orbis Difference
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1B2D4F] tracking-tight">
            Why Orbis
          </h2>
        </AnimateOnScroll>

        {/* Feature columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
          {features.map((feature, i) => (
            <AnimateOnScroll key={feature.title} delay={i * 100} className="text-center group cursor-default">
              {/* Icon circle */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full
                              bg-white shadow-[0_2px_16px_rgba(27,45,79,0.08)] mb-8
                              group-hover:bg-[#C9A96E] transition-all duration-300
                              group-hover:shadow-[0_4px_24px_rgba(201,169,110,0.35)]">
                <span className="text-[#1B2D4F] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </span>
              </div>

              {/* Gold accent line */}
              <div className="w-8 h-0.5 bg-[#C9A96E]/30 mx-auto mb-5 group-hover:w-12 group-hover:bg-[#C9A96E]/60
                              transition-all duration-300" />

              <h3 className="text-[#1B2D4F] text-xl font-bold mb-4 tracking-tight">{feature.title}</h3>
              <p className="text-[#1B2D4F]/50 leading-relaxed text-[0.9375rem]">{feature.description}</p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
