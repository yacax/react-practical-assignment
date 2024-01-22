const { addPostDB, createPost, editPostDB } = require('../models/post');
const baseURL = process.env.BASE_URL || 'https://initechtest-f220e52cb609.herokuapp.com';

const initialPostsData = [
  { title: "Let it be, let it be, let it be, let it be", username: "Paul", imageSrc: `${baseURL}/IMG_4253.jpg` },
  { title: "I see skies of blue And clouds of white", username: "Louis", imageSrc: `${baseURL}/IMG_4671.jpg` },
  { title: "Never cared for what they do Never cared for what they know", username: "James", imageSrc: `${baseURL}/IMG_6624.jpg` },
  { title: "Sometimes, I feel the fear of uncertainty stinging clear", username: "Alex", imageSrc: `${baseURL}/IMG_3397.jpg` },
  { title: "No, no, no, doo-doo-doo, doo-doo", username: "Michael", imageSrc: `${baseURL}/IMG_2700.jpg` },
  { title: "I'm a creep I'm a weirdo What the hell am I doing here?", username: "Mike", imageSrc: `${baseURL}/IMG_2623.jpg` },
  { title: "I don't belong here", username: "Edward", imageSrc: `${baseURL}/IMG_4076.jpg` },
  { title: "Psychic spies from China try to steal your mind's elation", username: "Chad", imageSrc: `${baseURL}/IMG_4183.jpg` },
  { title: "They'll learn much more Than I'll ever knows", username: "Louis", imageSrc: `${baseURL}/IMG_5189.jpg` },
  { title: "We only said goodbye with words", username: "Amy", imageSrc: `${baseURL}/IMG_8862.jpg` },
  { title: "One love, one blood One life, you got to do what you should", username: "Bono", imageSrc: `${baseURL}/IMG_2416.jpg` },  
  { title: "I'm gon' send him to outer space To find another race", username: "Cedric", imageSrc: `${baseURL}/IMG_3633.jpg` },
];

async function seedPosts() {
  try {
    for (const postData of initialPostsData) {
      const post = createPost(postData.title, postData.username);
      const createdNewPost = await addPostDB(post);
      createdNewPost.imageSrc = postData.imageSrc;
        await editPostDB(createdNewPost.id, createdNewPost);
    }
    console.log("Posts successfully seeded");
  } catch (error) {
    console.error("Error seeding posts:", error);
  }
}


module.exports = seedPosts;
