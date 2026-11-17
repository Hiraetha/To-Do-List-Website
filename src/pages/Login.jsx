import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { LogIn, Mail, Lock, Sparkles, Check, ArrowRight } from 'lucide-react';
import '../styles/auth.css';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const from = location.state?.from?.pathname || '/dashboard';

  const validate = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      await login(formData.email.trim(), formData.password);
      toast.success('Welcome back! Successfully logged in.');
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.message || 'Login failed. Please check your credentials.';
      toast.error(msg);
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setFormData({
      email: 'alex.designer@taskly.io',
      password: 'password123',
      rememberMe: true,
    });
    setErrors({});
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Floating Stitch Stickers */}
        <div className="auth-sticker auth-sticker--top-left">
          <span>⚡</span>
          <span>100% FOCUSED</span>
        </div>
        <div className="auth-sticker auth-sticker--bottom-right">
          <span>✓</span>
          <span>ZERO PROCRASTINATION</span>
        </div>

        {/* Card Header & Brand */}
        <header className="auth-header">
          <Logo size="lg" />
          <div className="auth-badge-pill auth-badge-pill--lime">
            <span>✨</span>
            <span>PRODUCTIVITY UNLOCKED</span>
          </div>
        </header>

        <div className="auth-card">
          <div className="auth-card__content">
            <div className="auth-card__titles">
              <h1 className="auth-card__title">WELCOME BACK!</h1>
              <p className="auth-card__subtitle">
                Let's get things done today. Enter your credentials to access your workspace.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <Input
                label="Email Address"
                id="email"
                name="email"
                type="email"
                placeholder="alex.designer@taskly.io"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                leftIcon={<Mail size={18} />}
                required
                autoComplete="email"
              />

              <Input
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="••••••••••••"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                leftIcon={<Lock size={18} />}
                required
                autoComplete="current-password"
              />

              {/* Remember Me & Status Pill */}
              <div className="auth-checkbox-row">
                <label className="auth-checkbox-label">
                  <div
                    className={`auth-custom-checkbox ${
                      formData.rememberMe ? 'auth-custom-checkbox--checked' : ''
                    }`}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rememberMe: !prev.rememberMe }))
                    }
                  >
                    {formData.rememberMe && <Check size={14} strokeWidth={3.5} />}
                  </div>
                  <span>Remember me for 30 days</span>
                </label>

                <div className="auth-status-pill">
                  <span className="auth-status-dot" />
                  <span>v2.4 ONLINE</span>
                </div>
              </div>

              {/* Quick Demo Fill Box */}
              <div className="auth-form__demo-box">
                <span className="auth-form__demo-text">Quick Demo Account:</span>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleFillDemo}
                  leftIcon={<Sparkles size={14} />}
                >
                  Fill Demo
                </Button>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={loading}
                rightIcon={<ArrowRight size={18} />}
              >
                Log In To Dashboard
              </Button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <div className="auth-divider__line" />
              <span className="auth-divider__text">OR CONTINUE WITH</span>
            </div>

            {/* Social Login Buttons */}
            <div className="auth-social-grid">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toast.info('Social authentication enabled with PHP backend')}
              >
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => toast.info('GitHub authentication enabled with PHP backend')}
              >
                GitHub
              </Button>
            </div>

            <div className="auth-footer">
              Don't have an account yet?
              <Link to="/register" className="auth-footer__link">
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
