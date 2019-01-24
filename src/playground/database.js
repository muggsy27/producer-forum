// producer forum database format
const users = {
  abc: {
    stories: []
  },
  def: {
    stories: []
  }
};

// database POST action format 
const collection = database.collection('users/${user}/stories');
collection.insertOne(story);

// database GET action format
const collection = database.collection('users');
// returns all users || users: { user : { stories } }
collection.find({}).toArray()
  .then(users => {

  })
  .catch(e => console.log(`error with GET request ${e}`));


const names = [[{ name: 'derek' }, { name: 'shendl' }], [{ name: 'muggsy' }, { name: 'moose' }]];
const mergedNames = [].concat.apply([], names);
console.log(mergedNames);


/*
LOGIC FOR GETTING ALL STORIES
*/

// database schema
const users = {
  abc: {
    stories: [{ title: 'fortnite' }, { title: 'twitch' }]
  },
  def: {
    stories: [{ title: 'football' }, { title: 'raiders' }]
  }
};

// returns an array of a given object's own property names
const usersArray = Object.values(users);

// maps stories into array of arrays
const storiesArray = usersArray.map(user => user.stories);

// creates single array from array of arrays
const mergedStories = [].concat.apply([], storiesArray);

// logs single array 
console.log(mergedStories);

/*
HOW TO GRAB USER ID FOR POSTS 
1. Grab the ID from a getState() call inside our stories reducer 
(redux will have a state change once a user logs in after auth reducer is dispatched)
2. Store ID in a variable and insert into insertOne() call using query strings
*/

// need to pass user id into dispatch on login()







// opens connection to MongoDB
client.connect()
  .then(client => {
    // stores database in const
    const database = client.db(databaseName);

    // stores stories collection in const
    const collection = database.collection('stories');

    // inserts ONE records (POST request data) into MongoDB stories collection
    collection.insertOne(story)
      .then(doc => {
        // console logs upoon success/document inserted
        console.log(`story inserted: ${doc}`);

        // closes connection to MongoDB
        client.close(() => console.log('connection to MongoDB closed'));
      })
      // catches errors in inserting to MongoDB and logs to console
      .catch(e => console.log(`error inserted doc to MongoDB ${e}`));
  })
  // catches errors in connecting to MongoDB and logs to console
  .catch(e => console.log(`error connecting to MongoDB ${e}`));



/* What data needs to be saved & presented to users? */

/* 
Post Page:
- Post title
- Post time
- Post author
- Post comment (from author)
- Post comment (from other users)
  - Post Author
*/

/* 
Home Page:
- Post category
- Post title
- Number of comments
- Post time 
- Post author
*/


const post = {
  title: '',
  time: '',
  link: '',
  comment: '',
  category: '',
  author: '',
  comments: [{ comment: '', author: '', time: '' }],
  upvotes: [],
  downvotes: []
};

const user = {
  username: '',
};

const votes = {
  userID: '',
  storyID: '',
  commentID: '',
  vote: 'up || down'
};






const parsedDate = parseInt('1541286109868');
const date = new Date(parsedDate);
const formattedDate = format(date, 'MM/DD/YYYY');
console.log(formattedDate);