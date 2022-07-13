import { body, validationResult } from 'express-validator';

// error 검사
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ messasge: errors.array()[0] });
  }
  return next();
};

export const validatorLogin = [
  body('email')
    .trim()
    .isEmail()
    .normalizeEmail()
    .notEmpty()
    .withMessage('잘못된 이메일입니다.'),
  body('pw')
    .isLength({ min: 5 })
    .withMessage('비밀번호는 최소 5자리 이상이어야 합니다.'),
  validate,
];

export const validatorSignup = [
  ...validatorLogin,
  body('profile_img').optional({ nullable: true, checkFalsy: true }),
  validate,
];
