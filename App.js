import React, { useState } from "react";
import { Alert,Button, Text, SafeAreaView, View,Pressable,StyleSheet,FlatList,ScrollView} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import {DATA} from "./data"
import axios from 'axios';
import * as FileSystem from 'expo-file-system';




const Header = (props)=>{
  return(
    <View style={styles.header}>
      <Text style={styles.fontSize}>{props.logo}</Text>
    </View>
  )
}
const NewCryptoBoxes = (props)=>{
  return(
    <View style={styles.innerBoxes}>
        <View style={styles.boxFlow}>
        <Text style={styles.boxBigText}>{props.name}</Text>
        <Text style={styles.boxSmallText}>{props.symbol}</Text>
        </View>
        <View style={styles.boxFlow}>
        <Text style={styles.boxBigText}>{props.arrow}</Text>
          <Text style={styles.boxBigText}>{props.price}</Text>
        </View>
        <View style={styles.boxFlow}>
        <Text style={styles.boxBigText}>{props.change}</Text>
          <Text style={styles.boxSmallText}>{props.changeTime}</Text>
        </View>
    </View>
  )
}

const getMarketData = async (props) => {
  try{
  const response = await axios.get('https://api.binance.com/api/v3/ticker/24hr?symbol=BTCUSDT')

  
  saveFile = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status === "granted") {
        let fileUri = FileSystem.documentDirectory + "text.txt";
        await FileSystem.writeAsStringAsync(fileUri,response.data,{ encoding: FileSystem.EncodingType.UTF8 })
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync("Download", asset, false)
    }
}
  return response.data
  }catch(error){

      console.log(error.message)

    
  }
}


const App =  () =>{
  return(
    <SafeAreaView style={{flex:1}}>
      <Header  logo='NEW CRYPTO SCANNER'/>
        <FlatList style={styles.body} 
        keyExtractor={(item) =>item.name}
        data={getMarketData()} renderItem={({item}) => <NewCryptoBoxes name='BTCUSDT' symbol={item.symbol} arrow='upper' price={item.lastPrice} change={item.priceChangePercent} changeTime='24hr' /> } />
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
header: {
  justifyContent: 'center',
  alignItems: 'center',
  width: responsiveWidth(100),
  height: responsiveHeight(10),
  borderBottomWidth:2,
},
body:{
  height: responsiveHeight(90),
  flex:1,
},
fontSize:{
  fontSize:responsiveFontSize(2)
},
innerBoxes:{
  width: responsiveWidth(95),
  margin:responsiveWidth(2.5),
  height: responsiveHeight(10),
  borderRadius:5,
  flexDirection:'row',
  alignContent: 'space-between',
  backgroundColor:'black'
  
},
boxBigText:{
  color:'white',
  fontSize: responsiveFontSize(2),
},
boxSmallText:{
  color:'lightgray',
  fontSize: responsiveFontSize(1),
},
boxFlow:{
  width: responsiveWidth(31),
  justifyContent:'center',
  alignItems:'center'
}



})



export default App;