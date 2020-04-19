import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions, Modal, Image, ScrollView , TouchableWithoutFeedback, Animated, Easing} from 'react-native';
import colors from './colors';
import { Feather, FontAwesome5 } from '@expo/vector-icons';
import * as Font from 'expo-font';
import ModalWrapper from 'react-native-modal-wrapper';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const imgStyles = {
  height:40, width:40, marginTop:5,
}

const DATA = {
  A : {
    title:'Buy Groceries',
    startTime:11,
    endTime:12,
    description:'Goto Supermarket and buy food',
    list:'',
    isCompleted:false,
    category:'Shopping',
    bookmarked:false,
  },
  B : {
    title:'Complete homework',
    startTime:1,
    endTime:3,
    description:'Finish first two assignments',
    list:'',
    isCompleted:false,
    category:'Study',
    bookmarked:false,
  },
  C : {
    title:'Complete Health Checkup',
    startTime:1,
    endTime:3,
    description:'Get health certificate from Dr. Sharma',
    list:'',
    isCompleted:false,
    category:'Health',
    bookmarked:false,
  },
  D : {
    title:'Football',
    startTime:1,
    endTime:3,
    description:'Play at New Sports Complex',
    list:'',
    isCompleted:false,
    category:'Sport',
    bookmarked:false,
  },
  E : {
    title:'Complete App UI',
    startTime:1,
    endTime:3,
    description:'Finish landing page and login screen',
    list:'',
    isCompleted:false,
    category:'Personal',
    bookmarked:false,
  },
  F : {
    title:'Send mail to Karen',
    startTime:1,
    endTime:3,
    description:'Mail the final product presentation to Karen Walters',
    list:'',
    isCompleted:false,
    category:'Work',
    bookmarked:false,
  }
}

class TodoCard extends React.Component {
  render(){
    return(
      <View style={{height: screenHeight * 0.2, width: screenWidth - 30, marginHorizontal:5, backgroundColor: colors.violet, marginVertical:7, flexDirection:'row'}}>
        <View style={{flex:2, backgroundColor:colors.darkBlue, alignItems:'center', justifyContent:'center'}}>

        </View>

        <View style={{flex:9, backgroundColor:colors.violet, alignItems:'center', justifyContent:'center'}}> 

          <View style={{width:'100%', height:'90%', backgroundColor:colors.darkGrey, borderRadius:20}}>

            <View style={{width:'100%', height:20,alignItems:'flex-start', paddingHorizontal:15, paddingVertical:5 }}>
                <Text style={{fontFamily:'RubikRegular', color: colors.lightGrey, fontSize:14, textAlign:'center'}}>{this.props.startTime} to {this.props.endTime}</Text>
            </View>

          </View>

        </View>

      </View>
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



export default class App extends React.Component {

  state = {
    fontLoaded:false,
    settingsModalVisible:false,
    textVisible:true,
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
      }]
    }

    if(!this.state.fontLoaded){
      return(
        <View>
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

              <TouchableWithoutFeedback>
                <Animated.View style={[styles.FABOptions, TodoStyle]}>
                  <Image source={require('./assets/images/todoicon.png')} style={{height:25, width:25,}}/>
                </Animated.View>
              </TouchableWithoutFeedback>


              <TouchableWithoutFeedback onPress={this.toggleFAB}>
                <Animated.View style={[styles.FABStyle, rotation]}>
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

            <TodoCard startTime={11} endTime={12} title="Buy Groceries" description='Go to supermarket and buy grocery for one month' list='' isCompleted={false} category='Shopping' bookmarked={false} />
            <TodoCard/>
            <TodoCard/>
            <TodoCard/>
          </View>



          <View style={{height:500, width: screenWidth - 30}}>

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
    
  }
});
