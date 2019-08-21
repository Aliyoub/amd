export const style = new class StyleProvider{
    getMyItemStyle(){
        return{
            main_container: {
                width: '100%',
                color: 'red',
                flexDirection: 'row',
                alignItems: 'stretch'
            },
            blocAtTheBottomOfItem: {
                flexDirection: 'row',
                justifyContent: 'space-between',
            },
            userInfosWithoutAvatar: {
                flexDirection: 'column',
                flex: 1,
                alignItems: 'center'
            },
            user_name: {
                marginLeft: 15,
                color: '#AC1354',
                //color: '#C50707',
                fontWeight: 'bold',
                fontSize: 14

            },
            user_address: {
                marginLeft: 15,
                color: '#AC1354',
                //color: '#C50707',
                fontWeight: 'bold',
                fontSize: 14
            },
            user_dispo: {
                marginLeft: 15,
                color: '#FFF',
                fontWeight: 'bold',
                fontSize: 14,
                backgroundColor: '#FF99DC',
                padding: 3,
                borderRadius: 100
            },
            user_places: {
                marginLeft: 15,
                color: '#B86547',
                fontWeight: 'bold',
                fontSize: 14
            },
            user_agrement: {
                marginLeft: 15,
                color: '#B86547',
                fontWeight: 'bold',
                fontSize: 14
            },
            myVoirPlusButton: {
                fontSize: 10
            }
        }
    }
    getLoginStyle() {
        return{
        }
    }
    
}