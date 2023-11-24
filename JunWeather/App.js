import { StatusBar } from 'expo-status-bar';
import * as Location from 'expo-location';
import {Text, View, StyleSheet, ScrollView, Dimensions, ActivityIndicator} from 'react-native';
import {useEffect, useState} from "react";
import { Fontisto } from '@expo/vector-icons';

const SCREEN_WIDTH = Dimensions.get("window").width;

/* api키는 서버에 두자 */
const API_KEY = "30f5d0aeea1f6d19afdfdfba12b5082d";

const icons = {
    Clouds: "cloudy",
    Clear: "day-sunny",
    Rain: "rain",
    Atmosphere: "cloudy-gusts",
    Snow: "snow",
    Drizzle: "rains",
    Thunderstorm: "lightnings",
}

export default function App() {

    const [region, setRegion] = useState("Loading...")
    const [days, setDays] = useState([]);
    const [ok, setOk] = useState(true);
    const getWeather = async () => {
        const {granted} = await Location.requestForegroundPermissionsAsync();
        if (!granted) {
            setOk(false);
        }
        const {coords:{latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5})
        const location = await Location.reverseGeocodeAsync({latitude,longitude},{useGoogleMaps: false} )
        setRegion(location[0].region)
        const { list } = await (
            await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
        ).json();
        const filteredList = list.filter(({ dt_txt }) => dt_txt.endsWith("03:00:00"));
        console.log(filteredList)
        setDays(filteredList);
    }
    useEffect(() => {
        getWeather();
    }, []);


    return <View style={styles.container}>
        <View style={styles.city}>
            <Text style={styles.cityname}>{region}</Text>
        </View>
        <ScrollView
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.weather}>
            {days.length === 0 ? (
                <View style={styles.loding}>
                    <ActivityIndicator
                        color="white"
                        size={"large"}
                        style={{marginTop: 10}}
                    />
                </View> ) : (
                    days.map((day, index) =>
                        <View key={index} style={styles.day}>
                            <View style={{
                                flexDirection: "row",
                                alignItems: "center",
                                width: "100%",
                                justifyContent: "space-between"}}>
                                <Text style={styles.temp}>
                                    {parseFloat(day.main.temp).toFixed(1)}
                                </Text>
                                <Fontisto name={icons[day.weather[0].main]} size={68} color="white" style={{marginTop: -50, marginRight: 25}} />
                            </View>
                            <Text style={styles.description}>{day.weather[0].main}
                            </Text>
                            <Text style={styles.tinyText}>{day.weather[0].description}
                            </Text>
                        </View>
                    )
                )}
        </ScrollView>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "tomato"
    },
    city: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        fontFamily: ''
    },
    cityname: {
        fontSize: 68,
        fontWeight: "500",
        color: "white"
    },
    weather: {
        marginLeft: 15,
    },
    day: {
        alignItems: "flex-start",
        width: SCREEN_WIDTH,
    },
    loding: {
        alignItems: "center",
        width: SCREEN_WIDTH,
    },
    temp: {
        marginTop: 20,
        fontSize: 178,
        color: "white",
    },
    description: {
        marginTop: -30,
        fontSize: 60,
        color: "white"
    },
    tinyText: {
        fontSize: 20,
        color: "white"
    },

});

