const initialState = {
    favoritesParents: []
}

function toggleParentsFavorite(state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_PARENTS_FAVORITE':
            const favoriteParentsIndex = state.favoritesParents.findIndex(item => item.parentKey === action.value.parentKey)
            if (favoriteParentsIndex !== -1) {
                // Le Parents est déjà dans les favoris, on le supprime de la liste
                nextState = {
                    ...state,  // ATTENTION : Ne pas retirer le 'item' en dessous
                    favoritesParents: state.favoritesParents.filter((item, index) => index !== favoriteParentsIndex)
                }
            } else {
                // Le Parents n'est pas dans les Parents favoris, on l'ajoute à la liste
                nextState = {
                    ...state,
                    favoritesParents: [...state.favoritesParents, action.value]
                }
            }
            //renvoie nextState  si celui-ci n'est pas undefined, sinon on renvoie state           
            return nextState || state
        default:
            return state
    }
}
export default toggleParentsFavorite