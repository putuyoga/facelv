import callApi from '../../utils/apiCaller';

export const ADD_FACES = 'ADD_FACES';

export function addFaces(faces) {
    return {
        type: ADD_FACES,
        faces
    };
}

export function fetchFaces() {
    return (dispatch) => {
        return callApi('faces').then(res => {
            dispatch(addFaces(res));
        });
    };
}