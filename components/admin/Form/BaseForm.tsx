import FileUpload from "@/components/FileUpload";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from '@/components/ui/input'
import { Textarea } from "@/components/ui/textarea";
import { bookSchema } from "@/lib/validations";
import { access } from "fs";
import React from 'react'
import { Control, FieldPath } from 'react-hook-form'
import { z } from "zod";
import ColorPicker from "../ColorPicker";

const formSchema = bookSchema

interface BaseFormProps {
    control: Control<z.infer<typeof formSchema>>,
    name: FieldPath<z.infer<typeof formSchema>>,
    label: string,
    placeholder?: string,
    type?: string,
    min?: number,
    max?: number,
    rows?: number,
    fileType?: "image" | "video",
    folder?: string,
    variant?: 'dark' | 'light',
}

const BaseForm = ({
    control,
    name,
    label,
    placeholder,
    type,
    min,
    max,
    rows,
    fileType,
    folder,
    variant,
}: BaseFormProps) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                    <FormLabel className="text-base font-normal text-dark-500">
                        {label}
                    </FormLabel>
                    <FormControl>
                        {(() => {
                            if (type === 'file') {
                                const accept = `${fileType}/*`
                                return (
                                    <FileUpload
                                        type={fileType}
                                        accept={accept}
                                        placeholder={placeholder}
                                        folder={folder}
                                        variant={variant}
                                        onFileChange={field.onChange}
                                        value={field.value}
                                    />);
                            } else if (type === 'number') {
                                return (
                                    <Input
                                        type="number"
                                        min={min}
                                        max={max}
                                        placeholder={placeholder}
                                        {...field}
                                        className="book-form_input"
                                    />
                                );
                            } else if (type === 'color') {
                                return (
                                    <ColorPicker
                                        onPickerChange={field.onChange}
                                        value={field.value}
                                    />
                                )
                            } else if (type === 'description') {
                                return (
                                    <Textarea
                                        placeholder={placeholder}
                                        {...field}
                                        rows={rows}
                                        className="book-form_input"
                                    />
                                );
                            } else {
                                return (
                                    <Input
                                        required
                                        placeholder={placeholder}
                                        {...field}
                                        className="book-form_input"
                                    />
                                );
                            }
                        })()}

                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default BaseForm