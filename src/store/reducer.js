

const reducer = (state,action) => {
    switch(action.type) {
        case 'GET_NEWS':
            return {
                ...state,
                topNews: action.payload.topNews,
                allNews: action.payload.allNews,
                remainingNews: action.payload.remainingNews
            }
        case 'GET_SELECTED_NEWS':
            return {
                ...state,
                selectedNews: action.payload
            }
        case 'SET_NOTIFICATION':
            return {
                ...state,
                notification: {
                    ...state.notification,
                    status: true,
                    content: action.payload
                }
            }
        case 'HIDE_NOTIFICATION':
            return {
                ...state,
                notification: {
                    status: false,
                    content: null
                }
            }
        case 'AUTH_USER':
            return {
                ...state,
                auth: true,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                auth: null,
                user: null
            }
        default: 
            return state;
    }
}

export default reducer;