import React from 'react';
import './App.css';


class App extends React.Component {
	constructor(props) {
        super(props);
		this.onClick = this.onClick.bind(this);
		this.callApiSortByName = this.callApiSortByName.bind(this);
		this.callApiSortBySalary = this.callApiSortBySalary.bind(this);
		this.callApiSortByHiredate = this.callApiSortByHiredate.bind(this);
		this.callApiById = this.callApiById.bind(this);
        this.state = { 
			name : '',
			salary:'',
			hiredate:'',
			error: null,
			isLoaded: false,
			columns: ['ID', 'NAME', 'SALARY','HIREDATE'],
			items: []
		};
    }
	
	 componentDidMount() {
		this.clearState();
		this.getItems();
    }
	
	clearState() {
		this.setState({
			name : '',
			salary:'',
			hiredate:'',
			error: null,
			isLoaded: false,
			items: []
		});
	}
	
	
	
	
	onClick(id) {
		this.clearState();
		this.callApiById(id);
	}
	
	getItems = ()=> {
		fetch("http://localhost:8081/api/employees",{
				method: "GET",
				mode:"cors",
				headers: {
				 "Content-Type": "application/json"	
				}}) 
            .then(result=> {
				return result.json();	
            }).then(data => {
				console.log(data);
				this.setState({isLoaded: true, items:data});
			},
			(error) => {
				this.setState({isLoaded: true,error});
			});
  }
	
	
	callApiSortByName = (name) =>{
		fetch("http://localhost:8081/api/employees/name/" + name,{
				method: "GET",
				mode:"cors",
				headers: {
				 "Content-Type": "application/json"	
				}}) 
            .then(result=> {
				return result.json();	
            }).then(data => {
				console.log(data);
				this.clearState();
				this.setState({isLoaded: true, items:data});
			},
			(error) => {
				this.setState({isLoaded: true,error});
			});
	}
	
	callApiSortBySalary = (salary) =>{
    	fetch("http://localhost:8081/api/employees/salary/" + salary,{
				method: "GET",
				mode:"cors",
				headers: {
				 "Content-Type": "application/json"	
				}}) 
            .then(result=> {
				return result.json();	
            }).then(data => {
				console.log(data);
				this.clearState();
				this.setState({isLoaded: true, items:data});
			},
			(error) => {
				this.setState({isLoaded: true,error});
			});
	}
	
	callApiSortByHiredate = (hiredate) =>{
    	fetch("http://localhost:8081/api/employees/hiredate/" + hiredate,{
				method: "GET",
				mode:"cors",
				headers: {
				 "Content-Type": "application/json"	
				}}) 
            .then(result=> {
				return result.json();	
            }).then(data => {
				console.log(data);
				this.clearState();
				this.setState({isLoaded: true, items:data});
			},
			(error) => {
				this.setState({isLoaded: true,error});
			});
	}
  
  
	callApiById = (id) =>{
		fetch("http://localhost:8081/api/employees/" + id,{
				method: "GET",
				mode:"cors",
				headers: {
				 "Content-Type": "application/json"	
				}}) 
            .then(result=> {
				return result.json();	
            }).then(data => {
				console.log(data);
				this.clearState();
				this.setState({isLoaded: true, items:data});
			},
			(error) => {
				this.setState({isLoaded: true,error});
			});
	}
  
   
	
	
	render() {
		const { error, isLoaded, items} = this.state;
		var dataColumns = this.state.columns;
		var dataRows = this.state.items;
		
		var sortData = (<thead>
				<tr>
				<th></th>
				<th><input type="text" name="name" placeholder="Type here to sort by name" value={this.state.name} onChange={this.callApiSortByName.bind(this)} /></th>
				<th><input type="text" name="salary" placeholder="Type here to sort by salary" value={this.state.salary} onChange={this.callApiSortBySalary.bind(this)} /></th>
				<th><input type="text" name="hiredate" placeholder="Type here to sort by hiredate" value={this.state.hiredate} onChange={this.callApiSortByHiredate.bind(this)} /></th>
				</tr>
			</thead>);
			
	
		var tableHeaders = (<thead>
			  <tr>
				{dataColumns.map((column) =>
				  <th>{column}</th> 
				)}
			  </tr>
			</thead>);
			
				
		var tableBody = dataRows.map(({id,name,salary,hiredate}) => 
			(<tbody><tr key={id}>
				<td><a onClick={({id}) => this.onClick({id})} style={{cursor: 'pointer'}}>{id}</a></td>
				<td>{name}</td>
				<td>{salary}</td>
				<td>{hiredate}</td>
				</tr>
			</tbody>));

		
		
		
		if(error) {
			return (<div>Error:{error.message}</div>);
		} else if(!isLoaded){
			return (<div>Loading...</div>);
		} else {
			return (
				<div className="App">
				
				  <header className="App-header">
				  <table className="table table-bordered table-hover" width="100%">
					
					{sortData}
					
					{tableHeaders}
						
					{tableBody}
											
						
					</table>
				  
				  </header>
				</div>
		
			);
		}
	}
}

export default App;
