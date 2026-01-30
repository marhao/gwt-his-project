import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password } = body;

  // Mock authentication - replace with real API call
  if (username && password) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock successful response
    return NextResponse.json({
      success: true,
      data: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3IiwidXNlcm5hbWUiOiJhZG1pbiIsIm5hbWUiOiLguK3guJTguLTguKrguKMg4LiX4Li04Lie4Lii4LmM4LiY4Lij4Lij4Lih4Lih4LiyIiwicm9sZSI6InN0YWZmIiwiZGVwYXJ0bWVudCI6IiIsInBlcm1pc3Npb25zIjpbInZpZXdfcGF0aWVudCIsInZpZXdfdmlzaXQiXSwiZXhwIjoxNzY2NTI3MjE4LCJpYXQiOjE3NjY0OTg0MTh9.LFucLWJI3RrKlcySiyBKRgGwst7cf_A7KV1lFAZEOso",
        expiresIn: 28800,
        user: {
          officerId: 7,
          username: username,
          name: "ทดสอบ ระบบ",
          role: "staff",
          department: null,
          permissions: ["view_patient", "view_visit"]
        },
        loginInfo: {
          clientIP: "unknown",
          serverIP: "10.50.5.18",
          serverMAC: "3a:0f:f0:24:7a:0d",
          serverHostname: "MacBook-Pro.local",
          loginTime: new Date().toISOString()
        }
      }
    });
  }

  return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
}