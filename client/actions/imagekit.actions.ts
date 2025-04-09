'use server'

import ImageKit from "imagekit"

const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!,
})

export const getImagekitAuth = async () => {
  try {
    return imagekit.getAuthenticationParameters()
  } catch (error: any) {
    throw new Error(`Error in getAuth: ${error.message}`)
  }
}

export const removeFile = async (id: string) => {
  try {
    imagekit.deleteFile(id)
  } catch (error: any) {
    throw new Error(`Error in getAuth: ${error.message}`)
  }
}