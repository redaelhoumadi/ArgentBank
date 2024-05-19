import { z } from "zod";

export const signInShcema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, { message: "Email address is required" })
    .email({
      message: "Must be a valid email",
    }),
  password: z.string().trim().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
export const editProfileShcema = z.object({
  firstName: z.string().trim().min(2, { message: "First name is required" }),
  lastName: z.string().trim().min(2, { message: "Last name is required" }),
});
export const editTransactionShcema = z.object({
  transactionType: z
    .string()
    .trim()
    .min(2, { message: "Transaction type is required" }),
  category: z.string().trim().min(2, { message: "Category is required" }),
  notes: z.string().trim().min(2, { message: "Notes is required" }),
});
