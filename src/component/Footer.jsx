import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#0f172a] text-[#cbd5e1] px-6 py-10 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div>
       <div className="flex items-center gap-3">
          <div>
            <Link>
              <img className="w-15" src="/favicon.png" alt="" />
            </Link>
          </div>
          <div>
            <Link>
              <h1 className="text-[#facc15] transition duration-300 text-xl font-bold">
                CoinCrafter
              </h1>
            </Link>
          </div>
        </div>
          <p className="text-sm">
            Empowering digital workers to earn with micro tasks. Join us and start crafting your coins today!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#facc15] transition">Home</a></li>
            
            <li><a href="/dashboard" className="hover:text-[#facc15] transition">Dashboard</a></li>
           
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <ul className="text-sm space-y-2">
            <li>Email: support@coincrafter.com</li>
            <li>Phone: +880 1234 567 890</li>
            <li>Location: Dhaka, Bangladesh</li>
          </ul>
        </div>

        {/* Social Icons */}
        <div>
          <h3 className="text-white font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4 text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#facc15] hover:text-white transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#facc15] hover:text-white transition"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[#facc15] hover:text-white transition"
            >
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-10 border-t border-slate-700 pt-4 text-sm">
        © {new Date().getFullYear()} CoinCrafter. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
