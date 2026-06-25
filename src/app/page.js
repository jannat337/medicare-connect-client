'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main>
      {/* Banner Section */}
      <section className="bg-gradient-to-br from-blue-700 via-blue-500 to-teal-400 min-h-[90vh] flex items-center relative overflow-hidden">
        
        {/* Background decorations */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-white opacity-5 rounded-full"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-white opacity-5 rounded-full"></div>
        <div className="absolute top-40 right-40 w-20 h-20 bg-yellow-300 opacity-10 rounded-full"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block bg-white bg-opacity-20 text-white text-sm px-4 py-2 rounded-full mb-6">
                🏥 Trusted Healthcare Platform
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Your Health, <br />
                <span className="text-yellow-300">Our Priority</span>
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Connect with top doctors, book appointments instantly, and manage your healthcare journey all in one place.
              </p>
              <div className="flex gap-4 flex-wrap mb-10">
                <Link href="/doctors" className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-800 transition shadow-lg">
                  Find Doctors
                </Link>
                <Link href="/register" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">
                  Get Started
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {[
                  { number: "500+", label: "Doctors" },
                  { number: "10k+", label: "Patients" },
                  { number: "98%", label: "Satisfaction" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white bg-opacity-15 rounded-2xl p-4 text-center">
                    <div className="text-2xl font-bold text-white">{stat.number}</div>
                    <div className="text-blue-100 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden md:flex justify-center items-center"
            >
              <div className="relative">
                <div className="bg-white rounded-3xl p-8 shadow-2xl w-80">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center text-3xl">
                      👨‍⚕️
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800">Dr. Sarah Ahmed</h3>
                      <p className="text-blue-500 text-sm">Cardiologist</p>
                      <div className="flex text-yellow-400 text-sm">★★★★★</div>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-2xl p-4 mb-4">
                    <p className="text-sm text-gray-500 mb-1">Next Available</p>
                    <p className="font-semibold text-gray-800">Today, 3:00 PM</p>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition">
                    Book Appointment
                  </button>
                </div>

                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                  className="absolute -top-6 -right-6 bg-green-500 text-white rounded-2xl p-3 shadow-lg"
                >
                  <div className="text-sm font-bold">✓ Verified</div>
                  <div className="text-xs opacity-80">Doctor</div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ repeat: Infinity, duration: 3, delay: 1 }}
                  className="absolute -bottom-6 -left-6 bg-yellow-400 text-white rounded-2xl p-3 shadow-lg"
                >
                  <div className="text-sm font-bold">❤️ 4.9</div>
                  <div className="text-xs opacity-80">Rating</div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Medical Specializations */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Medical Specializations</h2>
            <p className="text-gray-500">Find the right specialist for your needs</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { name: "Cardiology", img: "/specializations/cardiology.jpg", color: "bg-red-50" },
{ name: "Neurology", img: "/specializations/neurology.jpg", color: "bg-purple-50" },
{ name: "Orthopedics", img: "/specializations/orthopedics.jpg", color: "bg-orange-50" },
{ name: "Pediatrics", img: "/specializations/pediatrics.jpg", color: "bg-yellow-50" },
{ name: "Dermatology", img: "/specializations/dermatology.jpg", color: "bg-green-50" },
{ name: "Dentistry", img: "/specializations/dentistry.jpg", color: "bg-blue-50" },
            ].map((spec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${spec.color} rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition cursor-pointer`}
              >
                <img src={spec.img} alt={spec.name} className="w-full h-32 object-cover"/>
                <div className="p-3 text-center">
                  <h3 className="text-sm font-semibold text-gray-700">{spec.name}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}