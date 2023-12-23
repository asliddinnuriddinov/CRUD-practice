let initialState={
    searchData:[]
}

const SearchReducer=(state=initialState,action)=>{
    switch(action.type){
        case "SET_SEARCH_DATA":
            return({
                searchData:[...action.searchDataPassed]
            })

        default:
            return state
    }
}

export default SearchReducer