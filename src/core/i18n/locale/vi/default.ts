// Default namespace for Vietnamese translations
const defaultTranslations = {
  // Common
  common: {
    loading: 'Đang tải...',
    error: 'Lỗi',
    success: 'Thành công',
    warning: 'Cảnh báo',
    info: 'Thông tin',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    create: 'Tạo mới',
    update: 'Cập nhật',
    search: 'Tìm kiếm',
    filter: 'Lọc',
    clear: 'Xóa',
    apply: 'Áp dụng',
    close: 'Đóng',
    back: 'Quay lại',
    next: 'Tiếp theo',
    previous: 'Trước',
    submit: 'Gửi',
    reset: 'Đặt lại',
    refresh: 'Làm mới',
  },

  // Navigation
  nav: {
    home: 'Trang chủ',
    dashboard: 'Bảng điều khiển',
    users: 'Người dùng',
    settings: 'Cài đặt',
    profile: 'Hồ sơ',
    logout: 'Đăng xuất',
    login: 'Đăng nhập',
    register: 'Đăng ký',
  },

  // Authentication
  auth: {
    loginTitle: 'Đăng nhập',
    registerTitle: 'Đăng ký',
    email: 'Email',
    password: 'Mật khẩu',
    confirmPassword: 'Xác nhận mật khẩu',
    firstName: 'Họ',
    lastName: 'Tên',
    rememberMe: 'Ghi nhớ đăng nhập',
    forgotPassword: 'Quên mật khẩu?',
    noAccount: 'Chưa có tài khoản?',
    hasAccount: 'Đã có tài khoản?',
    signIn: 'Đăng nhập',
    signUp: 'Đăng ký',
    signOut: 'Đăng xuất',
    loginSuccess: 'Đăng nhập thành công',
    logoutSuccess: 'Đăng xuất thành công',
    registrationSuccess: 'Tạo tài khoản thành công',
  },

  // Forms
  form: {
    required: 'Trường này là bắt buộc',
    invalidEmail: 'Vui lòng nhập địa chỉ email hợp lệ',
    passwordTooShort: 'Mật khẩu phải có ít nhất 8 ký tự',
    passwordsDoNotMatch: 'Mật khẩu không khớp',
    invalidPhone: 'Vui lòng nhập số điện thoại hợp lệ',
    invalidUrl: 'Vui lòng nhập URL hợp lệ',
  },

  // Users
  users: {
    title: 'Người dùng',
    createUser: 'Tạo người dùng',
    editUser: 'Chỉnh sửa người dùng',
    deleteUser: 'Xóa người dùng',
    userDeleted: 'Xóa người dùng thành công',
    userCreated: 'Tạo người dùng thành công',
    userUpdated: 'Cập nhật người dùng thành công',
    name: 'Tên',
    role: 'Vai trò',
    status: 'Trạng thái',
    createdAt: 'Ngày tạo',
    lastLogin: 'Lần đăng nhập cuối',
    actions: 'Thao tác',
  },

  // Dashboard
  dashboard: {
    title: 'Bảng điều khiển',
    welcome: 'Chào mừng trở lại, {{name}}!',
    totalUsers: 'Tổng người dùng',
    activeUsers: 'Người dùng hoạt động',
    totalRevenue: 'Tổng doanh thu',
    monthlyGrowth: 'Tăng trưởng hàng tháng',
    recentActivity: 'Hoạt động gần đây',
    userGrowth: 'Tăng trưởng người dùng',
    revenue: 'Doanh thu',
  },

  // Errors
  errors: {
    generic: 'Đã xảy ra lỗi. Vui lòng thử lại.',
    network: 'Lỗi mạng. Vui lòng kiểm tra kết nối.',
    unauthorized: 'Bạn không có quyền thực hiện hành động này.',
    forbidden: 'Truy cập bị cấm.',
    notFound: 'Không tìm thấy tài nguyên được yêu cầu.',
    serverError: 'Lỗi máy chủ nội bộ. Vui lòng thử lại sau.',
    validationError: 'Vui lòng kiểm tra dữ liệu nhập và thử lại.',
  },

  // Theme
  theme: {
    light: 'Sáng',
    dark: 'Tối',
    system: 'Hệ thống',
    toggleTheme: 'Chuyển đổi chủ đề',
  },
} as const

export default defaultTranslations
