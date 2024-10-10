import { z } from "zod"

export const ACCEPTED_IMAGE_MIME_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
] as const

export const ACCEPTED_FILE_MIME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",    
] as const

const MAX_FILE_SIZE = 1024 * 1024 * 5;

export const formStore = z.object({
    name: z
        .string()
        .min(1, { message: "Please enter a name" })
        .max(50, { message: "Name is too long" }),
    location: z
        .string()
        .min(1, { message: "Please enter a location" })
        .max(50, { message: "Location is too long" }),
    description: z
        .string()
        .min(1, { message: "Please enter a description" })
        .max(500, { message: "Description is too long" }),
    image: z
        .any()
        .refine((files) => files?.length > 0 && files[0].size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
        .refine(
          (files) => files?.length > 0 && ACCEPTED_IMAGE_MIME_TYPES.includes(files[0]?.type),
          "Only .jpg, .jpeg, .png formats are supported."
        ),
    docs: z
        .any()
        .refine((files) => files?.length > 0 && files[0].size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
        .refine((files) => files?.length > 0 && ACCEPTED_FILE_MIME_TYPES.includes(files[0]?.type), "Only .pdf .docx format is supported."),
    email: z.string().email({ message: "Please enter a valid email" }),
    typeStore: z.enum(["perorangan", "offcial"]).optional(),
})

export type FormStore = z.infer<typeof formStore>