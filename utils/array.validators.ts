export const cleanStringArray = (arr?: string[]): string[] => {
  return arr?.map((str) => str.trim()).filter(Boolean) || [];
};

export const hasAtLeastOneNonEmpty = (arr?: string[]): boolean => {
  return (arr ?? []).some((str) => str.trim().length > 0);
};

export const isValidOptionalStringArray = (arr?: string[]): boolean => {
  return !arr?.length || hasAtLeastOneNonEmpty(arr);
};

export const maxArrayLength =
  (max: number) =>
  (arr?: any[]): boolean => {
    return (arr?.length || 0) <= max;
  };

export const optionalArrayOf = (validator: (val: string) => boolean) => {
  return (arr?: string[]): boolean => {
    if (!arr?.length) return true;

    return arr.every((item) => {
      const val = item.trim();
      return !val || validator(val);
    });
  };
};
