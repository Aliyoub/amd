const initialState = {
    favoritesAssMat: []
}

function toggleFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteAssMatIndex = state.favoritesAssMat.findIndex(item => item.assMatKey === action.value.assMatKey)
            if (favoriteAssMatIndex !== -1) {
                // Le AssMat est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,  // ATTENTION : Ne pas retirer le 'item' en dessous
                    favoritesAssMat: state.favoritesAssMat.filter((item, index) => index !== favoriteAssMatIndex)
                }
            } else {
                // Le AssMat n'est pas dans les AssMats favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    favoritesAssMat: [...state.favoritesAssMat, action.value]
                }
            }
            //renvoie nextState  si celui-ci n'est pas undefined, sinon on renvoie state           
            return nextState || state
        default:
            return state
    }
}
export default toggleFavorite