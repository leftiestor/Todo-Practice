<template>
  <div :class="['todo-item', todo.completed ? 'completed':'']">
    <input
       type="checkbox"
       class="toggle"
       :value="todo.completed"
    >
    <label for="">{{todo.content}}</label>
    <button class="destroy"  @click="deleteTodo"></button>
  </div>
</template>

<script>
export default {
  name: 'item',
  props: {
    todo: {
      type: Object,
      require: true
    }
  },
  methods: {
    deleteTodo () {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>

<style lang="css" scoped>
  .todo-item{
    position: relative;
    background-color: #fff;
    font-size: 16px;
    border-bottom: 1px solid rgba(0,0,0,0.06);
  }
  .todo-item:hover .destroy:after{
     content:'x'
  }
  .todo-item.completed  label{
    color: #d9d9d9;
    text-decoration: line-through;
  }
  label{
    white-space: pre-line;
    word-break: break-all;
    padding: 15px 60px 15px 15px;
    margin-left: 45px;
    display: block;
    line-height: 1.2em;
    transition: color 0.4s;

  }
  .toggle{
    text-align: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto 0;
    border: none;
    appearance: none;
    outline: none;

  }
  .toggle:after{
    content: "" ;
    width: 30px;
    height: 30px;
    position:absolute; top:5px; left:10px;
    background: url('../../assets/images/checknot.jpg')  0 0 ;
    background-size: contain;
    opacity: 0.8;
  }
  .toggle:checked:after{
    content: "" ;
    width: 30px;
    height: 30px;
    position:absolute; top:5px; left:10px;
    background: url('../../assets/images/checked.jpg')  0 0 ;
    background-size: contain;
    opacity: 0.4;
  }
  .destroy {
    position: absolute;
    top: 0;
    right: 10px;
    bottom: 0;
    width: 40px;
    height: 40px;
    font-size: 26px;
    color: #cc9a9a;
    margin: auto 0 11px;
    transition: color 0.2s ease-out;
    background-color: transparent;
    appearance: none;
    border-width: 0;
    cursor: pointer;
    outline: none;
  }
</style>
