// export{empPayrollList};
let empPayrollList;
window.addEventListener('DOMContentLoaded', (event)=>{
    empPayrollList = getEmployeePayrollDataFromStorage();
    document.querySelector(".emp-count").textContent = empPayrollList.length;

    createInnerHtml();
    localStorage.removeItem('editEmp');
});

const getEmployeePayrollDataFromStorage = ()=> {
    return localStorage.getItem('EmployeePayrollList')?
                        JSON.parse(localStorage.getItem('EmployeePayrollList')):[];

}

const createInnerHtml= () => {
    const headerHtml = "<th></th><th>Name</th><th>Gender</th><th>Department</th>"+
                     "<th>Salary</th><th>Start Date</th><th>Actions</th>";
    if(empPayrollList.length==0) return;

    let innerHtml=`${headerHtml}`;
    
    // let empPayrollList = createEmployeePayrollJSON();
    for(const empPayrollData of empPayrollList){
        
        innerHtml = `${innerHtml}
            <tr>
                <td><img class="profile" src="${empPayrollData._profilePic}" alt=""></td>
                <td>${empPayrollData._name}</td>
                <td>${empPayrollData._gender}</td>
                <td>${getDeptHtml(empPayrollData._departments)}</td>
                <td>${empPayrollData._salary}</td>
                <td>${empPayrollData._startDate}</td>
                <td>
                    <img id="${empPayrollData._id}" onclick="remove(this)" alt="delete"
                            src="../assets/icons/delete-black-18dp.svg">
                    <img id="${empPayrollData._id}" alt="edit" onclick="update(this)"
                            src="../assets/icons/create-black-18dp.svg">        
                </td>
            </tr>
            `;
    }
    document.querySelector('#table-display').innerHTML=innerHtml;
}

const remove = (node) => {
    console.log("call removbe");
    let empPayrollData =empPayrollList.find(empData => empData._id==node.id);
    console.log("data to remove "+empPayrollData);
    if(!empPayrollData) return;
    const index = empPayrollList
                .map(empData => empData._id)
                .indexOf(empPayrollData._id);

    empPayrollList.splice(index,1);
    localStorage.setItem("EmployeePayrollList",JSON.stringify(empPayrollList));
    document.querySelector(".emp-count").textContent = empPayrollList.length;
    createInnerHtml();
}

const getDeptHtml = (deptList) =>{
    let deptHtml ='';
    for(const dept of deptList){
        deptHtml = `${deptHtml} <div class='dept-label'>${dept}</div>`;
    }
    return deptHtml;
}

const createEmployeePayrollJSON = ()=>{
    let empPayrollListLocal =[
        {
            _name:'Sagar Yadav',
            _gender: 'male',
            _department: [
                'Engineering',
                'Finance'
            ],
            _salary: '500000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime(),
            _profilePic: '../assets/profile-images/Ellipse -2.png'

        },
        {
            _name:'Nancy Yadav',
            _gender: 'female',
            _department: [
                'Engineering',
                'Sales'
            ],
            _salary: '400000',
            _startDate: '29 Oct 2019',
            _note: '',
            _id: new Date().getTime()+1,
            _profilePic: '../assets/profile-images/Ellipse -1.png'

        }
    ];
    return empPayrollListLocal;

}
