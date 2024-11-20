import React, { useState } from 'react';
import NavBar from '../_components/navbar';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaQuestionCircle, FaClock, FaHeadset } from 'react-icons/fa';

const ContactPage = () => {
  const [contactType, setContactType] = useState('pillpoint');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    pharmacyName: '',
    pharmacyLocation: '',
    customerLocation: '',
    subject: 'General Inquiry',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) {
      toast.error('Please enter your message');
      return;
    }
    toast.success('Message sent successfully! We will get back to you soon.', {
      position: "top-right",
      autoClose: 3000
    });
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      pharmacyName: '',
      pharmacyLocation: '',
      customerLocation: '',
      subject: 'General Inquiry',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-gray-800 mb-3">How Can We Help You?</h1>
          <p className="text-gray-600 text-lg">We're here to help and answer any questions you might have</p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaClock className="w-8 h-8 text-[#4C9BF5] mx-auto mb-4" />
            <h3 className="font-medium mb-2">Business Hours</h3>
            <p className="text-gray-600">Monday - Friday: 8am - 6pm</p>
            <p className="text-gray-600">Saturday: 9am - 5pm</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaHeadset className="w-8 h-8 text-[#4C9BF5] mx-auto mb-4" />
            <h3 className="font-medium mb-2">Customer Support</h3>
            <p className="text-gray-600">24/7 Live Chat Support</p>
            <p className="text-gray-600">Response time: ~5 minutes</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <FaQuestionCircle className="w-8 h-8 text-[#4C9BF5] mx-auto mb-4" />
            <h3 className="font-medium mb-2">FAQ Section</h3>
            <p className="text-gray-600">Find quick answers to common questions</p>
            <a href="#" className="text-[#4C9BF5] hover:underline">Visit FAQ</a>
          </div>
        </div>

        {/* Main Contact Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 flex gap-8">
          {/* Contact Information Card */}
          <div className="bg-[#4C9BF5] rounded-lg p-8 text-white h-full">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <FaPhone className="w-5 h-5" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p>+69 000 000 000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaEnvelope className="w-5 h-5" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p>support@pillpoint.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <FaMapMarkerAlt className="w-5 h-5" />
                <div>
                  <p className="font-medium">Main Office</p>
                  <p>Butuan City, Agusan Del Norte</p>
                </div>
              </div>
            </div>

            <div className="mt-12 border-t pt-6">
              <p className="mb-4 font-medium">Connect With Us</p>
              <div className="flex gap-3">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <img src="/images/Client/contactus/Group 1000001749.svg" alt="Twitter" className="w-6 h-6" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <img src="/images/Client/contactus/Group 1000001750.svg" alt="Instagram" className="w-6 h-6" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors">
                  <img src="/images/Client/contactus/Group 1000001751.svg" alt="Discord" className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2 bg-white rounded-lg p-8 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-4 mb-6">
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={contactType === 'pillpoint'}
                    onChange={() => setContactType('pillpoint')}
                  /> 
                  <span>Contact PillPoint</span>
                </label>
                <label className="flex items-center gap-2 p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    checked={contactType === 'pharmacy'}
                    onChange={() => setContactType('pharmacy')}
                  /> 
                  <span>Contact Pharmacy</span>
                </label>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              {contactType === 'pharmacy' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Pharmacy Name</label>
                    <input
                      type="text"
                      name="pharmacyName"
                      value={formData.pharmacyName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Pharmacy Location</label>
                    <input
                      type="text"
                      name="pharmacyLocation"
                      value={formData.pharmacyLocation}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm text-gray-600 mb-1">Subject</label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Technical Support">Technical Support</option>
                  <option value="Order Issue">Order Issue</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows="5"
                  className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Please describe your inquiry in detail..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4C9BF5] text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <FaEnvelope className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
