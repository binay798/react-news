import {useContext,createContext,useReducer} from 'react'
import reducer from './reducer'
const GlobalState = createContext()


export const useStore = () => {
    const [state,dispatch] = useContext(GlobalState)

    return [state,dispatch]
}

const initialState = {
    auth:null,
    user: null,
    news: null,
    selectedNews: null,
    topNews: null,
    allNews: null,
    remainingNews: null,
    notification: {
        status: false,
        content: null
    }
}

const Store = ({children}) => {
    const [state,dispatch] = useReducer(reducer,initialState)
    return (
        <GlobalState.Provider value={[state,dispatch]}>
            {children}
        </GlobalState.Provider>
    )
}

export default Store;