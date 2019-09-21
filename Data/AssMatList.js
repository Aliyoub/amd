import  {_getDataRef} from '../Firebase/FirebaseConfig';

export const _getAssMatList = () => {
     _getDataRef('AssMatDispo').on('value', (childSnapshot) => {
        const assMatDispoList = [];
        childSnapshot.forEach((doc) => {
            assMatDispoList.push({
                key: doc.key,
                assMatid: doc.toJSON().id.value,
                assMatThumbnail: doc.toJSON().picture.thumbnail,
                assMatFirstName: doc.toJSON().name.first,
                assMatLastName: doc.toJSON().name.last,
                assMatStreet: doc.toJSON().location.street,
                assMatcity: doc.toJSON().location.city,
            })
        })
        return ({assMatUserFirstName:'testuser'})
        //return assMatDispoList
    })
}
