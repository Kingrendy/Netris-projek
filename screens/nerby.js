import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Separator, Button, AuthTextInput, PwdInput } from "../components";
import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});

const Nerby = ({ navigation }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [chooseItem, setChooseItem] = useState(0);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation(location.coords);
      } catch (error) {
        setError("Error getting user location: " + error);
      }
    };
    fetchCurrentLocation();
  }, []); // Make sure to add empty dependency array to run the effect only once on mount

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const listTambalBan = [
    {
      id: 0,
      nama: "Tambal ban cak imin",
      tipe: "Bengkel motor",
      alamat: "Jl. rungkut",
      jam: "08.00 - 21.00",
      harga: "Rp 50.000",
    },
    {
      id: 1,
      nama: "Tambal ban jetis kulon",
      tipe: "Bengkel motor",
      alamat: "Jl. ngagel",
      jam: "08.00 - 21.00",
      harga: "Rp 50.000",
    },
    {
      id: 2,
      nama: "Tambal ban mas bro",
      tipe: "Bengkel motor",
      alamat: "Jl. ketintang",
      jam: "08.00 - 21.00",
      harga: "Rp 50.000",
    },
    {
      id: 3,
      nama: "Tambal ban sis",
      tipe: "Bengkel mobil",
      alamat: "Jl. wonokromo",
      jam: "08.00 - 21.00",
      harga: "Rp 100.000",
    },
    {
      id: 4,
      nama: "Tambal ban pak dono",
      tipe: "Bengkel mobil",
      alamat: "Jl. jagir",
      jam: "08.00 - 21.00",
      harga: "Rp 100.000",
    },
    {
      id: 5,
      nama: "Tambal ban banjaya",
      tipe: "Bengkel motor",
      alamat: "Jl.bratang",
      jam: "08.00 - 21.00",
      harga: "Rp 50.000",
    },
    {
      id: 6,
      nama: "Tambal ban barokah",
      tipe: "Bengkel motor",
      alamat: "Jl. nias",
      jam: "08.00 - 21.00",
      harga: "Rp 50.000",
    },
  ];

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setChooseItem(item.id);
        }}
        style={{
          height: windowHeight * 0.3, // Adjusted height to accommodate new text elements
          width: windowWidth * 0.8,
          borderRadius: 10,
          backgroundColor: index === chooseItem ? "#DCCDE5" : "#FFFFFF",
          borderWidth: 2,
          borderColor: "#A7A7A7",
          marginHorizontal: 15,
          marginVertical: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
            source={require("../assets/tambalBan.jpg")}
          />
        </View>
        <View style={{ flex: 1.5, paddingLeft: 10, justifyContent: "center" }}>
          <Text
            style={{
              fontFamily: "Inter_700Bold",
              fontSize: 16,
              color: "#5A1781",
            }}
          >
            {item.nama}
          </Text>
          <Separator h={3} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
            }}
          >
            {item.tipe}
          </Text>
          <Separator h={3} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
            }}
          >
            {item.alamat}
          </Text>
          <Separator h={3} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
            }}
          >
            Jam: {item.jam}
          </Text>
          <Separator h={3} />
          <Text
            style={{
              fontFamily: "Inter_400Regular",
              fontSize: 12,
            }}
          >
            Harga: {item.harga}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 3 }}>
        <MapView
          showsUserLocation={true}
          showsCompass={true}
          initialRegion={{
            latitude: parseFloat(-7.3385169),
            longitude: parseFloat(112.719163),
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
          style={{ width: "100%", height: "100%" }}
        ></MapView>
      </View>
      <View
        style={{ flex: 1.5, justifyContent: "center", alignItems: "center" }}
      >
        <FlatList
          data={listTambalBan}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default Nerby;