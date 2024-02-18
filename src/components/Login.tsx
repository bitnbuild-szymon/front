import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { signInWithEmail } from "bitnbuild-back";
import colors from "../../colors";

export default function Login({ route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      const user = await signInWithEmail(email, password);
      route.params.setUser(user);
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <Text style={styles.error}>{error}</Text>

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: "72%",
    padding: 8,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: colors.lightGray,
  },
  error: {
    color: colors.red,
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.blue,
    padding: 10,
    borderRadius: 5,
    width: "72%",
  },
  buttonText: {
    color: colors.whitesmoke,
    textAlign: "center",
  },
});
