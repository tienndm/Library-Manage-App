"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {
    FieldValues,
    useForm,
} from "react-hook-form";
import { z } from "zod";


import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { bookSchema } from "@/lib/validations";
import BaseForm from "./BaseForm";
import { Button } from "@/components/ui/button";
import { createBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";


interface Props extends Partial<Book> {
    type: 'create' | 'update'
}

const BookForm = ({ type, ...book }: Props) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof bookSchema>>({
        resolver: zodResolver(bookSchema),
        defaultValues: {
            title: '',
            description: '',
            author: '',
            genre: '',
            rating: 1,
            totalCopies: 1,
            coverUrl: '',
            coverColor: '',
            videoUrl: '',
            summary: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof bookSchema>) => {
        const result = await createBook(values);

        if (result.success) {
            toast("Book created successfully")
            router.push(`/admin/books/${result.data.id}`)
        } else {
            toast(`Opps! Got error when create book: ${result.message}`)
        }
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
            >
                <BaseForm
                    control={form.control}
                    name={'title'}
                    label="Title"
                    placeholder="Book title"
                    type="text"
                />

                <BaseForm
                    control={form.control}
                    name={'author'}
                    label="Author"
                    placeholder="Book author"
                    type="text"
                />

                <BaseForm
                    control={form.control}
                    name={'genre'}
                    label="Genre"
                    placeholder="Book genre"
                    type="text"
                />

                <BaseForm
                    control={form.control}
                    name={'rating'}
                    label="Rating"
                    placeholder="Book rating"
                    type="number"
                    min={1}
                    max={5}
                />

                <BaseForm
                    control={form.control}
                    name={'totalCopies'}
                    label="Total Copies"
                    placeholder="Book total copies"
                    type="number"
                    min={1}
                    max={10000}
                />

                <BaseForm
                    control={form.control}
                    name={'coverUrl'}
                    label="Book Image"
                    type="file"
                    placeholder="Upload a book cover"
                    variant="light"
                    fileType="image"
                    folder="books/covers"
                />

                <BaseForm
                    control={form.control}
                    name={'coverColor'}
                    label="Primary Color"
                    placeholder="Book genre"
                    type="color"
                />

                <BaseForm
                    control={form.control}
                    name={'description'}
                    label="Description"
                    placeholder="Book description"
                    rows={10}
                    type="description"
                />

                <BaseForm
                    control={form.control}
                    name={'videoUrl'}
                    label="Book Trailer"
                    type="file"
                    fileType="video"
                    placeholder="Upload a book trailer"
                    folder="books/videos"
                    variant="light"
                />

                <BaseForm
                    control={form.control}
                    name={'summary'}
                    label="Summary"
                    placeholder="Book summary"
                    rows={5}
                    type="description"
                />

                <Button type="submit" className="book-form_btn text-white">
                    Add Book to Library
                </Button>
            </form>
        </Form>
    )
}

export default BookForm;