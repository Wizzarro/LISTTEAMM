import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Students = new Mongo.Collection('students');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish students that are public or belong to the current user
  Meteor.publish('students', function studentsPublication() {
    return Students.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'students.insert'(surname, name, grade, team) {
    check(surname, String);
    check(name, String);
    check(grade, String);
    check(team , String);



    // Make sure the user is logged in before inserting a student
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Students.insert({
      surname,
      name,
      grade,
      team,
      score: 0,
      scoreSecond: 0,
      scoreThird: 0,
      scoreFourth: 0,
      scoreFifth: 0,
      scoreSix: 0,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'students.addscoreSix'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSix = student.scoreSix + 1,
    Students.update(studentId , { $set: { scoreSix:student.scoreSix }});
  },

  'students.minusscoreSix'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSix = student.scoreSix - 1,
    Students.update(studentId , { $set: { scoreSix:student.scoreSix }});
  },

  'students.addscoreFifth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFifth = student.scoreFifth + 1,
    Students.update(studentId , { $set: { scoreFifth:student.scoreFifth }});
  },

  'students.minusscoreFifth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFifth = student.scoreFifth - 1,
    Students.update(studentId , { $set: { scoreFifth:student.scoreFifth }});
  },
  'students.addscoreFourth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFourth = student.scoreFourth + 1,
    Students.update(studentId , { $set: { scoreFourth:student.scoreFourth }});
  },

  'students.minusscoreFourth'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreFourth = student.scoreFourth - 1,
    Students.update(studentId , { $set: { scoreFourth:student.scoreFourth }});
  },
  'students.addscoreThird'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreThird = student.scoreThird + 1,
    Students.update(studentId , { $set: { scoreThird:student.scoreThird }});
  },

  'students.minusscoreThird'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreThird = student.scoreThird - 1,
    Students.update(studentId , { $set: { scoreThird:student.scoreThird }});
  },

  'students.addscoreSecond'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSecond = student.scoreSecond + 1,
    Students.update(studentId , { $set: { scoreSecond:student.scoreSecond }});
  },

  'students.minusscoreSecond'(studentId) {
    check(studentId, String)
    const student = Students.findOne(studentId);
    student.scoreSecond = student.scoreSecond - 1,
    Students.update(studentId , { $set: { scoreSecond:student.scoreSecond }});
  },


  'students.addPlus'(studentId) {
    check(studentId , String)
    const student = Students.findOne(studentId);
    student.score = student.score + 1,
    Students.update(studentId, { $set: {score:student.score} });
  },

  'students.addMinus'(studentId) {
    check(studentId , String)
    const student = Students.findOne(studentId);
    student.score = student.score - 1;
    Students.update(studentId, { $set: {score: student.score} });
  },

  'students.setChecked'(studentId, setChecked) {
    check(studentId, String);
    check(setChecked, Boolean);

    const student = Students.findOne(studentId);
    if (student.private && student.owner !== this.userId) {
      // If the student is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Students.update(studentId, { $set: { checked: setChecked } });
  },
  'students.setPrivate'(studentId, setToPrivate) {
    check(studentId, String);
    check(setToPrivate, Boolean);

    const student = Students.findOne(studentId);

    // Make sure only the student owner can make a student private
    if (student.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Students.update(studentId, { $set: { private: setToPrivate } });
  },
'students.remove'(studentId) {
    check(studentId, String);

    const student = Students.findOne(studentId);
    if (student.private && student.owner !== this.userId) {
      // If the student is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Students.remove(studentId);
  },

});
