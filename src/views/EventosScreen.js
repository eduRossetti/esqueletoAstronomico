import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Button} from 'react-native';
import styles from '../styles/styles';

export default function EventosScreen({ navigation }) {
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.titulo}>Eventos Astronomicos da Semana</Text>
            <Button 
            title="Voltar"
            onPress={() => navigation.goBack()}/>
        </SafeAreaView>
    );
}