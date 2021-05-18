import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FCF6EE'
  },
  image: {
    width: '100%',
    height: 550,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  title: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#FCF6EE',
    width: '70%',
    marginLeft: 25,
    marginTop: 100
  },
  button: {
    backgroundColor: '#D7B298',
    width: 200,
    height: 40,
    borderRadius: 10,
    marginTop: 25,
    marginLeft: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black'
  },

  searchButton: {
    backgroundColor: '#fff',
    height: 40,
    width: Dimensions.get('screen').width - 20,
    borderRadius: 30,
    marginHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    zIndex: 100,
    elevation: (Platform.OS === 'android') ? 50 : 0
    
  },
  
  searchButtonText: {
    fontSize: 14,
    // fontWeight: 'none',
  },

  trendtxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    width: '70%',
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 10
  },
  bestarutxt: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    width: '70%',
    marginLeft: 15,
    marginTop: 25,
    marginBottom: 10
  },

  categorytxt:{
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    width: '70%',
    marginLeft: 15,
    marginTop: 25,
  }
});

export default styles;
