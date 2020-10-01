import React from "react";
import { Text, StyleSheet, View, Button, TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => { 
  // props: all different object properties=
  // navigate: pulling off element from props property

  // Navigation between screens
  return <View>
    <Text style={styles.text}>Hi there!</Text>
    <Button 
      onPress={() => navigation.navigate('Components')}
      title="Go to Components Demo" 
      />
    <Button
      onPress={() => navigation.navigate('List')}
      title="Go to List Demo"
    />
    <Button
      onPress={() => navigation.navigate('Image')}
      title="Go to Image Demo"
    />
    <Button
      onPress={() => navigation.navigate('Counter')}
      title="Go to Counter Demo"
    />
    <Button
      onPress={() => navigation.navigate('Color')}
      title="Go to Color Demo"
    />
    <Button
      onPress={() => navigation.navigate('Square')}
      title="Go to Square Demo"
    />
    <Button
      onPress={() => navigation.navigate('Text')}
      title="Go to Text Demo"
    />
    <Button
      onPress={() => navigation.navigate('Box')}
      title="Go to Box Demo"
    />


    {/* <TouchableOpacity onPress={() => props.navigation.navigate('List')}>
      <Text>Go to List Demo</Text>
      <Text>Go to List Demo</Text>
    </TouchableOpacity> */}


    </View>
};

const styles = StyleSheet.create({
  text: {
    fontSize: 30
  }
});

export default HomeScreen;

