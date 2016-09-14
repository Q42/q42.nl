import { Mongo } from 'meteor/mongo';

const MediumPosts = new Mongo.Collection("medium_posts");

export { MediumPosts };
