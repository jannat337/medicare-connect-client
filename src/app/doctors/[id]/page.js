'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function DoctorDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await axios.get(`/api/doctors/${id}`);
        setDoctor(res.data);
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Doctor not found</h2>
          <Link href="/doctors" className="text-blue-600 hover:underline">Back to Doctors</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Back Button */}
        <Link href="/doctors" className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
          ← Back to Doctors
        </Link>

        {/* Doctor Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden mb-6"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <img
                src={doctor.profileImage || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                alt={doctor.doctorName}
                referrerPolicy="no-referrer"
                className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="text-white text-center md:text-left">
                <h1 className="text-3xl font-bold mb-1">Dr. {doctor.doctorName}</h1>
                <p className="text-blue-100 text-lg mb-2">{doctor.specialization}</p>
                <p className="text-blue-100">{doctor.hospitalName}</p>
                {doctor.verificationStatus === 'verified' && (
                  <span className="inline-block mt-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full">
                    ✓ Verified Doctor
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{doctor.experience}</div>
                <div className="text-gray-500 text-sm">Years Experience</div>
              </div>
              <div className="bg-teal-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-teal-600">${doctor.consultationFee}</div>
                <div className="text-gray-500 text-sm">Consultation Fee</div>
              </div>
              <div className="bg-purple-50 rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">4.8</div>
                <div className="text-gray-500 text-sm">Rating</div>
              </div>
            </div>

            {/* Qualifications */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Qualifications</h3>
              <p className="text-gray-600 bg-gray-50 rounded-xl p-4">{doctor.qualifications}</p>
            </div>

            {/* Available Days */}
            {doctor.availableDays?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Available Days</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableDays.map((day, i) => (
                    <span key={i} className="bg-blue-100 text-blue-600 px-4 py-2 rounded-xl text-sm font-medium">
                      {day}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Available Slots */}
            {doctor.availableSlots?.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">Available Time Slots</h3>
                <div className="flex flex-wrap gap-2">
                  {doctor.availableSlots.map((slot, i) => (
                    <span key={i} className="bg-teal-100 text-teal-600 px-4 py-2 rounded-xl text-sm font-medium">
                      {slot}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Book Appointment Button */}
            <div className="mt-8">
              {user ? (
                <button
                  onClick={() => router.push(`/doctors/${id}/book`)}
                  className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition"
                >
                  Book Appointment
                </button>
              ) : (
                <Link
                  href="/login"
                  className="w-full block text-center bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition"
                >
                  Login to Book Appointment
                </Link>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}