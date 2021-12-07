import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

export default function Login({ navigation }) {
  const [request, response, promptAsync] = Google.useAuthRequest({
    expoClientId:
      "649551610311-oph3ovtr26o1qhm7v0qj9pf3fhka7f9t.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log("SUCCESS!!");
      navigation.navigate("Home", { auth: authentication });
    } else {
      console.log(response);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
}
