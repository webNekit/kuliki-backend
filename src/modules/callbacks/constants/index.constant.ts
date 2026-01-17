export const CALLBACK_ERRORS = {
    NOT_FOUND: 'Callback request not found',
    UNAUTHORIZED: 'Only administrators can view or manage callback requests',
} as const;
  
export const CALLBACK_DEFAULTS = {
    PAGE: 1,
    LIMIT: 20,
} as const;