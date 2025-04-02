"use client";
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

function BookAppointment({ doctorInfo }) {
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const timeSlots = [
    "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM",
    "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM"
  ];

  const handleConfirmBooking = () => {
    // Get existing bookings or initialize empty array
    const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    
    // Create new booking
    const newBooking = {
      id: Date.now(),
      doctorName: doctorInfo.name,
      doctorImage: doctorInfo.image,
      specialty: doctorInfo.specialty,
      date: date.toISOString().split('T')[0],
      time: selectedTime
    };

    // Add new booking to array
    localStorage.setItem('bookings', JSON.stringify([...existingBookings, newBooking]));

    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedTime(null);
    }, 3000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="mt-6 w-full bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors">
          Book Appointment
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center mb-4">Book Your Appointment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6">
          {showConfirmation && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your appointment has been booked successfully for {date.toLocaleDateString()} at {selectedTime}.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="bg-white rounded-xl p-4">
            <Calendar
              onChange={setDate}
              value={date}
              className="rounded-xl border-none shadow-sm"
              minDate={new Date()}
            />
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-3">Available Time Slots</h3>
            <div className="grid grid-cols-3 gap-2">
              {timeSlots.map((time, index) => (
                <button
                  key={index}
                  className={`p-2 text-sm rounded-lg transition-colors ${
                    selectedTime === time
                      ? 'bg-blue-500 text-white'
                      : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
          <button 
            className="w-full bg-blue-500 text-white px-6 py-3 rounded-xl hover:bg-blue-600 transition-colors mt-4"
            disabled={!selectedTime}
            onClick={handleConfirmBooking}
          >
            Confirm Booking
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
