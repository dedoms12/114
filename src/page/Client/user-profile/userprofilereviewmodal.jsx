import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const UserProfileReviewModal = ({ isOpen, onClose, product, onReviewSubmit }) => {
  const [ratings, setRatings] = useState({
    productQuality: 0,
    sellerService: 0,
    deliverySpeed: 0
  });
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen]);

  const resetForm = () => {
    setRatings({
      productQuality: 0,
      sellerService: 0,
      deliverySpeed: 0
    });
    setReview('');
    setImages([]);
    setPreviewImages([]);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 4) {
      toast.error('Maximum 4 images allowed');
      return;
    }

    setImages(files);
    setPreviewImages(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (Object.values(ratings).some(rating => rating === 0)) {
      toast.error('Please provide all ratings');
      return;
    }

    if (!review.trim()) {
      toast.error('Please write a review');
      return;
    }

    const reviewData = {
      productId: product.id,
      ratings,
      comment: review,
      images: previewImages,
      date: new Date().toLocaleDateString(),
      user: 'Current User' // This should be replaced with actual user data
    };

    onReviewSubmit(reviewData);
    resetForm();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">Write a Review</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-4">
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-md" />
            <div>
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating Criteria */}
          <div className="space-y-4">
            {Object.entries({
              productQuality: 'Product Quality',
              sellerService: 'Seller Service',
              deliverySpeed: 'Delivery Speed'
            }).map(([key, label]) => (
              <div key={key} className="flex items-center gap-4">
                <span className="w-32 text-sm text-gray-600">{label}</span>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatings(prev => ({ ...prev, [key]: star }))}
                      className="focus:outline-none"
                    >
                      <svg
                        className={`w-6 h-6 ${
                          star <= ratings[key] ? 'text-[#FF8A00]' : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Review Text */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full h-32 p-3 border rounded-md"
              placeholder="Write your review here..."
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Photos (Optional)
            </label>
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
    </div>
  );
};

export default UserProfileReviewModal;
