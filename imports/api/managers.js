import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Managers = new Mongo.Collection('managersPublication');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish students that are public or belong to the current user
  Meteor.publish('managers', function managersPublication() {
    return Managers.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });

  Meteor.publish('manager', function managerPublication() {
    return Managers.find(this.userId, {
      fields: {
        emails: 1,
        profile: 1,
        money: 1,
      },
    })
  });
}

Meteor.methods({
  'managers.insert'(surname, name, email , money) {
    check(surname, String);
    check(name, String);
    check(email, String);
    check(money, String);


    // Make sure the user is logged in before inserting a student
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }


    Managers.insert({
      surname,
      name,
      email,
      money: 100000000,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },


});
