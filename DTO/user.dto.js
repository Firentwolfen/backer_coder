class UsersDTO {
constructor(info){
this.name=info.first_name
this.lastname=info.last_name
this.email = info.email
this.age =info.age
this.phone =info.phone
this.role = 'user'
this.password = info.password
}

}

module.exports = UsersDTO