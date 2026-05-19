import { endPoints } from "./endPoints";

interface LoginCredentials {
  email: string;
  password: string;
}

export async function loginUser(credentials: LoginCredentials): Promise<string | null> {
  try {
    const response = await fetch(endPoints.auth.login, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) return null;

    const data = await response.json();
    return data.access_token; 
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}