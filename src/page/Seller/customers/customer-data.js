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
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+63 912 345 6789',
    totalOrders: 15,
    totalSpent: 25000,
    lastOrder: '2024-03-20',
    status: 'active',
    location: 'Butuan City',
    purchaseLocations: ['Ampayon Branch, Butuan City', 'Downtown Branch, Butuan City'],
    joinDate: '2023-12-01',
    lastVisit: '2024-03-21',
    favoriteProducts: [
      medicalProducts[0],
      generalProducts[0],
      medicalProducts[2]
    ],
    orderHistory: [
      { 
        id: '123', 
        date: '2024-03-20', 
        amount: 5000, 
        status: 'delivered',
        branch: 'Ampayon Branch, Butuan City',
        items: [
          { product: medicalProducts[0], quantity: 2 },
          { product: generalProducts[1], quantity: 1 }
        ]
      }
    ]
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    phone: '+63 923 456 7890',
    totalOrders: 8,
    totalSpent: 15000,
    lastOrder: '2024-03-18',
    status: 'active',
    location: 'Butuan City',
    purchaseLocations: ['Downtown Branch, Butuan City'],
    joinDate: '2024-01-15',
    lastVisit: '2024-03-19',
    favoriteProducts: [
      generalProducts[1],
      medicalProducts[1]
    ],
    orderHistory: [
      {
        id: '124',
        date: '2024-03-18',
        amount: 3000,
        status: 'delivered',
        branch: 'Downtown Branch, Butuan City',
        items: [
          { product: generalProducts[1], quantity: 1 }
        ]
      }
    ]
  },
  {
    id: 3,
    name: 'Pedro Reyes',
    email: 'pedro@example.com',
    phone: '+63 934 567 8901',
    totalOrders: 0,
    totalSpent: 0,
    lastOrder: null,
    status: 'inactive',
    location: 'Butuan City',
    purchaseLocations: [],
    joinDate: '2023-11-10',
    lastVisit: '2024-01-15',
    favoriteProducts: [],
    orderHistory: []
  },
  {
    id: 4,
    name: 'Ana Cruz',
    email: 'ana@example.com',
    phone: '+63 945 678 9012',
    totalOrders: 22,
    totalSpent: 42000,
    lastOrder: '2024-03-21',
    status: 'active',
    location: 'Butuan City',
    purchaseLocations: ['Ampayon Branch, Butuan City', 'Agusan del Norte Branch'],
    joinDate: '2023-08-20',
    lastVisit: '2024-03-21',
    favoriteProducts: [
      medicalProducts[2],
      medicalProducts[3],
      generalProducts[2]
    ],
    orderHistory: [
      {
        id: '125',
        date: '2024-03-21',
        amount: 7500,
        status: 'processing',
        branch: 'Ampayon Branch, Butuan City',
        items: [
          { product: medicalProducts[2], quantity: 3 },
          { product: generalProducts[2], quantity: 2 }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Rico Torres',
    email: 'rico@example.com',
    phone: '+63 956 789 0123',
    totalOrders: 3,
    totalSpent: 5500,
    lastOrder: '2024-03-15',
    status: 'new',
    location: 'Butuan City',
    purchaseLocations: ['Downtown Branch, Butuan City'],
    joinDate: '2024-02-28',
    lastVisit: '2024-03-15',
    favoriteProducts: [
      generalProducts[0],
      medicalProducts[1]
    ],
    orderHistory: [
      {
        id: '126',
        date: '2024-03-15',
        amount: 2500,
        status: 'delivered',
        branch: 'Downtown Branch, Butuan City',
        items: [
          { product: generalProducts[0], quantity: 1 }
        ]
      }
    ]
  },
  {
    id: 6,
    name: 'Elena Dagohoy',
    email: 'elena.d@example.com',
    phone: '+63 967 890 1234',
    totalOrders: 18,
    totalSpent: 32500,
    lastOrder: '2024-03-19',
    status: 'active',
    location: 'Butuan City',
    purchaseLocations: ['Ampayon Branch, Butuan City'],
    joinDate: '2023-09-15',
    lastVisit: '2024-03-21',
    favoriteProducts: [
      medicalProducts[1],
      medicalProducts[4],
      generalProducts[3]
    ],
    orderHistory: [
      {
        id: '127',
        date: '2024-03-19',
        amount: 4200,
        status: 'delivered',
        branch: 'Ampayon Branch, Butuan City',
        items: [
          { product: medicalProducts[1], quantity: 2 },
          { product: generalProducts[3], quantity: 1 }
        ]
      }
    ]
  },
  {
    id: 7,
    name: 'Roberto Mendoza',
    email: 'rob.mendoza@example.com',
    phone: '+63 978 901 2345',
    totalOrders: 32,
    totalSpent: 58000,
    lastOrder: '2024-03-21',
    status: 'active',
    location: 'Butuan City',
    purchaseLocations: ['Downtown Branch, Butuan City', 'Agusan del Norte Branch'],
    joinDate: '2023-06-10',
    lastVisit: '2024-03-21',
    favoriteProducts: [
      medicalProducts[2],
      medicalProducts[5],
      generalProducts[4]
    ],
    orderHistory: [
      {
        id: '128',
        date: '2024-03-21',
        amount: 8500,
        status: 'processing',
        branch: 'Downtown Branch, Butuan City',
        items: [
          { product: medicalProducts[5], quantity: 3 },
          { product: generalProducts[4], quantity: 2 }
        ]
      }
    ]
  },
  {
    id: 8,
    name: 'Maricel Bautista',
    email: 'maricel.b@example.com',
    phone: '+63 989 012 3456',
    totalOrders: 25,
    totalSpent: 45000,
    lastOrder: '2024-03-20',
    status: 'active',
    location: 'Butuan City',
    purchaseLocations: ['Ampayon Branch, Butuan City', 'Downtown Branch, Butuan City'],
    joinDate: '2023-07-22',
    lastVisit: '2024-03-20',
    favoriteProducts: [
      medicalProducts[3],
      generalProducts[2],
      generalProducts[5]
    ],
    orderHistory: [
      {
        id: '129',
        date: '2024-03-20',
        amount: 6300,
        status: 'delivered',
        branch: 'Ampayon Branch, Butuan City',
        items: [
          { product: medicalProducts[3], quantity: 2 },
          { product: generalProducts[5], quantity: 3 }
        ]
      }
    ]
  },
  {
    id: 9,
    name: 'Lourdes Pascual',
    email: 'lourdes.p@example.com',
    phone: '+63 990 123 4567',
    totalOrders: 12,
    totalSpent: 28000,
    lastOrder: '2024-03-18',
    status: 'blocked',
    location: 'Butuan City',
    purchaseLocations: ['Downtown Branch, Butuan City'],
    joinDate: '2023-10-05',
    lastVisit: '2024-03-18',
    favoriteProducts: [
      medicalProducts[1],
      generalProducts[3]
    ],
    orderHistory: [
      {
        id: '130',
        date: '2024-03-18',
        amount: 3800,
        status: 'cancelled',
        branch: 'Downtown Branch, Butuan City',
        items: [
          { product: medicalProducts[1], quantity: 2 }
        ]
      }
    ]
  },
  {
    id: 10,
    name: 'Federico Luna',
    email: 'fred.luna@example.com',
    phone: '+63 912 345 6789',
    totalOrders: 8,
    totalSpent: 15500,
    lastOrder: '2024-03-17',
    status: 'new',
    location: 'Butuan City',
    purchaseLocations: ['Agusan del Norte Branch'],
    joinDate: '2024-02-01',
    lastVisit: '2024-03-17',
    favoriteProducts: [
      generalProducts[1],
      medicalProducts[4]
    ],
    orderHistory: [
      {
        id: '131',
        date: '2024-03-17',
        amount: 2800,
        status: 'delivered',
        branch: 'Agusan del Norte Branch',
        items: [
          { product: generalProducts[1], quantity: 1 },
          { product: medicalProducts[4], quantity: 1 }
        ]
      }
    ]
  }
]; 