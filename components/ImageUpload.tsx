/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import React, { useRef, useState } from 'react'
import {
    IKImage,
    ImageKitProvider,
    IKUpload
} from 'imagekitio-next'
import { config } from '@/lib/config'; // updated import
import { Button } from './ui/button';
import Image from 'next/image';
import { toast } from 'sonner';

const { env: { imagekit: { publicKey, urlEndpoint } } } = config


const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEnpoint}/api/auth/imagekit`);

        if (!response.ok) {
            const errorText = await response.text

            throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }

        const data = await response.json();
        const { signature, expire, token } = data;

        return { token, signature, expire }

    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`)
    }
}

const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
    const ikUploadRef = useRef(null);
    const [file, setFile] = useState<{ filePath: string } | null>(null)

    const onError = (error: any) => {
        console.log(error);
        toast('Your image could not be uploaded. Please try again.')
    };
    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);

        toast(`Image uploaded successfully: ${res.filePath}`)
    }

    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            authenticator={authenticator}
        >
            <IKUpload
                className='hidden'
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                fileName='test-upload.png'
            />

            <Button
                className='upload-btn'
                onClick={(e) => {
                    e.preventDefault();
                    if (ikUploadRef.current)
                        // @ts-ignore
                        ikUploadRef.current?.click()
                }}
            >
                <Image
                    src="/icons/upload.svg"
                    alt="upload-icon"
                    width={20}
                    height={20}
                    className='object-contain'
                />

                <p className='text-base text-dark-100'>Upload a file</p>

                {file && <p className='upload-filename'>{file.filePath}</p>}
            </Button>

            {file && (
                <IKImage
                    alt={file.filePath}
                    path={file.filePath}
                    width={500}
                    height={300}
                />
            )}
        </ImageKitProvider>
    )
}

export default ImageUpload