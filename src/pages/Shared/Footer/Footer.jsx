import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
} from "react-icons/fa6";
import Logo from "../../../components/Logo/Logo";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-content">

      <div className="px-6 lg:px-10 py-20">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-3 mb-6 ">
              <div className="rounded-full">
                <Logo></Logo>
              </div>
            </div>

            <p className="text-sm leading-7 text-neutral-content/70 max-w-sm">
              Crafting elegant interiors, weddings, and ceremony experiences with
              timeless luxury and modern design excellence.
            </p>

            {/* SOCIAL */}
            <div className="flex items-center gap-3 mt-6 text-lg">

              {[
                FaInstagram,
                FaFacebookF,
                FaLinkedinIn,
                FaPinterest,
              ].map((Icon, i) => (
                <a
                  key={i}
                  className="p-2 rounded-full bg-white/5 hover:bg-primary hover:text-primary-content transition-all duration-300 hover:scale-105"
                >
                  <Icon />
                </a>
              ))}

            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-neutral-content/80">
              Company
            </h3>

            <ul className="space-y-3 text-sm text-neutral-content/70">
              {["About Us", "Our Services", "Portfolio", "Careers", "Blog"].map(
                (item, i) => (
                  <li key={i}>
                    <a className="hover:text-primary transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-neutral-content/80">
              Support
            </h3>

            <ul className="space-y-3 text-sm text-neutral-content/70">
              {[
                "Help Center",
                "Booking Guide",
                "Cancellation",
                "Contact",
                "Privacy Policy",
              ].map((item, i) => (
                <li key={i}>
                  <a className="hover:text-primary transition-colors duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest mb-6 text-neutral-content/80">
              Stay Inspired
            </h3>

            <p className="text-sm text-neutral-content/70 mb-5 leading-6">
              Get exclusive decoration ideas, offers & luxury inspirations.
            </p>

            <div className="flex rounded-(--radius-btn) overflow-hidden">

              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-4 py-3 bg-base-100 text-neutral outline-none text-sm"
              />

              <button className="px-5 bg-primary text-primary-content font-semibold hover:opacity-90 transition">
                →
              </button>

            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="my-12 h-px bg-white/10"></div>

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-xs text-neutral-content/60">
            © 2026 StyleDecor. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs text-neutral-content/60">
            {["Privacy", "Terms", "Sitemap"].map((item, i) => (
              <a
                key={i}
                className="hover:text-primary transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;