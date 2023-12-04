import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .matches(
      /^[A-Z][a-z]*$/,
      'Name must start with an uppercase letter and contain only letters'
    ),
  age: yup
    .number()
    .required('Age is required')
    .positive('Age must be a positive number')
    .integer('Age must be an integer'),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  password: yup
    .string()
    .required('Password is required')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(
      /[^A-Za-z0-9]/,
      'Password must contain at least one special character'
    ),
  confirmPassword: yup
    .string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
  gender: yup.string().required('Gender is required'),
  acceptTerms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
  picture: yup
    .mixed()
    .required('Image is required')
    .test({
      message: 'Only jpg and png files are allowed',
      test: (value) => {
        if (!value) return true;
        const file = Object.values(value)?.[0];
        if (file && file instanceof File) {
          return file.type === 'image/jpeg' || file.type === 'image/png';
        }
      },
    })
    .test('fileSize', 'File size must not be more than 3MB', (value) => {
      if (!value) return true;
      const file = Object.values(value)?.[0];
      if (file && file instanceof File) {
        return file.size <= 3145728;
      }
    }),
  country: yup.string().required('Country is required'),
});

export type FormDataSchema = yup.InferType<typeof validationSchema>;
