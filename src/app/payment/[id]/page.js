'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { motion } from 'framer-motion';
import axios from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ appointmentId, fee, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const { user, dbUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Create payment intent
      const { data } = await axios.post('/api/payments/create-payment-intent', {
        amount: fee
      });

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        // Save payment to database
        await axios.post('/api/payments', {
          appointmentId,
          patientId: dbUser?._id,
          amount: fee,
          transactionId: result.paymentIntent.id,
        });

        // Update appointment payment status
        await axios.put(`/api/appointments/${appointmentId}`, {
          paymentStatus: 'paid'
        });

        onSuccess();
      }
    } catch (err) {
      setError('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#374151',
                '::placeholder': { color: '#9CA3AF' },
              },
            },
          }}
        />
      </div>

      {error && (
        <div className="bg-red-50 text-red-500 px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Processing...' : `Pay $${fee}`}
      </button>

      {/* Test card info */}
      <div className="bg-yellow-50 rounded-xl p-4 text-sm text-yellow-700">
        <p className="font-semibold mb-1">Test Card Details:</p>
        <p>Card Number: 4242 4242 4242 4242</p>
        <p>Expiry: Any future date</p>
        <p>CVC: Any 3 digits</p>
      </div>
    </form>
  );
}

export default function PaymentPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const fee = searchParams.get('fee');
  const [success, setSuccess] = useState(false);

  const handleSuccess = () => {
    setSuccess(true);
    setTimeout(() => {
      router.push('/dashboard/patient');
    }, 3000);
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-lg p-12 text-center max-w-md"
        >
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h2>
          <p className="text-gray-500 mb-4">Your appointment has been confirmed.</p>
          <p className="text-sm text-gray-400">Redirecting to dashboard...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-md mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-teal-500 p-6 text-white text-center">
            <h2 className="text-2xl font-bold mb-1">Complete Payment</h2>
            <p className="text-blue-100">Secure payment powered by Stripe</p>
            <div className="text-3xl font-bold mt-4">${fee}</div>
            <p className="text-blue-100 text-sm">Consultation Fee</p>
          </div>

          {/* Form */}
          <div className="p-8">
            <Elements stripe={stripePromise}>
              <CheckoutForm
                appointmentId={id}
                fee={fee}
                onSuccess={handleSuccess}
              />
            </Elements>
          </div>
        </motion.div>
      </div>
    </div>
  );
}