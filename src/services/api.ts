import axios from "axios";
import { User } from "../@types/global";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

interface LoginUserResponse {
  user: User;
  token: string;
}

interface RegisterUserResponse {
  status: string;
  message: string;
}

export async function USER_LOGIN(email: string, password: string) {
  try {
    const { data, status } = await api.post<LoginUserResponse>("/sessions", {
      email,
      password,
    });
    return { data, status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    } else {
      return "Um erro inesperado ocorreu!";
    }
  }
}

export async function USER_REGISTER(
  name: string,
  email: string,
  password: string
) {
  try {
    const { data, status } = await api.post<RegisterUserResponse>("/users", {
      name,
      email,
      password,
    });
    return { data, status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    } else {
      return "Um erro inesperado ocorreu!";
    }
  }
}

export async function VALIDATE_TOKEN(token: string) {
  try {
    const { data, status } = await api.post<User>("/validate", { token });
    return { data, status };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    } else {
      return "Um erro inesperado ocorreu!";
    }
  }
}

export async function UPDATE_USER(
  name: string,
  email: string,
  old_password: string,
  password: string,
  token: string
) {
  try {
    const { status } = await api.put(
      "/users",
      {
        name,
        email,
        old_password,
        password,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        return error.response.data;
      } else {
        return error.message;
      }
    } else {
      return "Um erro inesperado ocorreu!";
    }
  }
}
