export const es = {
  // Common
  common: {
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    warning: 'Advertencia',
    info: 'Información',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    delete: 'Eliminar',
    edit: 'Editar',
    create: 'Crear',
    update: 'Actualizar',
    search: 'Buscar',
    filter: 'Filtrar',
    clear: 'Limpiar',
    apply: 'Aplicar',
    close: 'Cerrar',
    back: 'Atrás',
    next: 'Siguiente',
    previous: 'Anterior',
    submit: 'Enviar',
    reset: 'Restablecer',
    refresh: 'Actualizar',
  },

  // Navigation
  nav: {
    home: 'Inicio',
    dashboard: 'Panel',
    users: 'Usuarios',
    settings: 'Configuración',
    profile: 'Perfil',
    logout: 'Cerrar sesión',
    login: 'Iniciar sesión',
    register: 'Registrarse',
  },

  // Authentication
  auth: {
    loginTitle: 'Iniciar Sesión',
    registerTitle: 'Registrarse',
    email: 'Correo electrónico',
    password: 'Contraseña',
    confirmPassword: 'Confirmar contraseña',
    firstName: 'Nombre',
    lastName: 'Apellido',
    rememberMe: 'Recordarme',
    forgotPassword: '¿Olvidaste tu contraseña?',
    noAccount: '¿No tienes una cuenta?',
    hasAccount: '¿Ya tienes una cuenta?',
    signIn: 'Iniciar Sesión',
    signUp: 'Registrarse',
    signOut: 'Cerrar Sesión',
    loginSuccess: 'Sesión iniciada correctamente',
    logoutSuccess: 'Sesión cerrada correctamente',
    registrationSuccess: 'Cuenta creada correctamente',
  },

  // Forms
  form: {
    required: 'Este campo es obligatorio',
    invalidEmail: 'Por favor ingresa un correo electrónico válido',
    passwordTooShort: 'La contraseña debe tener al menos 8 caracteres',
    passwordsDoNotMatch: 'Las contraseñas no coinciden',
    invalidPhone: 'Por favor ingresa un número de teléfono válido',
    invalidUrl: 'Por favor ingresa una URL válida',
  },

  // Users
  users: {
    title: 'Usuarios',
    createUser: 'Crear Usuario',
    editUser: 'Editar Usuario',
    deleteUser: 'Eliminar Usuario',
    userDeleted: 'Usuario eliminado correctamente',
    userCreated: 'Usuario creado correctamente',
    userUpdated: 'Usuario actualizado correctamente',
    name: 'Nombre',
    role: 'Rol',
    status: 'Estado',
    createdAt: 'Creado en',
    lastLogin: 'Último acceso',
    actions: 'Acciones',
  },

  // Dashboard
  dashboard: {
    title: 'Panel',
    welcome: '¡Bienvenido de vuelta, {{name}}!',
    totalUsers: 'Total de Usuarios',
    activeUsers: 'Usuarios Activos',
    totalRevenue: 'Ingresos Totales',
    monthlyGrowth: 'Crecimiento Mensual',
    recentActivity: 'Actividad Reciente',
    userGrowth: 'Crecimiento de Usuarios',
    revenue: 'Ingresos',
  },

  // Errors
  errors: {
    generic: 'Algo salió mal. Por favor intenta de nuevo.',
    network: 'Error de red. Por favor verifica tu conexión.',
    unauthorized: 'No estás autorizado para realizar esta acción.',
    forbidden: 'Acceso prohibido.',
    notFound: 'El recurso solicitado no fue encontrado.',
    serverError: 'Error interno del servidor. Por favor intenta más tarde.',
    validationError: 'Por favor verifica tu entrada e intenta de nuevo.',
  },

  // Theme
  theme: {
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    toggleTheme: 'Cambiar tema',
  },
} as const

export default es
