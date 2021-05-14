import React from 'react';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EmailInput from '../../utils/emailInput';
import useForm from '../../../hooks/useForm';
import PasswordInput from '../../utils/passwordInput';
import TextInput from '../../utils/textInput';
import useApiError from '../../../hooks/useApiError';
import { useSetRhinoState } from '../../../config/context';
import { login } from '../../../Services/user';

const LoginForm = ({ userType }) => {
  const { values, onChange, error, handleError } = useForm({
    email: '',
    studentPassword: '',
    designation: '',
    execomPassword: '',
  });

  // eslint-disable-next-line no-unused-vars
  const setUser = useSetRhinoState('user');

  const { handleApiError } = useApiError();

  const history = useHistory();

  const handleLogin = async () => {
    if (userType === 'student') {
      if (
        values.email !== '' &&
        values.studentPassword !== '' &&
        error.email === '' &&
        error.studentPassword === ''
      ) {
        const data = {
          email: values.email,
          password: values.studentPassword,
        };

        try {
          await login(userType, data);
          setUser({
            is_user_logged_in: true,
            user_type: userType,
          });
          history.push(`/${userType}`);
        } catch (err) {
          handleApiError(err);
        }
      }
    }
    if (userType === 'execom') {
      if (
        values.designation !== '' &&
        values.execomPassword !== '' &&
        error.designation === '' &&
        error.execomPassword === ''
      ) {
        const data = {
          designation: values.designation,
          password: values.execomPassword,
        };

        try {
          await login(userType, data);
          setUser({
            is_user_logged_in: true,
            user_type: userType,
          });
          history.push(`/${userType}`);
        } catch (err) {
          handleApiError(err);
        }
      }
    }
  };

  return (
    <>
      <form className="login-form">
        {userType === 'student' ? (
          <>
            <EmailInput
              label="Email"
              name="email"
              email={values.email}
              errorMsg={error.email}
              setErrorMsg={handleError}
              onChange={onChange}
            />
            <PasswordInput
              label="Password"
              name="studentPassword"
              email={values.studentPassword}
              errorMsg={error.studentPassword}
              setErrorMsg={handleError}
              onChange={onChange}
            />
          </>
        ) : (
          <>
            <TextInput
              label="Designation"
              name="designation"
              values={values.designation}
              errorMsg={error.designation}
              setErrorMsg={handleError}
              onChange={onChange}
            />
            <PasswordInput
              label="Password"
              name="execomPassword"
              email={values.execomPassword}
              errorMsg={error.execomPassword}
              setErrorMsg={handleError}
              onChange={onChange}
            />
          </>
        )}
        <div className="button">
          <Button onClick={handleLogin}>Sign In</Button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
