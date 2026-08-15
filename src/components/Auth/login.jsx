import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ShieldCheck, ArrowRight } from 'lucide-react';

export default function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('user@nexus.com');
  const [password, setPassword] = useState('user123');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    setError('');
    if (selectedRole === 'admin') {
      setEmail('admin@nexus.com');
      setPassword('admin123');
    } else {
      setEmail('user@nexus.com');
      setPassword('user123');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;

    if (role === 'user' && (email !== 'user@nexus.com' || password !== 'user123')) {
      setError('Invalid credentials! Default User: user@nexus.com / user123');
      return;
    }

    if (role === 'admin' && (email !== 'admin@nexus.com' || password !== 'admin123')) {
      setError('Invalid credentials! Default Admin: admin@nexus.com / admin123');
      return;
    }

    setError('');

    const authData = {
      email,
      role,
      token: 'fake-jwt-token-nexus',
    };

    localStorage.setItem('nexus_user', JSON.stringify(authData));

    if (onLoginSuccess) {
      onLoginSuccess(authData);
    }

    if (role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/overview');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="w-full max-w-5xl h-full max-h-[92vh] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

        {/* Left Branding */}
        <div className="hidden lg:flex lg:col-span-5 bg-[#0f9f59] p-8 xl:p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              PROJECT NEXUS
            </span>
            <h2 className="text-2xl xl:text-4xl font-extrabold mt-6 leading-tight tracking-tight">
              {role === 'admin' ? 'Control & Manage the Platform' : 'Build what matters with the right people.'}
            </h2>
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
        </div>

        {/* Right Form */}
        <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-4 sm:space-y-5">

            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">Welcome back</h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">Please enter your credentials to continue.</p>
            </div>

            {/* Role Switcher */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/60">
              <button
                type="button"
                onClick={() => handleRoleChange('user')}
                className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'user' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
                }`}
              >
                <User className="w-4 h-4 text-[#0f9f59]" />
                <span>Login as User</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('admin')}
                className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'admin' ? 'bg-slate-900 text-white shadow-sm' : 'text-slate-500'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${role === 'admin' ? 'text-[#0f9f59]' : 'text-slate-400'}`} />
                <span>Login as Admin</span>
              </button>
            </div>

            {error && (
              <div className="p-2.5 sm:p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-xs font-semibold">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 pt-1 sm:pt-2">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5 sm:mb-2">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-11 py-2.5 sm:py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                style={{ backgroundColor: role === 'admin' ? '#0f172a' : '#0f9f59' }}
                className="w-full text-white text-sm font-bold py-3 sm:py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 mt-2 sm:mt-4 cursor-pointer"
              >
                <span>Sign In as {role === 'admin' ? 'Administrator' : 'User'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="text-center text-xs text-slate-400 font-medium">
              Don't have an account?{' '}
              <button type="button" onClick={() => navigate('/signup')} className="text-[#0f9f59] font-bold hover:underline cursor-pointer">
                Sign Up
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
