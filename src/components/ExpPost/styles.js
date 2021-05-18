import {StyleSheet, Dimensions} from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Dimensions.get('window').height - 130,
  },
  videPlayButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    zIndex: 100,
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  handle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10
  },
  description: {
    color: 'black',
    fontSize: 16,
    fontWeight: '300',
  },

  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#fff',
  },
  uiContainer: {
    height: '100%',
    justifyContent: 'flex-end',
  }, 
  rightContainer: {
    alignSelf: 'flex-end',
    height: 70,
    justifyContent: 'space-between',
    marginRight: 25,
  },
});

export default styles;
