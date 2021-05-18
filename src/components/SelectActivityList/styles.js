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
    color: '#fff',
    fontSize: 10
  },
  description: {
    fontSize: 15,
    color: '#fff',
  },
  prices: {
    fontSize: 15,
    marginVertical: 10,
    color: '#fff',
  },
  oldPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'line-through',
  },
  price: {
    fontWeight: 'bold',
    color: '#fff',
  },
  totalPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
  },
  typetxt:{
    fontSize: 12,
    color: '#fff',
  }
});

export default styles;
