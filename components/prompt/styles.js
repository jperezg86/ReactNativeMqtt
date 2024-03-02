import { StyleSheet } from "react-native"
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(134,134,134,0.8)',
      },
      modal: {
        margin: 0,
        padding: 20,
        backgroundColor: 'black',
        borderRadius: 10,
        alignItems: 'center',
        width: '90%',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      actionButtons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems:'end',
        width: '100%',
        marginTop: 20,
      }
})