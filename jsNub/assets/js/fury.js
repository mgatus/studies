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
      markdone: true,
      showDuration:''
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
        startTask:'',
        endTask: '',
        showDuration:''
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
    starTime: function(d) {
      let data = this.parseData();
      for(var i = 0; i < data.length; i++ ) {
        if(data[i].id == d){
          data[i].startTask = performance.now();
          data[i].endTask = performance.now();
        }
      }
      this.todos = data;
      var newData = this.todos;
      this.savingTodo(newData);

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
      let data = this.parseData();
      var computedDuration;
      for(var i = 0; i < data.length; i++ ) {
        if(data[i].id == d) {
          console.log(data[i].endTask + ' and ' + performance.now() + ' sum ' + data[i].endTask + performance.now());
          data[i].endTask = data[i].endTask + performance.now();
          data[i].status = data[i].status == 'Done' ? 'Undone' : 'Done';
          data[i].showDuration = this.millConvert(data[i].endTask - data[i].startTask);
        }
        this.markdone = false;

      }
      this.todos = data;
      var newData = this.todos;
      this.savingTodo(newData);
      this.mountData();
    },
    millConvert: function(millis) {
       var minutes = Math.floor(millis / 60000);
       var seconds = ((millis % 60000) / 1000).toFixed();
       return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }
  }

});
