import { ADD_BESTFACES } from './RankActions';

const initialState = { data: [] };

const BestFaceReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_BESTFACES:
            return {
                data: action.faces
            };
        default:
            return state;
    }
};

export const getBestFaces = state => state.rank.data;

export default BestFaceReducer;