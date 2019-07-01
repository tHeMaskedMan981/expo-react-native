import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text,AsyncStorage  } from 'react-native';


export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      esummitid: '',
      status:'not-submitted',
      email_err:'',
      id_err:'',
      myevents:"something",
      myeventid:1,
      retrieved:0
    };
  }
  

  _storeData = async () => {
  
  let data = this.state.myeventid;
//   this.setState({myeventid:data});
  data+=1;
  // data+=1;
  this.setState({myeventid:data});

//   var event1 = {id:data, name:'speaker1', venue:'pcsa'};
//   data+=1;
//   var event2 = {id:data, name:'speaker2', venue:'pcsa2'};

//   this.setState({myevents:event1.name});
//   var events = [];
//   events.push(event1);
//   this.setState({myevents:events[0].name});
//   events.push(event2);

  try {
    // await AsyncStorage.setItem('myevents',JSON.stringify(events));
    await AsyncStorage.setItem('myeventid',JSON.stringify(data));
  } catch (error) {
    // Error saving data
      this.setState({email_err:"problem with storage"});
  }
}

_retrieveData = async () => {
  try {
    this.setState({email_err:"retrieving"});
    // const value = await AsyncStorage.getItem('myevents');
    const value = await AsyncStorage.getItem('myeventid');
    // let retrivedevents = JSON.parse(value);
    let retrivedid = JSON.parse(value);
    this.setState({email_err:"retrieving from below"});
    // this.setState({retrieved:retrivedevents[1].name});
    if (!(value == null)) {
      // We have data!!
      // console.log(value);
    //   this.setState({retrieved:retrivedevents[1].name});
    this.setState({retrieved:retrivedid});
    this.setState({myeventid:retrivedid});
    this.setState({email_err:"retrieving inside function"});
    }
   } catch (error) {
     // Error retrieving data
     this.setState({email_err:"retrieving problem"});
   }
}

  onLogin() {
    // const { username, password } = this.state;
    const  email = this.state.email;
    const  esummitid  = this.state.esummitid;

    Alert.alert('Credentials', `${email} ${esummitid}`);
    this.setState({status:'submitted'});
  
    return fetch('http://esummit.ecell.in/v1/user/login/')
    .then((response) => response.json())
    .then((responseJson) => {

      this.setState({
        isLoading: false,
        dataSource: responseJson.movies,
      }, function(){

      });

    })
    .catch((error) =>{
      console.error(error);
    });
  }
  
  render() {
    return (
      <View style={styles.container}>
      <View>
        <Text> {this.state.myeventid} </Text>
      </View>
      <View>
        <Text> {this.state.myevents} </Text>
      </View>
      <View>
        <Text> {this.state.retrieved}</Text>
      </View>
        <TextInput
          value={this.state.email}
          onChangeText={ (email) => {
              this.setState({ email });
              if (email.search('@')>=0) this.setState({ email_err:"" });
              else this.setState({ email_err:"Enter a valid E-Mail Address" }); 
              }}
          placeholder={'email'}
          style={styles.input}
        />
        <View>
        <Text> {this.state.email_err} </Text>
      </View>

        <TextInput
          value={this.state.esummitid}
          onChangeText={(esummitid) => this.setState({ esummitid })}
          placeholder={'esummitid'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
        <Button
          title={'Store Data'}
          style={styles.input}
          onPress={this._storeData.bind(this)}
        />
        <Button
          title={'Retrieve data'}
          style={styles.input}
          onPress={this._retrieveData.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});


