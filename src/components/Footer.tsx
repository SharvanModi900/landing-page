
// 'use client';

// import Link from 'next/link';
// import { megaMenuSections } from './Navigation'; // Import your existing menu data

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-gray-300 mt-16">
//       {/* Footer Links */}
//       <div className="max-w-7xl mx-auto px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
//         {megaMenuSections.map((section) => (
//           <div key={section.label}>
//             <h3 className="text-lg font-semibold text-white mb-4">
//               {section.label}
//             </h3>
//             <ul className="space-y-2">
//               {section.submenu.map((item) => (
//                 <li key={item.title} className="flex items-center gap-2">
//                   <item.icon className="w-4 h-4 text-blue-400" />
//                   <Link
//                     href={item.href}
//                     className="hover:text-orange-400 transition-colors"
//                   >
//                     {item.title}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         ))}
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-500">
//         © {new Date().getFullYear()} PoPP. All rights reserved.
//       </div>
//     </footer>
//   );
// }

'use client';

import Link from 'next/link';
import { megaMenuSections } from './Navigation';

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-t from-[#010519] via-[#0a0e23] to-[#010519] text-gray-300 pt-16 pb-8 overflow-hidden">
      
      {/* Glowing gradient lines for futuristic effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 w-[400px] h-[2px] bg-gradient-to-r from-blue-400 to-purple-500/50 -translate-x-1/2 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-1/3 w-[600px] h-[2px] bg-gradient-to-r from-green-400 to-blue-400/50 -translate-x-1/2 animate-pulse-slower"></div>
      </div>

      {/* Footer Links */}
      <div className="relative max-w-7xl mx-auto px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-10 z-10">
        {megaMenuSections.map((section) => (
          <div key={section.label}>
            <h3 className="text-lg font-bold text-white mb-5 border-b border-blue-400/20 pb-2 uppercase tracking-wide">
              {section.label}
            </h3>
            <ul className="space-y-3">
              {section.submenu.map((item) => (
                <li key={item.title} className="flex items-center gap-2 group">
                  <item.icon className="w-5 h-5 text-gradient group-hover:animate-pulse" />
                  <Link
                    href={item.href}
                    className="hover:text-blue-400 transition-colors text-sm font-medium"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div className="relative mt-12 text-center text-sm text-gray-500 border-t border-gray-700 pt-6 z-10">
        <p className="mb-2">© {new Date().getFullYear()} PoPP. All rights reserved.</p>
        <p className="text-gray-400 text-xs">
          Crafted with 🔮 for the Proof of Problem Protocol ecosystem
        </p>
      </div>

      {/* Neon Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-16 right-0 w-[400px] h-[400px] rounded-full bg-blue-500/10 blur-3xl animate-pulse-slower"></div>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(90deg, #5dcfff, #c77dff, #ff884d);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.9; }
        }
        @keyframes pulse-slower {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 4s infinite;
        }
        .animate-pulse-slower {
          animation: pulse-slower 6s infinite;
        }
      `}</style>
    </footer>
  );
}
