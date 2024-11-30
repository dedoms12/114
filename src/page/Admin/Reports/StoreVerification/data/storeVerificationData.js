export const storeVerifications = [
  {
    id: 1,
    name: "EcoStyle Thrift",
    email: "support@ecostylethrift.com",
    verificationStatus: "pending",
    verificationProgress: 65,
    blockDetails: null,
    documents: [
      {
        id: 1,
        name: "Trade License",
        status: "verified",
        url: "/documents/trade-license.pdf",
        dateSubmitted: "2024-03-10T08:30:00Z",
        comments: []
      },
      {
        id: 2,
        name: "Environmental Compliance Certificate",
        status: "pending",
        url: "/documents/environmental-compliance.pdf",
        dateSubmitted: "2024-03-10T08:30:00Z",
        comments: []
      }
    ],
    submissionDate: "2024-03-10T08:30:00Z",
    lastUpdated: "2024-03-15T14:20:00Z"
  },
  {
    id: 2,
    name: "Urban Threads Collective",
    email: "info@urbanthreads.com",
    verificationStatus: "blocked",
    verificationProgress: 30,
    blockDetails: {
      reason: "compliance",
      customReason: "Multiple violations of pharmacy regulations",
      date: "2024-03-18T10:15:00Z"
    },
    documents: [
      {
        id: 1,
        name: "Trade License",
        status: "rejected",
        url: "/documents/trade-license.pdf",
        dateSubmitted: "2024-03-05T09:00:00Z",
        comments: [
          {
            text: "Document expired. Please submit current permit.",
            date: "2024-03-06T14:20:00Z"
          }
        ]
      }
    ],
    submissionDate: "2024-03-05T09:00:00Z",
    lastUpdated: "2024-03-18T10:15:00Z"
  },
  {
    id: 3,
    name: "Vintage Vogue Hub",
    email: "contact@vintagevoguehub.com",
    verificationStatus: "verified",
    verificationProgress: 100,
    blockDetails: null,
    documents: [
      {
        id: 1,
        name: "Company Profile",
        status: "verified",
        url: "/documents/company-profile.pdf",
        dateSubmitted: "2024-02-28T08:00:00Z",
        comments: [
          {
            text: "All documents verified and complete",
            date: "2024-03-01T11:30:00Z"
          }
        ]
      },
      {
        id: 2,
        name: "Seller's Permit",
        status: "verified",
        url: "/documents/sellers-permit.pdf",
        dateSubmitted: "2024-02-28T08:00:00Z",
        comments: []
      }
    ],
    submissionDate: "2024-02-28T08:00:00Z",
    lastUpdated: "2024-03-01T11:30:00Z"
  },
]; 