<template>
  <div id="app">
    <img src="./assets/logo.png">
    <div class="container">
      <div class="page-header">
        <h5>VUEJS + FIREBASE</h5>
        <small>{{newBook.Title}}</small>
      </div>

      <div class="panel panel-default">
        <div class="panel-heading">
          <h6>Book Marking</h6>
        </div>
        <div class="Form Add">
          <strong>Add Book</strong>
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
              <button v-on:click.prevent="updateBook(newBook)" name="button" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">update</i></button>

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
              <tr v-for="book in Bookmark" :key="book['.key']">
                <td><a v-bind:href="book.URL || book.url">{{book.Title}}</a></td>
                <td>{{book.Author}}</td>
                <td><a target="_blank" v-bind:href="book.URL || book.url">{{book.URL || book.url}}</a></td>
                <td><a target="_blank" href="#" v-on:click.prevent="editBook(book)">Edit</a></td>
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

let firebaseapp = Firebase.initializeApp(config);
let db = firebaseapp.database();
let bookRef = db.ref('Bookmark')

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
      books: [],
      newBook: {
        Title: '',
        Author: '',
        URL: '',
        id: ''
      }
    }

  },
  methods: {
    addBook: function () {
        bookRef.push(this.newBook);
        this.newBook.Title = '';
        this.newBook.Author = '';
        this.newBook.URL = '';
    },
    deleteBook: function(book) {
      bookRef.child(book['.key']).remove();
      toastr.success('Business removed successfully');
    },
    editBook: function(post) {
      var title = document.getElementById('titleBook');
      var author = document.getElementById('author');
      var url = document.getElementById('url');
      this.newBook = post
      setTimeout(function(){ title.focus(); }, 0);
      setTimeout(function(){ author.focus(); }, 1);
      setTimeout(function(){ url.focus(); }, 2);
    },
    updateBook: function(book) {

      const childKey = book['.key'];
      console.log(childKey);
      delete book['.key'];
      this.$firebaseRefs.books[0].child(childKey).set(book)
      console.log(book)

    //   const childKey = book['.key'];
    //   delete book['.key'];
    //  this.$firebaseRefs.books.child(childKey).update(newBook)
      console.log('update')

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
