import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, Modal, Image, ScrollView, Animated, Easing } from 'react-native';
import colors from './colors';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const imgStyles = {
  height:40, width:40, marginTop:5,
}

class HabitBox extends React.Component {

  renderAppropriateImage(whichCategory){
    
      switch (whichCategory) {
        case 'sport':
          return <Image source={require('./assets/images/sports.png')} style={imgStyles} /> ;
  
        case 'gardening' :  
          return <Image source={require('./assets/images/gardening.png')} style={imgStyles}/> ;
          
        case 'coffee' :  
        return <Image source={require('./assets/images/coffee.png')} style={imgStyles}/> ;  
        
        case 'book' :  
        return <Image source={require('./assets/images/book.png')} style={imgStyles}/> ; 

        case 'gym' :  
        return <Image source={require('./assets/images/exercise.png')} style={imgStyles}/> ; 
      
        default:
          break;
      }
    
    
  }

  

  state = {
    pressed : false,
  }
    render(){

      var scaleValue = new Animated.Value(0); 

      function scale() {
        scaleValue.setValue(0);
        Animated.timing(
            scaleValue,
            {
              toValue: 1,
              duration: 300,
              easing: Easing.easeOutBack
            }
        ).start();
      }

      const buttonScale = scaleValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [1, 1.1, 1]
      });

      return(
        <View style={{height: screenHeight* 0.15, width: screenHeight * 0.15, marginRight:5,marginLeft:10,alignItems:'center', justifyContent:'center'}}>

          
          

        {this.state.pressed ? 
        <View>
          <TouchableOpacity style={styles.habitBoxstylePressed} onPress={()=>{this.setState({pressed : !this.state.pressed})}}>
          <View style={{flex:1.5, marginHorizontal:10, }}>                 
              {this.renderAppropriateImage(this.props.whichCategory)}    
              </View>

              <View style={{flex:1,  marginHorizontal:10,}}>
                <Text style={{fontSize:12, fontFamily:'MontserratSemiBold', color:colors.tan, textAlign:'center', marginVertical:3}}>{this.props.whichName}</Text>
              </View>


              

          </TouchableOpacity>
          <View style={{position:'absolute', width:20, height:20, borderRadius:10, alignItems:'center', justifyContent:'center', zIndex:1, top:0, right:10, elevation:20}}>
            <Image source={require('./assets/images/check.png')} style={{height:20, width:20, borderRadius:10}}/>
          </View> 
        </View>  
        
        : 
          <TouchableOpacity style={styles.habitBoxstyle} onPress={()=>{this.setState({pressed : !this.state.pressed})}}>
              <View style={{flex:1.5, marginHorizontal:10, }}>                 
              {this.renderAppropriateImage(this.props.whichCategory)}    
              </View>

              <View style={{flex:0.4,  marginHorizontal:10,}}>
                <Text style={{fontSize:12, fontFamily:'BBRegular', color:colors.lightGrey, textAlign:'center', marginVertical:1}}>{this.props.time} minutes</Text>
              </View>

              <View style={{flex:1,  marginHorizontal:10,}}>
                <Text style={{fontSize:15, fontFamily:'MontserratSemiBold', color:colors.tan, textAlign:'center', marginVertical:3}}>{this.props.whichName}</Text>
              </View>

              

          </TouchableOpacity> 
    }

          

        </View>
      )
    }
}



export default class App extends React.Component {

