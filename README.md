# MovieView
Application allows you to explore movies from TMDb API, and create your own movies lists

### install
```
  $ git clone https://github.com/RomanLevak/movie-view.git
  $ cd movie-view/client
  $ npm install
  $ cd ../server
  $ npm install
```

##### start client server
```
  $ cd movie-view/client
  $ npm start
  webpack-dev-server will start at http://localhost:6060
```
#### start node server
###### server will try to connect mongodb at port 27017
```
  $ cd ../server
  $ npm start
    # or to run with nodemon
    $ npm run dev
  node server will start at http://localhost:3000/
```

##### default users:
  email: u1@gmail.com
    password: 1234
    
  email: u2@gmail.com
    password: 1234
