// import React from 'react';
// import {
//   FaFacebookF,
//   FaLinkedinIn,
//   FaTwitter,
//   FaGlobe,
//   FaEnvelope,
//   FaPhone,
// } from 'react-icons/fa';

// const Footer = () => {
//   return (
//     <footer className="bg-gradient-to-r from-[#0a174e] to-[#274690] text-[#FEE715] py-10 px-6 mt-12">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
//         {/* Company Info */}
//         <div>
//           <h3 className="text-lg font-semibold mb-3">KSBM INFOTECH</h3>
//           <p>Empowering Digital Solutions with modern technology and user-first design.</p>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h4 className="font-semibold mb-3">Quick Links</h4>
//           <ul className="space-y-2">
//             <li><a href="/" className="hover:underline hover:text-white">Home</a></li>
//             <li><a href="/about" className="hover:underline hover:text-white">About Us</a></li>
//             <li><a href="/services" className="hover:underline hover:text-white">Services</a></li>
//             <li><a href="/contact" className="hover:underline hover:text-white">Contact</a></li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h4 className="font-semibold mb-3">Contact</h4>
//           <ul className="space-y-2">
//             <li className="flex items-center gap-2"><FaEnvelope /> info@ksbminfotech.com</li>
//             <li className="flex items-center gap-2"><FaPhone /> +91 9876543210</li>
//             <li className="flex items-center gap-2"><FaGlobe /> www.ksbminfotech.com</li>
//           </ul>
//         </div>

//         {/* Social Media */}
//         <div>
//           <h4 className="font-semibold mb-3">Follow Us</h4>
//           <div className="flex space-x-4 mt-2">
//             <a href="https://facebook.com/ksbminfotech" target="_blank" rel="noreferrer" className="hover:text-white">
//               <FaFacebookF />
//             </a>
//             <a href="https://linkedin.com/company/ksbminfotech" target="_blank" rel="noreferrer" className="hover:text-white">
//               <FaLinkedinIn />
//             </a>
//             <a href="https://twitter.com/ksbminfotech" target="_blank" rel="noreferrer" className="hover:text-white">
//               <FaTwitter />
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="mt-10 text-center border-t border-blue-200 pt-4 text-xs text-[#d1d5db]">
//         &copy; {new Date().getFullYear()} KSBM INFOTECH. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
import React from 'react';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaGlobe,
  FaEnvelope,
  FaPhone,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#C2410C] text-[#ffc107] px-6 pt-12 pb-6 mt-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
        
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold mb-3 tracking-wide text-[#ffc107]">KSBM INFOTECH</h3>
          <p className="text-[#f1f1f1]">
            Empowering Digital Solutions with modern technology and user-first design.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-3 uppercase text-[#ffc107]">Quick Links</h4>
          <ul className="space-y-2 text-[#f1f1f1]">
            {['Home', 'About Us', 'Services', 'Contact'].map((text) => (
              <li key={text}>
                <a href={`/${text.toLowerCase().replace(' ', '')}`} className="hover:underline hover:text-white transition">
                  {text}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-semibold mb-3 uppercase text-[#ffc107]">Contact</h4>
          <ul className="space-y-2 text-[#f1f1f1]">
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-[#ffc107]" /> info@ksbminfotech.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone className="text-[#ffc107]" /> +91 9876543210
            </li>
            <li className="flex items-center gap-2">
              <FaGlobe className="text-[#ffc107]" /> www.ksbminfotech.com
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h4 className="font-semibold mb-3 uppercase text-[#ffc107]">Follow Us</h4>
          <div className="flex space-x-4 mt-2">
            <a href="https://facebook.com/ksbminfotech" target="_blank" rel="noreferrer"
              className="hover:text-white text-[#f1f1f1] text-lg transition-transform transform hover:scale-110">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com/company/ksbminfotech" target="_blank" rel="noreferrer"
              className="hover:text-white text-[#f1f1f1] text-lg transition-transform transform hover:scale-110">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com/ksbminfotech" target="_blank" rel="noreferrer"
              className="hover:text-white text-[#f1f1f1] text-lg transition-transform transform hover:scale-110">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 text-center border-t border-[#2c2c54] pt-4 text-xs text-[#f1f1f1]">
        &copy; {new Date().getFullYear()} <span className="text-[#ffc107] font-semibold">KSBM INFOTECH</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

