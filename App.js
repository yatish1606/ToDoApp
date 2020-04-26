import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, Modal, Image, ScrollView , TouchableWithoutFeedback, Animated, Easing, TouchableHighlight, FlatList, ActivityIndicator, ImageBackground} from 'react-native';
import colors from './colors';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import ModalWrapper from 'react-native-modal-wrapper';
import {Swipeable, TextInput} from 'react-native-gesture-handler';
import SwipeTimePicker from 'react-native-swipetimepicker';

var today = new Date();
var hourJustNow = today.getHours();


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const imgStyles = {
  height:40, width:40, marginTop:5,
}

const imgStylesTodo = {
  height:30, width:30,
}

const DATA = [
  {
   title:'Buy Groceries',
   startTime:20,
   endTime:23,
   description:'Goto Supermarket and buy food',
   list:'',
   isCompleted:false,
   category:'shopping',
   bookmarked:false,
 },
 {
   title:'Complete homework',
   startTime:11,
   endTime:13,
   description:'Finish first two assignments',
   list:'',
   isCompleted:false,
   category:'work',
   bookmarked:false,
 },
  {
   title:'Complete Health Checkup',
   startTime:20,
   endTime:21,
   description:'Get health certificate from Dr. Sharma',
   list:'',
   isCompleted:false,
   category:'health',
   bookmarked:false,
 },
  {
   title:'Football',
   startTime:6,
   endTime:7,
   description:'Play at New Sports Complex',
   list:'',
   isCompleted:false,
   category:'sport',
   bookmarked:false,
 },
  {
   title:'Complete App UI',
   startTime:22,
   endTime:23,
   description:'Finish landing page and login screen',
   list:'',
   isCompleted:false,
   category:'personal',
   bookmarked:false,
 },
 {
   title:'Send mail to Karen',
   startTime:12,
   endTime:13,
   description:'Mail the final product presentation to Karen Walters',
   list:'',
   isCompleted:false,
   category:'work',
   bookmarked:false,
 }
]



class TodoCard extends React.Component {

  

  state = {
    whichIcon: this.props.isCompleted ? 'complete' : this.props.endTime < hourJustNow ?  'late' : 'notComplete'  ,
  } 


  rightActions = (dragX) => {

    const scale = dragX.interpolate({
      inputRange:[-100,0],
      outputRange:[1,0.9],
      extrapolate:'clamp',
    }); 

    return(
      <View style={{width: screenWidth*0.25 , height:'100%',alignItems:'center', justifyContent:'space-around', flexDirection:'row', paddingRight:10, paddingLeft:5}}>
        <TouchableOpacity>
          <Animated.View>
            <Feather name='edit' color={colors.green} size={24}/>
          </Animated.View>
        </TouchableOpacity>

        <TouchableOpacity>
          <Animated.View>
            <Feather name='trash-2' color={colors.salmon} size={24}/>
          </Animated.View>
        </TouchableOpacity>
      </View>
    )
  }

  renderAppropriateColor(prop){
    switch(prop){
      case 'personal' : return colors.orangegradient ; 
      case 'shopping' : return colors.violetgradient;
      case 'health' : return colors.salmongradient ; 
      case 'sport' : return colors.greengradient;
      case 'work' : return colors.cyangradient ; 
      case 'recreation' : return colors.yellowgradient;
      default : return colors.lightGrey;
    }
  }

