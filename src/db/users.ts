import { dbq } from "./db";

export const getUsersByEmail = async (email: string) => {
  try {
    const user = await dbq('SELECT email, password FROM "User" WHERE email = $1', [
      email,
    ]);
    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: any) => {
  try {
    const user = await dbq('SELECT * FROM "User" WHERE id = $1', [id]);
    return user;
  } catch (error) {
    return null;
  }
};
