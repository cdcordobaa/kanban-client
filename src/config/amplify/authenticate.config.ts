export const authenticateConfig = {
  formFields: {
    signUp: {
      email: {
        order: 1,
        isRequired: true,
      },
      firstName: {
        label: "First Name",
        placeholder: "First Name",
        order: 2,
        isRequired: true,
        type: "string",
      },
      lastName: {
        label: "Last Name",
        placeholder: "Last Name",
        order: 3,
        isRequired: true,
        type: "string",
      },
      password: {
        order: 4,
      },
      confirm_password: {
        order: 5,
      },
    },
  },
};