  state = {
    fontLoaded:false,
    settingsModalVisible:false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
      RubikMedium: require('./assets/fonts/Rubik-Medium.ttf'),
      BBRegular: require('./assets/fonts/BalooBhaina2-Regular.ttf'),
    });

    this.setState({ fontLoaded: true , settingsModalVisible:false,});
  }

  openSettings(){
    this.setState({settingsModalVisible:true})
  } 




  render() {

    if(!this.state.fontLoaded){
      return(
        <View>
        </View>
      )
    }

    return (
      <View style={styles.container}>


        
        <ScrollView>
        <View style={styles.upperBar}>

          <View style={{flexDirection:'row', alignItems:'center'}}>

            <TouchableOpacity style={styles.profileImg}>

            </TouchableOpacity>

            <Text style={{marginHorizontal:5, fontFamily:'RubikMedium', color:'green', fontSize:18, textAlign:'center'}}>Yatish Kelkar</Text>

          </View>

          <TouchableOpacity onPress={()=>this.openSettings()}>
            <Feather name='settings' size={30} color='#878787'/>
          </TouchableOpacity>

        </View>

        <View style={styles.middleContainer}>

          <View style={styles.anim}>
            <Image source = {require('./assets/images/write.png')}  resizeMode = 'contain' style={{height: screenHeight*0.23, width: screenHeight * 0.23}}/>
          </View>

          <View style={styles.dateFloat}>
            <Text style={{fontFamily:'RubikMedium', fontSize:25, textAlign:'center', marginVertical:5, color: colors.tan}}>Wed, 15th April</Text>
          </View>

          <View style={styles.infoBar}>

          <View style={{width: screenWidth * 0.5, height: screenHeight*0.05, backgroundColor:colors.white, alignItems:'center', flexDirection:'row', marginHorizontal:10, justifyContent:'flex-start', marginVertical:0, marginTop:10}}>

              <Feather name='check-circle' size={20} color={colors.green}/>
              <Text style={{fontFamily:'BBRegular', fontSize:15, color: colors.green, marginHorizontal:5, marginTop:5}}> 5 tasks completed </Text>

          </View>

            <View style={{width: screenWidth * 0.5, height: screenHeight*0.05, backgroundColor:colors.white, alignItems:'center', flexDirection:'row', marginHorizontal:10, justifyContent:'flex-start', marginVertical:0}}>

              <Feather name='clock' size={20} color={colors.gold}/>
              <Text style={{fontFamily:'BBRegular', fontSize:15, color: colors.gold, marginHorizontal:5, marginTop:5}}> 3 tasks left</Text>

            </View>

            <View style={{width: screenWidth * 0.5, height: screenHeight*0.05, backgroundColor:colors.white, alignItems:'center', flexDirection:'row', marginHorizontal:10, justifyContent:'flex-start', marginVertical:0}}>

              <Feather name='clipboard' size={20} color={colors.salmon}/>
              <Text style={{fontFamily:'BBRegular', fontSize:15, color: colors.salmon, marginHorizontal:5, marginTop:5}}> 1 project due today !</Text>

            </View>
                          
          </View>

          
          

        </View>

        <View style={styles.habitsContainer}>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10, marginTop:10}}>

                <Text style={{fontFamily:'RubikMedium', fontSize:20, textAlign:'center', color:colors.tan, marginHorizontal:5,}}>Daily Habits</Text>
                <TouchableOpacity style={{marginHorizontal:10}}>
                    <FontAwesome5 name='chevron-right' size={20} color={colors.tan}/>
                </TouchableOpacity>  

            </View>

            <ScrollView contentContainerStyle={{ marginLeft:5, backgroundColor:colors.background, alignItems:'center',paddingRight:10, marginRight:20}} style={{width:screenWidth - 30,height: screenHeight * 0.15,}} horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false} >

                
                <HabitBox whichCategory='gardening' whichName="Gardening"  time={30}/>
                <HabitBox whichCategory='coffee' whichName="Coffee" time={15}/>
                <HabitBox whichCategory='book' whichName="Read" time={60}/>
                <HabitBox whichCategory='gym' whichName="Gym" time={60}/>
                <HabitBox whichCategory='sport'whichName="Football" time={30}/>
                


            </ScrollView>


            

            
          </View>

          <View style={styles.optionsContainer}>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10, marginTop:10}}>

              <Text style={{fontFamily:'RubikMedium', fontSize:20, textAlign:'center', color:colors.tan, marginHorizontal:5,}}>My Spaces</Text>
              <TouchableOpacity style={{marginHorizontal:10}}>
                  <FontAwesome5 name='chevron-right' size={20} color={colors.tan}/>
              </TouchableOpacity>  

            </View>

              <ScrollView contentContainerStyle={{ marginLeft:5,paddingLeft:5, backgroundColor:colors.background, alignItems:'center',paddingRight:10, marginRight:20}} style={{width:screenWidth - 30,height: screenHeight * 0.15,}} horizontal={true} scrollEnabled={true} showsHorizontalScrollIndicator={false} >


              <TouchableOpacity style={styles.optionsBox}>
                  <Image source={require('./assets/images/projects.png')} style={{height:40, width:40, marginLeft:5}}/>
                  <Text style={{fontFamily:'MontserratSemiBold', fontSize:15, color:colors.tan, marginHorizontal:7}}>Projects</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionsBox}>
                  <Image source={require('./assets/images/notes.png')} style={{height:40, width:40, marginLeft:5}}/>
                  <Text style={{fontFamily:'MontserratSemiBold', fontSize:15, color:colors.tan, marginHorizontal:7}}>Notes</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionsBox}>
                  <Image source={require('./assets/images/lists.png')} style={{height:35, width:35, marginLeft:5}}/>
                  <Text style={{fontFamily:'MontserratSemiBold', fontSize:15, color:colors.tan, marginHorizontal:7}}>Lists</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.optionsBox}>
                  <Image source={require('./assets/images/todoicon.png')} style={{height:45, width:45, marginLeft:5}}/>
                  <Text style={{fontFamily:'MontserratSemiBold', fontSize:15, color:colors.tan, marginHorizontal:7}}>To Do</Text>
              </TouchableOpacity>




              </ScrollView>

          </View>
          </ScrollView>

        
      </View>
  );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    marginTop:StatusBar.currentHeight,
    paddingHorizontal:10
  },
  upperBar:{
    height: screenHeight * 0.07,
    width: screenWidth - 20, 
    marginTop:5,
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:5
  },
  profileImg:{
    height:38, 
    width:38, 
    borderRadius:20,
    backgroundColor:'#d3d3d3'
  },
  middleContainer:{
    height:screenHeight * 0.33,
    width:screenWidth - 20,
    backgroundColor: colors.background
  },
  anim:{
    position:'absolute',
    top: 0,
    right: 0,
    height: screenHeight * 0.23,
    width: screenHeight * 0.23,
    marginLeft: screenHeight* 0.02,
    zIndex:1,
    elevation:5
  },
  infoBar:{
    height: screenHeight * 0.25,
    width: screenWidth - 30,
    backgroundColor:colors.white,
    marginTop: screenHeight * 0.08,
    marginHorizontal:5,
    borderRadius:10,
  },
  dateFloat:{
    position:'absolute',
    zIndex:1,
    top:0,
    left:screenWidth * 0.045,
    width: screenWidth * 0.5,
    backgroundColor: colors.background,
    height: screenHeight * 0.08,
    alignItems:'center',
    justifyContent:'flex-end'
  },
  habitsContainer:{
    height: screenHeight * 0.25,
    width: screenWidth - 20, 
    backgroundColor:colors.background,
  },
  habitBoxstyle:{
    height: screenHeight* 0.15, 
    width: screenHeight * 0.15,
    backgroundColor:colors.white,
    marginRight:15,
    borderRadius: screenHeight * 0.03,
    elevation:2,
    alignItems:'center',
    justifyContent:'center',
  },
  habitBoxstylePressed:{
    height: screenHeight* 0.13, 
    width: screenHeight * 0.13,
    backgroundColor:colors.white,
    marginRight:15,
    borderRadius: screenHeight * 0.03,
    elevation:2,
    alignItems:'center',
    justifyContent:'center',
  },
  optionsContainer:{
    height: screenHeight * 0.18,
    width: screenWidth - 20, 
    backgroundColor:colors.background,
  },
  optionsBox:{
    height:screenHeight * 0.1,
    width: 'auto',
    borderRadius: screenHeight * 0.03,
    elevation:2,
    alignItems:'center',
    flexDirection:'row',
    marginRight:10,
    backgroundColor:colors.white,
    paddingHorizontal:5
  }
});
