import Joi from 'joi';

export const authSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Format email tidak valid',
    'string.empty': 'Email wajib diisi',
  }),
  password: Joi.string().min(6).required().messages({
    'string.min': 'Password harus memiliki minimal 6 karakter',
    'string.empty': 'Password wajib diisi',
  }),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.min': 'Password harus memiliki minimal 6 karakter',
    'string.empty': 'Email wajib diisi',
  }),
});
