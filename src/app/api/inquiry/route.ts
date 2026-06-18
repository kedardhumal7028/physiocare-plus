import { NextRequest, NextResponse } from "next/server";

// Simple in-memory storage for mock inquiries to simulate a database during the session
let mockInquiries = [
  {
    _id: "inq_1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    subject: "Lower Back Pain Treatment",
    message: "I have been experiencing persistent lower back pain for the past 2 weeks after lifting weights. I would like to schedule an assessment session.",
    status: "new" as const,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    _id: "inq_2",
    name: "Priya Patel",
    email: "priya.patel@example.com",
    phone: "+91 87654 32109",
    subject: "Post-ACL Surgery Rehabilitation",
    message: "I had ACL reconstruction surgery 3 weeks ago. My orthopedist recommended starting physiotherapy for knee range of motion and strengthening.",
    status: "contacted" as const,
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 3600000 * 23).toISOString(),
  },
  {
    _id: "inq_3",
    name: "Marcus Aurelius",
    email: "marcus@rome.org",
    phone: "+1 555-0199",
    subject: "Neck Stiffness & Ergonomics",
    message: "Working from home has caused severe neck stiffness and frequent tension headaches. Looking for posture correction guidance and treatment.",
    status: "resolved" as const,
    createdAt: new Date(Date.now() - 3600000 * 72).toISOString(), // 3 days ago
    updatedAt: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
];

export async function GET() {
  try {
    return NextResponse.json(mockInquiries);
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json(
      { error: "Failed to fetch inquiries" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newInquiry = {
      _id: `inq_${Math.random().toString(36).substr(2, 9)}`,
      name,
      email,
      phone: phone || "",
      subject: subject || "General Inquiry",
      message,
      status: "new" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockInquiries = [newInquiry, ...mockInquiries];

    return NextResponse.json({ success: true, inquiry: newInquiry });
  } catch (error) {
    console.error("Inquiry API POST error:", error);
    return NextResponse.json(
      { error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: "Missing required fields: id, status" },
        { status: 400 }
      );
    }

    let updatedInquiry: any = null;
    mockInquiries = mockInquiries.map((inq) => {
      if (inq._id === id) {
        updatedInquiry = {
          ...inq,
          status: status as "new" | "contacted" | "resolved",
          updatedAt: new Date().toISOString(),
        };
        return updatedInquiry;
      }
      return inq;
    });

    if (!updatedInquiry) {
      return NextResponse.json(
        { error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, inquiry: updatedInquiry });
  } catch (error) {
    console.error("Inquiry API PATCH error:", error);
    return NextResponse.json(
      { error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
