export const en = {
  // Common
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    create: 'Create',
    update: 'Update',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    apply: 'Apply',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    submit: 'Submit',
    reset: 'Reset',
    refresh: 'Refresh',
  },

  // Navigation
  nav: {
    home: 'Home',
    dashboard: 'Dashboard',
    users: 'Users',
    settings: 'Settings',
    profile: 'Profile',
    logout: 'Logout',
    login: 'Login',
    register: 'Register',
  },

  // Authentication
  auth: {
    loginTitle: 'Sign In',
    registerTitle: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First Name',
    lastName: 'Last Name',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    hasAccount: 'Already have an account?',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    loginSuccess: 'Successfully logged in',
    logoutSuccess: 'Successfully logged out',
    registrationSuccess: 'Account created successfully',
  },

  // Forms
  form: {
    required: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    passwordTooShort: 'Password must be at least 8 characters',
    passwordsDoNotMatch: 'Passwords do not match',
    invalidPhone: 'Please enter a valid phone number',
    invalidUrl: 'Please enter a valid URL',
  },

  // Users
  users: {
    title: 'Users',
    createUser: 'Create User',
    editUser: 'Edit User',
    deleteUser: 'Delete User',
    userDeleted: 'User deleted successfully',
    userCreated: 'User created successfully',
    userUpdated: 'User updated successfully',
    name: 'Name',
    role: 'Role',
    status: 'Status',
    createdAt: 'Created At',
    lastLogin: 'Last Login',
    actions: 'Actions',
  },

  // Dashboard
  dashboard: {
    title: 'Dashboard',
    welcome: 'Welcome back, {{name}}!',
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    totalRevenue: 'Total Revenue',
    monthlyGrowth: 'Monthly Growth',
    recentActivity: 'Recent Activity',
    userGrowth: 'User Growth',
    revenue: 'Revenue',
  },

  // Errors
  errors: {
    generic: 'Something went wrong. Please try again.',
    network: 'Network error. Please check your connection.',
    unauthorized: 'You are not authorized to perform this action.',
    forbidden: 'Access forbidden.',
    notFound: 'The requested resource was not found.',
    serverError: 'Internal server error. Please try again later.',
    validationError: 'Please check your input and try again.',
  },

  // Theme
  theme: {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    toggleTheme: 'Toggle theme',
  },
} as const

export default en
