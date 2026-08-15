import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ShieldCheck, KeyRound, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function SignUp({ onSignUpSuccess }) {
  const navigate = useNavigate();
  const [role, setRole] = useState('user'); // 'user' | 'admin'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminKey, setAdminKey] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) return;

    if (role === 'admin' && !adminKey.trim()) {
      alert('Please enter your Secret Admin Invitation Key.');
      return;
    }

    const userData = {
      fullName,
      email,
      role,
      token: 'fake-jwt-token-nexus',
    };

    localStorage.setItem('nexus_user', JSON.stringify(userData));

    if (onSignUpSuccess) {
      onSignUpSuccess(userData);
    } else {
      navigate(role === 'admin' ? '/admin' : '/overview');
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50 flex items-center justify-center p-3 sm:p-4 font-sans">
      <div className="w-full max-w-5xl h-full max-h-[94vh] bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">

        {/* Left Branding Banner */}
        <div className="hidden lg:flex lg:col-span-5 bg-[#0f9f59] p-8 xl:p-12 text-white flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="text-xs font-black tracking-widest uppercase bg-white/20 px-3 py-1 rounded-full backdrop-blur-md">
              PROJECT NEXUS
            </span>
            <h2 className="text-2xl xl:text-4xl font-extrabold mt-6 leading-tight tracking-tight">
              {role === 'admin' ? 'Join as System Admin' : 'Start your journey with Nexus.'}
            </h2>
            <p className="text-emerald-100/90 text-sm mt-4 leading-relaxed font-normal">
              {role === 'admin'
                ? 'Create an administrative account to oversee system operations, monitor users, and control workflow metrics.'
                : 'Join thousands of innovators building impactful tech projects, connecting with advisors, and growing.'}
            </p>
          </div>

          <div className="relative z-10 pt-8">
            <div className="flex items-center gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                {role === 'admin' ? <ShieldCheck className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
              </div>
              <div className="text-xs">
                <p className="font-bold text-white uppercase tracking-wider">Registration Role</p>
                <p className="text-emerald-100 capitalize font-medium">{role} Registration</p>
              </div>
            </div>
          </div>

          <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* Right Form Section */}
        <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center bg-white overflow-y-auto">
          <div className="max-w-md w-full mx-auto space-y-3 sm:space-y-4">

            {/* Header */}
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 tracking-tight">
                Create an account
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Select your account type and fill in your details.
              </p>
            </div>

            {/* Role Switcher Filter (User vs Admin) */}
            <div className="bg-slate-100 p-1.5 rounded-2xl flex items-center gap-1 border border-slate-200/60">
              <button
                type="button"
                onClick={() => setRole('user')}
                className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'user'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/50'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <User className="w-4 h-4 text-[#0f9f59]" />
                <span>Signup as User</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`flex-1 py-2 sm:py-2.5 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  role === 'admin'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className={`w-4 h-4 ${role === 'admin' ? 'text-[#0f9f59]' : 'text-slate-400'}`} />
                <span>Signup as Admin</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 sm:mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="Jordan Lee"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0f9f59] focus:ring-1 focus:ring-[#0f9f59] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 sm:mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="jordan@nexus.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0f9f59] focus:ring-1 focus:ring-[#0f9f59] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 sm:mb-1.5">
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
                    className="w-full pl-11 pr-11 py-2 sm:py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0f9f59] focus:ring-1 focus:ring-[#0f9f59] transition-all"
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

              {/* Conditional Admin Secret Key Field */}
              {role === 'admin' && (
                <div className="animate-fadeIn">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 sm:mb-1.5">
                    Admin Secret Key
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-[#0f9f59] absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      placeholder="Enter organizational admin key"
                      value={adminKey}
                      onChange={(e) => setAdminKey(e.target.value)}
                      className="w-full pl-11 pr-4 py-2 sm:py-2.5 bg-emerald-50/50 border border-emerald-200 rounded-xl text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#0f9f59] focus:ring-1 focus:ring-[#0f9f59] transition-all"
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Required to verify administrative authorization.
                  </p>
                </div>
              )}

              <button
                type="submit"
                style={{ backgroundColor: role === 'admin' ? '#0f172a' : '#0f9f59' }}
                className="w-full text-white text-sm font-bold py-2.5 sm:py-3.5 px-5 rounded-2xl flex items-center justify-center gap-2 shadow-sm hover:opacity-95 transition-all cursor-pointer mt-1 sm:mt-2"
              >
                <span>Register as {role === 'admin' ? 'Administrator' : 'User'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {/* Footer */}
            <p className="text-center text-xs text-slate-400 font-medium">
              Already have an account?{' '}
              <button type="button" onClick={() => navigate('/login')} className="text-[#0f9f59] font-bold hover:underline cursor-pointer">
                Sign In
              </button>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}
