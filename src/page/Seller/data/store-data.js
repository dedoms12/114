import { medicalProducts } from '../../Client/product-page/medical-supplies/medsup-products';
import { products as generalProducts } from '../../Client/product-page/general-health/gen-products';

// Unified branch list
export const branches = [
  'All Branches',
  'Ampayon, Agusan Del Norte',
  'Butuan City, Agusan Del Norte',
  'Cabadbaran, Agusan Del Norte',
  'Nasipit, Agusan Del Norte',
  'San Francisco, Agusan Del Sur'
];

// Shared status options
export const statuses = {
  customer: ['active', 'inactive', 'blocked', 'new'],
  order: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']
};

// Sort options for both lists
export const sortOptions = {
  customer: [
    { label: 'Most Recent', value: 'recent' },
    { label: 'Highest Spent', value: 'spent-high' },
    { label: 'Most Orders', value: 'orders-high' },
    { label: 'Alphabetical', value: 'alpha' }
  ],
  order: [
    { label: 'Most Recent', value: 'recent' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Highest Amount', value: 'amount-high' },
    { label: 'Lowest Amount', value: 'amount-low' },
    { label: 'Status', value: 'status' }
  ]
};

// Main data store
export const storeData = {
  customers: [
    {
      id: 'CUST-001',
      name: 'John Doe',
      email: 'john.doe@email.com',
      phone: '+63 912 345 6789',
      status: 'active',
      location: 'Butuan City',
      purchaseLocations: ['Butuan City, Agusan Del Norte'],
      joinDate: '2024-01-15',
      lastVisit: '2024-03-15',
      favoriteProducts: [
        medicalProducts[0],
        generalProducts[0]
      ]
    },
    {
      id: 'CUST-002',
      name: 'Maria Santos',
      email: 'maria.santos@email.com',
      phone: '+63 923 456 7890',
      status: 'active',
      location: 'Ampayon, Butuan City',
      purchaseLocations: ['Ampayon, Agusan Del Norte'],
      joinDate: '2024-02-01',
      lastVisit: '2024-03-14',
      favoriteProducts: [medicalProducts[1], generalProducts[2]]
    },
    {
      id: 'CUST-003',
      name: 'Robert Lee',
      email: 'robert.lee@email.com',
      phone: '+63 934 567 8901',
      status: 'inactive',
      location: 'Nasipit',
      purchaseLocations: ['Nasipit, Agusan Del Norte'],
      joinDate: '2023-12-10',
      lastVisit: '2024-02-28',
      favoriteProducts: [medicalProducts[2], generalProducts[1]]
    },
    {
      id: 'CUST-012',
      name: 'Elena Rodriguez',
      email: 'elena.r@email.com',
      phone: '+63 945 678 9012',
      status: 'new',
      location: 'San Francisco',
      purchaseLocations: ['San Francisco, Agusan Del Sur'],
      joinDate: '2024-03-01',
      lastVisit: '2024-03-13',
      favoriteProducts: [medicalProducts[3], generalProducts[3]]
    },
    {
      id: 'CUST-004',
      name: 'Isabella Garcia',
      email: 'isabella.g@email.com',
      phone: '+63 956 789 0123',
      status: 'active',
      location: 'Cabadbaran City',
      purchaseLocations: ['Cabadbaran, Agusan Del Norte'],
      joinDate: '2023-11-15',
      lastVisit: '2024-03-12',
      favoriteProducts: [medicalProducts[4], generalProducts[2]]
    },
    {
      id: 'CUST-005',
      name: 'Miguel Santos',
      email: 'miguel.s@email.com',
      phone: '+63 967 890 1234',
      status: 'blocked',
      location: 'Butuan City',
      purchaseLocations: ['Butuan City, Agusan Del Norte'],
      joinDate: '2023-09-20',
      lastVisit: '2024-02-15',
      favoriteProducts: [medicalProducts[1], generalProducts[4]]
    },
    {
      id: 'CUST-006',
      name: 'Sofia Reyes',
      email: 'sofia.r@email.com',
      phone: '+63 978 901 2345',
      status: 'active',
      location: 'Nasipit',
      purchaseLocations: ['Nasipit, Agusan Del Norte'],
      joinDate: '2024-01-05',
      lastVisit: '2024-03-14',
      favoriteProducts: [medicalProducts[3], generalProducts[1]]
    },
    {
      id: 'CUST-007',
      name: 'Lucas Tan',
      email: 'lucas.t@email.com',
      phone: '+63 989 012 3456',
      status: 'new',
      location: 'San Francisco',
      purchaseLocations: ['San Francisco, Agusan Del Sur'],
      joinDate: '2024-03-01',
      lastVisit: '2024-03-15',
      favoriteProducts: [medicalProducts[2], generalProducts[3]]
    },
    {
      id: 'CUST-008',
      name: 'Emma Cruz',
      email: 'emma.c@email.com',
      phone: '+63 990 123 4567',
      status: 'active',
      location: 'Ampayon, Butuan City',
      purchaseLocations: ['Ampayon, Agusan Del Norte'],
      joinDate: '2023-12-20',
      lastVisit: '2024-03-13',
      favoriteProducts: [medicalProducts[0], generalProducts[2]]
    },
    {
      id: 'CUST-009',
      name: 'Gabriel Lim',
      email: 'gabriel.l@email.com',
      phone: '+63 901 234 5678',
      status: 'inactive',
      location: 'Cabadbaran City',
      purchaseLocations: ['Cabadbaran, Agusan Del Norte'],
      joinDate: '2023-10-10',
      lastVisit: '2024-02-28',
      favoriteProducts: [medicalProducts[4], generalProducts[0]]
    },
    {
      id: 'CUST-010',
      name: 'Victoria Mendoza',
      email: 'victoria.m@email.com',
      phone: '+63 912 345 6789',
      status: 'active',
      location: 'Butuan City',
      purchaseLocations: ['Butuan City, Agusan Del Norte'],
      joinDate: '2023-08-15',
      lastVisit: '2024-03-14',
      favoriteProducts: [medicalProducts[1], generalProducts[3]]
    }
  ],
  
  orders: [
    {
      id: 'ORD-001',
      customerId: 'CUST-001',
      products: [
        { 
          name: 'Face Mask', 
          quantity: 50, 
          price: 250, 
          category: 'Medical Supplies' 
        },
        { 
          name: 'Alcohol', 
          quantity: 20, 
          price: 100, 
          category: 'Medical Supplies' 
        }
      ],
      totalAmount: 5500,
      status: 'Pending',
      orderDate: '2024-03-15T10:30:00',
      branch: 'Butuan City, Agusan Del Norte',
      paymentMethod: 'Credit Card',
      shippingAddress: 'Ampayon, Butuan City',
      contactNumber: '+63 912 345 6789'
    },
    {
      id: 'ORD-002',
      customerId: 'CUST-002',
      products: [
        { name: 'Vitamin C', quantity: 5, price: 350, category: 'Supplements' },
        { name: 'Paracetamol', quantity: 3, price: 150, category: 'Medicine' }
      ],
      totalAmount: 2200,
      status: 'Delivered',
      orderDate: '2024-03-14T15:45:00',
      branch: 'Ampayon, Agusan Del Norte',
      paymentMethod: 'GCash',
      shippingAddress: 'Ampayon, Butuan City',
      contactNumber: '+63 923 456 7890'
    },
    {
      id: 'ORD-015',
      customerId: 'CUST-012',
      products: [
        { name: 'Blood Pressure Monitor', quantity: 1, price: 2500, category: 'Medical Devices' },
        { name: 'Multivitamins', quantity: 2, price: 800, category: 'Supplements' }
      ],
      totalAmount: 4100,
      status: 'Processing',
      orderDate: '2024-03-13T09:15:00',
      branch: 'San Francisco, Agusan Del Sur',
      paymentMethod: 'Cash',
      shippingAddress: 'San Francisco, Agusan Del Sur',
      contactNumber: '+63 945 678 9012'
    },
    {
      id: 'ORD-003',
      customerId: 'CUST-004',
      products: [
        { name: 'Digital Thermometer', quantity: 2, price: 850, category: 'Medical Devices' },
        { name: 'First Aid Kit', quantity: 1, price: 1200, category: 'Medical Supplies' }
      ],
      totalAmount: 2900,
      status: 'Shipped',
      orderDate: '2024-03-12T14:20:00',
      branch: 'Cabadbaran, Agusan Del Norte',
      paymentMethod: 'Bank Transfer',
      shippingAddress: 'Cabadbaran City',
      contactNumber: '+63 956 789 0123'
    },
    {
      id: 'ORD-004',
      customerId: 'CUST-005',
      products: [
        { name: 'Vitamin B Complex', quantity: 3, price: 450, category: 'Supplements' },
        { name: 'Bandages', quantity: 5, price: 75, category: 'Medical Supplies' }
      ],
      totalAmount: 1725,
      status: 'Cancelled',
      orderDate: '2024-02-15T11:30:00',
      branch: 'Butuan City, Agusan Del Norte',
      paymentMethod: 'GCash',
      shippingAddress: 'Butuan City',
      contactNumber: '+63 967 890 1234'
    },
    {
      id: 'ORD-005',
      customerId: 'CUST-006',
      products: [
        { name: 'Blood Glucose Monitor', quantity: 1, price: 3500, category: 'Medical Devices' },
        { name: 'Test Strips', quantity: 50, price: 45, category: 'Medical Supplies' }
      ],
      totalAmount: 5750,
      status: 'Delivered',
      orderDate: '2024-03-14T09:45:00',
      branch: 'Nasipit, Agusan Del Norte',
      paymentMethod: 'Credit Card',
      shippingAddress: 'Nasipit',
      contactNumber: '+63 978 901 2345'
    },
    {
      id: 'ORD-006',
      customerId: 'CUST-007',
      products: [
        { name: 'Multivitamins', quantity: 2, price: 800, category: 'Supplements' },
        { name: 'Face Masks', quantity: 100, price: 5, category: 'Medical Supplies' }
      ],
      totalAmount: 2100,
      status: 'Processing',
      orderDate: '2024-03-15T13:15:00',
      branch: 'San Francisco, Agusan Del Sur',
      paymentMethod: 'Cash',
      shippingAddress: 'San Francisco',
      contactNumber: '+63 989 012 3456'
    },
    {
      id: 'ORD-007',
      customerId: 'CUST-008',
      products: [
        { name: 'Nebulizer', quantity: 1, price: 2800, category: 'Medical Devices' },
        { name: 'Saline Solution', quantity: 5, price: 120, category: 'Medical Supplies' }
      ],
      totalAmount: 3400,
      status: 'Pending',
      orderDate: '2024-03-13T16:30:00',
      branch: 'Ampayon, Agusan Del Norte',
      paymentMethod: 'GCash',
      shippingAddress: 'Ampayon, Butuan City',
      contactNumber: '+63 990 123 4567'
    }
  ],

  // Helper functions for data manipulation
  getCustomerOrders(customerId) {
    return this.orders.filter(order => order.customerId === customerId);
  },

  getOrderCustomer(orderId) {
    const order = this.orders.find(o => o.id === orderId);
    return order ? this.customers.find(c => c.id === order.customerId) : null;
  },

  // Computed properties
  getCustomerStats(customerId) {
    const customerOrders = this.getCustomerOrders(customerId);
    return {
      totalOrders: customerOrders.length,
      totalSpent: customerOrders.reduce((sum, order) => sum + order.totalAmount, 0),
      lastOrder: customerOrders.length > 0 ? 
        customerOrders.sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))[0].orderDate : 
        null
    };
  }
};

// Export helper functions for components
export const getCustomerWithStats = (customerId) => {
  const customer = storeData.customers.find(c => c.id === customerId);
  if (!customer) return null;

  const stats = storeData.getCustomerStats(customerId);
  return {
    ...customer,
    ...stats
  };
};

export const getOrderWithCustomer = (orderId) => {
  const order = storeData.orders.find(o => o.id === orderId);
  if (!order) return null;

  const customer = storeData.getOrderCustomer(orderId);
  return {
    ...order,
    customer
  };
}; 