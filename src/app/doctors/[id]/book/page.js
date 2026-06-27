'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function BookAppointment() {
  const { id } = useParams();
  const { user, dbUser } = useAuth();
  const router = useRouter();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    appointmentDate: '',
    appointmentTime: '',
    symptoms: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
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
  }, [id, user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const appointmentData = {
        patientId: dbUser?._id,
        doctorId: id,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        symptoms: formData.symptoms,
        appointmentStatus: 'pending',
        paymentStatus: 'unpaid',
      };

      const res = await axios.post('/api/appointments', appointmentData);
      
      // Redirect to payment page
      router.push(`/payment/${res.data._id}?fee=${doctor.consultationFee}`);
    } catch (error) {
      setError('Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-2xl mx-auto px-4">
        
        <Link href={`/doctors/${id}`} className="flex items-center gap-2 text-blue-600 hover:underline mb-6">
          ← Back to Doctor Profile
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
        >
          {/* Doctor Info */}
          {doctor && (
            <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6">
              <div className="flex items-center gap-4">
                <img
                  src={doctor.profileImage || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
                  alt={doctor.doctorName}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border-4 border-white"
                />
                <div className="text-white">
                  <h2 className="text-xl font-bold">Dr. {doctor.doctorName}</h2>
                  <p className="text-blue-100">{doctor.specialization}</p>
                  <p className="text-yellow-300 font-semibold">Fee: ${doctor.consultationFee}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Book Your Appointment</h3>

            {error && (
              <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl mb-4 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Date
                </label>
                <input
                  type="date"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Appointment Time
                </label>
                <select
                  name="appointmentTime"
                  value={formData.appointmentTime}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a time slot</option>
                  <option value="9:00 AM">9:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="2:00 PM">2:00 PM</option>
                  <option value="3:00 PM">3:00 PM</option>
                  <option value="4:00 PM">4:00 PM</option>
                  <option value="5:00 PM">5:00 PM</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Symptoms / Reason for Visit
                </label>
                <textarea
                  name="symptoms"
                  value={formData.symptoms}
                  onChange={handleChange}
                  required
                  rows={4}
                  placeholder="Describe your symptoms or reason for visit..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Summary */}
              <div className="bg-blue-50 rounded-2xl p-4">
                <h4 className="font-semibold text-gray-800 mb-2">Appointment Summary</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Doctor</span>
                    <span className="font-medium">Dr. {doctor?.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span className="font-medium">{formData.appointmentDate || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time</span>
                    <span className="font-medium">{formData.appointmentTime || 'Not selected'}</span>
                  </div>
                  <div className="flex justify-between border-t border-blue-200 pt-2 mt-2">
                    <span className="font-semibold">Consultation Fee</span>
                    <span className="font-bold text-blue-600">${doctor?.consultationFee}</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50"
              >
                {submitting ? 'Booking...' : 'Proceed to Payment'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}