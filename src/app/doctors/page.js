'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import axios from '@/lib/axios';

export default function FindDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6;

  useEffect(() => {
    fetchDoctors();
  }, [search, sortBy]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/doctors', {
        params: { search, sortBy }
      });
      setDoctors(res.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(doctors.length / doctorsPerPage);
  const currentDoctors = doctors.slice(
    (currentPage - 1) * doctorsPerPage,
    currentPage * doctorsPerPage
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-teal-500 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-4"
          >
            Find Your Doctor
          </motion.h1>
          <p className="text-blue-100 mb-8">Connect with the best healthcare professionals</p>

          {/* Search */}
          <div className="max-w-2xl mx-auto flex gap-3">
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              placeholder="Search by name or specialization..."
              className="flex-1 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-300 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Sort */}
        <div className="flex justify-between items-center mb-8">
          <p className="text-gray-500">{doctors.length} doctors found</p>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Sort By</option>
            <option value="fee">Consultation Fee</option>
            <option value="experience">Experience</option>
          </select>
        </div>

        {/* Doctors Grid */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : currentDoctors.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">👨‍⚕️</div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">No doctors found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentDoctors.map((doctor, index) => (
              <motion.div
                key={doctor._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-50 to-teal-50 p-6 text-center">
                  <img
                    src={doctor.profileImage || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                    alt={doctor.doctorName}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-4 border-white shadow-md"
                  />
                  {doctor.verificationStatus === 'verified' && (
                    <span className="inline-block mt-2 bg-green-100 text-green-600 text-xs px-3 py-1 rounded-full font-medium">
                      ✓ Verified
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">Dr. {doctor.doctorName}</h3>
                  <p className="text-blue-500 text-sm mb-3">{doctor.specialization}</p>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Experience</span>
                      <span className="font-medium text-gray-700">{doctor.experience} years</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Consultation Fee</span>
                      <span className="font-medium text-blue-600">${doctor.consultationFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Hospital</span>
                      <span className="font-medium text-gray-700 truncate ml-2">{doctor.hospitalName}</span>
                    </div>
                  </div>
                  <Link
                    href={`/doctors/${doctor._id}`}
                    className="w-full block text-center bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-medium"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-10">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-blue-50 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-xl ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border border-gray-200 hover:bg-blue-50'}`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:bg-blue-50 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}