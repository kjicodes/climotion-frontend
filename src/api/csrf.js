export const getCsrfToken = () => {
  const match = document.cookie.match(/(^|;\s*)csrftoken=([^;]+)/);
  if (match) {
    return match[2];
  } else {
    return null;
  }
};
