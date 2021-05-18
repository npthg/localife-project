import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 15,
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'cover',

  },

  bedrooms: {
    marginVertical: 10,
    color: '#5b5b5b',
    marginLeft: 10
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    marginLeft: 10
  },
  prices: {
    fontSize: 18,
    marginVertical: 10,
    marginLeft: 10,
    marginBottom: 15
    
  },
  oldPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'line-through',
    marginLeft: 10
  },
  price: {
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
  },
  typetxt:{
    fontSize: 12
    
  }
});

export default styles;
