import { useState } from "react";
import "./AuthPage.css";

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOffIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-7 0-11-7-11-7a20.3 20.3 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 5c7 0 11 7 11 7a20.29 20.29 0 0 1-4.22 5.06M14.12 14.12a3 3 0 1 1-4.24-4.24" />
    <path d="M1 1l22 22" />
  </svg>
);

// Input mật khẩu có nút hiện/ẩn, tái sử dụng cho mọi form
function PasswordField({ id, label, value, onChange, error, autoComplete }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="pass-wrap">
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
        />
        <button
          type="button"
          className={`toggle-pass${visible ? " is-visible" : ""}`}
          aria-label="Hiện/ẩn mật khẩu"
          onClick={() => setVisible((v) => !v)}
        >
          <span className="eye"><EyeIcon /></span>
          <span className="eye-off"><EyeOffIcon /></span>
        </button>
      </div>
      {error && <div className="err">{error}</div>}
    </div>
  );
}

function TextField({ id, label, type = "text", value, onChange, error, autoComplete }) {
  return (
    <div className={`field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} autoComplete={autoComplete} />
      {error && <div className="err">{error}</div>}
    </div>
  );
}

const validEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function LoginView({ goto }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailOk = validEmail(email.trim());
    const passOk = password.length >= 6;
    setErrors({
      email: emailOk ? "" : "Email không hợp lệ.",
      password: passOk ? "" : "Mật khẩu tối thiểu 6 ký tự.",
    });
    if (!emailOk || !passOk) return;
    alert("Đăng nhập thành công (demo giao diện).");
  };

  return (
    <div className="view">
      <h1>Đăng nhập</h1>
      <p className="sub">Nhập thông tin tài khoản của bạn.</p>

      <form onSubmit={handleSubmit} noValidate>
        <TextField id="loginEmail" label="Email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} error={errors.email} autoComplete="username" />
        <PasswordField id="loginPassword" label="Mật khẩu" value={password}
          onChange={(e) => setPassword(e.target.value)} error={errors.password} autoComplete="current-password" />

        <div className="row">
          <label><input type="checkbox" /> Ghi nhớ</label>
          <button type="button" className="link-btn" onClick={() => goto("forgot")}>Quên mật khẩu?</button>
        </div>

        <button type="submit" className="submit">Đăng nhập</button>
      </form>

      <div className="footer">
        Chưa có tài khoản?{" "}
        <button type="button" className="link-btn" onClick={() => goto("register")}>Đăng ký</button>
      </div>
    </div>
  );
}

function RegisterView({ goto }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameOk = name.trim().length > 0;
    const emailOk = validEmail(email.trim());
    const passOk = password.length >= 6;
    const confirmOk = confirm === password && confirm.length > 0;

    setErrors({
      name: nameOk ? "" : "Vui lòng nhập họ tên.",
      email: emailOk ? "" : "Email không hợp lệ.",
      password: passOk ? "" : "Mật khẩu tối thiểu 6 ký tự.",
      confirm: confirmOk ? "" : "Mật khẩu xác nhận không khớp.",
    });
    if (!nameOk || !emailOk || !passOk || !confirmOk) return;

    alert("Đăng ký thành công (demo giao diện).");
    setName(""); setEmail(""); setPassword(""); setConfirm("");
    goto("login");
  };

  return (
    <div className="view">
      <h1>Tạo tài khoản</h1>
      <p className="sub">Điền thông tin bên dưới để đăng ký.</p>

      <form onSubmit={handleSubmit} noValidate>
        <TextField id="regName" label="Họ và tên" value={name}
          onChange={(e) => setName(e.target.value)} error={errors.name} autoComplete="name" />
        <TextField id="regEmail" label="Email" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)} error={errors.email} autoComplete="username" />
        <PasswordField id="regPassword" label="Mật khẩu" value={password}
          onChange={(e) => setPassword(e.target.value)} error={errors.password} autoComplete="new-password" />
        <PasswordField id="regConfirm" label="Xác nhận mật khẩu" value={confirm}
          onChange={(e) => setConfirm(e.target.value)} error={errors.confirm} autoComplete="new-password" />

        <button type="submit" className="submit">Đăng ký</button>
      </form>

      <div className="footer">
        Đã có tài khoản?{" "}
        <button type="button" className="link-btn" onClick={() => goto("login")}>Đăng nhập</button>
      </div>
    </div>
  );
}

function ForgotView({ goto }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailOk = validEmail(email.trim());
    setError(emailOk ? "" : "Email không hợp lệ.");
    if (!emailOk) return;
    setSuccess(true);
    setEmail("");
  };

  return (
    <div className="view">
      <button type="button" className="back-link" onClick={() => goto("login")}>&larr; Quay lại đăng nhập</button>
      <h1>Quên mật khẩu</h1>
      <p className="sub">Nhập email để nhận liên kết đặt lại mật khẩu.</p>

      {success && (
        <div className="success-box show">Đã gửi liên kết đặt lại mật khẩu (demo giao diện).</div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <TextField id="forgotEmail" label="Email" type="email" value={email}
          onChange={(e) => { setEmail(e.target.value); setSuccess(false); }} error={error} autoComplete="username" />
        <button type="submit" className="submit">Gửi liên kết</button>
      </form>

      <div className="footer">
        Nhớ lại mật khẩu rồi?{" "}
        <button type="button" className="link-btn" onClick={() => goto("login")}>Đăng nhập</button>
      </div>
    </div>
  );
}

function ResetView({ goto }) {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newConfirm, setNewConfirm] = useState("");
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const oldOk = oldPassword.length > 0;
    const newOk = newPassword.length >= 6;
    const confirmOk = newConfirm === newPassword && newConfirm.length > 0;

    setErrors({
      old: oldOk ? "" : "Vui lòng nhập mật khẩu hiện tại.",
      new: newOk ? "" : "Mật khẩu mới tối thiểu 6 ký tự.",
      confirm: confirmOk ? "" : "Mật khẩu xác nhận không khớp.",
    });
    if (!oldOk || !newOk || !confirmOk) return;

    setSuccess(true);
    setOldPassword(""); setNewPassword(""); setNewConfirm("");
  };

  return (
    <div className="view">
      <button type="button" className="back-link" onClick={() => goto("login")}>&larr; Quay lại đăng nhập</button>
      <h1>Đổi mật khẩu</h1>
      <p className="sub">Nhập mật khẩu hiện tại và mật khẩu mới.</p>

      {success && <div className="success-box show">Đổi mật khẩu thành công (demo giao diện).</div>}

      <form onSubmit={handleSubmit} noValidate>
        <PasswordField id="oldPassword" label="Mật khẩu hiện tại" value={oldPassword}
          onChange={(e) => { setOldPassword(e.target.value); setSuccess(false); }} error={errors.old} autoComplete="current-password" />
        <PasswordField id="newPassword" label="Mật khẩu mới" value={newPassword}
          onChange={(e) => { setNewPassword(e.target.value); setSuccess(false); }} error={errors.new} autoComplete="new-password" />
        <PasswordField id="newConfirm" label="Xác nhận mật khẩu mới" value={newConfirm}
          onChange={(e) => { setNewConfirm(e.target.value); setSuccess(false); }} error={errors.confirm} autoComplete="new-password" />

        <button type="submit" className="submit">Cập nhật mật khẩu</button>
      </form>
    </div>
  );
}

export default function AuthPage() {
  const [view, setView] = useState("login");

  return (
    <div className="site-shell">
      <main className="site-main">
        <div className="site-hero"></div>

        <div className="auth-page-wrap">
          <div className="auth-card">
            {view === "login" && <LoginView goto={setView} />}
            {view === "register" && <RegisterView goto={setView} />}
            {view === "forgot" && <ForgotView goto={setView} />}
            {view === "reset" && <ResetView goto={setView} />}
          </div>
        </div>
      </main>
    </div>
  );
}
