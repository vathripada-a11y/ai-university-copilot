import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  GraduationCap,
  ShieldCheck,
  User,
  BookOpen,
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    if (e) e.preventDefault();
    if (isSubmitting) return;

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMessage('Invalid email or password');
      return;
    }

    setErrorMessage(null);
    setIsSubmitting(true);

    try {
      const loggedUser = await login(trimmedEmail, password);
      // Role-based redirection after login
      if (loggedUser.role === 'STUDENT') {
        navigate('/student', { replace: true });
      } else if (loggedUser.role === 'FACULTY') {
        navigate('/faculty', { replace: true });
      } else if (loggedUser.role === 'ADMIN') {
        navigate('/admin', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    } catch (err) {
      setErrorMessage('Invalid email or password');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectDemoAccount = (demoEmail, demoPassword = 'demo123') => {
    if (isSubmitting) return;
    setEmail(demoEmail);
    setPassword(demoPassword);
    setErrorMessage(null);
    // Instant submission for easy evaluator testing
    setIsSubmitting(true);
    login(demoEmail, demoPassword)
      .then((loggedUser) => {
        if (loggedUser.role === 'STUDENT') navigate('/student', { replace: true });
        else if (loggedUser.role === 'FACULTY') navigate('/faculty', { replace: true });
        else if (loggedUser.role === 'ADMIN') navigate('/admin', { replace: true });
      })
      .catch((err) => {
        setErrorMessage('Invalid email or password');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center px-4">
        {/* Institutional Crest Icon */}
        <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/20 mb-4">
          <GraduationCap className="w-9 h-9" />
        </div>

        <p className="text-xs font-bold uppercase tracking-widest text-blue-300">
          SDM Institute of Technology, Ujire
        </p>
        <h1 className="mt-1 text-2xl font-extrabold text-white tracking-tight">
          AI University Copilot
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          Intelligent Campus Management Platform • Dept. of ISE
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl sm:px-8 border border-slate-100">
          {/* Header */}
          <div className="mb-6 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              Sign In to Your Account
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Enter your institutional credentials or use a 1-click demo role below.
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 flex items-start gap-2.5 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-4" onSubmit={handleLoginSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Institutional Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="name@demo.edu"
                className="mt-1.5 block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-800 focus:bg-white transition"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="••••••••"
                className="mt-1.5 block w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-800 focus:bg-white transition"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg shadow-sm text-sm font-semibold text-white bg-blue-900 hover:bg-blue-800 focus:outline-hidden focus:ring-2 focus:ring-offset-2 focus:ring-blue-800 disabled:opacity-60 transition"
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Demo Accounts Panel */}
          <div className="mt-8 pt-6 border-t border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Quick 1-Click Demo Accounts
              </span>
              <span className="text-[10px] text-slate-400 font-mono">pwd: demo123</span>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {/* Student 1 (Ananya - Low Attendance Edge Case) */}
              <button
                type="button"
                onClick={() => handleSelectDemoAccount('student1@demo.edu')}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 text-left transition text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-blue-900">
                      Ananya Rao (Student 1)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      4SU24IS101 • DBMS attendance &lt; 75%
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  STUDENT
                </span>
              </button>

              {/* Student 2 (Rahul Shetty - Permission Boundaries) */}
              <button
                type="button"
                onClick={() => handleSelectDemoAccount('student2@demo.edu')}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 text-left transition text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-800 flex items-center justify-center font-bold">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-blue-900">
                      Rahul Shetty (Student 2)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      4SU24IS102 • Clean Attendance &gt; 85%
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-blue-700 px-2 py-0.5 rounded bg-blue-50 border border-blue-200">
                  STUDENT
                </span>
              </button>

              {/* Faculty 1 (Dr. Meera K - DBMS & SE) */}
              <button
                type="button"
                onClick={() => handleSelectDemoAccount('faculty1@demo.edu')}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50/60 text-left transition text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-800 flex items-center justify-center font-bold">
                    <BookOpen className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 group-hover:text-purple-900">
                      Dr. Meera K (Faculty 1)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Teaches DBMS & Software Engineering
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-purple-700 px-2 py-0.5 rounded bg-purple-50 border border-purple-200">
                  FACULTY
                </span>
              </button>

              {/* Admin (Institutional Admin) */}
              <button
                type="button"
                onClick={() => handleSelectDemoAccount('admin@demo.edu')}
                disabled={isSubmitting}
                className="w-full flex items-center justify-between p-2.5 rounded-lg border border-slate-200 hover:border-slate-400 hover:bg-slate-50 text-left transition text-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-slate-200 text-slate-800 flex items-center justify-center font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900">
                      Admin Office (Administrator)
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Institutional & System Access
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-semibold text-slate-700 px-2 py-0.5 rounded bg-slate-100 border border-slate-300">
                  ADMIN
                </span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          SDMIT Ujire • 5th Semester ISE Mini Project Prototype
        </p>
      </div>
    </div>
  );
}
