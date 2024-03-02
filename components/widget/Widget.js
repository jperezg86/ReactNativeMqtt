import Icon  from "react-native-vector-icons/FontAwesome"
import { View, Text } from 'react-native'
import Styles from "./styles"


export default function Widget({
    title,
    iconName,
    measure
}) {
    return <View style={Styles.WidgetWrapper}>
        <View style={Styles.WidgetHeader}>
            <Icon
                name={iconName}
                size={28}
                color='#fff'
            />
            <Text style={Styles.WidgetTitle}>{title}</Text>
        </View>
        <View style={Styles.WidgetContent}>
            <Text style={Styles.WidgetMeasure}>{measure || 'Sin datos'}</Text>
        </View>
    </View>
}
