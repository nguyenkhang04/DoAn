import { v4 as uuidv4 } from "uuid";

export const registerUser = async (
  fullName: string,
  age: number,
  phone: string,
  email: string,
  password: string
) => {
  const response = await fetch("http://localhost:9999/users", {
    method: "POST",
    body: JSON.stringify({
      fullName,
      age,
      phone,
      email,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to register user. Please try again.");
  }

  return response.json();
};

export const loginUser = async (email: string, password: string) => {
  const response = await fetch("http://localhost:9999/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users.");
  }

  const users = await response.json();

  const user = users.find(
    (u: { email: string; password: string }) =>
      u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  return user;
};