  renderAppropriatePic(prop){
    
    switch (prop) {
      case 'sport':
        return <Image source={require('./assets/images/exercise.png')} style={imgStylesTodo} /> ;

      case 'personal' :  
        return <Image source={require('./assets/images/personal.png')} style={imgStylesTodo}/> ;
        
      case 'recreation' :  
      return <Image source={require('./assets/images/recreation.png')} style={imgStylesTodo}/> ;  
      
      case 'work' :  
      return <Image source={require('./assets/images/work.png')} style={imgStylesTodo}/> ; 

      case 'health' :  
      return <Image source={require('./assets/images/health.png')} style={imgStylesTodo}/> ; 

      case 'shopping':
        return <Image source={require('./assets/images/shopping.png')} style={imgStylesTodo} /> ;
    
      default:
        break;
    }
  
  
}

setComplete(){
    this.setState({whichIcon : 'complete'})
}

renderAppropriateIcon(prop){
  switch(prop){
    case 'notComplete' : 
    <TouchableOpacity style={{paddingVertical:3}} onPress={()=>this.setComplete()}>
        <Feather name='circle' size={24} color={colors.lightGrey}/>
    </TouchableOpacity> 
    case 'late' : 
    <TouchableOpacity style={{paddingVertical:3}} onPress={()=>this.setComplete()}>
        <Feather name='clock' size={24} color={colors.salmon}/>
    </TouchableOpacity> 
    case 'complete' : 
    <TouchableOpacity style={{paddingVertical:3}}>
        <Image source={require('./assets/images/check.png')} style={{height:24, width:24}} />
    </TouchableOpacity> 
    default : 
    <TouchableOpacity style={{paddingVertical:3}} onPress={()=>this.setComplete()}> <Feather name='circle' size={24} color={colors.lightGrey}/></TouchableOpacity> ;
  }
}

  render(){

    
    const actualStartTime = this.props.startTime > 12 ? this.props.startTime-12 : this.props.startTime;
    const actualEndTime = this.props.endTime > 12 ? this.props.endTime-12 : this.props.endTime;
    
    

    return( 
      
        
          <Swipeable renderRightActions = {(_,dragX) => this.rightActions(dragX)} overshootRight={false} friction={1.5} >

            <View style={{ width:screenWidth - 40, marginHorizontal:10, height:'auto', flexDirection:'row', marginBottom:10}}>
              
              
              <View style={{flex:1.2 , backgroundColor:colors.background, justifyContent:'center', alignItems:'flex-start'}}>

                { this.state.whichIcon === 'notComplete' ? 
                <TouchableOpacity style={{paddingVertical:3}} onPress={()=>this.setComplete()}>
                <Feather name='circle' size={24} color={colors.lightGrey}/>
                </TouchableOpacity> 
                
                :
                this.state.whichIcon === 'complete' ? 
                
                <TouchableOpacity style={{paddingVertical:3}}>
                   <Image source={require('./assets/images/check.png')} style={{height:24, width:24}} />
                </TouchableOpacity> 

                : this.state.whichIcon === 'late' ? 

                <TouchableOpacity style={{paddingVertical:3}} onPress={()=>this.setComplete()}>
                  <Feather name='clock' size={24} color={colors.salmon}/>
                </TouchableOpacity>
                
                : 

                <TouchableOpacity style={{paddingVertical:3}} onPress={()=>this.setComplete()}>
                <Feather name='circle' size={24} color={colors.lightGrey}/>
                </TouchableOpacity> 

                
                
                }


              </View>

              <TouchableOpacity>
              <View style={{flex:9, borderRadius:30, paddingVertical:10, borderWidth:0, backgroundColor: this.renderAppropriateColor(this.props.category), }}>

                <View style={{width:screenWidth * 0.7, height:20,alignItems:'flex-start', marginHorizontal:15, marginBottom:5, marginTop:5 }}>
                    <Text style={{fontFamily:'RubikRegular', color: colors.grey, fontSize:14, textAlign:'center'}}>{actualStartTime} to {actualEndTime}</Text>
                </View>

                <View style={{width:screenWidth * 0.7, height:'auto',alignItems:'flex-start', marginHorizontal:15, marginBottom:5, marginTop:0 }}>
                    <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:20, textAlign:'center'}}>{this.props.title}</Text>
                </View>

