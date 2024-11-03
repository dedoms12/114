import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const OrderReviewModal = ({ isOpen, onClose, product, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('');
  const [review, setReview] = useState('');
  const [recommend, setRecommend] = useState(true);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!rating || !review || !nickname || !acceptTerms) {
      toast.error('Please fill in all required fields');
      return;
    }

    const newReview = {
      id: Date.now(),
      user: nickname,
      rating,
      title: reviewTitle,
      date: new Date().toISOString().split('T')[0],
      comment: review,
      recommended: recommend
    };

    onReviewSubmit(newReview);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-medium">Overall rating</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="text-2xl focus:outline-none"
              >
                {star <= rating ? '★' : '☆'}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500">Click to rate</p>

          <div>
            <input
              type="text"
              value={reviewTitle}
              onChange={(e) => setReviewTitle(e.target.value)}
              placeholder="Review title"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="Product Review"
              className="w-full border rounded px-3 py-2 h-24 resize-none"
            />
          </div>

          <div>
            <p className="text-gray-700 mb-2">Would you recommend this product to a friend?</p>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={recommend}
                  onChange={() => setRecommend(true)}
                /> Yes
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!recommend}
                  onChange={() => setRecommend(false)}
                /> No
              </label>
            </div>
          </div>

          <div className="space-y-3">
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              placeholder="Nickname"
              className="w-full border rounded px-3 py-2"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address (will not be published)"
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
            />
            <span className="text-sm text-gray-600">
              I accept the terms and conditions
            </span>
          </label>

          <button
            type="submit"
            className="w-full bg-[#4C9BF5] text-white py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Submit Product Review
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderReviewModal;