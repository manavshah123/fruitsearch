/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from 'react';
import ActivityIndicator, {  Pressable } from "react-native";
import { Button } from 'react-native-paper';
import Cancle from "./cancel.png";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  Image,
  View,
} from 'react-native';
import axios from "axios";


const App = () => {

  const [text, setText] = useState("");
  const [apiData, setApiData] =  useState([]);
     const [loading,setLoading] = useState(false);
    var url ="https://api.dotshowroom.in/api/dotk/catalog/searchItems";

    const handleChange= text => {
        setLoading(true); 
      axios.post(url,{
            page:1,
            search_text: text,
            store_id:2490120,  
          
        }).then(data => {
           
            setApiData(data.data);
            console.log(data.data);
            
            setLoading(false);     
        })
        .catch(function(error){
            console.log("error",error); 
          
            
        })
    };
    

    const anotherFunc = () =>{
      setText('');
      setApiData(null);
  }
  return (
    <View style={{flex:1, backgroundColor:'#FFF'}}>
      <Text style={styles.textmovie}>Daily Fresh</Text>
      
      <View style={{flexDirection: 'row', margin:20}}>
      <TextInput placeholder='Enter' 
      value={text} 
      onChangeText={(texts) => {handleChange(texts), setText()}}  
      style={styles.searchbox}/>
    
      <Button icon={Cancle} mode="contained" onPress = {()=>  anotherFunc()} style={{height:40, marginVertical:10, marginLeft:-115}}>
        Clear
      </Button>
    </View>
      
      {
        loading? <Text style={{textAlign: 'center', justifyContent:'center', fontSize: 20}} > Loading... </Text> : null
      }

      <ScrollView >
        
          {apiData?.items?.map(results =>{
            return (
            <View style={{flex:1, flexDirection:'column', margin: 20, borderRadius: 20,borderWidth: 1,
            borderRadius: 4,
            borderColor: '#ddd',
            borderBottomWidth: 0,
            shadowColor: '#F5F5F5',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 10,
            elevation: 4,}}>
              <Image
                        style={{height: 170, width: 170, alignSelf:'center',marginTop: 20, borderColor:'#C0C0C0', borderRadius: 10, borderWidth: 4}}
                        source={{uri: results.image_url}}
                      />
              
              <Text style={styles.heading}>{results.name}</Text>
              <Text style={styles.year}>Price : {results.discounted_price}</Text>
            </View>
            );
          })}
          {
            !apiData?.items ? <Text style={{textAlign: 'center', justifyContent:'center', fontSize: 20}}>No Product Found</Text> : null
          }
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    padding:20
  },
  textmovie:{
    color: '#000',
    fontSize: 40,
    textAlign:'center',
    marginTop:20,
    fontFamily:'Redressed-Regular'
  },
  searchbox:{
    backgroundColor: '#DCDCDC',
    color:'black',
    fontSize:15,
    padding:15,
    width: "100%",
    borderRadius:8,
  },
  results:{
    flex:1,
    width :"100%",
    marginBottom:30,
  },
  heading:{
    color: '#000',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom:10,
    textAlign:'center',
    paddingLeft: 20,
    paddingRight:20,
    marginTop: 20
  },
  year:{
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    padding:10,
    paddingTop:2,
    paddingLeft: 20,
    textAlign:'center',
  },
});

export default App;
