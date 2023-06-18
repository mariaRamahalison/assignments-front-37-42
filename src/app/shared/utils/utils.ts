export const options = {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  };