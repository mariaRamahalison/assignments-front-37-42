export const options = {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  };

export const environment = {
  api_url: "http://localhost:8010/api"
}