import React from 'react';

const ReviewCard = ({ review }) => {
  // Helper function to get anonymous name
  const getAnonymousName = (fullName) => {
    const names = fullName.trim().split(' ');
    return `${names[0].charAt(0)}${names[names.length - 1].charAt(0)}`;
  };

  // Helper function to get individual rating
  const getRating = (review, type) => {
    if (!review.ratings) {
      return review.rating || 0; // fallback to old rating system
    }
    return review.ratings[type] || 0;
  };

  return (
    <div className="border-b pb-6">
      {/* User Info and Date */}
      <div className="flex items-center gap-4 mb-3">
        <div className="w-8 h-8 rounded-full bg-[#4C9BF5] text-white flex items-center justify-center">
          {getAnonymousName(review.user)}
        </div>
        <span className="font-medium">{review.user.split(' ')[0]}***</span>
        <span className="text-sm text-gray-500">{review.date}</span>
      </div>

      {/* Rating Criteria */}
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

      {/* Review Content */}
      <p className="text-gray-700 mb-4">{review.comment}</p>

      {/* Review Images */}
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
};

export default ReviewCard; 