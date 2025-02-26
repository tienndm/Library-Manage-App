import { z } from 'zod';

export const signUpSchema = z.object({
    email: z.string().email(),
    fullName: z.string(),
    universityId: z.coerce.number(),
    universityCard: z.string().nonempty('University Card is required'),
    password: z.string().min(8),
});

export const FIELD_NAMES = {
    email: "Email",
    fullName: "Full name",
    universityId: "University ID Number",
    password: "Password",
    universityCard: "Upload University ID Card",
}

export const FIELD_TYPES = {
    email: "email",
    fullName: "text",
    universityId: "number",
    password: "password",
    universityCard: "file",
};

export const signInSchema = z.object( {
    email: z.string().email(),
    password: z.string().min(8),
});