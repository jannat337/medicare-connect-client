import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Logo & Description */}
          <div>
            <Link href="/" className="flex items-center gap-1 mb-4">
              <span className="text-2xl font-bold text-blue-400">Medi</span>
              <span className="text-2xl font-bold text-teal-400">Care</span>
            </Link>
            <p className="text-gray-400 text-sm">
              Connecting patients with doctors for better healthcare experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white text-sm">Home</Link></li>
              <li><Link href="/doctors" className="text-gray-400 hover:text-white text-sm">Find Doctors</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white text-sm">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white text-sm">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-3 text-gray-400 text-sm">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
                </svg>
                123 Medical Street, Dhaka
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
                info@medicareconnect.com
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                </svg>
                +880 1234-567890
              </li>
            </ul>
          </div>

          {/* Emergency & Social */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Emergency Hotline</h3>
            <p className="text-red-400 text-xl font-bold mb-4">🚨 999</p>
            <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
            <div className="flex gap-3">
              <a href="#" className="text-gray-400 hover:text-blue-400">Facebook</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-blue-400">LinkedIn</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-6 text-center text-gray-400 text-sm">
          <p>© 2024 MediCare Connect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}