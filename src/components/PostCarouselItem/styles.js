import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 140,
    padding: 5,


    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  innerContainer: {
    flexDirection: 'row',
    backgroundColor: '#1D565D',
    borderRadius: 10,
    overflow: 'hidden'
  },

  image: {
    height: '100%',
    aspectRatio: 1,
    resizeMode: 'cover',
  },

  bedrooms: {
    marginVertical: 10,
    color: 'white',
    fontSize: 12
  },
  description: {
    fontSize: 15,
    color: 'white',
  },
  prices: {
    fontSize: 15,
    marginVertical: 10,
  },
  oldPrice: {
    color: 'white',
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: 'bold',
    color: 'white',
  },
  totalPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
    color: 'white',
  },
  typetxt:{
    fontSize: 12,
    color: 'white',
  }
});

export default styles;
