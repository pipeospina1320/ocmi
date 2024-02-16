// ----------------------------------------------------------------------

export const endpoints = {
  auth: {
    user: '/api/auth/get-user',
    login: '/api/auth/login',
    register: '/api/auth/register',
  },
  employee: {
    list: '/api/hrm/employee',
    delete: (id: string) => `/api/hrm/employee/${id}`,
    patch: (id: string) => `/api/hrm/employee/${id}`,
    create: '/api/hrm/employee',
  },
  timeSheet: {
    list: '/api/hrm/time-sheet',
    delete: (id: string) => `/api/hrm/time-sheet/${id}`,
    patch: (id: string) => `/api/hrm/time-sheet/${id}`,
    create: '/api/hrm/time-sheet',
    initForm: '/api/hrm/time-sheet/init-form',
    employee: {
      list: (timeSheetId: string) =>
        `/api/hrm/time-sheet/employee/${timeSheetId}`,
      updateHour: (id: string) =>
        `/api/hrm/time-sheet/employee/update-hours/${id}`,
    },
  },
};
