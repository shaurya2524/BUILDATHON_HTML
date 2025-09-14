import { NextResponse, NextRequest } from "next/server";
import axios, { AxiosError } from "axios";

const API_BASE_URL = "https://buildathon-5n46.vercel.app/";

interface AuthResponse {
  message: string;
  jwtToken: string;
}

interface SignupData {
  contact: string;
  email: string;
  password: string;
}

interface LoginData {
  identifier: string; // email or contact
  password: string;
}

// Function to signup a user
const signupUser = async (data: SignupData): Promise<AuthResponse> => {
  try {
    console.log("Signing up user with data:", data);
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/signup`, data);
    console.log("Signup successful:", response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Signup failed:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Signup failed");
  }
};

// Function to login a user
const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    console.log("Logging in user with data:", data);
    const response = await axios.post<AuthResponse>(`${API_BASE_URL}/login`, data);
    console.log("Login successful:", response.data);
    return response.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    console.error("Login failed:", err.response?.data?.message || err.message);
    throw new Error(err.response?.data?.message || "Login failed");
  }
};

// The main POST handler for the API route
export async function POST(request: NextRequest) {
  try {
    const { mode, data } = await request.json();
    let result: AuthResponse;

    if (mode === "signup") {
      result = await signupUser(data as SignupData);
    } else if (mode === "login") {
      result = await loginUser(data as LoginData);
    } else {
      return NextResponse.json(
        { message: "Invalid mode specified" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("API route error:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
