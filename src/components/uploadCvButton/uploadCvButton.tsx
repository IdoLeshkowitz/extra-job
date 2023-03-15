'use client'
import {FormEvent, useState} from "react";

export default function UploadCvButton() {
    const [file, setFile] = useState<File | null>(null);
    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };
    const handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        if (!file) return;
        const formData = new FormData();
        formData.append('pdfFile', file);

        fetch('/api/cv', {
            method: 'POST',
            body  : formData,
        })
            .then((response) => response.json())
            .catch((error) => console.error(error));
    };
    return (
        <form onSubmit={handleSubmit} method="post" encType="multipart/form-data">
            <input type="file" name="pdfFile" onChange={handleFileChange}/>
            <button type="submit">Upload PDF</button>
        </form>
    )
}