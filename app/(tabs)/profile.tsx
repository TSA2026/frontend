import React from "react";
import { Text, View } from "react-native";
import { TouchableOpacity, Image } from 'react-native';


const Profile = () => {

  return (
    <View className="flex-1  bg-black ">


      <View className="absolute top-20 left-5">
        <Text className="font-bold text-5xl items-end color-white mt-10">Settings</Text>
      </View>
        
        {/*
          <View className=" w-[65vh] h-[75vh] bg-[#191818] rounded-md ">
        */}
          
          
          
          
          
          
          
          <View className=" flex-1 items-center justify-center">


            <View className="flex-row flex-wrap w-100">
           
            
          <View className=' p-4 w-1/2' >
                <TouchableOpacity  >
                  <View className='items-center' style={{
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
      }}> 
                    <Image 
                      source={require('../../assets/images/Account.png')} className=' tint-white w-29 h-29 border-2 border-white rounded-lg  p-1 m-2' style={{tintColor: '#fff'}} />
                  </View>
                </TouchableOpacity>
           

            <TouchableOpacity  >
                <View className='items-center' style={{
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
      }}>
                  <Image 
                    source={require('../../assets/images/Bluetooth.png')} className=' tint-white w-29 h-29  border-2 border-white rounded-lg shadow-lg p-1 m-2' style={{tintColor: '#fff'}} />
                </View>
            </TouchableOpacity>
          </View>
            
            
            <View className=" w-1/2 p-4">
            
            <TouchableOpacity  >
              <View className='items-center' style={{
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
      }}>
              <Image 
              source={require('../../assets/images/Modes.png')} className=' tint-white w-29 h-29 border-2 border-white rounded-lg shadow-lg p-1 m-2' style={{tintColor: '#fff'}} />
              </View>
            </TouchableOpacity>
           
            <TouchableOpacity  >
              <View className='items-center' style={{
        shadowColor: '#fff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
        elevation: 10,
      }}>
              <Image 
              source={require('../../assets/images/People.png')} className=' tint-white w-29 h-29 border-2  border-white rounded-lg shadow-lg p-1 m-2' style={{tintColor: '#fff'}} />
              </View>
            </TouchableOpacity>
           
            </View>
          </View>
      
      
      
      </View>
  </View>
 
  );
};

export default Profile;
