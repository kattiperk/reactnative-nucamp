import { Platform, View } from "react-native";
import Constants from "expo-constants";
import CampsiteInfoScreen from "./CampsiteInfoScreen";
import DirectoryScreen from "./DirectoryScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "./HomeScreen";
import AboutScreen from "./AboutScreen";    
import ContactScreen from "./ContactScreen";

const Drawer = createDrawerNavigator();
////////// NOTE: You can get rid of this line since a new Stack Navigator is created for each screen. I will comment this out.
/*  const Stack = createStackNavigator();   */
////////// END NOTE

const screenOptions = {
  headerTintColor: "#fff",
  headerStyle: { backgroundColor: "#5637DD" },
};

const HomeNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Home" }}
      />
    </Stack.Navigator>
  );
};

const DirectoryNavigator = () => {
  const Stack = createStackNavigator();
  return (
////////// NOTE: If you call your Stack.Screen "DirectoryMain", then this initial route prop has to match it.
// OLD CODE:      <Stack.Navigator initialRouteName="Directory" screenOptions={screenOptions}>
    <Stack.Navigator initialRouteName="DirectoryMain" screenOptions={screenOptions}>
{
////////// END NOTE
}
      <Stack.Screen
        name="DirectoryMain"
        component={DirectoryScreen}
        options={{ title: "Campsite Directory" }}
      />
      <Stack.Screen
        name="CampsiteInfo"
        component={CampsiteInfoScreen}
        options={({ route }) => ({
          title: route.params.campsite.name,
        })}
      />
    </Stack.Navigator>
  );
};

// About Navigator
const AboutNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="AboutMain"
                component={AboutScreen}
                options={{ title: 'About Us' }}
                />
        </Stack.Navigator>
    );
};

// Contact Navigator
const ContactNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="ContactMain" 
                component={ContactScreen} 
                options={{ title: 'Contact Us' }}
            />
        </Stack.Navigator>
    );
};

const Main = () => {
  return (
    <View
      style={{
        flex: 1,
        paddingTop: Platform.OS === "ios" ? 0 : Constants.statusBarHeight,
      }}
    >
      <Drawer.Navigator
        initialRouteName="HomeNav"
        screenOptions={{
          drawerStyle: { backgroundColor: "#CEC8FF" },
          headerShown: true,
        }}
      >
        <Drawer.Screen
          name="HomeNav"
          component={HomeNavigator}
          options={{
            title: "Home",
            headerShown: false,
          }}
        />
        <Drawer.Screen
          name="DirectoryNav"
          component={DirectoryNavigator}
          options={{
            title: "Campsite Directory",
            headerShown: false,
          }}
        />
        <Drawer.Screen 
            name="AboutNav" 
            component={AboutNavigator} 
            options={{ title: 'About Us', headerShown: false }} 
        />
        <Drawer.Screen 
            name="ContactNav" 
            component={ContactNavigator} 
            options={{ title: 'Contact Us', headerShown: false }} 
        />
      </Drawer.Navigator>
    </View>
  );
};

export default Main;
