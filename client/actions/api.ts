'use server'

export default async(path: string, method: string, data?: any) => {
  return await fetch(process.env.URL + path, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: data ? JSON.stringify(data) : null
  })
}