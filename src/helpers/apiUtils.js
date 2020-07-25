function checkStatus(response) {
  if (!response.ok) {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

function parseJSON(response) {
  return response.json();
}

const requestHeaderOptions = (method, body = null) => {
  return {
    method: method.toUpperCase(),
    headers: { 'Content-Type': 'application/json' },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };
};

const onRequestPending = actionType => ({
  type: `${actionType}_PENDING`,
});

const onRequestSuccess = (actionType, payload) => ({
  type: `${actionType}_FULFILLED`,
  payload,
});

const onRequestFailure = (actionType, payload) => ({
  type: `${actionType}_REJECTED`,
  payload,
});

/**
 * A utility to call a restful service.
 *
 * @param url The restful service end point.
 * @param actionType The request action.
 * @param method The http method.
 * @param payload The method body. Can be null.
 */

export const callApi = (url, actionType, method, payload) => {
  return async (dispatch) => {
    dispatch(onRequestPending(actionType));
    try {
      const response = await fetch(url, requestHeaderOptions(method, payload));
      const responseChecked = await checkStatus(response);
      const parsedJson = await parseJSON(responseChecked);

      dispatch(onRequestSuccess(actionType, parsedJson));
    } catch (error) {
      const { response } = error;

      if (response === undefined) {
        dispatch(onRequestFailure(actionType, error));
      } else {
        error.status = response.status;
        error.statusText = response.statusText;
        response.text().then((text) => {
          try {
            const json = JSON.parse(text);
            error.message = json.message;
          } catch (ex) {
            error.message = text;
          }
          dispatch(onRequestFailure(actionType, error));
        });
      }
    }
  };
} 
