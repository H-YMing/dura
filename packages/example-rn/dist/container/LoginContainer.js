import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { actionCreator } from "../store";
import { Flex, Button } from "@ant-design/react-native";
function mapState(state) {
    return {
        name: state.user.name,
        loading: state.loading.user.onAsyncChangeName
    };
}
function mapDispatch(dispatch) {
    return {
        onAsyncChangeName() {
            dispatch(actionCreator.user.onAsyncChangeName({ newName: "async异步张三" }, { loading: true }));
        },
        onChangeName() {
            dispatch(actionCreator.user.onChangeName({ newName: "同步张三" }));
        }
    };
}
class LoginContainer extends Component {
    render() {
        return (<View style={{ flex: 1, paddingTop: 84, backgroundColor: "#fff" }}>
        <Flex>
          <Flex.Item>
            <Text style={{ fontSize: 24 }}>原始数据：</Text>
          </Flex.Item>
          <Flex.Item>
            <Text style={{ fontSize: 18, color: "red" }}>{this.props.name}</Text>
          </Flex.Item>
        </Flex>

        <View style={{ height: 80 }}/>
        <Flex>
          <Flex.Item style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Button size="large" type="primary" onPress={this.props.onAsyncChangeName} loading={this.props.loading}>
              异步修改
            </Button>
          </Flex.Item>
          <Flex.Item style={{ paddingLeft: 10, paddingRight: 10 }}>
            <Button size="large" onPress={() => {
            console.log(this.props.navigation.dismiss);
            this.props.onChangeName();
            this.props.navigation.push("User");
            // this.props.navigation.replace("User");
        }}>
              同步修改
            </Button>
          </Flex.Item>
        </Flex>
      </View>);
    }
}
export default connect(mapState, mapDispatch)(LoginContainer);
