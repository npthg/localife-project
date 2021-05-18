import SwipeNavigator from 'react-native-swipe-navigation'
import Camera from '../screens/Camera'
import Localife from '../screens/Localife'

const swipeToCamera = SwipeNavigator({

    Localife:{
        screen: Localife,
        right: 'Camera'
    },

    Camera:{
        screen: Camera,
        type: 'over',
        left: '@BACK'
    }
});

export default swipeToCamera ;