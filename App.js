import Main from './screens/MainComponent';
import { NavigationContainer } from '@react-navigation/native';
import 'web-streams-polyfill';

export default function App() {
    return (
        <NavigationContainer>
            <Main />
        </NavigationContainer>
    );
}