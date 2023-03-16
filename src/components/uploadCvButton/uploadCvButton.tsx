'use client'
import {FormEvent, useState} from "react";

export default function UploadCvButton() {
    return (
        <form action="/api/cv"  method="post" encType="multipart/form-data">
            <input type="file" name="cv"/>
            <button type="submit">Upload PDF</button>
        </form>
    )
}