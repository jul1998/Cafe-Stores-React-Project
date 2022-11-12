const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			genericFetch: async (endpoint,method="GET",data=undefined)=>{
				let BACKEND_URL = process.env.BACKEND_URL
				let response = await fetch(BACKEND_URL+endpoint,{
					method: method,
					headers: {
						'Content-Type': 'application/json'
							// 'Content-Type': 'application/x-www-form-urlencoded',
						},
					body: JSON.stringify(data)})
				
				let responseJson = await response.json()
				return responseJson
			},
			genericFetchProtected: async (endpoint,method="GET",data=undefined)=>{
				const store = getStore()
				let BACKEND_URL = process.env.BACKEND_URL
				let response = await fetch(BACKEND_URL+endpoint,{
					method: method,
					headers: {
						'Content-Type': 'application/json',
						"Authorization": "Bearer "+store.token,
						},
					body: JSON.stringify(data)})
				
				let responseJson = await response.json()
				return responseJson
			},
			login: async (endpoint,method="GET",data=undefined)=>{
				const store = getStore() 
				let BACKEND_URL = process.env.BACKEND_URL
				let response = await fetch(BACKEND_URL+endpoint,{
					method: method,
					headers: {
						'Content-Type': 'application/json'
							// 'Content-Type': 'application/x-www-form-urlencoded',
						},
					body: JSON.stringify(data)})
				
				let responseJson = await response.json()
				setStore({...store, token:responseJson.access_token, user_id:responseJson.user_id})
				localStorage.setItem('token', responseJson.access_token)
				console.log("Storage token",localStorage.getItem("token"))
				return responseJson
			}

		}
	};
};

export default getState;
