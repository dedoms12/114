import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const ReviewsModal = ({ isOpen, onClose, product, onReviewSubmit }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [review, setReview] = useState('');
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  // Add click outside handler
  const handleClickOutside = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('productId', product.id);
    formData.append('rating', rating);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('review', review);
    images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });

    // Add the new review to the product's reviews
    const newReview = {
      id: product.reviews.length + 1,
      user: name,
      rating,
      date: new Date().toISOString().split('T')[0],
      comment: review,
      images: previewImages
    };

    // Update product reviews
    product.reviews = [newReview, ...product.reviews];

    // Reset form
    setRating(0);
    setName('');
    setEmail('');
    setReview('');
    setImages([]);
    setPreviewImages([]);
    
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center modal-overlay"
      onClick={handleClickOutside}
    >
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-medium">Product Reviews</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-3 gap-12">
          {/* Left: Rating Statistics */}
          <div className="col-span-1">
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="text-center mb-6">
                <div className="text-5xl font-bold text-[#FF8A00]">4.3</div>
                <div className="flex justify-center my-3">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-6 h-6 text-[#FF8A00]" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <div className="text-sm text-gray-500">Based on 1,262 Reviews</div>
              </div>

              <div className="space-y-3">
                {['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'].map((label, index) => (
                  <div key={label} className="flex items-center gap-3">
                    <span className="text-sm w-16">{label}</span>
                    <div className="flex-1 h-2 bg-gray-200 rounded-full">
                      <div
                        className="h-full bg-[#FF8A00] rounded-full"
                        style={{ width: `${[63, 25, 7, 3, 2][index]}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500 w-12">
                      ({[800, 400, 50, 10, 2][index]})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Review Form */}
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-6">Write a Review</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`w-8 h-8 ${star <= rating ? 'text-[#FF8A00]' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

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
          </div>

          {/* Right: Recent Reviews */}
          <div className="col-span-2 border-l pl-8">
            <h3 className="text-lg font-medium mb-6">Recent Reviews</h3>
            <div className="space-y-6">
              {product.reviews?.map((review) => (
                <div key={review.id} className="border-b pb-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-8 h-8 rounded-full bg-[#4C9BF5] text-white flex items-center justify-center">
                      {getAnonymousName(review.user)}
                    </div>
                    <span className="font-medium">{review.user.split(' ')[0]}***</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-[#FF8A00]' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsModal; 