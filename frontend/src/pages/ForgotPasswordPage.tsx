import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const valid = email.includes("@");
    setError(valid ? "" : "Geçerli bir e-posta girin.");
    setSent(valid);
  }

  return (
    <section className="auth-karti">
      <h2>Şifremi Unuttum</h2>
      <p className="bilgi">Kayıtlı e-posta adresinizi yazın, şifre yenileme bağlantısı gönderelim.</p>
      <form className="form" noValidate onSubmit={handleSubmit}>
        <p className="alan">
          <label htmlFor="forgot-email">E-posta</label>
          <input id="forgot-email" type="email" value={email} onChange={(event) => { setEmail(event.target.value); setSent(false); }} aria-invalid={error ? true : undefined} aria-describedby="forgot-email-error" />
          <span id="forgot-email-error" className="alan-hata">{error}</span>
        </p>
        <button type="submit" className="buton">Bağlantı gönder</button>
      </form>
      {sent && <p className="basari-kutusu" role="status">Bağlantı {email} adresine gönderildi (demo).</p>}
      <p className="auth-linkler"><Link to="/login">← Girişe dön</Link></p>
    </section>
  );
}

export default ForgotPasswordPage;
