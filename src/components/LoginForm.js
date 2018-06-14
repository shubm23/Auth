import React,{Component} from 'react';
import { View, TextInput,StyleSheet,Text } from 'react-native';
import firebase from 'firebase';
import {Card,CardSection,Button,Input,Spinner} from './common';

class LoginForm extends Component{
    state={
        email:"",
        password:"",
        error:"",
        loading: false 
    }
    onButtonpress(){
        const { email,password } = this.state;
        this.setState({error:"",loading:true});
        firebase.auth().signInWithEmailAndPassword(email,password)
            .then(this.onLoginSuccess.bind(this))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email,password)
                    .then(this.onLoginSuccess.bind(this))
                    .catch(this.onLoginFail.bind(this));
            });
    }
    onLoginFail() {
        this.setState({ error: 'Authentication Failed', loading: false });
    }

    onLoginSuccess() {
        this.setState({
            email: '',
            password: '',
            loading: false,
            error: ''
        });
       // alert('Success');
    }
    renderButton() {
        if (this.state.loading) {
            return <Spinner size="small" />;
        }

        return (
            <Button onPress={this.onButtonpress.bind(this)}>
                Log in
            </Button>
        );
    }
    render(){
        return(
            <Card>
                <CardSection>
                    <Input
                        placeholder="user@gmail.com"
                        label="Email"
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })}
                    />
                </CardSection>

                <CardSection>
                    <Input
                        secureTextEntry
                        placeholder="password"
                        label="Password"
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                    />
                </CardSection>

                <Text style={styles.error}>
                    {this.state.error}
                </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    error:{
        fontSize: 20,
        alignSelf: 'center',
        color:'red'
    }
});
export default LoginForm;