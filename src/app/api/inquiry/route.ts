/*import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import connectToDatabase from "@/lib/mongodb";
import { InquiryModel } from "@/lib/models/Inquiry";

export async function GET() {
  try {
    await connectToDatabase();
    // Sort by newest first
    const inquiries = await InquiryModel.find({}).sort({ createdAt: -1 });
    return NextResponse.json(inquiries);
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

    // Connect to MongoDB and save
    await connectToDatabase();
    
    const newInquiry = await InquiryModel.create({
      name,
      email,
      phone,
      subject: subject || "General Inquiry",
      message,
      status: "new",
    });

    // Only attempt sending email if SMTP credentials are configured
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const handlerEmail = process.env.HANDLER_EMAIL;

    if (smtpUser && smtpPass && handlerEmail) {
      try {
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
              body { font-family: 'Segoe UI', Arial, sans-serif; background: #f4f6fb; margin: 0; padding: 0; }
              .wrapper { max-width: 580px; margin: 32px auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(59,130,246,0.08); }
              .header { background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); padding: 32px 40px; }
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
                <h1>🩺 New Patient Inquiry</h1>
                <p>PhysioCare Plus — Inquiry Notification</p>
              </div>
              <div class="body">
                <span class="badge">New Inquiry Received</span>
                <div class="field">
                  <label>Patient Name</label>
                  <p>${name}</p>
                </div>
                <div class="field">
                  <label>Email Address</label>
                  <p>${email}</p>
                </div>
                <div class="field">
                  <label>Phone Number</label>
                  <p>${phone || "—"}</p>
                </div>
                <div class="field">
                  <label>Subject</label>
                  <p>${subject || "General Inquiry"}</p>
                </div>
                <hr class="divider" />
                <div class="field">
                  <label>Message</label>
                  <div class="message-box"><p>${message.replace(/\n/g, "<br/>")}</p></div>
                </div>
              </div>
              <div class="footer">
                <p>This email was sent from the PhysioCare Plus inquiry form. Please respond to: <strong>${email}</strong></p>
              </div>
            </div>
          </body>
          </html>
        `;

        await transporter.sendMail({
          from: `"PhysioCare Plus" <${smtpUser}>`,
          to: handlerEmail,
          replyTo: email,
          subject: `New Inquiry: ${subject || "General Inquiry"} — ${name}`,
          html: htmlBody,
        });
      } catch (emailError) {
        // Log email error but don't fail the API since DB save succeeded
        console.error("Failed to send inquiry email:", emailError);
      }
    }

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

    await connectToDatabase();
    
    const updatedInquiry = await InquiryModel.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );

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
*/

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    message: "Demo inquiry API working",
    data: [],
  });
}

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "Inquiry received successfully (Demo mode)",
  });
}
