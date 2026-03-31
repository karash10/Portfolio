import { NextRequest, NextResponse } from "next/server";

// POST /api/auth - Verify admin password
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { password } = body;

    if (!password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error("ADMIN_PASSWORD environment variable not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    if (password === adminPassword) {
      // Return the password as the token (simple auth)
      // In production, you'd want to use proper JWT tokens
      return NextResponse.json(
        { success: true, token: adminPassword },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Auth error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}

// GET /api/auth - Check if token is valid
export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("authorization");
    
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ valid: false }, { status: 200 });
    }

    const token = authHeader.split(" ")[1];
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (token === adminPassword) {
      return NextResponse.json({ valid: true }, { status: 200 });
    }

    return NextResponse.json({ valid: false }, { status: 200 });
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json({ valid: false }, { status: 200 });
  }
}
