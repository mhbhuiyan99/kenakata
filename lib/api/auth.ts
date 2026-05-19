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

export function setSessionCookie(token: string, daysToLive: number = 7): void {
  if (typeof window === "undefined") return;

  const date = new Date();
  //  Dynamically add days to the current live system time
  date.setTime(date.getTime() + daysToLive * 24 * 60 * 60 * 1000);
  const expires = date.toUTCString();

  document.cookie = `kenakata_access_token=${token}; path=/; expires=${expires}; SameSite=Strict; Secure`;
}


export function clearSessionCookie(): void {
  if (typeof window === "undefined") return;

  //  Dynamic approach: Setting expires to the exact current moment instantly invalidates it
  const expires = new Date(0).toUTCString(); 
  
  document.cookie = `kenakata_access_token=; path=/; expires=${expires}; SameSite=Strict; Secure`;
}