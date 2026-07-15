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

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18">
    <path fill="#4285F4" d="M23.52 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.47c-.28 1.5-1.13 2.77-2.4 3.63v3.02h3.89c2.28-2.1 3.56-5.17 3.56-8.84Z" />
    <path fill="#34A853" d="M12 24c3.24 0 5.96-1.07 7.95-2.9l-3.89-3.02c-1.08.73-2.46 1.15-4.06 1.15-3.13 0-5.78-2.11-6.73-4.95H1.26v3.11C3.24 21.3 7.28 24 12 24Z" />
    <path fill="#FBBC05" d="M5.27 14.28A7.2 7.2 0 0 1 4.89 12c0-.79.14-1.56.38-2.28V6.61H1.26A11.98 11.98 0 0 0 0 12c0 1.93.46 3.76 1.26 5.39l4.01-3.11Z" />
    <path fill="#EA4335" d="M12 4.77c1.76 0 3.34.6 4.59 1.79l3.44-3.44C17.95 1.19 15.24 0 12 0 7.28 0 3.24 2.7 1.26 6.61l4.01 3.11C6.22 6.88 8.87 4.77 12 4.77Z" />
  </svg>
);

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2">
    <path d="M24 12.07C24 5.68 18.63.5 12 .5S0 5.68 0 12.07c0 5.78 4.35 10.57 10.02 11.43v-8.09H7.08v-3.34h2.94V9.5c0-2.87 1.74-4.46 4.4-4.46 1.27 0 2.6.22 2.6.22v2.8h-1.47c-1.44 0-1.89.88-1.89 1.79v2.15h3.22l-.52 3.34h-2.7v8.09C19.65 22.64 24 17.85 24 12.07Z" />
  </svg>
);

// Nút đăng nhập nhanh qua Google / Facebook, dùng chung cho form đăng nhập và đăng ký
function SocialAuth({ label }) {
  return (
    <>
      <div className="social-divider"><span>Hoặc</span></div>
      <div className="social-buttons">
        <button type="button" className="social-btn">
          <GoogleIcon /> {label} Google
        </button>
        <button type="button" className="social-btn">
          <FacebookIcon /> {label} Facebook
        </button>
      </div>
    </>
  );
}

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

      <SocialAuth label="Đăng nhập với" />

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

      <SocialAuth label="Đăng ký với" />

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
      <header className="site-nav">
        <nav className="site-nav-links">
          <a href="#">Trang chủ</a>
          <a href="#">Tính năng</a>
          <a href="#">Về chúng tôi</a>
        </nav>
      </header>

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
