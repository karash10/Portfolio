import { NextRequest, NextResponse } from "next/server";
import { getProjects, addProject } from "@/lib/projects";
import { validateProjectInput } from "@/lib/projectValidation";

// GET /api/projects - Get all projects
export async function GET() {
  try {
    const projects = getProjects();
    return NextResponse.json({ projects }, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

// POST /api/projects - Create a new project (requires auth)
export async function POST(request: NextRequest) {
  try {
    // Check for admin authentication
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const validToken = process.env.ADMIN_PASSWORD;
    
    if (token !== validToken) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validation = validateProjectInput(body, "create");
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { title, label, description, bullets, tech, github } = validation.data;

    const newProject = addProject({
      title,
      label,
      description,
      bullets,
      tech,
      github: github || undefined,
    });

    return NextResponse.json({ project: newProject }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
