export const options = {
    headers: {
      Authorization: `${localStorage.getItem('token')}`,
    },
  };

export const environment = {
  api_url: "https://assignemts-api-andy-maria-37-42.onrender.com/api"
}