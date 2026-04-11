export const isNotEmpty = (value?: string): boolean => {
  return !!value && value.trim().length > 0;
};

export const minLength =
  (min: number) =>
  (value?: string): boolean => {
    return (value?.trim().length || 0) >= min;
  };

export const maxLength =
  (max: number) =>
  (value?: string): boolean => {
    return (value?.trim().length || 0) <= max;
  };

export const isEmail = (value?: string): boolean => {
  if (!value) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const isStrongPassword = (value?: string): boolean => {
  if (!value) return false;
  return /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(value);
};

export const isURL = (value?: string): boolean => {
  if (!value) return false;
  return /^(http|https):\/\/[^ "]+$/.test(value);
};

export const isColombianPhone = (value?: string): boolean => {
  if (!value) return false;

  const clean = value.replace(/\s+/g, "");

  return /^3\d{9}$/.test(clean) || /^6\d{9}$/.test(clean);
};