                <View style={{width:screenWidth * 0.7, height:'auto',alignItems:'flex-start', marginHorizontal:15, marginBottom:5, marginTop:5 }}>
                    <Text style={{fontFamily:'RubikRegular', color: colors.grey, fontSize:12,textAlignVertical:'center',}}>{this.props.description}</Text>
                </View>

                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:15,paddingRight:25}}>
                  
                  <View style={{width:'auto', height:'auto', borderRadius:20, backgroundColor:this.renderAppropriateColor(this.props.category), }}>
                    <Text style={{fontFamily:'RubikMedium', fontSize:12, color: colors.white, marginHorizontal:7, marginVertical:4}}>{this.props.category}</Text>

                  </View>

                  <View style={{height:50, width:50, borderRadius:25, backgroundColor: this.renderAppropriateColor(this.props.category), alignItems:'center', justifyContent:'center'}}>
                      {this.renderAppropriatePic(this.props.category)}
                  </View>

                </View>

                {this.state.whichIcon === 'late' ? 
                <View style={{width: screenWidth*0.7, height:'auto', alignItems:'center', flexDirection:'row', marginVertical:5, marginHorizontal:15}}>
                  <Text style={{flex:1, fontFamily:'RubikRegular', fontSize:12, color:colors.salmon, marginVertical:4,}}>Oops! Looks like you forgot to {this.props.title} ! </Text>

                </View> : <View></View>}

            

              </View>
              </TouchableOpacity>
              
            </View>
           

              
          </Swipeable>
        
        
        

    
    )
  }
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

class EmptyList extends React.Component {
  render(){
    return(
      <View style={{height:200, width: screenWidth - 40, alignItems:'center', justifyContent:'center'}}>

      </View>
    )
  }
}



export default class App extends React.Component {

  state = {
    fontLoaded:false,
    settingsModalVisible:false,
    textVisible:true,
    newTodoModalVisible:false,
    pressValue : new Animated.Value(60),
    borderBottomColor:'#BABED5'
  }

  async componentDidMount() {
    await Font.loadAsync({
      MontserratSemiBold: require('./assets/fonts/Montserrat-SemiBold.ttf'),
      RubikMedium: require('./assets/fonts/Rubik-Medium.ttf'),
      BBRegular: require('./assets/fonts/BalooBhaina2-Regular.ttf'),
      RubikRegular: require('./assets/fonts/Rubik-Regular.ttf'),
    });

    this.setState({ fontLoaded: true , settingsModalVisible:false,});
  }

  openSettings(){
    this.setState({settingsModalVisible:true})
  } 

  closeSettings(){
    this.setState({settingsModalVisible:false})
  } 

  newTodoOpenModal(){
    this.setState({newTodoModalVisible:true})
  } 

  NewTodoCloseModal(){
    this.setState({newTodoModalVisible:false})
  } 

  


  animation = new Animated.Value(0)

  toggleFAB = () => {
      const toValue = this.open ? 0 : 1

      Animated.spring(this.animation, {
        toValue,
        friction:10,
        duration:600
      }).start()


      this.open = !this.open
      this.setState({textVisible: !this.state.textVisible})
  }

  renderItem =(item) => <TodoCard startTime={item.startTime} endTime={item.endTime} title={item.title} description={item.description} list={item.list} isCompleted={item.isCompleted} category={item.category} bookmarked={item.bookmarked}/> 

  handlePressIn = () => {
    Animated.timing(this.state.pressValue, {
        duration: 50,
        toValue: 56
    }).start(console.log('pressin'));
}

  handlePressOut = () => {
      Animated.timing(this.state.pressValue, {
          duration: 50,
          toValue: 60
      }).start(console.log('pressout'));
  }


