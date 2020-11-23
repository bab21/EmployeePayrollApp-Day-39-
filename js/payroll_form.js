
let isUpdate = false;
let employeePayrollObj ={};

window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector("#name");
    const textError=document.querySelector('.text-error');
    empList= getEmployeePayrollDataFromStorage();
    
    // numEmployees=empList.length;
    name.addEventListener('input',function(){
        if(name.value.length==0){
            textError.textContent="";
            return;
        }
        try{
            (new EmployeePayrollData()).name=name.value;
            textError.textContent="";
        }catch(e){
            textError.textContent=e;
        }
    });
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = salary.value;
    salary.addEventListener('input', function(){
        output.textContent = salary.value;
    });
    checkForUpdate();
});

const getEmployeePayrollDataFromStorage = ()=> {
    return localStorage.getItem('EmployeePayrollList')?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')):[];

}


const save = (event)=>{
    event.preventDefault();
    event.stopPropagation();
    console.log("called save method");
    try{
        setEmployeePayrollObject();
        createAndUpdateStorage();
        resetForm();
        window.location.replace(site_properties.home_page);
    }catch(e){
        return;
    }
}

const setEmployeePayrollObject =()=>{
    employeePayrollObj._name=getInputValueById('#name');
    employeePayrollObj._profilePic =getSelectedValues('[name=profile]').pop();
    employeePayrollObj._gender= getSelectedValues('[name=gender]').pop();
    employeePayrollObj._departments=getSelectedValues('[name=department]');
    employeePayrollObj._salary=getInputValueById('#salary');
    employeePayrollObj._notes=getInputValueById('#notes');
    let date =getInputValueById('#day')+" "+getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollObj._startDate=date;

}

const resetForm = ()=>{
    setValue('#name','');
    unsetSelectedValues('[name=profile]');
    unsetSelectedValues('[name=gender]');
    unsetSelectedValues('[name=department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2020');
}

const unsetSelectedValues=(propertyValue)=>{
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item=>{
        item.checked = false;
    });
}

const setValue =(id,value)=>{
    const element = document.querySelector(id);
    element.value=value;
}

function createAndUpdateStorage(){
    let employeePayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList){
        let empPayrollData= employeePayrollList.
                            find(empData => empData._id == employeePayrollObj._id);
         
        if(!empPayrollData){
            employeePayrollList.push(createEmployeePayrollData());

        }else{
            const index= employeePayrollList
                            .map(empData => empData._id)
                            .indexOf(empPayrollData._id);
            employeePayrollList.splice(index,1,creteEmployeePayrollData(empPayrollData._id));

        }
    }else{
        employeePayrollList = [createEmployeePayrollData()];
    }
    console.log("List now"+employeePayrollList);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
}

const creteEmployeePayrollData = (id) => {
    let employeePayrollData =new EmployeePayrollData();
    if(!id) employeePayrollData.id = getMaxValueOfEmployeeID()+1;
    else employeePayrollData.id=id;
    setEmployeePayrollData(employeePayrollData);
    return employeePayrollData;
}

const setEmployeePayrollData = (employeePayrollData)=>{
    try{
        employeePayrollData.name = employeePayrollObj._name;
    }catch(e){
        setTextValue('text-error',e);
        throw e;
    }
    employeePayrollData.profilePic = employeePayrollObj._profilePic;
    employeePayrollData.gender =employeePayrollObj._gender;
    employeePayrollData.departments =employeePayrollObj._departments;
    employeePayrollData.salary = employeePayrollObj._salary;
    employeePayrollData.notes=employeePayrollObj._notes;

    try{
        employeePayrollData.startDate=new Date(Date.parse(employeePayrollObj._startDate));
    }
    catch(e){
        setTextValue('.date-error',e);
        throw e;
    }
    alert(employeePayrollData.toString());
}

const createNewEmployeeId = () =>{
    let empID = localStorage.getItem('EmployeeID');
    empID = !empID?1:(parseInt(empID)+1).toString();
    localStorage.setItem("EmployeeID",empID);
    return empID;
}
const createEmployeePayrollData = () =>{
    let employeePayrollData=new EmployeePayrollData();
    try{
        employeePayrollData.name=getInputValueById('#name');
        console.log("name entered is "+employeePayrollData.name);
    }catch(e){
        setTextValue('.text-error',e);
        throw e;
    }
    // console.log("num of employees"+numEmployees);
    employeePayrollData.id = getMaxValueOfEmployeeID()+1;
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.departments=getSelectedValues('[name=department]');
    employeePayrollData.salary=getInputValueById('#salary');
    employeePayrollData.notes=getInputValueById('#notes');
    let date = getInputValueById('#day')+" "+ getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date));
    console.log("emply"+employeePayrollData.toString());
    alert(employeePayrollData.toString());
    return employeePayrollData;
}

const getInputValueById = (id) =>{
    let value=document.querySelector(id).value;
    return value;
}
const getSelectedValues = (propertyValue) =>{
    let allItems=document.querySelectorAll(propertyValue);
    let selItems=[];
    allItems.forEach(item=>{
        if(item.checked) selItems.push(item.value);
    });
    return selItems;
}
const checkForUpdate = () =>{
    const employeePayrollJson = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJson?true:false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJson);
    setForm();
}

const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setSelectedValues('[name=profile]',employeePayrollObj._profilePic);
    setSelectedValues('[name=gender]',employeePayrollObj._gender);
    setSelectedValues('[name=department]',employeePayrollObj._departments);
    setValue('#salary',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._notes);
    setTextValue('.salary-output',employeePayrollObj._salary);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setSelectedIndex('#day',0);
    setSelectedIndex('#month',0);
    setSelectedIndex('#year',0);
}

const setTextValue =(id, value) =>{
    const element =document.querySelector(id);
    element.textContent = value;
}
const setSelectedValues = (propertyValue, value) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item =>{
        if(Array.isArray(value)){
            if(value.includes(item.value)){
                item.checked = true;
            }
        }
        else if (item.value===value)
            item.checked = true;
    })
}

const setSelectedIndex =(id,index) => {
    const element =document.querySelector(id);
    element.selectedIndex = index;
}

const stringifyDate = (date) => {
    const options ={day :'numeric', month: 'short', year: 'numeric' };
    const newDate =!date?"undefined":
                    new Date(Date.parse(date)).toLocaleDateString('en-GB',options);
    return newDate;
}

const getMaxValueOfEmployeeID =()=>{
    employeePayrollList =  getEmployeePayrollDataFromStorage();
    let max = employeePayrollList
                .map(employeeData => employeeData._id)
                .reduce(function(a, b) {
                    return Math.max(a, b);
                });
    return max;
}
