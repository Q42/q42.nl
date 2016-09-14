import { Mongo } from 'meteor/mongo'
import { Template } from 'meteor/templating'
import { Employees, EmployeeCount } from '../../employees/lib/shared'
import { MediumPosts } from '../../medium_posts/lib/shared'

Template.homeBlogposts.helpers({
  isByQer(authorName) {
    return
      (authorName && authorName !== 'Q42')
      ? 'byqer'
      : '';
  },

  firstPublishedAt() {
    const d = new Date(this.firstPublishedAt);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  },

  num_employees() {
    if (EmployeeCount.findOne())
      return EmployeeCount.findOne().count;
  },

  postWithAuthor() {
    return MediumPosts.find();
  },
  author() {
    return Employees.findOne({name: this.displayAuthor});
  }
});
