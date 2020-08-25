console.log('Client side javascript file is loaded!')





const weatherform=document.querySelector('form')
const messageone=document.querySelector('#message-one')
const messagetwo=document.querySelector('#message-two')
const messagethree=document.querySelector('#message-three')



weatherform.addEventListener('submit',(e)=>{
    const search=document.querySelector('input')
    e.preventDefault()
    console.log('testing')
    const url='/weather?address='+search.value
    messageone.textContent='Fetching Weather forecast'
    fetch(url).then((response)=>
    {
       
        response.json().then((data)=>{ 
            if(!data.error)
            {
            // console.log(data)
            messageone.textContent=data.weather.address
            messagetwo.textContent="Lattitude: "+data.weather.coordinates.lattitude+" Longitude: "+data.weather.coordinates.longitude
            messagethree.textContent=data.weather.forecast
            // const text=data.address+' '+data.weather
            // messageone.textContent=text
            }
            else
            messageone.textContent=data.error
        })    
        
        
    }).catch(error => messagetwo.textContent=error);




    
    // console.log(search.value)
})