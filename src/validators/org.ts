import { body } from 'express-validator'

export const loginValidator = [
  body('email', 'Email cannot not Empty').not().isEmpty(),
  body('email', 'Invalid email').isEmail(),
  body('password', 'The minimum password length is 6 characters').isLength({min: 6}),
]
export const registerValidator = [
  ...loginValidator,
  body('firstName', 'First name cannot not Empty').not().isEmpty(),
  body('lastName', 'Last name cannot not Empty').not().isEmpty(),
]

export const createOrgValidator = [
    body('orgName', 'organization name cannot be empty').not().isEmpty(),
    body('orgIndustry', 'organization industry cannot be empty').not().isEmpty(),
]

export const addUserOrgValidator = [
    body('userEmail', 'user name cannot be empty').not().isEmpty()
]
