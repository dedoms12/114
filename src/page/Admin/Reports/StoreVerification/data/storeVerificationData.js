export const storeVerifications = [
  {
    id: 1,
    name: "PharmaCare Plus",
    email: "contact@pharmacareplus.com",
    verificationStatus: "pending",
    verificationProgress: 65,
    blockDetails: null,
    documents: [
      {
        id: 1,
        name: "Business Permit",
        status: "verified",
        url: "/documents/business-permit.pdf",
        dateSubmitted: "2024-03-10T08:30:00Z",
        comments: []
      },
      {
        id: 2,
        name: "FDA License",
        status: "pending",
        url: "/documents/fda-license.pdf",
        dateSubmitted: "2024-03-10T08:30:00Z",
        comments: []
      },
      {
        id: 3,
        name: "Pharmacist License",
        status: "verified",
        url: "/documents/pharmacist-license.pdf",
        dateSubmitted: "2024-03-10T08:30:00Z",
        comments: []
      }
    ],
    submissionDate: "2024-03-10T08:30:00Z",
    lastUpdated: "2024-03-15T14:20:00Z"
  },
  {
    id: 2,
    name: "MediCare Pharmacy",
    email: "admin@medicare-ph.com",
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
        name: "Business Permit",
        status: "rejected",
        url: "/documents/medicare-permit.pdf",
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
    name: "HealthFirst Drugstore",
    email: "verify@healthfirst.com",
    verificationStatus: "verified",
    verificationProgress: 100,
    blockDetails: null,
    documents: [
      {
        id: 1,
        name: "Business Permit",
        status: "verified",
        url: "/documents/healthfirst-permit.pdf",
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
        name: "FDA License",
        status: "verified",
        url: "/documents/healthfirst-fda.pdf",
        dateSubmitted: "2024-02-28T08:00:00Z",
        comments: []
      }
    ],
    submissionDate: "2024-02-28T08:00:00Z",
    lastUpdated: "2024-03-01T11:30:00Z"
  },
  {
    id: 4,
    name: "QuickMeds Pharmacy",
    email: "support@quickmeds.com",
    verificationStatus: "rejected",
    verificationProgress: 0,
    blockDetails: null,
    documents: [
      {
        id: 1,
        name: "Business Permit",
        status: "rejected",
        url: "/documents/quickmeds-permit.pdf",
        dateSubmitted: "2024-03-20T15:45:00Z",
        comments: [
          {
            text: "Invalid document format. Please submit proper documentation.",
            date: "2024-03-21T09:15:00Z"
          }
        ]
      }
    ],
    submissionDate: "2024-03-20T15:45:00Z",
    lastUpdated: "2024-03-21T09:15:00Z"
  }
]; 