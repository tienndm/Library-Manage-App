"use server"

import { db } from "@/database/drizzle"
import { books } from "@/database/schema"

export const createBook = async (params: BookParams) => {
    try {
        const newBook = await db
            .insert(books)
            .values({
                ...params,
                availableCopies: params.totalCopies
            })
        return {
            success: true,
            data: JSON.parse(JSON.stringify(newBook))
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            message: 'An error occured while creating the book'
        }
    }
}