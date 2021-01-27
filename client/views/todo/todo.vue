<template>
  <section class="real-app">
    <input
            @keyup.enter="addTodo"
            autofocus="autofocus"
            class="add-input"
            placeholder="接下来要做什么" type="text"
    >
    <Item :todo="todo"  v-for="todo in filteredTodos" :key="todo.id"
        @del="deleteTodo"/>
    <Tabs :filter="filter" :todos="todos" @toggle="toggleFilter"
       @clearAllCompleted="clearAllCompleted"></Tabs>
  </section>
</template>

<script>
import Item from './item.vue'
import Tabs from './tabs.vue'

let id = 0
export default {
  name: 'todo',
  data () {
    return {
      todos: [],
      todo: {
        id: 0,
        content: 'this is todo.',
        completed: false
      },
      filter: 'all'
    }
  },
  components: {
    Item, Tabs
  },
  computed: {
    filteredTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      // 交替显示未完成和已完成的待办
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        content: e.target.value.trim(),
        completed: false
      })
    },
    deleteTodo (id) {
      this.todos.splice(
        this.todos.findIndex(todo => todo.id === id),
        1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="css" scoped>
.real-app{
  width: 600px;
  margin: 0 auto;
  box-shadow: 0 0 5px #666;
}
.add-input{
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  outline: none;
  color: inherit;
  box-sizing: border-box;
  border-radius: 4px 4px 0 0;
  -webkit-font-smoothing: antialiased;
  padding: 16px 16px 16px 60px;
  border: none;
  box-shadow: inset 0 -2px rgba(0,0,0,0.5);
}
</style>
