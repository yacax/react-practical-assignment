import { REGEX_USER_NAME } from './config';

export default function validateUsername(username) {
  return REGEX_USER_NAME.test(username);
}
