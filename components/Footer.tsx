import Link from 'next/link';

function InstagramIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const socials = [
  { Icon: InstagramIcon, label: 'Instagram' },
  { Icon: XIcon, label: 'X / Twitter' },
  { Icon: LinkedInIcon, label: 'LinkedIn' },
];

const columns = [
  { heading: 'Destinations', links: ['Thailand', 'UAE', 'America'] },
  { heading: 'Company',      links: ['About', 'Careers', 'Press'] },
  { heading: 'Support',      links: ['Help Center', 'Contact', 'Terms & Privacy'] },
];

export default function Footer() {
  return (
    <footer className="bg-[#1B2D4F]">
      <div className="max-w-7xl mx-auto px-6 pt-18 pb-8">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/8">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <p className="font-serif text-white text-2xl font-bold tracking-[0.15em] uppercase mb-3">
              ORBIS
            </p>
            <p className="text-white/35 text-sm leading-relaxed mb-7">
              Travel Beyond the Ordinary
            </p>
            <div className="flex gap-4">
              {socials.map(({ Icon, label }) => (
                <Link
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center
                             text-white/30 hover:text-[#C9A96E] hover:border-[#C9A96E]/40
                             transition-all duration-200 cursor-pointer"
                >
                  <Icon />
                </Link>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {columns.map(({ heading, links }) => (
            <div key={heading}>
              <h4 className="text-white text-xs font-bold tracking-[0.25em] uppercase mb-6">
                {heading}
              </h4>
              <ul className="space-y-3.5">
                {links.map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-white/35 text-sm hover:text-[#C9A96E] transition-colors duration-200 cursor-pointer"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div>
            <h4 className="text-white text-xs font-bold tracking-[0.25em] uppercase mb-6">
              Newsletter
            </h4>
            <p className="text-white/35 text-sm mb-5 leading-relaxed">
              Exclusive deals and curated inspiration.
            </p>
            <div className="flex flex-col gap-2.5">
              <input
                type="email"
                placeholder="Your email address"
                aria-label="Email for newsletter"
                className="bg-white/6 border border-white/10 rounded-xl px-4 py-3 text-sm text-white
                           placeholder-white/25 focus:outline-none focus:border-[#C9A96E]/50
                           transition-colors duration-200"
              />
              <button className="bg-[#C9A96E] text-[#1B2D4F] font-bold py-3 rounded-xl
                                 hover:bg-[#b8944f] transition-colors duration-200 text-sm
                                 tracking-wide cursor-pointer">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">© 2026 Orbis. All rights reserved.</p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <Link key={item} href="#" className="text-white/20 text-xs hover:text-white/40 transition-colors duration-200 cursor-pointer">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
