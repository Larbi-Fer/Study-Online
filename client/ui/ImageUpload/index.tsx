'use client'
import api from "@/actions/api";
import { getImagekitAuth } from "@/actions/imagekit.actions";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import { useRef, useState } from "react";
import Button from "../Button";
import Toast from "../Toast";
import { UploadCloudIcon } from "lucide-react";

const authenticator = async () => {
  try {
    const response = await getImagekitAuth()
    return {...response}
  } catch (error: any) {
    throw new Error(`Error in authenticator: ${error.message}`);
  }
}

const ImageUpload = ({changeFile}: {changeFile: (filepath: string) => void}) => {
  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{filePath: string} | null>(null)

  const onError = (error: any) => {
    console.log(error.message);
    Toast('Something went wrong!', 'error')
  }
  const onSuccess = (res: any) => {
    setFile(res)
    changeFile(process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT + res.filePath)
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
        onUploadProgress={e => console.log(e.loaded, e.total)}
      />
      <div onClick={e => {
        if (ikUploadRef.current) {
          ikUploadRef.current?.click(); 
        }
      }} style={{cursor: 'pointer', width: '100%', padding: '10px',
        borderRadius: '8px', display: 'flex', alignItems: 'center',
        justifyContent: 'center', backgroundColor: '#ddd', color: '#333'
      }}>
        <UploadCloudIcon />
        <p style={{margin: '0 10px'}}>
          {file ? 'upload other image' : 'Upload image'}
        </p>
      </div>
    </ImageKitProvider>
  )
}

export default ImageUpload