import { REGEX_USER_NAME } from './constants';

export default function validateUsername(username) {
  return REGEX_USER_NAME.test(username);
}
