export default function (configuration, authHeader, apiEndpoint, method, url, params, success, catcher, transform, requestData) {
  return axios({
    method,
    headers: authHeader,
    baseURL: apiEndpoint,
    url,
    transformResponse: transform,
    params,
    data: requestData,
  })
    .then((json) => {
      const { data } = json;
      return success ? success(data) : json;
    })
    .catch((err) => {
      let exception = {
        object: 'error.server',
        code: 500,
        message: 'error.server',
        url,
      };

      if (
        err.response &&
          err.response.data &&
          typeof err.response.data === 'object'
      ) { exception = err.response.data; }
      bus.$emit('serviceError', exception);
      return Promise.reject(exception);
    });
}
