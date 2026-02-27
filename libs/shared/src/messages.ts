export const MESSAGES = {
  USER_CREATE: 'user.create',
  USER_FIND_ALL: 'user.find_all',
  USER_FIND_ONE: 'user.find_one',
  LOG_EVENT: 'log.event',
} as const;

export const LOG_ACTIONS = {
  USER_CREATED: 'user.created',
  USER_CREATE_ERROR: 'user.create_error',
  USER_FETCHED: 'user.fetched',
  USER_FETCH_ERROR: 'user.fetch_error',
  USER_FETCH_ALL: 'user.fetch_all',
  USER_FETCH_ALL_ERROR: 'user.fetch_all_error',
  USER_NOT_FOUND: 'user.not_found',
} as const;
