var app = new Vue({
  el: '#app',
  data: function() {
    return {
      id:'',
      todos:[],
      message: 'Todo App!',
      updatedValue: '',
      newVal: '',
      newId: '',
      adding: true,
      editing: false,
      markdone: 'Mark as done'
    }

  },
  mounted: function () {
    this.mountData();
  },
  methods:{
    parseData: function() {
      return JSON.parse(window.localStorage.getItem('testudo'));
    },
    mountData: function(){
      var dataString = window.localStorage.getItem('testudo' || '[]');
      var todosItem;
      if(dataString) {
          todosItem = JSON.parse(dataString);
          this.todos = todosItem
      }
    },
    savingTodo: function(value) {
      window.localStorage.setItem('testudo', JSON.stringify(value));
    },
    pushTodo: function(data) {
      this.todos.push({
        id: Math.floor(Math.random() * (9999 - 1 + 1)) + 1,
        task: this.todos.task,
        status: "Undone",
        editing: false,
      });
      this.savingTodo(this.todos);
      this.todos.task='';
    },
    addTodo: function(){
      console.log(this.todos.task);
      if(!this.todos.task){
        alert('Add todo list');
        return false;
      } else {
        this.pushTodo();
      }
    },
    removeTodo: function(dataToBeRemove){
      let data = this.parseData();
      for(var i = 0; i < data.length; i++ ) {
        if(data[i].id == dataToBeRemove){
          console.log(data[i].task);
          data.splice(i,1);
        };
      }
      this.savingTodo(data);
      this.mountData();
    },
    editTodo: function(d){
      this.adding = false;
      this.editing = true;
      let data = this.parseData();
      for(var i = 0; i < data.length; i++ ) {
        if(data[i].id == d){
          this.todos.task = data[i].task;
          this.todos.id = data[i].id;
          this.newVal = this.todos.task;
        }
      }
    },
    saveTodo: function() {
      this.adding = true;
      this.editing = false;
      console.log('New Id ' + this.todos.id);
      let data = this.parseData();
      for(var i = 0; i < data.length; i++ ) {
        if(data[i].id == this.todos.id){
          data[i].task = this.newVal;
        }
      }
      this.todos = data;
      var newData = this.todos;
      this.savingTodo(newData);
      this.mountData();

    },
    doneTodo: function(d) {
      console.log('New Id ' + this.todos.id);
      let data = this.parseData();
      for(var i = 0; i < data.length; i++ ) {
        if(data[i].id == d){
          data[i].status = data[i].status == 'Done' ? 'Undone' : 'Done';
        }
      }
      this.todos = data;
      var newData = this.todos;
      this.savingTodo(newData);
      console.log(window.localStorage.getItem('testudo'));
      this.mountData();
    }
  }

});
