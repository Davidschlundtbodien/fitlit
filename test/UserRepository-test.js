import { expect } from 'chai';
import UserRepository from '../src/UserRepository';
import User from '../src/User';

describe('User Repository', () => {
  it('should be a function', function () {
    expect(UserRepository).to.be.a('function');
  });
  const data = [{
    "id": 1,
    "name": "Luisa Hane",
    "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
    "email": "Diana.Hayes1@hotmail.com",
    "strideLength": 4.3,
    "dailyStepGoal": 10000,
    "friends": [16, 4, 8]
  }, {
    "id": 2,
    "name": "Jarvis Considine",
    "address": "30086 Kathryn Port, Ciceroland NE 07273",
    "email": "Dimitri.Bechtelar11@gmail.com",
    "strideLength": 4.5,
    "dailyStepGoal": 5000,
    "friends": [9, 18, 24, 19]
  }];

  it('should hold instances of Users', function () {
    const userList = new UserRepository(data)

    expect(userList.users[1]).to.be.an.instanceof(User)
  })

  it('should return user info given a user ID', function () {
    const userList = new UserRepository(data)

    const secondUser = userList.findUserByID(2)

    expect(secondUser.name).to.equal(data[1]['name'])
  })

  it('should calculate average step goal of all users', function () {
    const userList = new UserRepository(data)

    const stepGoalAverage = userList.getStepGoalAvg()

    expect(stepGoalAverage).to.equal(7500)
  })

});
