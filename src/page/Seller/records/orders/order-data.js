export const branches = [
  'All Branches',
  'Ampayon, Agusan Del Norte',
  'Butuan City, Agusan Del Norte',
  'Cabadbaran, Agusan Del Norte',
  'Nasipit, Agusan Del Norte',
  'San Francisco, Agusan Del Sur'
];

export const orderStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

export const sortOptions = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Oldest', value: 'oldest' },
  { label: 'Highest Amount', value: 'amount-high' },
  { label: 'Lowest Amount', value: 'amount-low' },
  { label: 'Status', value: 'status' }
];

export const orderData = [
  {
    id: 'ORD-001',
    customerId: 'CUST-001',
    customerName: 'John Doe',
    products: [
      { name: 'adidas campus 00s', quantity: 1, price: 250, category: 'shoes' }
    ],
    totalAmount: 5500,
    status: 'Pending',
    orderDate: '2024-03-15T10:30:00',
    branch: 'Ampayon, Agusan Del Norte',
    paymentMethod: 'Credit Card',
    shippingAddress: 'Ampayon, Butuan City',
    contactNumber: '+63 912 345 6789'
  },
  {
    id: 'ORD-002',
    customerId: 'CUST-002',
    customerName: 'Jane Smith',
    products: [
      { name: 'Wedtrend Womens Vintage Tea Dress, Short Sleeve Cocktail Party Dress Work Church Casual Dress', quantity: 1, price: 150, category: 'womenswear' }
    ],
    totalAmount: 15000,
    status: 'Processing',
    orderDate: '2024-03-14T15:45:00',
    branch: 'Butuan City, Agusan Del Norte',
    paymentMethod: 'GCash',
    shippingAddress: 'Villa Kananga, Butuan City',
    contactNumber: '+63 923 456 7890'
  },
  {
    id: 'ORD-003',
    customerId: 'CUST-003',
    customerName: 'Maria Garcia',
    products: [
      { name: 'Men Atwood Deluxe Sneaker - Mens - Turtledove Beige', quantity: 1, price: 8, category: 'shoes' },
      { name: 'Letterman Kid Jacket FL11K - Black/White / 12K', quantity: 1, price: 15, category: 'Supplements' }
    ],
    totalAmount: 2350,
    status: 'Delivered',
    orderDate: '2024-03-13T09:15:00',
    branch: 'Cabadbaran, Agusan Del Norte',
    paymentMethod: 'Cash',
    shippingAddress: 'Cabadbaran City',
    contactNumber: '+63 934 567 8901'
  },
  {
    id: 'ORD-004',
    customerId: 'CUST-004',
    customerName: 'Robert Lee',
    products: [
      { name: 'Cross-border Sneakers Couples Running Shoes Trendy Stylish And Lightweight Breathable Casual Cortez - 908 Gray', quantity: 1, price: 2500, category: 'shoes' }
    ],
    totalAmount: 2500,
    status: 'Shipped',
    orderDate: '2024-03-12T14:20:00',
    branch: 'Ampayon, Agusan Del Norte',
    paymentMethod: 'Bank Transfer',
    shippingAddress: 'DOP, Butuan City',
    contactNumber: '+63 945 678 9012'
  },
  {
    id: 'ORD-005',
    customerId: 'CUST-005',
    customerName: 'Elena Santos',
    products: [
      { name: 'Adidas Originals Campus 00s Core Black Ftwwht Owhite Hq8708 Sneaker Men US11', quantity: 1, price: 15, category: 'shoes' },
      { name: 'Adidas Originals Campus 00s Core Black Ftwwht Owhite Hq8708 Sneaker Men US11', quantity: 1, price: 1800, category: 'shoes' }
    ],
    totalAmount: 3300,
    status: 'Delivered',
    orderDate: '2024-03-11T11:30:00',
    branch: 'Butuan City, Agusan Del Norte',
    paymentMethod: 'Credit Card',
    shippingAddress: 'Libertad, Butuan City',
    contactNumber: '+63 956 789 0123'
  },
  {
    id: 'ORD-006',
    customerId: 'CUST-006',
    customerName: 'Michael Tan',
    products: [
      { name: 'Adidas Originals Campus 00s Core Black Ftwwht Owhite Hq8708 Sneaker Men US11', quantity: 1, price: 800, category: 'shoes' }
    ],
    totalAmount: 24000,
    status: 'Cancelled',
    orderDate: '2024-03-10T16:05:00',
    branch: 'Nasipit, Agusan Del Norte',
    paymentMethod: 'GCash',
    shippingAddress: 'Nasipit, Agusan Del Norte',
    contactNumber: '+63 967 890 1234'
  },
  {
    id: 'ORD-007',
    customerId: 'CUST-007',
    customerName: 'Patricia Reyes',
    products: [
      { name: 'Adidas Originals Campus 00s Core Black Ftwwht Owhite Hq8708 Sneaker Men US11', quantity: 5, price: 1200, category: 'shoes' },
      { name: 'Adidas Originals Campus 00s Core Black Ftwwht Owhite Hq8708 Sneaker Men US11', quantity: 2, price: 2500, category: 'shoes' }
    ],
    totalAmount: 11000,
    status: 'Processing',
    orderDate: '2024-03-09T13:45:00',
    branch: 'San Francisco, Agusan Del Sur',
    paymentMethod: 'Bank Transfer',
    shippingAddress: 'San Francisco, Agusan Del Sur',
    contactNumber: '+63 978 901 2345'
  }
]; 