const CODES = {
  AUTH: {
    ERROR: 'error!!',
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
    
    EMPTY_OTP: 'One-time password cannot be empty.',
    INVALID_OTP: 'Invalid one-time password.',
    NEW_OTP_GENERATED: 'We have sent you a new one-time password.',
    WRONG_OTP: 'Wrong one-time password.',

    CORRECT_OTP: 'CORRECT_OTP',

    PASSWORD_NOT_MATCH: 'PASSWORD_NOT_MATCH',
    PASSWORD_RESET: 'PASSWORD_RESET',
    OTP_NOT_FOUND: 'OTP_NOT_FOUND',
  }
}

export default CODES

export type AuthCodeProps = keyof typeof CODES.AUTH