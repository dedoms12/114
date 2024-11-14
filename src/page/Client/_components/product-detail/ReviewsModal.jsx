import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const ReviewsModal = ({ isOpen, onClose, product }) => {
  const [ratings, setRatings] = useState({
    productQuality: 0,
    sellerService: 0,
    deliverySpeed: 0
  });
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setRatings({
        productQuality: 0,
        sellerService: 0,
        deliverySpeed: 0
      });
      setName('');
      setEmail('');
      setReview('');
      setImages([]);
      setPreviewImages([]);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Get first letter of name for anonymous display
  const getAnonymousName = (fullName) => {
    const names = fullName.trim().split(' ');
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      alert('Maximum 4 images allowed');
      return;
    }

    const newImages = files.map(file => URL.createObjectURL(file));
    setPreviewImages(newImages);
    setImages(files);
  };

  const calculateAverageRating = () => {
    const { productQuality, sellerService, deliverySpeed } = ratings;
    const sum = productQuality + sellerService + deliverySpeed;
    return sum > 0 ? Math.round((sum / 3) * 10) / 10 : 0;
  };

  const RatingCriterion = ({ label, value, onChange }) => (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-700 w-32">{label}</span>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="focus:outline-none"
          >
            <svg
              className={`w-6 h-6 ${star <= value ? 'text-[#FF8A00]' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate ratings
    const hasEmptyRatings = Object.values(ratings).some(rating => rating === 0);
    if (hasEmptyRatings) {
      toast.error('Please provide ratings for all criteria');
      return;
    }

    // Basic form validation
    if (!name.trim() || !email.trim() || !review.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Create review object
      const newReview = {
        id: Date.now(), // temporary ID
        user: name,
        email: email,
        ratings: {
          productQuality: ratings.productQuality,
          sellerService: ratings.sellerService,
          deliverySpeed: ratings.deliverySpeed
        },
        comment: review,
        images: images,
        date: new Date().toLocaleDateString()
      };

      // Here you would typically make an API call to submit the review
      // For now, we'll just simulate a success
      
      toast.success('Review submitted successfully!');
      
      // Reset form
      setRatings({
        productQuality: 0,
        sellerService: 0,
        deliverySpeed: 0
      });
      setName('');
      setEmail('');
      setReview('');
      setImages([]);
      setPreviewImages([]);
      
      // Close modal
      onClose();
      
    } catch (error) {
      toast.error('Failed to submit review. Please try again.');
      console.error('Error submitting review:', error);
    }
  };

  // Add a helper function to safely calculate average rating
  const getAverageRating = (review) => {
    if (!review.ratings) {
      return review.rating || 0; // fallback to old rating system
    }
    const { productQuality, sellerService, deliverySpeed } = review.ratings;
    const sum = (productQuality || 0) + (sellerService || 0) + (deliverySpeed || 0);
    return sum > 0 ? Math.round((sum / 3) * 10) / 10 : 0;
  };

  // Add a helper function to get individual rating
  const getRating = (review, type) => {
    if (!review.ratings) {
      return review.rating || 0; // fallback to old rating system
    }
    return review.ratings[type] || 0;
  };

  // Update the rating statistics calculation
  const calculateRatingStats = () => {
    if (!product?.reviews?.length) return [];
    
    return [5, 4, 3, 2, 1].map((star) => {
      const count = product.reviews.filter(review => 
        Math.round(getAverageRating(review)) === star
      ).length;
      
      return {
        star,
        count,
        percentage: (count / product.reviews.length) * 100
      };
    });
  };

  // Update the review display component
  const ReviewDisplay = ({ review }) => (
    <div className="border-b pb-6 mb-6">
      <div className="flex items-center gap-4 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#4C9BF5] text-white flex items-center justify-center">
          {getAnonymousName(review.user)}
        </div>
        <span className="font-medium">{review.user.split(' ')[0]}***</span>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>

      <div className="space-y-2 mb-4">
        {/* Product Quality */}
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-600">Product Quality</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < getRating(review, 'productQuality') ? 'text-[#FF8A00]' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Seller Service */}
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-600">Seller Service</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < getRating(review, 'sellerService') ? 'text-[#FF8A00]' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Delivery Speed */}
        <div className="flex items-center text-sm">
          <span className="w-32 text-gray-600">Delivery Speed</span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < getRating(review, 'deliverySpeed') ? 'text-[#FF8A00]' : 'text-gray-300'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{review.comment}</p>
      {review.images?.length > 0 && (
        <div className="flex gap-2">
          {review.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Review ${index + 1}`}
              className="w-20 h-20 object-cover rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );

  // Update the statistics display in the modal
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Product Reviews</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="grid grid-cols-3 gap-8">
          {/* Left Column: Statistics & Form */}
          <div className="col-span-1">
            {/* Rating Statistics */}
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#FF8A00]">
                  {product?.rating || 0}
                </div>
                <div className="flex justify-center my-3">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < Math.floor(product?.rating || 0) ? 'text-[#FF8A00]' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-500">
                  Based on {product?.reviews?.length || 0} Reviews
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="space-y-3">
                {calculateRatingStats().map(({ star, count, percentage }) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-sm w-16">{star} Stars</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-[#FF8A00] rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12">({count})</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                <RatingCriterion 
                  label="Product Quality"
                  value={ratings.productQuality}
                  onChange={(value) => setRatings(prev => ({ ...prev, productQuality: value }))}
                />
                <RatingCriterion 
                  label="Seller Service"
                  value={ratings.sellerService}
                  onChange={(value) => setRatings(prev => ({ ...prev, sellerService: value }))}
                />
                <RatingCriterion 
                  label="Delivery Speed"
                  value={ratings.deliverySpeed}
                  onChange={(value) => setRatings(prev => ({ ...prev, deliverySpeed: value }))}
                />
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Your Review</label>
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md h-32 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-2">Upload Photos (Max 4)</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="w-full"
                />
                {previewImages.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {previewImages.map((img, index) => (
                      <img
                        key={index}
                        src={img}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-[#4C9BF5] text-white py-3 rounded-md hover:bg-blue-600 transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>

          {/* Right Column: Reviews List */}
          <div className="col-span-2 border-l pl-8">
            <h3 className="text-lg font-medium mb-6">Recent Reviews</h3>
            <div className="space-y-6">
              {product?.reviews?.map((review) => (
                <ReviewDisplay key={review.id} review={review} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal; 