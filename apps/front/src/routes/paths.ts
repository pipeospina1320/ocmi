// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  APP: '/app',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  auth: {
    login: `${ROOTS.AUTH}/login`,
    register: `${ROOTS.AUTH}/register`,
  },
  // app
  app: {
    root: ROOTS.APP,
    employee: {
      root: `${ROOTS.APP}/employee`,
      new: `${ROOTS.APP}/employee/new`,
    },
    timeSheet: {
      root: `${ROOTS.APP}/time-sheet`,
      new: `${ROOTS.APP}/time-sheet/new`,
      edit: (id: string) => `${ROOTS.APP}/time-sheet/${id}`,
    },
  },
};
