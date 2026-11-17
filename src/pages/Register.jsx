import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Logo from '../components/common/Logo';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { User, Mail, Lock, Check, Zap, CheckCircle2 } from 'lucide-react';
import '../styles/auth.css';

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: true,
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Calculate password strength score (0 to 4)
  const getPasswordStrength = () => {
    const val = formData.password;
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  };

  const strengthScore = getPasswordStrength();
  const getStrengthLabel = () => {
    if (!formData.password) return 'Min. 8 chars';
    if (strengthScore <= 1) return 'Weak';
    if (strengthScore <= 2) return 'Medium';
    if (strengthScore === 3) return 'Strong';
    return 'Ultra Strong';
  };

  const isPasswordMatch =
    formData.confirmPassword &&
    formData.password === formData.confirmPassword;

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the Terms of Service';
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
      await register(formData.name.trim(), formData.email.trim(), formData.password);
      toast.success('Account created! Welcome to TASKLY.');
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err.message || 'Registration failed. Please try again.';
      toast.error(msg);
      setErrors((prev) => ({ ...prev, general: msg }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Floating Stitch Stickers */}
        <div className="auth-sticker auth-sticker--top-left">
          <span>🎉</span>
          <span>14-DAY PRO TRIAL</span>
        </div>
        <div className="auth-sticker auth-sticker--top-right">
          <span>🛡️</span>
          <span>ENCRYPTED</span>
        </div>

        {/* Card Header & Brand */}
        <header className="auth-header">
          <Logo size="lg" />
          <div className="auth-badge-pill auth-badge-pill--yellow">
            <span>🚀</span>
            <span>START FOR FREE — NO CREDIT CARD</span>
          </div>
        </header>

        <div className="auth-card">
          <div className="auth-card__content">
            <div className="auth-card__titles">
              <h1 className="auth-card__title">JOIN TASKLY!</h1>
              <p className="auth-card__subtitle">
                Supercharge your workflow with high-octane Neo-Brutalist task management.
              </p>
            </div>

            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              <Input
                label="Full Name"
                id="name"
                name="name"
                type="text"
                placeholder="Alex Morgan"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                leftIcon={<User size={18} />}
                required
                autoComplete="name"
              />

              <Input
                label="Work Email"
                id="email"
                name="email"
                type="email"
                placeholder="alex@company.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                leftIcon={<Mail size={18} />}
                required
                autoComplete="email"
              />

              {/* Password with Strength Meter */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                <Input
                  label="Create Password"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  leftIcon={<Lock size={18} />}
                  required
                  autoComplete="new-password"
                />

                <div className="auth-strength-meter">
                  <div className="auth-strength-header">
                    <span>Password Strength</span>
                    <span
                      style={{
                        color:
                          strengthScore <= 1
                            ? 'var(--color-coral)'
                            : strengthScore <= 2
                            ? 'var(--color-text)'
                            : 'var(--color-success)',
                      }}
                    >
                      {getStrengthLabel()}
                    </span>
                  </div>
                  <div className="auth-strength-bars">
                    {[1, 2, 3, 4].map((idx) => {
                      const isActive = idx <= strengthScore;
                      const barClass = !isActive
                        ? ''
                        : strengthScore <= 1
                        ? 'auth-strength-bar--weak'
                        : strengthScore <= 2
                        ? 'auth-strength-bar--medium'
                        : 'auth-strength-bar--strong';
                      return <div key={idx} className={`auth-strength-bar ${barClass}`} />;
                    })}
                  </div>
                </div>
              </div>

              {/* Confirm Password */}
              <Input
                label="Confirm Password"
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Repeat your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={errors.confirmPassword}
                leftIcon={<Lock size={18} />}
                required
                autoComplete="new-password"
              />

              {/* Terms Checkbox */}
              <label className="auth-checkbox-label" style={{ alignItems: 'flex-start' }}>
                <div
                  className={`auth-custom-checkbox ${
                    formData.agreeTerms ? 'auth-custom-checkbox--checked' : ''
                  }`}
                  style={{ marginTop: '2px' }}
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, agreeTerms: !prev.agreeTerms }))
                  }
                >
                  {formData.agreeTerms && <Check size={14} strokeWidth={3.5} />}
                </div>
                <span style={{ fontSize: '0.78rem', lineHeight: '1.4' }}>
                  I agree to the{' '}
                  <span style={{ textDecoration: 'underline', fontWeight: 800 }}>
                    Terms of Service
                  </span>{' '}
                  &{' '}
                  <span style={{ textDecoration: 'underline', fontWeight: 800 }}>
                    Privacy Policy
                  </span>
                </span>
              </label>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="secondary"
                size="lg"
                fullWidth
                loading={loading}
                rightIcon={<Zap size={18} />}
              >
                Create My Account
              </Button>
            </form>

            {/* Trust Badges */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                fontSize: '0.72rem',
                fontWeight: 700,
                color: 'var(--color-text-muted)',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <CheckCircle2 size={13} color="var(--color-success)" /> Zero spam
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <Zap size={13} color="var(--color-success)" /> Instant setup
              </span>
            </div>

            <div className="auth-footer">
              Already have an account?
              <Link to="/login" className="auth-footer__link">
                Log in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
