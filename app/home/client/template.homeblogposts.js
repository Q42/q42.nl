import { Mongo } from 'meteor/mongo'
import { Template } from 'meteor/templating'
import { Employees, EmployeeCount } from '../../employees/lib/shared'

const PostsWithAuthors = new Mongo.Collection("Posts");

Template.homeBlogposts.helpers({
  postLink() {
    return this.type === 'link' ?
      this.url : `/blog/post/${this.id}/${this.slug}`;
  },

  isByQer(authorName) {
    return (authorName !== 'Rahul Choudhury' && authorName !== 'Q42' &&
        authorName !== 'Ineke Scheffers') ? 'byqer' : '';
  },

  num_employees() {
    if (EmployeeCount.findOne())
      return EmployeeCount.findOne().count;
  },

  postWithAuthor() {
    return PostsWithAuthors.find({
      $or: [
        {description: {$exists: true}},
        {intro: {$exists: true}}
      ]
    });
  },
  author() {
    return Employees.findOne({name: this.authorName});
  },

  cleanIntro(intro) {
    // XXX: trolololol
    let tag = document.createElement('div');
    tag.innerHTML = intro;
    let txt = tag.innerText;
    txt = txt.substr(0, 150);
    txt = txt.substr(0, Math.min(txt.length, txt.lastIndexOf(" ")));
    if (txt)
      return txt + "...";
    return "";
  },

  cleanImg(intro) {
    // XXX: trolololol
    let div = document.createElement('div');
    div.innerHTML = intro;
    let img = div.querySelector('img');
    if (img)
      return img.src;
    return "";
  }
});
