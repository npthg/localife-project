import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#FCF6EE'
  },
  image: {
    width: '100%',
    aspectRatio: 3 / 2,
    resizeMode: 'cover',
    borderRadius: 10,
  },

  bedrooms: {
    marginVertical: 10,
    color: '#5b5b5b',
  },
  description: {
    fontSize: 26,
    lineHeight: 30,
    fontWeight: 'bold'
  },
  prices: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  price: {
    fontWeight: 'bold',
  },
  totalPrice: {
    color: '#5b5b5b',
    textDecorationLine: 'underline',
  },
  longDescription: {
    marginTop: 5,
    marginBottom: 20,
    fontSize: 16,
    lineHeight: 24,
  },
  typetxt: {
    fontSize: 12
  }
});

export default styles;
