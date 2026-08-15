import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); // 'user' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    // 🔑 Hardcoded Credentials
    const DUMMY_USER = { email: 'jordan@nexus.com', password: '123456' };
    const DUMMY_ADMIN = { email: 'admin@nexus.com', password: 'admin123' };

    // 🔴 Validation Logic
    if (role === 'user') {
      if (email !== DUMMY_USER.email || password !== DUMMY_USER.password) {
        setErrorMessage('Invalid User credentials. Try jordan@nexus.com / 123456');
        return;
      }
    } else if (role === 'admin') {
      if (email !== DUMMY_ADMIN.email || password !== DUMMY_ADMIN.password) {
        setErrorMessage('Invalid Admin credentials. Try admin@nexus.com / admin123');
        return;
      }
    }

    // 🟢 Save Auth State
    const authData = {
      email,
      role,
      name: role === 'admin' ? 'System Admin' : 'Jordan Lee',
      token: 'nexus-dummy-jwt-token',
    };

    localStorage.setItem('nexus_user', JSON.stringify(authData));

    // 🟢 Redirect based on role
    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/overview');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-8 font-sans">
      <div className="w-full max-w-5xl bg-white rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[620px]">
        
        {/* Left Branding Banner */}
        <div className="lg:col-span-5 bg-[#0f9f59] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              PROJECT NEXUS
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold mt-6 leading-tight tracking-tight">
              {role === 'admin' ? 'Control & Manage the Platform' : 'Build what matters with the right people.'}
            </h2>
            <p className="text-emerald-100/90 text-sm mt-4 leading-relaxed font-normal">
              {role === 'admin'
                ? 'Access administrative controls, review project submissions, and manage system parameters.'
                : 'Welcome back! Log in to access your workspaces, manage projects, and collaborate.'}
            </p>
          </div>

          <div className="relative z-10 pt-8">
            <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                {role === 'admin' ? <ShieldCheck className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
              </div>
              <div className="text-xs">
                <p className="font-bold text-white uppercase tracking-wider">Logging in as</p>
                <p className="text-emerald-100 capitalize font-medium">{role} Mode Active</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right Form Section */}
        <div className="lg:col-span-7 p-8 md:p-12 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto space-y-6">
            
            {/* Header */}
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Please enter your credentials to continue.
              </p>
            </div>

            {/* Role Switcher Filter */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/60">
              <button
                type="button"
                onClick={() => {
                  setRole('user');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'user'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-4 h-4 text-[#0f9f59]" />
                <span>Login as User</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setRole('admin');
                  setErrorMessage('');
                }}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${role === 'admin' ? 'text-[#0f9f59]' : 'text-slate-400'}`} />
                <span>Login as Admin</span>
              </button>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-4 py-3 rounded-xl">
                {errorMessage}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder={role === 'admin' ? 'admin@nexus.com' : 'jordan@nexus.com'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0f9f59] focus:ring-1 focus:ring-[#0f9f59] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0f9f59] focus:ring-1 focus:ring-[#0f9f59] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-600 font-medium">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-slate-300 text-[#0f9f59] focus:ring-[#0f9f59]"
                  />
                  Remember this device
                </label>
                <a href="#forgot" className="font-bold text-[#0f9f59] hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: role === 'admin' ? '#0f172a' : '#0f9f59' }}
                className="w-full text-white text-sm font-bold py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer mt-4"
              >
                <span>Sign In as {role === 'admin' ? 'Administrator' : 'User'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="text-center text-xs text-slate-400 font-medium pt-2 border-t border-slate-100">
              <p className="mb-1 text-slate-500 font-semibold">Test Credentials:</p>
              <p>User: <span className="text-slate-700 font-mono">jordan@nexus.com / 123456</span></p>
              <p>Admin: <span className="text-slate-700 font-mono">admin@nexus.com / admin123</span></p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}