import { ErrorCode } from '../../utils/error.service';

const AuthErrors = {
  INVALID_CONFIRMATION_PASSWORD: (): ErrorCode => ({
    code: '0001',
    title: 'Invalid confirmation password',
    description: 'Invalid confirmation password',
    httpCode: 400,
  }),
  USER_ALREADY_EXISTS: (email: string): ErrorCode => ({
    code: '0002',
    title: `User already exists`,
    description: `user with the email ${email} already exists`,
    httpCode: 400,
  }),
  INVALID_CREDENTIAL: (): ErrorCode => ({
    code: '0003',
    title: 'Credentials are not valid',
    description: 'Credentials are not valid',
    httpCode: 400,
  }),
  INVALID_TOKEN: (): ErrorCode => ({
    code: '0005',
    title: `Invalid token`,
    description: `Invalid token`,
    httpCode: 400,
  }),
};

export default AuthErrors;
