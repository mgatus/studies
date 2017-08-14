<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="container">
      <div class="page-header">
        <h1>VUEJS + FIREBASE</h1>
        <small>{{newBook.Title}}</small>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h2>Book Marking</h2>
        </div>
        <div class="Form Add">
          <h2>Add Book</h2>
          <form id="form" class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input type="text" id="titleBook" class="validate" v-model="newBook.Title">
                <label for="title">Add Title</label>
              </div>
              <div class="input-field col s6">
                <input  id="author" type="text" class="validate" v-model="newBook.Author">
                <label for="author">Add Author</label>
              </div>
            </div>
            <div class="row">
              <div class="input-field col s12">
                <input id="url" type="text" class="validate" v-model="newBook.URL">
                <label for="url">Add URL</label>
              </div>
            </div>
            <div class="row">
              <button v-on:click.prevent="addBook" name="button" class="btn-floating btn-large waves-effect waves-light red"><i class="material-icons">add</i></button>
              <button v-on:click.prevent="keyshit" name="button" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">update</i></button>
            </div>
          </form>
        </div>
        <div class="panel-body">
          <table class="striped centered responsive-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>URL</th>
                <th>Update</th>
                <th>Delete</th>

              </tr>
            </thead>
            <tbody>
              <tr v-for="book in Bookmark" v-bind:id="book['.key']">
                <td><a v-bind:href="book.URL || book.url">{{book.Title}}</a></td>
                <td>{{book.Author}}</td>
                <td><a target="_blank" v-bind:href="book.URL || book.url">{{book.URL || book.url}}</a></td>
                <td><a target="_blank" href="#" v-on:click.prevent="updateBook(book)">Update</a></td>
                <td><a target="_blank" href="#" v-on:click.prevent="deleteBook(book)">Delete</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Firebase from 'firebase'

let config = {
  apiKey: "AIzaSyAI020CJxfG_JdE5DF1SZm7OiHTP4ONq0I",
  authDomain: "vuejs-firebase-bookmark.firebaseapp.com",
  databaseURL: "https://vuejs-firebase-bookmark.firebaseio.com",
  projectId: "vuejs-firebase-bookmark",
  storageBucket: "vuejs-firebase-bookmark.appspot.com",
  messagingSenderId: "464858574686"
}



let app = Firebase.initializeApp(config);
let db = app.database();
// console.log(db);
let bookRef = db.ref('Bookmark');

let bookRefObj = db.ref().child('Bookmark')

bookRefObj.on('child_added', snap => {
  var objt = snap.val();
  // console.log(snap.val());
  console.log(objt.Title);
  console.log(objt.Author);
  console.log(objt.URL);
});

console.log(bookRefObj);

export default {
  name: 'app',
  firebase: {
    Bookmark: bookRef
  },
  components: {
    Hello
  },
  data () {
    return {
      newBook: {
        Title: '',
        Author: '',
        URL: '',
        id: ''
      }
    }
  },
  methods: {
    addBook: function() {
      bookRef.push(this.newBook);
      this.newBook.Title ='';
      this.newBook.Author ='';
      this.newBook.URL = '';

    },
    deleteBook: function(book) {
      bookRef.child(book['.key']).remove();
    },
    updateBook: function(e) {
      // var reviewNode = e.Title;
      // console.log(reviewNode);
      var keyMo = e['.key']
      this.newBook.Title = e.Title;
      this.newBook.Author = e.Author;
      this.newBook.URL = e.URL;
      this.newBook.id = keyMo;
      console.log(keyMo);

      var title = document.getElementById('titleBook');
      var author = document.getElementById('author');
      var url = document.getElementById('url');

      // console.log(inputs);
      setTimeout(function(){ title.focus(); }, 0);
      setTimeout(function(){ author.focus(); }, 1);
      setTimeout(function(){ url.focus(); }, 2);


    },
    keyshit: function(d) {
      // var uptitle = this.newBook.Title;
      // var upAuthor = this.newBook.Author;
      // var upURL = this.newBook.URL;
      var des = this.newBook.id;
      console.log(des);
      // var babe = bookRefObj +'/'+des;
      // console.log(babe);

      // updateUserName(des, newName) {
      //   this.$firebaseRefs.users.child(user['.key']).child('name').set(newName);
      // }

       // create a copy of the item
       item = {
         this.
         newBook
       }
       // remove the .key attribute
       delete des['.key']
       this.$firebaseRefs.Bookmark.child(des['.key']).set(item)
     }

      // console.log(bookRef.child(k['.key']));
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
