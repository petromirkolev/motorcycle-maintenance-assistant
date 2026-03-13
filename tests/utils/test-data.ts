export const validInput = {
  email: 'test@test.test',
  diffrentConfirmEmail: 'test1@test.test',
  password: 'T3sting1',
  strongPassword: 'T3sting@123',
  veryStrongPassword: 'T3stingStrong@!123',
};

export const confirmEmailInput = {
  invalidBoth: {
    email: 'test@test.',
    confirmEmail: 'test@test.',
    testDescription: 'Fill in invalid email and invalid confirm email.',
    errorMessage: 'Please enter a valid email address',
    errorField: 'email',
  },
  mismatch: {
    email: 'test@test.net',
    confirmEmail: 'test@testa.net',
    testDescription: 'Fill in valid email and different confirm email.',
    errorMessage: 'Emails do not match',
    errorField: 'confirmEmail',
  },
  emptyBoth: {
    email: '                  ',
    confirmEmail: '                  ',
    testDescription: 'Fill in empty spaces for email and confirm email.',
    errorMessage: 'Email is required',
    errorField: 'email',
  },
};

export const invalidEmailInput = {
  invalidEmailTooLong: {
    value: 'test@test1234567891234.net',
    testDescription: 'Fill in invalid email address above max length.',
    errorMessage: 'Email must not exceed 25 characters',
  },
  invalidEmailEmpty: {
    value: '            ',
    testDescription: 'Fill in invalid email address only empty spaces.',
    errorMessage: 'Email is required',
  },
  invalidEmailNoTld: {
    value: 'test@test.',
    testDescription: 'Fill in invalid email with no TLD.',
    errorMessage: 'Please enter a valid email address',
  },
  invalidEmailNoDot: {
    value: 'test@test',
    testDescription: 'Fill in invalid email with no dot in domain.',
    errorMessage: 'Please enter a valid email address',
  },
  invalidEmailNoAt: {
    value: 'testtest.net',
    testDescription: 'Fill in invalid email with no @ symbol.',
    errorMessage: 'Please enter a valid email address',
  },
  invalidEmailNoDomain: {
    value: 'test@test.',
    testDescription: 'Fill in invalid email with no domain.',
    errorMessage: 'Please enter a valid email address',
  },
  invalidEmailNoUser: {
    value: '@test.net',
    testDescription: 'Fill in invalid email with no user part.',
    errorMessage: 'Please enter a valid email address',
  },
  invalidEmailNoUserOrDomain: {
    value: '@.net',
    testDescription: 'Fill in invalid email with no user and no domain.',
    errorMessage: 'Please enter a valid email address',
  },
  invalidEmailNoUserOrTld: {
    value: '@test.',
    testDescription: 'Fill in invalid email with no user and no TLD.',
    errorMessage: 'Please enter a valid email address',
  },
  invalidEmailNoUserOrDomainOrTld: {
    value: '@test',
    testDescription:
      'Fill in invalid email with no user, no domain, and no TLD.',
    errorMessage: 'Please enter a valid email address',
  },
};

export const invalidPassword = {
  invalidPasswordEmptySpaces: {
    invalidPasswordValue: '         ',
    testDescription: 'Fill in invalid password empty spaces.',
    errorMessage: 'Password must contain at least one capital letter',
  },
  invalidPasswordTooShort: {
    invalidPasswordValue: 'T3stt',
    testDescription: 'Fill in invalid password too short.',
    errorMessage: 'Password must be between 6 and 20 characters',
  },
  invalidPasswordNoUppercase: {
    invalidPasswordValue: 't3sting',
    testDescription: 'Fill in invalid password no uppercase.',
    errorMessage: 'Password must contain at least one capital letter',
  },
  invalidPasswordTooLong: {
    invalidPasswordValue: 'T3stingT3stingT3stingT3stingT3stingT3sting',
    testDescription: 'Fill in invalid password too long.',
    errorMessage: 'Password must be between 6 and 20 characters',
  },
  invalidPasswordNoDigit: {
    invalidPasswordValue: 'Testing',
    testDescription: 'Fill in invalid password no digit.',
    errorMessage: 'Password must contain at least one digit',
  },
};

export const validPasswordStrength = {
  weak: 'Aaaaaa',
  moderate: 'T3sting',
  strong: 'T3sting123!',
  veryStrong: 'T3sting!Strong',
};
