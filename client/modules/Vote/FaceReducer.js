import { ADD_FACES } from './FaceActions';

const initialState = { data: [] };

const FaceReducer = (state = initialState, action) => {
    switch(action.type) {        
        case ADD_FACES:
            return {
                data: action.faces
            };
        default:
            return state;
    }
};

export const getFaces = state => state.vote.data;

export default FaceReducer;