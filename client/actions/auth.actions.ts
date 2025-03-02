'use server'

export const loginAction = async (email: string, password: string) => {
    try {
      const response = await fetch(process.env.URL + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      console.log(data);
      if (data.error) {
        throw new Error(data.message)
      }
      return { type: 'LOGIN', payload: data }
    } catch (error: any) {
      // console.log(error);
      
      return { type: 'ERROR', payload: error.message }
    }
}

export const signupAction = async (fullname: string, email: string, password: string) => {
  try {
    const response = await fetch(process.env.URL + '/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ fullname, email, password })
    })
    const data = await response.json()
    if (data.error) {
      throw new Error(data.message)
    }
    return { type: 'SIGNUP', payload: data }
  } catch (error: any) {
    return { type: 'ERROR', payload: error.message }
  }
}