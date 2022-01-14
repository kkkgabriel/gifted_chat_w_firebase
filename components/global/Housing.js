import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Housing = ({ children, alignItems='center' }) => {
	return (
		<View>
			<View style={{...styles.housing, alignItems: alignItems}}>
			 	{ children }
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	housing: {
		padding: 15,
		borderColor: 'black',
		borderStyle: 'solid',
		borderWidth: 1,
		backgroundColor: 'ghostwhite',
		height: '100%',
		width: '100%',
		justifyContent: 'center'
	}
})

export default Housing
