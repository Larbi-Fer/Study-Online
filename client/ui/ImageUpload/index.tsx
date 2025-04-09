'use client'
import { getImagekitAuth } from "@/actions/imagekit.actions";
import { ImageKitProvider, IKUpload } from "imagekitio-next";
import { useRef, useState } from "react";
import Toast from "../Toast";
import { UploadCloudIcon } from "lucide-react";
import './style.css'

const authenticator = async () => {
  try {
    const response = await getImagekitAuth()
    return {...response}
  } catch (error: any) {
    throw new Error(`Error in authenticator: ${error.message}`);
  }
}

const ImageUpload = ({changeFile}: {changeFile: (path: string, id: string) => void}) => {
  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{filePath: string, fileId: string} | null>(null)
  const [progress, setProgress] = useState<number>(0)

  const onError = (error: any) => {
    console.log(error.message);
    Toast('Something went wrong!', 'error')
  }
  const onSuccess = (res: any) => {
    setFile(res)
    changeFile(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT + res.filePath, res.fileId)
    Toast('Image uploaded successfully', 'success')
  }

  return (
    <ImageKitProvider
      publicKey={process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY}
      urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}
      authenticator={authenticator}
    >
      <IKUpload
        style={{display: 'none'}}
        ref={ikUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        folder="topics-cover"
        onUploadStart={() => setProgress(0)}
        onUploadProgress={e => setProgress(Math.round(e.loaded / e.total * 100))}
      />
      <div onClick={e => {
        if (ikUploadRef.current) {
          ikUploadRef.current?.click();
        }
      }} style={{cursor: 'pointer', width: '100%', padding: '10px',
        borderRadius: '8px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#ddd', color: '#333'
      }} className="upload-container">
        <UploadCloudIcon />
        <p style={{margin: '0 10px'}}>
          {file ? 'upload other image' : 'Upload image'}
        </p>
        <span style={{width: `${progress}%`}}></span>
      </div>
    </ImageKitProvider>
  )
}

export default ImageUpload