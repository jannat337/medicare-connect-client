'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      {/* Banner Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-500 min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                Your Health, <br />
                <span className="text-yellow-300">Our Priority</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8">
                Connect with top doctors, book appointments instantly, and manage your healthcare journey all in one place.
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/doctors" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-800 transition">
                  Find Doctors
                </Link>
                <Link href="/register" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
                  Get Started
                </Link>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex justify-center"
            >
              <div className="bg-white bg-opacity-20 rounded-3xl p-8 text-white text-center">
                <div className="text-8xl mb-4">🏥</div>
                <h3 className="text-2xl font-bold mb-2">MediCare Connect</h3>
                <p className="text-blue-100">Trusted Healthcare Platform</p>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <div className="text-3xl font-bold">500+</div>
                    <div className="text-sm">Doctors</div>
                  </div>
                  <div className="bg-white bg-opacity-20 rounded-xl p-4">
                    <div className="text-3xl font-bold">10k+</div>
                    <div className="text-sm">Patients</div>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </main>
  );
}