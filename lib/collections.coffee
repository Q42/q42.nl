@PageCounts = new Mongo.Collection("PageCounts")
@BlogComments = new Mongo.Collection("BlogComments")
@SubsManager = new SubsManager()



Meteor.users.deny({
  update: function() {
    return true;
  }
});
