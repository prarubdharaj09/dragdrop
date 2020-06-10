import React, { Component } from 'react';
import axios from 'axios';
import ListEmp from './ListEmp';
import './empdata.css';

class EmpDataScreen extends Component {

    constructor(props) {
        console.log('constructor')
        super(props);
        this.state = {
            empList: [],
            islogged: true,
            dragSrcEl : ''
        }
    }

    componentDidMount() {
        console.log('Component Did Mount')
        this.getEmployeeData();
    }
    componentDidUpdate(){
        let listItems = document.querySelectorAll('.draggable');
        this.addDragAndDropEvennts(listItems);
    }

    onDragStart(e){
        console.log('onDragStart', e)
        console.log('this', typeof(this));
        this.style.opacity = '0.4';
        //this.setState({dragSrcEl : this})
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.innerHTML);
    }
    onDragEnter(e){
        console.log("enter");
        this.classList.add('over');
    }
    onDragOver(e){
        console.log('dragover');
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    onDragLeave(e){
        console.log('dragleave');
        e.stopPropagation();
        this.classList.remove('over');    
    }
    onDrop(e){
        const { dragSrcEl } = this.state.dragSrcEl;
        console.log('drop');
        if (dragSrcEl !== this) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
        }
        return false;
    }
    onDragEnd(e){
        console.log('dragend');
        let listItens = document.querySelectorAll('.draggable');
        listItens.forEach(item =>{
            item.classList.remove('over');
        })
        this.style.opacity = '1';
    }
    handleClick(event){
        console.log('click', event)
    }
    addDragAndDropEvennts(item){
        item.forEach(el =>{
            el.addEventListener('dragstart', this.onDragStart);
            el.addEventListener('dragenter', this.onDragEnter);
            el.addEventListener('dragover', this.onDragOver);
            el.addEventListener('dragleave', this.onDragLeave);
            el.addEventListener('drop', this.onDragDrop);
            el.addEventListener('dragend', this.onDragEnd);
        })
    }
    
    getEmployeeData() {
        axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then(res => {
                const tempEmpList = res.data.data.map((emp) => {
                    emp.selected = false;
                    return emp;
                });
                this.setState({ empList: tempEmpList })
            })
            .catch(error => {
                console.log('Error', error);
                alert('error')
            })
    }
    render() {
        console.log('render');
        const { empList} = this.state;
        return (
                <ul>
                    
                    { empList.map(emp => {
                    return (
                               <li key={emp.id} className="draggable" draggable="true" onFocus={this.abc}><ListEmp {...emp} /></li> 
                            )
                        }
                    )
                    }   
                </ul>
        )
    }
}
export default EmpDataScreen;

