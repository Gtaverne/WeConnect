import React from 'react';

import { Text, View } from "react-native";

const Bubble = props => {
  if (props.direction) {
    return (
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: 20,
          paddingBottom: 0,
          paddingTop: 10,
        }}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 100,
            height: 30,
            width: 30,
            marginTop: 3.5,
            marginRight: 10,
            opacity: 0.3,
          }}
        />

        <View style={{maxWidth: '60%'}}>
          <View style={{backgroundColor: 'white', borderRadius: 7}}>
            <Text style={{color: 'black', padding: 10}}>{props.content}</Text>
          </View>
          <View
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              width: 10,
              height: 10,
              left: -3,
              top: 22.7,
              transform: [{rotate: '45deg'}],
            }}
          />
        </View>
        <View style={{flex: 1}} />
      </View>
    );
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        padding: 20,
        paddingBottom: 0,
        paddingTop: 10,
      }}>
      <View style={{flex: 1}} />
      <View style={{maxWidth: '60%'}}>
        <View style={{backgroundColor: 'white', borderRadius: 7}}>
          <Text style={{color: 'black', padding: 10}}>{props.content}</Text>
        </View>
        <View
          style={{
            position: 'absolute',
            backgroundColor: 'white',
            width: 10,
            height: 10,
            right: -3,
            top: 22.7,
            transform: [{rotate: '45deg'}],
          }}
        />
      </View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 100,
          height: 30,
          width: 30,
          marginTop: 3.5,
          marginLeft: 10,
          opacity: 0.3,
        }}
      />
    </View>
  );
};

export default Bubble;
