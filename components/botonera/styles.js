import { StyleSheet } from 'react-native'

export default StyleSheet.create({
    botoneraWrapper: {
        margin: 18,
        display: 'flex',
        flexDirection: 'colunn',
    },
    botoneraButton: {
        backgroundColor: '#868686',
        padding: 24,
        marginBottom: 12,
        borderRadius: 8,
        borderWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space around',
    },
    botoneraButtonText: {
        color: 'white',
        paddingLeft: 12,
        fontSize: 22,
        width: '100%'
    }

})