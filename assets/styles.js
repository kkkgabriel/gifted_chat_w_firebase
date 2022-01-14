import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
	p: {
		fontSize: 18
	},
	h2: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	vbig: {
		fontSize: 50
	},
	big: {
		fontSize: 25
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%'
	},
	button: {
		padding: 20,
		backgroundColor: 'blue',
		borderRadius: 10,
		marginTop: 10
	},
	buttonText: {
		fontSize: 20,
		color: 'white'
	}
})

export default Styles;
