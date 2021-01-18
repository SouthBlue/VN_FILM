export const validateLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Email Không để trống";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email Không hợp lệ";
  }
  if (!values.password) {
    errors.password = "Mật khẩu không để trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải lớn hơn 6 ký tự";
  }
  return errors;
};

export const validateSignup = (values) => {
  let errors = {};
  if (!values.fullname) {
    errors.fullname = "Họ và Tên Không để trống";
  }
  if (!values.email) {
    errors.email = "Email Không để trống";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email Không hợp lệ";
  }
  if (!values.password) {
    errors.password = "Mật khẩu không để trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải lớn hơn 6 ký tự";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không để trống";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không chính xác";
  }
  return errors;
};

export const validateUploadFilm = (values) => {
  let errors = {};
  if (!values.film_name) {
    errors.film_name = "Nhập tên phim";
  }
  if (!values.status) {
    errors.status = "Nhập trạng thái";
  }
  if (!values.type_id) {
    errors.type_id = "Chọn loại phim";
  }
  if (!values.year) {
    errors.year = "Nhập năm sản xuất";
  }
  if (!values.country_id) {
    errors.country_id = "Chọn quốc gia";
  }
  if (!values.tag) {
    errors.tag = "Gắn tag film";
  }
  if (!values.image) {
    errors.image = "Chọn áp phích";
  }
  if (!values.description) {
    errors.description = "Nhập nội dung phim";
  }
  //const arr = values.category_id;
  if (values.category.length <= 0) {
    errors.category = "Chọn ít nhất một thể loại";
  }

  return errors;
};

export const validatePass = (values) => {
  let errors = {};
  if (!values.password) {
    errors.password = "Mật khẩu không để trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải lớn hơn 6 ký tự";
  }
  if (!values.newpass) {
    errors.newpass = "Mật khẩu mới không để trống";
  } else if (values.newpass.length < 6) {
    errors.newpass = "Mật khẩu mới lớn hơn 6 ký tự";
  } else if (values.password === values.newpass)
  errors.newpass = "Mật khẩu mới phải khác mật khẩu cũ";
  if (!values.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không để trống";
  } else if (values.newpass !== values.confirmPassword) {
    errors.confirmPassword = "Xác nhận mật khẩu không chính xác";
  }
  return errors;
};
