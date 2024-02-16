import { ErrorCode } from '../../utils/error.service';

const hrmErrors = {
  EMPLOYEE_ALREADY_EXISTS: (): ErrorCode => ({
    code: '0001',
    title: 'Employee already exists',
    description: 'Employee already exists',
    httpCode: 400,
  }),
  EMPLOYEE_MINIMUM_WAGE: (): ErrorCode => ({
    code: '0002',
    title: "Salary rate can't be less than minimum wage",
    description: "Salary rate can't be less than minimum wage",
    httpCode: 400,
  }),
  EMPLOYEE_DOES_NOT_EXIST: (): ErrorCode => ({
    code: '0003',
    title: "Employee doesn't exist",
    description: "Employee doesn't exist",
    httpCode: 400,
  }),
  EMPLOYEE_DOES_NOT_EXIST_IN_TIME_SHEET: (): ErrorCode => ({
    code: '0004',
    title: "Employee doesn't exist in time sheet",
    description: "Employee doesn't exist in time sheet",
    httpCode: 400,
  }),
  TIME_SHEET_DOES_NOT_EXIST: (): ErrorCode => ({
    code: '0005',
    title: "Time sheet doesn't exist",
    description: "Time sheet doesn't exist",
    httpCode: 400,
  }),
};

export default hrmErrors;
