import User from './User';

class UserRepository {
  constructor(data) {
    this.users = data.map(userData => new User(userData))
  }

  findUserByID(userId) {
    return this.users.find(user => user.id === userId)
  }

  getStepGoalAvg() {
    return this.users.reduce((currentTotal, user) => {
      return user.dailyStepGoal + currentTotal
    }, 0) / this.users.length
  }
}

export default UserRepository;