  render() {

    const projectStyle = {
      transform:[
        {scale:this.animation},
        {
          translateX:this.animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,-260]
          })
        }
      ]
    }

    const NotesStyle = {
      transform:[
        {scale:this.animation},
        {
          translateX:this.animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,-200]
          })
        }
      ]
    }

    const ListStyle = {
      transform:[
        {scale:this.animation},
        {
          translateX:this.animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,-140]
          })
        }
      ]
    }

    const TodoStyle = {
      transform:[
        {scale:this.animation},
        {
          translateX:this.animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,-80]
          })
        }
      ]
    }

    const rotation = {
      transform:[{
        rotate: this.animation.interpolate({
          inputRange:[0,1],
          outputRange:['0deg','45deg']
        })
      }],
    }

    const animateStyle= {
      width: this.state.pressValue,
      height: this.state.pressValue
    }

    if(!this.state.fontLoaded){
      return(
        <View style={{alignContent:'center'}}>
          <ActivityIndicator 
            size='large'
            color={colors.lightGrey}
          />
        </View>
      )
    }

    return (
      <View style={styles.container}>


        
        <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={{fontFamily:'RubikMedium', fontSize:25, textAlign:'center', marginVertical:5, color: colors.tan}}>Wed, 15th Apr</Text>
          </View>

          <View style={styles.infoBar}>

          <View style={{width: screenWidth * 0.5, height: screenHeight*0.05, alignItems:'center', flexDirection:'row', marginHorizontal:10, justifyContent:'flex-start', marginVertical:0, marginTop:5}}>

              <Feather name='clipboard' size={20} color={colors.salmon}/>
              <Text style={{fontFamily:'RubikRegular', fontSize:13, color: colors.darkGrey, marginHorizontal:5, marginTop:5}}> 1 project due today !</Text>

          </View>

          <View style={{width: screenWidth * 0.5, height: screenHeight*0.05, alignItems:'center', flexDirection:'row', marginHorizontal:10, justifyContent:'flex-start', marginVertical:0,}}>

              <Feather name='check-circle' size={20} color={colors.green}/>
              <Text style={{fontFamily:'RubikRegular', fontSize:13, color: colors.darkGrey, marginHorizontal:5, marginTop:5}}> 5 tasks completed </Text>

          </View>

            <View style={{width: screenWidth * 0.5, height: screenHeight*0.05,alignItems:'center', flexDirection:'row', marginHorizontal:10, justifyContent:'flex-start', marginVertical:0, marginBottom:10}}>

              <Feather name='clock' size={20} color={colors.gold}/>
              <Text style={{fontFamily:'RubikRegular', fontSize:13, color: colors.darkGrey, marginHorizontal:5, marginTop:5}}> 3 tasks left</Text>

            </View>

            


            <View style={{height: screenHeight * 0.07, width: screenWidth - 30, alignItems:'flex-start', justifyContent:'center'}}>

            {this.state.textVisible ? 
              <View style={{height: screenHeight*0.06, width: screenWidth - 60, borderRadius: screenHeight*0.04, backgroundColor:colors.white, marginHorizontal:5,justifyContent:'center', alignItems:'flex-start', opacity:0.9, elevation:1}}>
                <Text style={{marginHorizontal:10, fontFamily:'RubikMedium', color:colors.salmon, textAlign:'center', fontSize:13, marginLeft:15}}>Add a new Todo, Project, List or Note</Text>
              </View> : <View></View> }

              <TouchableWithoutFeedback>
                <Animated.View style={[styles.FABOptions, projectStyle]}>
                  <Image source={require('./assets/images/projects.png')} style={{height:25, width:25,}}/>
                </Animated.View>
              </TouchableWithoutFeedback>  

              <TouchableWithoutFeedback>
                <Animated.View style={[styles.FABOptions, NotesStyle]}>
                  <Image source={require('./assets/images/notes.png')} style={{height:25, width:25,}}/>
                </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback>
                <Animated.View style={[styles.FABOptions, ListStyle]}>
                  <Image source={require('./assets/images/lists.png')} style={{height:25, width:25,}}/>
                </Animated.View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={()=>{this.newTodoOpenModal()}}>
                <Animated.View style={[styles.FABOptions, TodoStyle]}>
                  <Image source={require('./assets/images/todoicon.png')} style={{height:25, width:25,}}/>
                </Animated.View>
              </TouchableWithoutFeedback>


              <TouchableWithoutFeedback onPress={this.toggleFAB} onPressIn={this.handlePressIn} onPressOut={this.handlePressOut}>
                <Animated.View style={[styles.FABStyle, rotation, animateStyle]}>
                  <Feather name='plus' size={30} color={colors.white}/>
                </Animated.View>
              </TouchableWithoutFeedback>

              

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

          <View style={styles.todoBox}>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between', paddingHorizontal:10, marginTop:10, marginBottom:25}}>

              <Text style={{fontFamily:'RubikMedium', fontSize:20, textAlign:'center', color:colors.tan, marginHorizontal:5,}}>My Todos</Text>
              <TouchableOpacity style={{marginHorizontal:10}}>
                  <FontAwesome5 name='search' size={20} color={colors.tan}/>
              </TouchableOpacity>  

            </View>


            <FlatList
            
            data={DATA}
            renderItem={({item})=><TodoCard startTime={item.startTime} endTime={item.endTime} title={item.title} description={item.description} list={item.list} isCompleted={item.isCompleted} category={item.category} bookmarked={item.bookmarked}  />}
            ListEmptyComponent= {<EmptyList/>}
            
          /> 


          </View>



          


          </ScrollView>

          



          <ModalWrapper visible={this.state.settingsModalVisible} onRequestClose={()=>this.closeSettings()} containerStyle={{ flex:1, alignItems:'flex-end'}} animateOnMount={true} animationDuration={400} position='right' overlayStyle={{backgroundColor: colors.tan, opacity:0.6, }}>

           

            
              <View style={{height: screenHeight, width: screenWidth*0.7, backgroundColor: colors.background,elevation:1, }}>

                <View style={{width:'100%', height:210, backgroundColor: colors.background, alignItems:'center', justifyContent:'center'}}>

                  <TouchableOpacity style={{position:'absolute', height:30, width:30, top: screenHeight*0.16, right:screenWidth*0.17, borderRadius:15, backgroundColor:colors.salmon,alignItems:'center', justifyContent:'center', zIndex:20, elevation:11}}>
                    <Feather name='edit' size={18} color={colors.white}/>
                  </TouchableOpacity>

                  <View style={{height: 120, width:120, borderRadius:80, elevation:10, backgroundColor:colors.white, marginTop:5, alignItems:'center', justifyContent:'center'}}>
                    <Image source={require('./assets/images/user.png')} resizeMode='cover' style={{borderRadius:100, }}/>

                  </View>

                  <Text style={{fontFamily:'RubikMedium', fontSize:23, color:colors.tan, marginTop:15}}>Yatish Kelkar</Text>

                </View>

                <View style={{height: screenHeight - 210 - StatusBar.currentHeight, backgroundColor:colors.background, alignItems:'center'}}>
                  <ScrollView showsVerticalScrollIndicator={false}>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/profile.png')} style={{height:35, width:35,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>My Profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/statistics.png')} style={{height:32, width:32,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Statistics</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/projects.png')} style={{height:35, width:35,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Projects</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/lists.png')} style={{height:30, width:30,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Lists</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/notes.png')} style={{height:30, width:30,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Notes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/habits.png')} style={{height:32, width:32,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Daily Habits</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/todoicon.png')} style={{height:34, width:34,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>To Do</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/notifications.png')} style={{height:32, width:32,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Notifications</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Image source={require('./assets/images/faq.png')} style={{height:32, width:32,}} />
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Frequently Asked Questions</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{height:45, width:'100%', backgroundColor:colors.background, flexDirection:'row', alignItems:'center'}}> 
                      <View style={{height:'100%', width:'20%', alignItems:'center', justifyContent:'center', paddingHorizontal:10}}>
                          <Feather name='log-out' size={28} color={colors.salmon}/>
                      </View>
                        
                        <Text style={{fontFamily:'RubikMedium', color: colors.tan, fontSize:14}}>Sign Out</Text>
                    </TouchableOpacity>

                    </ScrollView>


                </View>

              </View>

           

          </ModalWrapper>


          {/*Modal COmponent for Add New Todo*/}


          <Modal visible={this.state.newTodoModalVisible} onRequestClose={()=>this.NewTodoCloseModal()} animationType='slide'>
            
            <ImageBackground source={require('./assets/images/newtaskbg.png')} style={{flex:1}} resizeMode='cover'>

              <ScrollView>
                <TouchableOpacity style={{position:'absolute', height:50, width:50, borderRadius:25, top:20, left:15, alignItems:'center', justifyContent:'center'}} onPress={()=>this.NewTodoCloseModal()}>
                      <Feather name='arrow-left' size={40} color='#f6f6f6'/>
                  </TouchableOpacity>

                  <Text style={{marginTop:screenHeight * 0.13, fontFamily:'RubikMedium', fontSize:25, marginLeft:20, color:colors.tan, maxWidth:screenWidth*0.35}} >Create New ToDo</Text>

                  <Text style={{marginTop:20, fontFamily:'RubikRegular', fontSize:17, marginLeft:20, color:colors.tan}}>Title</Text>
                  <View style={{flexDirection:'row', width:screenWidth, alignItems:'center', justifyContent:'space-between',marginTop:5, paddingHorizontal:20}}>
                      <TextInput style={{height:35, width:'100%', borderBottomWidth:1, borderBottomColor:this.state.borderBottomColor, fontSize:20, fontFamily:'RubikRegular', color:colors.tan }} onFocus={()=>this.setState({borderBottomColor:'#3C4FCC'})} onBlur={()=>this.setState({borderBottomColor:'#BABED5'})} autoFocus/>
                  </View>

                  <View style={{width:'100%', height:300, borderTopLeftRadius:40, borderTopRightRadius:40, backgroundColor:'#fff', marginTop:20,}}>
                    
                    <Text style={{marginTop:20, fontFamily:'RubikRegular', fontSize:17, marginLeft:20, color:colors.tan, marginTop:15}}>Time</Text>
                    <View style={{width:'100%', height:'auto', paddingHorizontal:20, paddingHorizontal:5, flexDirection:'row', alignItems:'center'}}>
                    <SwipeTimePicker
                        time={new Date()}
                        onChange={(time) => console.log(time, time.text)}
                    />
                    </View>

                  </View>
              </ScrollView>

              
            </ImageBackground>

          </Modal>












        
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
    height:screenHeight * 0.35,
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
    height: screenHeight * 0.26,
    width: screenWidth - 30,
    backgroundColor:colors.background,
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
    marginRight:15,
    borderRadius: screenHeight * 0.03,
    elevation:2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:colors.white
  },
  habitBoxstylePressed:{
    height: screenHeight* 0.13, 
    width: screenHeight * 0.13,
    marginRight:15,
    borderRadius: screenHeight * 0.03,
    elevation:2,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: colors.white
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
  },
  FABStyle:{
    position:'absolute', width:60, height:60, borderRadius:30, backgroundColor:colors.salmon, elevation:10, right:10, justifyContent:'center', alignItems:'center'
  },
  FABOptions:{
    position:'absolute', width:38, height:38, right:20, borderRadius:20, backgroundColor:colors.white, elevation:10,justifyContent:'center', alignItems:'center'
  },
  todoBox:{
    width: screenWidth - 20,
    backgroundColor: colors.background,
    height: 'auto',
    marginTop:5,
    
  },
  
});


{/* <TodoCard startTime={11} endTime={12} title="Buy Groceries" description='Go to supermarket and buy grocery for one month' list='' isCompleted={false} category='shopping' bookmarked={false} />
            <TodoCard startTime={7} endTime={8} title="Go to Gym" description='Run for 30 mins + 15 minutes squats' list='' isCompleted={false} category='sport' bookmarked={false}/>
            <TodoCard startTime={3} endTime={5} title="Prepare Presentation" description='Complete last 3 slides and mail final model to boss' list='' isCompleted={false} category='work' bookmarked={false}/>
            <TodoCard startTime={11} endTime={12} title="Call Linda" description='Catch up with her family' list='' isCompleted={false} category='personal' bookmarked={false}/>
            <TodoCard startTime={6} endTime={7} title="Complete Painting" description='Finish the last part of painting' list='' isCompleted={false} category='recreation' bookmarked={false}/>
            <TodoCard startTime={5} endTime={6} title="Medical Checkup" description='Visit hospital and get medical checkup certificate from Dr. Roy' list='' isCompleted={false} category='health' bookmarked={false}/>
           */}
