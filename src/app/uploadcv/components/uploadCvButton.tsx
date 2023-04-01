'use client'
import {useState} from 'react'
import {FilePond, registerPlugin} from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import {SSRProvider} from "react-bootstrap";
import {redirect, useRouter} from 'next/navigation'
import PillLink from "@/components/links/pillLinks";
import Link from "next/link";

function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

interface UploadCvButtonProps {
    redirectTo: string
}

export default function UploadCvButton({redirectTo}: UploadCvButtonProps) {
    const router = useRouter()
    registerPlugin(
        FilePondPluginFileValidateType,
        FilePondPluginFileValidateSize,
        FilePondPluginImagePreview,
    )
    return (
        <SSRProvider>
            <FilePond
                server="/api/cv"
                allowMultiple={false}
                name='cv'
                labelIdle={`<i class="d-inline-block fi-camera-plus fs-2 text-light mb-2"></i><br><span class="fw-bold text-light opacity-70">שלח קורות חיים</span>`}
                acceptedFileTypes={['application/pdf']}
                stylePanelLayout='compact'
                className='file-uploader border-light bg-faded-light'
                allowProcess={true}
                onprocessfile={async () => {
                    await router.prefetch(redirectTo)
                    await delay(1000)
                    router.push(redirectTo)
                }}
                iconProcess="<i class='fi-check'></i>"
                labelFileProcessingComplete='הקובץ נשלח בהצלחה'
                labelFileProcessingError='הקובץ לא נשלח'
                labelFileProcessing='מעלה קובץ...'
                labelTapToCancel='לחץ לביטול'
                maxFileSize='16MB'
                allowDrop={true}
            />
        </SSRProvider>
    )
}
