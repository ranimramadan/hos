"use client";
import React, { useState, useEffect } from 'react';
import { Trash2, Calendar, Clock } from 'lucide-react';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const handleCancelBooking = (bookingId) => {
    setSelectedBookingId(bookingId);
    setShowConfirmModal(true);
  };

  const confirmCancelBooking = () => {
    const updatedBookings = bookings.filter(booking => booking.id !== selectedBookingId);
    setBookings(updatedBookings);
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));
    setShowConfirmModal(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-bold mb-8">
        My<span className="text-blue-500"> Bookings </span>
      </h2>

      <div className="grid gap-6">
        {bookings.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-xl shadow-md">
            <p className="text-gray-500">No bookings found</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div key={booking.id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="flex">
                <div className="w-40 h-48 bg-blue-50 flex-shrink-0">
                  <img 
                    src={booking.doctorImage} 
                    alt={booking.doctorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-xl mb-1">{booking.doctorName}</h3>
                        <p className="text-gray-600">{booking.specialty}</p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <p>Appointment On - {formatDate(booking.date)}</p>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600">
                          <Clock className="w-5 h-5 text-blue-500" />
                          <p>At Time: {booking.time}</p>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleCancelBooking(booking.id)}
                      className="flex items-center px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-105 transform"
                    >
                      <Trash2 size={18} className="mr-2" />
                      Cancel Appointment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

     
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent backdrop-blur-sm">
          <div className="bg-white/80 backdrop-blur-md rounded-lg p-6 max-w-sm w-full mx-4 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">Cancel Appointment</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to cancel this appointment?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                No, Keep it
              </button>
              <button
                onClick={confirmCancelBooking}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Cancel it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;