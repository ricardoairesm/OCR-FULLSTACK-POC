"use server";

import { auth } from "../lib/auth";

export const signIn = async (email: string, password: string) => {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            }
        })
        return {
            success: true,
            message: "User signed in successfully"
        }
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            message: e.message || "Error signing in user" 
        }
    }
}

export const signUp = async (name: string, email: string, password: string) => {
    try {
        await auth.api.signUpEmail({
            body: {
                name,
                email,
                password,
            }
        })
        return {
            success: true,
            message: "User created successfully"
        }
    } catch (error) {
        const e = error as Error;
        return {
            success: false,
            message: e.message || "Error creating user" 
        }
    }

}
