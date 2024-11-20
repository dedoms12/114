export const users = [
  {
    id: 1,
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    role: "buyer",
    joinDate: "2024-01-15",
    status: "active",
    lastActive: "2024-03-15",
    activityHistory: [
      { action: "login", date: "2024-03-15T08:30:00Z" },
      { action: "order_placed", date: "2024-03-14T15:20:00Z" },
      { action: "profile_updated", date: "2024-03-10T11:45:00Z" }
    ],
    permissions: ["place_orders", "view_products", "update_profile"],
    totalOrders: 12,
    totalSpent: "₱15,230",
    avatar: null,
    notes: "Regular customer"
  },
  {
    id: 2,
    name: "Maria Santos",
    email: "maria@pharmacy.com",
    role: "seller",
    joinDate: "2024-02-01",
    status: "active",
    lastActive: "2024-03-14",
    activityHistory: [
      { action: "login", date: "2024-03-14T09:15:00Z" },
      { action: "product_added", date: "2024-03-13T14:30:00Z" },
      { action: "order_fulfilled", date: "2024-03-12T16:20:00Z" }
    ],
    permissions: ["manage_products", "fulfill_orders", "view_analytics"],
    totalOrders: 45,
    totalRevenue: "₱67,890",
    avatar: null,
    notes: "Verified pharmacy seller"
  }
];

export const userStatistics = {
  totalUsers: 1234,
  activeUsers: 892,
  newThisMonth: 45,
  blacklistedUsers: 23,
  userGrowthRate: "+12.5%",
  roleDistribution: {
    buyer: 980,
    seller: 234,
    admin: 20
  }
}; 