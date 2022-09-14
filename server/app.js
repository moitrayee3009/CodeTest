var express = require('express')
var cors = require('cors')
var app = express()
const fileupload = require('express-fileupload')
const bodyParser = require('body-parser')

app.use(cors())
app.use(fileupload())
app.use(bodyParser.urlencoded({ extended: false }))

var notes = [
  {
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    user: {
      name: 'Hans Persson',
      img: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=adult-beard-boy-casual-220453.jpg&fm=jpg'
    }
  },
  {
    content:
      'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi.',
    user: {
      name: 'Hanna Karlsson',
      img: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?cs=srgb&dl=women-s-white-and-black-button-up-collared-shirt-774909.jpg&fm=jpg'
    }
  },
  {
    content:
      'Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.',
    user: {
      name: 'Michael Persson',
      img: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }
  }
]

app.get('/getnotes', function (req, res) {
  res.send(notes)
})

app.post('/getnotes', function (req, res) {
  //......
  // let addNote = req.body
  const addNote = {
    content: req.body.content,
    user: {
      name: req.body.name,
      img: req.body.img
    }
  }
  notes.unshift(addNote)
  // res.send('It is working!')
})

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})
