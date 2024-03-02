import { StyleSheet } from 'react-native'

const Styles = StyleSheet.create({
    WidgetWrapper: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius:8,
        color: 'white'
    },
  
    WidgetHeader: {
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        color: 'white',
        borderBottomWidth: 2,
        borderColor: '#fff'
    },
    
    WidgetTitle: {
      paddingLeft: 12,
      fontSize: 24,
      color: '#fff',
    },

    WidgetContent: {
        padding: 18,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },

    WidgetMeasure: {
        fontSize: 32,
        color: 'white',
        width: '100%',
        textAlign: 'center',
    } 
})

export default Styles
