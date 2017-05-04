export const errorHandler = function(response) {
    if (!response.ok) {
        console.log('ERROR',response);
        throw Error(response.statusText);
    } else {
        return response;
    }
};