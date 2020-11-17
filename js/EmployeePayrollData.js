class EmployeePayrollData{
    
    set id(id){
        let idRegex=RegExp('[1-9]{1}[0-9]{0,}$');
        if(idRegex.test(id)){
            this._id=id;
        }else throw "id is invalid";
    }
    get id(){
        return this._id;
    }
    set name(name){
        let nameRegex=RegExp('^[A-Z]{1}[a-zA-Z\\s]{2,}$');
        if(nameRegex.test(name)){
            this._name=name;
        }
        else throw "Name is incorrect!";
    }
    get name(){
        return this._name;
    }
    set profilePic(profilePic){
        this._profilePic=profilePic;
    }
    get profilePic(){
        return this._profilePic;
    }
    set gender(gender){
        this._gender=gender;
    }
    get gender(){
        return this._gender;
    }
    set departments(departments){
        this._departments=departments;
    }
    get departments(){
        return this._departments;
    }
    set salary(salary){
        this._salary=salary;
    }
    get salary(){
        return this._salary;
    }
    set startDate(date) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const employeeDate = date.toLocaleDateString("en-US", options);
        this._startDate = employeeDate;
    }
    get startDate(){
        return this._startDate;
    }
    set notes(notes){
        this._notes=notes;
    }
    get notes(){
        return this._notes;
    }
    toString() {
        return  "Name= " + this.name + ", Gender= " + this.gender +
          ", ProfilePic= " + this.profilePic + ", department= " + this.departments +
          ", Salary= " + this.salary + ", startDate= " + this.startDate + ", notes=" + this.notes;
      }
}