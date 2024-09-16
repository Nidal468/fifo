import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#FFFFFF',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
    boxShadow: '2px 2px 8px rgba(10,10,10,0.08)'
};

const focusedStyle = {
    borderColor: '#2196f3'
};

const acceptStyle = {
    borderColor: '#00e676'
};

const rejectStyle = {
    borderColor: '#ff1744'
};

export default function StyledDropzone(props: any) {
    const onDrop = (acceptedFiles: File[]) => {

        console.log('Dropped files:', acceptedFiles);
    };

    const {
        getRootProps,
        getInputProps,
        isFocused,
        isDragAccept,
        isDragReject
    } = useDropzone({
        accept: { 'image/*': [] },
        onDrop
    });

    const style: any = useMemo(() => ({
        ...baseStyle,
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {})
    }), [
        isFocused,
        isDragAccept,
        isDragReject
    ]);

    return (
        <div className='flex flex-col gap-[10px]'>
            <h1 className='text-[12px] font-medium'>Select files or drag and drop to upload</h1>
            <div {...getRootProps({ style })}>
                <input {...getInputProps()} />
                <div className='py-[8px] px-[20px] rounded-full text-[14px] flex gap-[10px] items-center justify-center' style={{ border: '2px solid #4682B4', color: '#4682B4' }}><img src='/images/assets/upload.png' className='w-[20px]' alt="upload"/><p>Choose files to upload</p></div>
            </div>
        </div>
    );
}