"use client";
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-16">
        Contact <span className="text-blue-500">Us</span>
      </h1>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid md:grid-cols-2">
          <div className="bg-blue-500 p-12 text-white">
            <h2 className="text-2xl font-semibold mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-400 p-3 rounded-full">
                  <Phone className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Phone</h3>
                  <p className="text-blue-100">+1 234 567 890</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-400 p-3 rounded-full">
                  <Mail className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Email</h3>
                  <p className="text-blue-100">contact@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="bg-blue-400 p-3 rounded-full">
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg">Address</h3>
                  <p className="text-blue-100">123 Healthcare St, Medical City</p>
                </div>
              </div>
            </div>
            <div className="mt-12 p-6 bg-blue-600 rounded-xl">
              <MessageSquare className="h-8 w-8 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Available 24/7</h3>
              <p className="text-blue-100">We're here to help you anytime. Your health is our priority.</p>
            </div>
          </div>

          <div className="p-12">
            <h2 className="text-2xl font-semibold mb-8">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  rows="5"
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105"
              >
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;