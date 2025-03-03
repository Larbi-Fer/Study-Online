const CODES = {
  AUTH: {
    INVALID_EMAIL: 'Invalid email address.',
    EMPTY_EMAIL: 'Email address cannot be empty.',
    EXIST_EMAIL: 'Email address already exists.',
    EMAIL_NOT_FOUND: 'Email address not found.',

    EMPTY_PASSWORD: 'Password cannot be empty.',
    INVALID_PASSWORD: 'Invalid password.',
    WRONG_PASSWORD: 'Wrong password.',

    INACTIVE_ACCOUNT: 'Account is inactive.',
    ACTIVE_ACCOUNT: 'Account is active.',

    EMPTY_FULLNAME: 'Full name cannot be empty.',
    INVALID_FULLNAME: 'Invalid full name.',
    
    EMPTY_OTD: 'One-time password cannot be empty.',
    INVALID_OTD: 'Invalid one-time password.',
    NEW_OTD_GENERATED: 'A new one-time password has been generated.',
    WRONG_OTD: 'Wrong one-time password.',
  }
}

export default CODES

export type AuthCodeProps = keyof typeof CODES.AUTH