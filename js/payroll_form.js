window.addEventListener('DOMContentLoaded',(event)=>{
    const name=document.querySelector("#name");
    const textError=document.querySelector('.text-error');
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
});

const save = ()=>{
    try{
        let employeePayrollData = createEmployeePayrollData();
        createAndUpdateStorage(employeePayrollData);
    }catch(e){
        return;
    }
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

function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList= JSON.parse(localStorage.getItem("EmployeePayrollList"));
    if(employeePayrollList!=undefined){
        employeePayrollList.push(employeePayrollData);
    }else{
        employeePayrollList=[employeePayrollData];
    }
    alert(employeePayrollList.toString());
    localStorage.setItem("EmployeePayrollList",JSON.stringify(employeePayrollList));
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
    employeePayrollData.profilePic = getSelectedValues('[name=profile]').pop();
    employeePayrollData.gender = getSelectedValues('[name=gender]').pop();
    employeePayrollData.departments=getSelectedValues('[name=department]');
    console.log("department "+employeePayrollData.departments);
    employeePayrollData.salary=getInputValueById('#salary');
    employeePayrollData.notes=getInputValueById('#notes');
    console.log("yrear...."+getInputValueById('#year'));
    console.log("month...."+getInputValueById('#month'));
    console.log("day...."+getInputValueById('#day'));
    let date = getInputValueById('#day')+" "+ getInputValueById('#month')+" "+getInputValueById('#year');
    employeePayrollData.startDate = new Date(Date.parse(date));
    console.log("date"+employeePayrollData.startDate);
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