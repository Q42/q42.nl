import { Mongo } from 'meteor/mongo'

export const Work = new Mongo.Collection("work");
export const WorkTags = new Mongo.Collection("work_tags");
