import React, { Component } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { List, ListItem } from "react-native-elements";
import { withNavigationFocus } from "react-navigation";

import axios from "axios";

class AllCharacters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chars: []
    };
  }
  componentDidMount() {
    console.log("RERENDEREd");
    axios.get("https://swapi.co/api/people").then(resp => {
      this.setState({ chars: resp.data.results });
    });
    // axios.get("http://localhost:3001/native");
  }
  onLearnMore(char) {
    this.props.navigation.navigate("ChararDetails", char);
  }
  componentWillReceiveProps() {
    console.log("Recieve props fired");
    axios.get("https://swapi.co/api/people").then(resp => {
      this.setState({ chars: resp.data.results });
    });
  }

  // static navigationProps = {
  //   header: ({ state }) => {
  //     return {
  //       title: state.params.myTitle
  //     };
  //   }
  // };

  render() {
    console.log(this.props);
    return (
      <ScrollView style={style.container}>
        <List>
          {this.state.chars.length >= 1 &&
            this.state.chars.map((curr, item) => (
              <ListItem
                key={item}
                title={curr.name}
                subtitle={curr.birth_year}
                onPress={() => this.onLearnMore(curr)}
              />
            ))}
        </List>
      </ScrollView>
    );
  }
}
const style = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default withNavigationFocus(AllCharacters);
