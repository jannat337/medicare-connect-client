'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function DoctorDashboard() {
  const { user, dbUser, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (!loading && dbUser && dbUser.role !== 'doctor') {
      router.push('/dashboard');
    }
  }, [user, dbUser, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg min-h-screen p-6">
        <div className="mb-8">
          <Link href="/" className="flex items-center gap-1">
            <span className="text-xl font-bold text-blue-600">Medi</span>
            <span className="text-xl font-bold text-teal-500">Care</span>
          </Link>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-8 p-3 bg-teal-50 rounded-xl">
          <img
            src={user?.photoURL || 'https://i.ibb.co/MBtjqXQ/no-avatar.gif'}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800 text-sm truncate w-32">{user?.displayName}</p>
            <p className="text-xs text-teal-500">Doctor</p>
          </div>
        </div>

        {/* Menu */}
        <nav className="space-y-2">
          <Link href="/dashboard/doctor" className="flex items-center gap-3 px-4 py-3 bg-teal-600 text-white rounded-xl">
            📊 Overview
          </Link>
          <Link href="/dashboard/doctor/schedule" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-teal-50 rounded-xl">
            📅 Manage Schedule
          </Link>
          <Link href="/dashboard/doctor/appointments" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-teal-50 rounded-xl">
            🏥 Appointment Requests
          </Link>
          <Link href="/dashboard/doctor/prescriptions" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-teal-50 rounded-xl">
            📝 Prescriptions
          </Link>
          <Link href="/dashboard/doctor/profile" className="flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-teal-50 rounded-xl">
            👤 Profile
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl"
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Doctor Dashboard</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: "Total Patients", value: "0", icon: "👥", color: "bg-blue-50 text-blue-600" },
            { title: "Today's Appointments", value: "0", icon: "📅", color: "bg-teal-50 text-teal-600" },
            { title: "Reviews Received", value: "0", icon: "⭐", color: "bg-yellow-50 text-yellow-600" },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} rounded-2xl p-6`}>
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-sm mt-1">{stat.title}</div>
            </div>
          ))}
        </div>

        {/* Welcome Message */}
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center">
          <div className="text-5xl mb-4">👨‍⚕️</div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Welcome, Dr. {user?.displayName}!
          </h2>
          <p className="text-gray-500 mb-6">
            Manage your appointments, prescriptions, and patient consultations.
          </p>
          <Link
            href="/dashboard/doctor/appointments"
            className="bg-teal-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-teal-700 transition"
          >
            View Appointments
          </Link>
        </div>
      </div>
    </div>
  );
}