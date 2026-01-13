import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUp, clearError } from '../store/slices/authSlice';
import { setActiveTab } from '../store/slices/uiSlice';
import Button from '../components/UI/Button';
import { ArrowLeft, Mail, Lock, User } from 'lucide-react';

const SignUpPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    dispatch(signUp({ email, password })).then((result) => {
      if (result.payload?.user) {
        // Redirect to login or verify email page
        dispatch(setActiveTab('login'));
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-white flex flex-col">
      {/* Header */}
      <div className="p-4 sm:p-6 flex items-center gap-3">
        <button
          onClick={() => dispatch(setActiveTab('login'))}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
      </div>

      {/* Form */}
      <div className="flex-1 px-4 sm:px-6 py-8 max-w-md mx-auto w-full">
        <form onSubmit={handleSignUp} className="space-y-6">
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
                  setPasswordError('');
                  dispatch(clearError());
                }}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-900">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-gray-400" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setPasswordError('');
                }}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
                required
              />
            </div>
            {passwordError && (
              <p className="text-sm text-red-600">{passwordError}</p>
            )}
          </div>

          {/* Sign Up Button */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={loading}
          >
            Create Account
          </Button>

          {/* Sign In Link */}
          <div className="text-center text-sm text-gray-600">
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => dispatch(setActiveTab('login'))}
              className="text-red-500 font-semibold hover:underline"
            >
              Sign in
            </button>
          </div>
        </form>

        {/* Password Requirements */}
        <div className="mt-12 p-4 bg-blue-50 rounded-2xl text-sm text-blue-900 space-y-2">
          <p className="font-semibold">🔐 Password Requirements:</p>
          <ul className="space-y-1 text-xs">
            <li>✓ At least 6 characters</li>
            <li>✓ Must match confirmation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
