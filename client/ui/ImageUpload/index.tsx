'use client'
import api from "@/actions/api";
import { getImagekitAuth } from "@/actions/imagekit.actions";
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import { useRef, useState } from "react";
import Button from "../Button";
import Toast from "../Toast";
import Image from "next/image";

const authenticator = async () => {
  try {
    const response = await getImagekitAuth()
    return {...response}
  } catch (error: any) {
    throw new Error(`Error in authenticator: ${error.message}`);
  }
}

const ImageUpload = () => {
  const ikUploadRef = useRef<HTMLInputElement>(null)
  const [file, setFile] = useState<{filePath: string} | null>(null)

  const onError = (error: any) => {
    console.log(error.message);
    Toast('Something went wrong!', 'error')
  }
  const onSuccess = (res: any) => {
    setFile(res)
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
      <Button onClick={e => {
        if (ikUploadRef.current) {
          ikUploadRef.current?.click(); 
        }
      }}>
        Upload image <br />
        {file && file.filePath}
      </Button>

      {file &&
        <IKImage
          alt="uploaded image"
          path={file.filePath}
        />
      }
    </ImageKitProvider>
  )
}

export default ImageUpload