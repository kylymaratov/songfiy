import { useState } from 'react';
import { Helemt } from '../Helmet/Helmet';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import * as yup from 'yup';
import { Formik } from 'formik';
import { apiRequest } from 'src/api/api';
import { setAuth, setUser, TUser } from 'src/store/slices/user-slice';
import { setShowAuthorization } from 'src/store/slices/app-slice';

export const Authorization: React.FC = () => {
  const { showAuthorization } = useAppSelector((state) => state.app);
  const [type, setType] = useState<'login' | 'signup'>('login');

  if (!showAuthorization) return;

  return (
    <Helemt>
      <div className="absolute top-[50%] w-[450px] left-[50%] translate-x-[-50%] translate-y-[-50%]">
        <div className="bg-background shadow-md shadow-slate-600 border border-slate-600 p-10 rounded-md">
          <h1 className="text-center font-bold text-lg">
            Let's start with Songfiy!
          </h1>
          <div className="mt-10 bg-backgroundSecondary rounded-lg">
            <button
              onClick={() => setType('login')}
              type="button"
              className={`w-[50%] text-sm p-1 rounded-lg duration-200 ${type === 'login' ? 'bg-blue-400' : ''}`}
            >
              Login
            </button>

            <button
              onClick={() => setType('signup')}
              type="button"
              className={`w-[50%] text-sm p-1 rounded-lg duration-200 ${type === 'signup' ? 'bg-green-600' : ''}`}
            >
              Signup
            </button>
          </div>
          {type === 'login' ? <Login /> : <Signup />}
        </div>
      </div>
    </Helemt>
  );
};

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<string>('');

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Incorrect email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const login = async (values: FormValues) => {
    try {
      setError('');
      const response = await apiRequest<{ user: TUser }>(
        '/auth/login',
        'POST',
        values,
      );

      dispatch(setAuth(true));
      dispatch(setUser(response.user));
      dispatch(setShowAuthorization(false));
    } catch (error) {
      setError((error as any).response?.data.errResponse.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={login}
    >
      {({ errors, values, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <div>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 text-sm rounded-md border-none outline-none bg-backgroundSecondary"
              />
              <span className="text-sm text-red-600">{errors.email}</span>
            </div>
            <div className="mt-5">
              <input
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 text-sm rounded-md border-none outline-none bg-backgroundSecondary"
              />
              <div>
                <span className="text-sm text-red-600">{errors.password}</span>
              </div>
              <button type="button">
                <span className="text-[12px] text-gray-400">
                  Forgot your password?
                </span>
              </button>
            </div>
            <div className="text-red-500 text-sm text-center mt-5">{error}</div>
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 px-16 p-1 rounded-md"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};

const Signup: React.FC = () => {
  const [error, setError] = useState<string>('');

  const initialValues: FormValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup.string().email('Incorrect email').required('Email is required'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const signup = async (values: FormValues) => {
    try {
      setError('');
      await apiRequest('/auth/signup', 'POST', values);

      alert('User created: ' + values.email);
    } catch (error) {
      setError((error as any).response?.data.errResponse.message);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={signup}
    >
      {({ errors, values, handleSubmit, handleChange }) => (
        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <div>
              <input
                id="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 text-sm rounded-md border-none outline-none bg-backgroundSecondary"
              />
              <span className="text-sm text-red-600">{errors.email}</span>
            </div>
            <div className="mt-5">
              <input
                id="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 text-sm rounded-md border-none outline-none bg-backgroundSecondary"
              />
              <div>
                <span className="text-sm text-red-600">{errors.password}</span>
              </div>
              <button type="button">
                <span className="text-[12px] text-gray-400">
                  Forgot your password?
                </span>
              </button>
            </div>
            <div className="text-red-500 text-sm text-center mt-5">{error}</div>
            <div className="mt-10 flex justify-center">
              <button
                type="submit"
                className="bg-orange-500 px-16 p-1 rounded-md"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};
