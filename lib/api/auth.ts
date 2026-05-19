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

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
  avatar?: string;
}

export async function signUpUser(credentials: SignUpCredentials): Promise<boolean> {
  try {
    const response = await fetch(endPoints.auth.signup, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        avatar: "https://i.imgur.com/LDOO4Qs.jpg"
      }),
    });

    return response.ok;
  } catch (error) {
    console.error("Sign up error:", error);
    return false;
  }
}