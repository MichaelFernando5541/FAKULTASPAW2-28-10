import { registerSchema } from "../schemas/auth.schema.js";
import { apiResponse, apiResponseValidation } from "../utils/response.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import { JwtHelper } from "../utils/jwt.js";
import { PasswordHelper } from "../utils/bcrypt.js";
import userModel from "../model/user.model.js";

class AuthController {
    static async register(req, res) {
        const result = registerSchema.safeParse(req.body)

        if (!result.success) {
            return apiResponseValidation({
                res,
                errors : result.error 
            })
        }

        const {name, email, password} = result.data

        const newUser = await userModel.create({
            name,
            email,
            password : await PasswordHelper.hash(password)
        })

        return apiResponse({
            res,
            status: 201,
            message: "register berhasil",
            data: null
        })
    }

    static async login(req, res) {

    }

}