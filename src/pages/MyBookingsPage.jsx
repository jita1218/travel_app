import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../hooks/useAuthContext';

const MyBookingsPage = () => {
  const { user } = useAuthContext();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchBookings = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/bookings/${user.username}`);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [user]);

  if (!user) return <p className="text-center mt-10">Please login to view your bookings.</p>;
  if (loading) return <p className="text-center mt-10">Loading bookings...</p>;

  return (
    <div className="container mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid gap-4">
          {bookings.map((booking, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-md">
              <p><strong>Destination:</strong> {booking.destination}</p>
              <p><strong>Travel Date:</strong> {booking.travel_date}</p>
              <p><strong>People:</strong> {booking.num_people}</p>
              <p><strong>Booked On:</strong> {new Date(booking.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookingsPage;
