import callApi from '../../utils/apiCaller';

export const ADD_BESTFACES = 'ADD_BESTFACES';

export function addBestFaces(faces) {
    return {
        type: ADD_BESTFACES,
        faces
    };
}

export function fetchBestFaces() {
    return (dispatch) => {
        return callApi('faces/best/5').then(res => {
            dispatch(addBestFaces(res));
        });
    };
}