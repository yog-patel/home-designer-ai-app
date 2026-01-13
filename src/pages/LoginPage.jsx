import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, clearError } from '../store/slices/authSlice';
import { setActiveTab } from '../store/slices/uiSlice';
import Button from '../components/UI/Button';
import { ArrowLeft, Mail, Lock } from 'lucide-react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signIn({ email, password })).then((result) => {
      if (result.payload?.session) {
        dispatch(setActiveTab('home'));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center gap-3">
        <button
          onClick={() => dispatch(setActiveTab('home'))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 sm:px-6 py-8 max-w-md mx-auto w-full">
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  dispatch(clearError());
                }}
                placeholder="you@example.com"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  dispatch(clearError());
                }}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Sign In Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
          >
            Sign In
          </Button>

          {/* Sign Up Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => dispatch(setActiveTab('signup'))}
              className="text-red-500 font-semibold hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>

        {/* Demo Info */}
        <div className="mt-12 p-4 bg-blue-50 rounded-2xl text-sm text-blue-900 space-y-2">
          <p className="font-semibold">💡 Demo Credentials:</p>
          <p>Email: demo@example.com</p>
          <p>Password: demo123456</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
