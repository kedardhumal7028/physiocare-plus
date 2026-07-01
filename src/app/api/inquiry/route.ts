import { NextRequest, NextResponse } from "next/server";

import { randomUUID } from "crypto";
import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/mongodb";
import { InquiryModel } from "@/lib/models/Inquiry";
const VALID_STATUSES = new Set(["new", "contacted", "resolved"]);

type InquiryStatus = "new" | "contacted" | "resolved";

type InquiryRecord = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdAt: string;
  updatedAt: string;
};

declare global {
  var inquiryFallbackStore: InquiryRecord[] | undefined;
}

function asText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function getFallbackStore() {
  return globalThis.inquiryFallbackStore ?? (globalThis.inquiryFallbackStore = []);
}

function isMongoConfigured() {
  return Boolean(process.env.MONGODB_URI);
}

export async function GET() {
  try {
    if (!isMongoConfigured()) {
      return NextResponse.json({
        success: true,
        data: getFallbackStore(),
        storage: "memory",
      });
    }

    await connectToDatabase();

    const inquiries = await InquiryModel.find({})
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: inquiries, storage: "mongodb" });
  } catch (error) {
    console.error("Failed to fetch inquiries:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries", data: [] },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = asText(body.name);
    const email = asText(body.email).toLowerCase();
    const phone = asText(body.phone);
    const subject = asText(body.subject) || "General Inquiry";
    const message = asText(body.message);

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }


    const inquiryInput = {
      name,
      email,
      phone,
      subject,
      message,
      status: "new" as const,
    };

    if (!isMongoConfigured()) {
      const now = new Date().toISOString();
      const fallbackInquiry: InquiryRecord = {
        _id: randomUUID(),
        ...inquiryInput,
        createdAt: now,
        updatedAt: now,
      };

      getFallbackStore().unshift(fallbackInquiry);

      return NextResponse.json({
        success: true,
        inquiry: fallbackInquiry,
        storage: "memory",
      });
    }

    await connectToDatabase();

    const newInquiry = await InquiryModel.create(inquiryInput);

    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const handlerEmail = process.env.HANDLER_EMAIL;

    if (smtpUser && smtpPass && handlerEmail) {
      try {
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone || "-");
        const safeSubject = escapeHtml(subject);
        const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const htmlBody = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8" />
            <style>
              body { font-family: Arial, sans-serif; background: #f4f6fb; margin: 0; padding: 0; }
              .wrapper { max-width: 580px; margin: 32px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(59,130,246,0.08); }
              .header { background: #2563eb; padding: 32px 40px; }
              .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
              .header p { color: rgba(255,255,255,0.75); margin: 6px 0 0; font-size: 13px; }
              .body { padding: 32px 40px; }
              .badge { display: inline-block; background: #eff6ff; color: #2563eb; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 20px; }
              .field { margin-bottom: 18px; }
              .field label { display: block; font-size: 11px; font-weight: 700; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px; }
              .field p { margin: 0; font-size: 14px; color: #111827; font-weight: 500; }
              .message-box { background: #f8faff; border: 1px solid #dbeafe; border-radius: 10px; padding: 16px; margin-top: 4px; }
              .message-box p { color: #374151; font-size: 14px; line-height: 1.6; }
              .divider { border: none; border-top: 1px solid #f3f4f6; margin: 24px 0; }
              .footer { padding: 20px 40px; background: #f9fafb; text-align: center; }
              .footer p { margin: 0; font-size: 12px; color: #9ca3af; }
            </style>
          </head>
          <body>
            <div class="wrapper">
              <div class="header">
                <h1>New Patient Inquiry</h1>
                <p>PhysioCare Plus - Inquiry Notification</p>
              </div>
              <div class="body">
                <span class="badge">New Inquiry Received</span>
                <div class="field">
                  <label>Patient Name</label>
                  <p>${safeName}</p>
                </div>
                <div class="field">
                  <label>Email Address</label>
                  <p>${safeEmail}</p>
                </div>
                <div class="field">
                  <label>Phone Number</label>
                  <p>${safePhone}</p>
                </div>
                <div class="field">
                  <label>Subject</label>
                  <p>${safeSubject}</p>
                </div>
                <hr class="divider" />
                <div class="field">
                  <label>Message</label>
                  <div class="message-box"><p>${safeMessage}</p></div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the PhysioCare Plus inquiry form. Please respond to: <strong>${safeEmail}</strong></p>
              </div>
            </div>
          </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"PhysioCare Plus" <${smtpUser}>`,
          to: handlerEmail,
          replyTo: email,
          subject: `New Inquiry: ${subject} - ${name}`,
          html: htmlBody,
        });
      } catch (emailError) {
        console.error("Failed to send inquiry email:", emailError);
      }
    }


    return NextResponse.json({ success: true, inquiry: newInquiry, storage: "mongodb" });
  } catch (error) {
    console.error("Inquiry API POST error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to process inquiry" },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const id = asText(body.id);
    const status = asText(body.status);

    if (!id || !VALID_STATUSES.has(status)) {
      return NextResponse.json(
        { success: false, error: "Missing or invalid fields: id, status" },
        { status: 400 }
      );
    }


    if (!isMongoConfigured()) {
      const store = getFallbackStore();
      const inquiry = store.find((item) => item._id === id);

      if (!inquiry) {
        return NextResponse.json(
          { success: false, error: "Inquiry not found" },
          { status: 404 }
        );
      }

      inquiry.status = status as InquiryStatus;
      inquiry.updatedAt = new Date().toISOString();

      return NextResponse.json({ success: true, inquiry, storage: "memory" });
    }

    await connectToDatabase();

    const updatedInquiry = await InquiryModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );


    if (!updatedInquiry) {
      return NextResponse.json(
        { success: false, error: "Inquiry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, inquiry: updatedInquiry, storage: "mongodb" });
  } catch (error) {
    console.error("Inquiry API PATCH error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update inquiry" },
      { status: 500 }
    );
  }
}
