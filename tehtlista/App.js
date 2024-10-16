import React, { useReducer, useState } from "react";
import { FlatList, Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const initialState = [];

const ADD_TODO = "ADD_TODO";
const REMOVE_TODO = "REMOVE_TODO";

const reducer = (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { id: Date.now().toString(), task: action.payload }];
    case REMOVE_TODO:
      return state.filter(item => item.id !== action.payload);
    default:
      return state;
  }
};

const TodoApp = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [text, setText] = useState('');

  const addTodo = () => {
    if (text.trim() === '') return;
    dispatch({ type: ADD_TODO, payload: text });
    setText('');
  };

  const removeTodo = id => { 
    dispatch({ type: REMOVE_TODO, payload: id });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => removeTodo(item.id)} style={styles.todoItem}>
      <Text style={styles.todoText}>{item.task}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* TextInput for entering new tasks */}
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={text}
        onChangeText={setText}
      />
      {/* Save button to add the task */}
      <TouchableOpacity onPress={addTodo} style={styles.addButton}>
        <Text style={styles.addButtonText}>Save</Text>
      </TouchableOpacity>

    {/* Display the list of tasks */}
    <FlatList
      data={state}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      style={styles.todoList}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  todoList: {
    marginTop: 20,
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  todoText: {
    fontSize: 18,
  },
});

export default TodoApp;