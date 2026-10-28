import z from 'zod';

const passwordSchema = z.string()
.trim()
.min(8, "Password minimal 8 character")
.refine(
    (value) => Buffer.byteLength(value, 'utf-8') <= 72,
    {
        error : "Password maksimal 72 byte UTF-8",
    }
)

const registerSchema = z.object({
    name : z.string().trim().min(3 , "Name minimal 3 character"),
    email : z.email(),
    password : passwordSchema

})

const loginSchema = z.object({
    email : z.email(),
    password : passwordSchema
})