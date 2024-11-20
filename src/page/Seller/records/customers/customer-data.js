import { medicalProducts } from '../../../Client/product-page/medical-supplies/medsup-products';
import { products as generalProducts } from '../../../Client/product-page/general-health/gen-products';

export const branches = [
  'All Locations',
  'Ampayon Branch, Butuan City',
  'Downtown Branch, Butuan City',
  'Agusan del Norte Branch'
];

export const customerStatuses = ['active', 'inactive', 'blocked', 'new'];

export const sortOptions = [
  { label: 'Most Recent', value: 'recent' },
  { label: 'Highest Spent', value: 'spent-high' },
  { label: 'Most Orders', value: 'orders-high' },
  { label: 'Alphabetical', value: 'alpha' }
];

export const customerData = [
  {
    id: 'CUST-001',
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+63 912 345 6789',
    totalOrders: 5,
    totalSpent: 25000,
    status: 'active',
    location: 'Butuan City',
    purchaseLocations: ['Butuan City, Agusan Del Norte'],
    joinDate: '2024-01-15',
    lastOrder: '2024-03-15',
    lastVisit: '2024-03-15'
  },
  {
    id: 'CUST-002',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+63 923 456 7890',
    totalOrders: 3,
    totalSpent: 25000,
    status: 'active',
    location: 'Villa Kananga, Butuan City',
    purchaseLocations: ['Butuan City, Agusan Del Norte'],
    joinDate: '2024-02-15',
    lastOrder: '2024-03-14',
    lastVisit: '2024-03-14'
  },
  {
    id: 'CUST-003',
    name: 'Robert Lee',
    email: 'robert.lee@email.com',
    phone: '+63 945 678 9012',
    totalOrders: 2,
    totalSpent: 18500,
    status: 'active',
    location: 'Nasipit, Agusan Del Norte',
    purchaseLocations: ['Nasipit, Agusan Del Norte'],
    joinDate: '2024-01-20',
    lastOrder: '2024-03-12',
    lastVisit: '2024-03-12'
  },
  {
    id: 'CUST-004',
    name: 'Robert Lee',
    email: 'robert.lee@email.com',
    phone: '+63 945 678 9012',
    totalOrders: 5,
    totalSpent: 12500,
    status: 'active',
    location: 'DOP, Butuan City',
    purchaseLocations: ['Ampayon, Agusan Del Norte'],
    joinDate: '2023-12-15',
    lastOrder: '2024-03-12',
    lastVisit: '2024-03-12'
  },
  {
    id: 'CUST-005',
    name: 'Elena Santos',
    email: 'elena.santos@email.com',
    phone: '+63 956 789 0123',
    totalOrders: 8,
    totalSpent: 26400,
    status: 'active',
    location: 'Libertad, Butuan City',
    purchaseLocations: ['Butuan City, Agusan Del Norte'],
    joinDate: '2023-09-20',
    lastOrder: '2024-03-11',
    lastVisit: '2024-03-11'
  },
  {
    id: 'CUST-006',
    name: 'Michael Tan',
    email: 'michael.tan@email.com',
    phone: '+63 967 890 1234',
    totalOrders: 3,
    totalSpent: 24000,
    status: 'inactive',
    location: 'Nasipit, Agusan Del Norte',
    purchaseLocations: ['Nasipit, Agusan Del Norte'],
    joinDate: '2024-01-05',
    lastOrder: '2024-03-10',
    lastVisit: '2024-03-10'
  },
  {
    id: 'CUST-007',
    name: 'Patricia Reyes',
    email: 'patricia.r@email.com',
    phone: '+63 978 901 2345',
    totalOrders: 15,
    totalSpent: 85000,
    status: 'active',
    location: 'San Francisco, Agusan Del Sur',
    purchaseLocations: ['San Francisco, Agusan Del Sur'],
    joinDate: '2023-08-15',
    lastOrder: '2024-03-09',
    lastVisit: '2024-03-09'
  },
  {
    id: 'CUST-008',
    name: 'David Cruz',
    email: 'david.cruz@email.com',
    phone: '+63 989 012 3456',
    totalOrders: 4,
    totalSpent: 14000,
    status: 'new',
    location: 'Ampayon, Butuan City',
    purchaseLocations: ['Ampayon, Agusan Del Norte'],
    joinDate: '2024-02-20',
    lastOrder: '2024-03-08',
    lastVisit: '2024-03-08'
  },
  {
    id: 'CUST-009',
    name: 'Ana Lim',
    email: 'ana.lim@email.com',
    phone: '+63 990 123 4567',
    totalOrders: 6,
    totalSpent: 32000,
    status: 'active',
    location: 'JP Rizal, Butuan City',
    purchaseLocations: ['Butuan City, Agusan Del Norte'],
    joinDate: '2023-11-10',
    lastOrder: '2024-03-07',
    lastVisit: '2024-03-07'
  },
  {
    id: 'CUST-010',
    name: 'Marco Gomez',
    email: 'marco.g@email.com',
    phone: '+63 912 345 6789',
    totalOrders: 2,
    totalSpent: 6000,
    status: 'new',
    location: 'Cabadbaran City',
    purchaseLocations: ['Cabadbaran, Agusan Del Norte'],
    joinDate: '2024-02-25',
    lastOrder: '2024-03-06',
    lastVisit: '2024-03-06'
  }
]; 