import { ERRORS } from 'shared';

import { DictionaryKey } from 'src/i18n';

export const errorToDictionaryKey: Record<ERRORS, DictionaryKey> = {
  [ERRORS.ALREADY_VOTED]: 'error.alreadyVoted',

  [ERRORS.BAD_ENDPOINT]: 'error.bad.endpoint',
  [ERRORS.BAD_REQUEST]: 'error.bad.request',

  [ERRORS.INVALID_ID]: 'error.invalid.id',

  [ERRORS.NOT_FOUND_IDEA]: 'error.notFound.idea',

  [ERRORS.PERMISSION_DENIED]: 'error.permissionDenied',

  [ERRORS.TOO_MANY_REQUESTS]: 'error.tooManyRequests',
  [ERRORS.TOO_MANY_VOICES]: 'error.tooManyVoices',
};
