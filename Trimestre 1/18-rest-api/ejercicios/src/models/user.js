class User {
    static users = [];

    static create(user) {
        user.id = this.users.length + 1
        this.users.push(user);
        return user
    }

    static findAll() {
        return this.users;
    }

    static findById(id){
      for(const element of this.users){
        let user = element;
        if(user.id == id){
            return user;
        }
      }
      return null;
    }

    static update(id, newData){
        const index = this.users.findIndex(user => user.id == id);
        if(index === -1){
            return false;
        }else{
            this.users[index] = {id: Number.parseInt(id), ...newData}
            return this.users[index];
        }
    }

    static delete(id){
        const index = this.users.findIndex(user => user.id == id);
        if(index === -1){
            return false;
        }

        this.users.splice(index, 1);
        return true;
    }
}
export default User;